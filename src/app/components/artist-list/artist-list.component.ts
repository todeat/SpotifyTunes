import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent {

  artists: IArtist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    const artists = await this.spotifyService.getTopArtists(20);
    if(artists) {
      this.artists = artists;
    }
  }



}
