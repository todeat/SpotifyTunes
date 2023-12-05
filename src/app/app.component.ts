import { Component } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  // isUserAuthenticated: boolean;

  constructor(private spotifyService: SpotifyService) {
    // this.isUserAuthenticated = this.spotifyService.getAccessToken() ? true : false ;

    // localStorage.setItem('isUserAuthenticated', this.isUserAuthenticated.toString());
  }
  title = 'spotifyTunes';

  ngOnInit() {
    // const storedAuthState = localStorage.getItem('isUserAuthenticated');
    // this.isUserAuthenticated = storedAuthState === 'true';
  }

  isLogged() {
    if (this.spotifyService.isLogged()) {
      return true;
    } else {
      return false;
    }
  }

}
