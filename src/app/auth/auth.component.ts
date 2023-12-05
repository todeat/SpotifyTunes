import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    // this.getNewAccessToken();
  }

  // getNewAccessToken() {
  //   this.spotifyService.getAccessToken() .subscribe(
  //     (response) => {
  //       const accessToken = response.access_token;
  //       this.spotifyService.setAccessToken(accessToken);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
