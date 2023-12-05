import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

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

}
