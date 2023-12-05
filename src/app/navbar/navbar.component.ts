import { Component } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.spotifyService.startUser().then((authenticated) => {
      if (authenticated) {
        this.user = this.spotifyService.user;
      } else {
      }
    });
  }

  logout() {
    this.spotifyService.logout();
  }
}
