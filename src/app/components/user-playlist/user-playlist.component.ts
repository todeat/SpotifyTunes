import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { ITrack } from 'src/app/interfaces/ITrack';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent {
  playlists: IPlaylist[] = [];
  currentPlaylistTracks: ITrack[] = [];
  showModal: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  async ngOnInit() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }
  
  async onClickPlaylist(playlistId: string) {
    const result = await this.spotifyService.getPlaylistTracks(playlistId);
  
    if ('tracks' in result) {
      this.currentPlaylistTracks = result.tracks;
    } else {
      console.error('Rezultatul nu este de tipul IPlaylist');
      this.currentPlaylistTracks = [];
    }
  
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

}
