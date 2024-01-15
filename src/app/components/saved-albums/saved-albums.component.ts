import { Component, OnInit } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-saved-albums',
  templateUrl: './saved-albums.component.html',
  styleUrls: ['./saved-albums.component.css']
})
export class SavedAlbumsComponent implements OnInit {
  savedAlbums: IAlbum[] = [];

  constructor(private spotifyService: SpotifyService) { }

  async ngOnInit() {
    this.savedAlbums = await this.spotifyService.getSavedAlbums();
  }

  async removeAlbumFromLibrary(albumId: string) {
    try {
      await this.spotifyService.removeFromLibrary(albumId);
      this.savedAlbums = this.savedAlbums.filter(album => album.id !== albumId);
    } catch (error) {
      console.error('Error removing album from library:', error);
    }
  }
  
}