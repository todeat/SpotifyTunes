import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {


  artists: IArtist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getTopArtists();
  }


}
