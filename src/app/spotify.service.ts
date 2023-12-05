import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifySinglePlaylistToPlaylist, SpotifyTrackToTrack, SpotifyUserToUser } from './shared/SpotifyHelper';
import { IPlaylist } from './interfaces/IPlaylist';
import { IArtist } from './interfaces/IArtist';
import { ITrack } from './interfaces/ITrack';
import { BehaviorSubject } from 'rxjs';

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
    const authEndpoint = `${SpotifyConfig.authEndPoint}?client_id=${SpotifyConfig.clientId}&redirect_uri=${SpotifyConfig.redirectUrl}&scope=${SpotifyConfig.scopes.join("%20")}&response_type=token&show_dialog=true`;
    return authEndpoint;
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

  async getTracks(offset = 0, limit = 50): Promise<ITrack[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({offset, limit});
    return tracks.items.map(x => SpotifyTrackToTrack(x.track));
  }

  async playTrack(track: ITrack) {
    await this.spotifyApi.play({
      uris: [track.uri]
    });
  }

  // async test(): Promise<any[]> {
  //   const test = await this.spotifyApi.getRecommendations();
  //   console.log(test);
  //   return test.tracks.map(x => SpotifyTrackToTrack(x));
  // }

  // async getPlayingTrack(): Promise<ITrack> {
  //   const track = await this.spotifyApi.getMyCurrentPlayingTrack();
  //   return SpotifyTrackToTrack(track.item);
  // }

  async back() {
    await this.spotifyApi.skipToPrevious();
  }

  async next() {
    await this.spotifyApi.skipToNext();
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isUserAuthenticated');
    this.router.navigate(['/']);
  }

}
