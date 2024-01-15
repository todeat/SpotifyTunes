import { Component } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-new-release',
  templateUrl: './new-release.component.html',
  styleUrls: ['./new-release.component.css']
})
export class NewReleaseComponent {

  albums: IAlbum[] = [];

  constructor(private spotifyService: SpotifyService) {  }

  async ngOnInit() {
    await this.spotifyService.startUser();
    this.albums = await this.spotifyService.getNewReleases();
  }

  async addToLibrary(album: IAlbum) {
    try {
      await this.spotifyService.addToLibrary(album.id);
      alert('Album added to your library!');
    } catch (error) {
      console.error('Error adding album to library:', error);
      alert('Failed to add album to your library.');
    }
  }

}
