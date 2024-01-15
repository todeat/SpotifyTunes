import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { SpotifyAlbumToAlbum, SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifySinglePlaylistToPlaylist, SpotifyTrackToTrack, SpotifyUserToUser } from './shared/SpotifyHelper';
import { IPlaylist } from './interfaces/IPlaylist';
import { IArtist } from './interfaces/IArtist';
import { ITrack } from './interfaces/ITrack';
import { BehaviorSubject } from 'rxjs';
import { IAlbum } from './interfaces/IAlbum';

interface IUser {
  id: string;
  name: string;
  img: string;
}



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify();
  user!: IUser;
  constructor(private router: Router) { 
    this.spotifyApi = new Spotify();
  }

  async startUser() {
    if(!!this.user){
      return true;
    }
      

    const token = localStorage.getItem('token');

    if(!token)
    {
      return false;
    }
      
    try {

      this.defineToken(token);
      await this.getUser();
      return !!this.user;

    }catch(ex){
      return false;
    }
  }

  async getUser() {
    const userInformation = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInformation);
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  defineToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isUserAuthenticated', 'true');
    }
  }

  getAccessToken() {
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfig.authEndPoint}`;
    const clientId = SpotifyConfig.clientId;
    const redirectUri = SpotifyConfig.redirectUrl;
    const scopes = SpotifyConfig.scopes.join("%20");
  
    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
  }

  async getPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, {offset, limit});
    return playlists.items.map(playlist => SpotifyPlaylistToPlaylist(playlist));
  }


  async getPlaylistTracks(playlistId: string, offset = 0, limit = 50) {
    const playlistspotify = await this.spotifyApi.getPlaylist(playlistId, {offset, limit});

    if(!playlistspotify)
      return [];

    const playlist = SpotifySinglePlaylistToPlaylist(playlistspotify);

    const spotifyTracks = await this.spotifyApi.getPlaylistTracks(playlistId, {offset, limit});
    playlist.tracks = spotifyTracks.items.map(x => SpotifyTrackToTrack(x.track as SpotifyApi.TrackObjectFull));
    return playlist;
  }

  async getTopArtists(limit = 6): Promise<IArtist[]> {
    const topArtists = await this.spotifyApi.getMyTopArtists({limit});
    return topArtists.items.map(spotifyArtist => SpotifyArtistToArtist(spotifyArtist));
  }

  async getTopTracks(limit: number = 20): Promise<ITrack[]> {
    const topTracks = await this.spotifyApi.getMyTopTracks({limit});
    return topTracks.items.map(spotifyTrack => SpotifyTrackToTrack(spotifyTrack));
  }

  async getTracks(offset = 0, limit = 50): Promise<ITrack[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({offset, limit});
    return tracks.items.map(x => SpotifyTrackToTrack(x.track));
  }

  async playTrack(track: ITrack) {
    await this.spotifyApi.play({
      uris: [track.uri]
    });
  }

  async back() {
    await this.spotifyApi.skipToPrevious();
  }

  async next() {
    await this.spotifyApi.skipToNext();
  }

  async play(contextUri?: string): Promise<void> {
    try {
      const playOptions = contextUri ? { context_uri: contextUri } : {};
      await this.spotifyApi.play(playOptions);
    } catch (error) {
      console.error('Error playing track:', error);
      throw error;
    }
  }
  

  async pause(): Promise<void> {
    try {
      await this.spotifyApi.pause();
    } catch (error) {
      console.error('Error pausing track:', error);
      throw error;
    }
  }

  async createPlaylist(playlistName: string, description: string = '', isPublic: boolean = true): Promise<IPlaylist | null> {
    try {
      if (!this.user) {
        console.error('User is not authenticated');
        return null;
      }
  
      const newPlaylistData = {
        name: playlistName,
        description: description,
        public: isPublic
      };
  
      const createdPlaylist = await this.spotifyApi.createPlaylist(this.user.id, newPlaylistData);
      console.log('Created playlist:', createdPlaylist);
      return SpotifyPlaylistToPlaylist(createdPlaylist);
    } catch (error) {
      console.error('Error creating playlist:', error);
      return null;
    }
  }

  async createRecommendedPlaylist(userId:any, seedData:any) {

    const recommendations = await this.spotifyApi.getRecommendations(seedData);

    const playlist = await this.spotifyApi.createPlaylist(userId, { name: 'Recommended Playlist' });
  
    const trackUris = recommendations.tracks.map(track => track.uri);
    await this.spotifyApi.addTracksToPlaylist(playlist.id, trackUris);
  
    return playlist;
  }

  async getUserPlaylists(): Promise<IPlaylist[]> {
    try {
      const userId = this.user?.id;
      if (!userId) {
        throw new Error('User ID is not available');
      }
  
      const playlists = await this.spotifyApi.getUserPlaylists(userId);
      return playlists.items.map(SpotifyPlaylistToPlaylist);
    } catch (error) {
      console.error('Error getting user playlists:', error);
      return [];
    }
  }

  async getNewReleases(limit: number = 20): Promise<IAlbum[]> {
    try {
      const newReleases = await this.spotifyApi.getNewReleases({ limit });
      const albums = newReleases.albums.items.map(item => SpotifyAlbumToAlbum(item));
      return albums;
    } catch (error) {
      console.error('Error getting new releases:', error);
      return [];
    }
  }

  async addToLibrary(albumId: string): Promise<void> {
    try {
      await this.spotifyApi.addToMySavedAlbums([albumId]);
    } catch (error) {
      console.error('Error adding album to library:', error);
      throw error;
    }
  }

  async getSavedAlbums(offset: number = 0, limit: number = 20): Promise<IAlbum[]> {
    try {
      const data = await this.spotifyApi.getMySavedAlbums({ offset, limit });
      return data.items.map(item => SpotifyAlbumToAlbum(item.album));
    } catch (error) {
      console.error('Error getting saved albums:', error);
      return [];
    }
  }

  async removeFromLibrary(albumId: string): Promise<void> {
    try {
      this.spotifyApi.removeFromMySavedAlbums([albumId]);
    } catch (error) {
      console.error('Error removing album from library:', error);
      throw error;
    }
  }

  async getCurrentlyPlaying(): Promise<ITrack | null> {
    try {
      const response = await this.spotifyApi.getMyCurrentPlayingTrack();
      if (response && response.item) {
        return SpotifyTrackToTrack(response.item);
      }
      return null;
    } catch (error) {
      console.error('Error getting currently playing track:', error);
      return null;
    }
  }
  


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isUserAuthenticated');
    this.router.navigate(['/']);
  }

}
