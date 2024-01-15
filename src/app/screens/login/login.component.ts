import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verify();
  }

  verify() {
    const token = this.spotifyService.getAccessToken();
    if(!!token) {
      this.spotifyService.defineToken(token);
      this.router.navigate(['/library']);
    }
    
  }

  login() {
    window.location.href = this.spotifyService.getLoginUrl();
  }


}
