import { Component, OnInit } from '@angular/core';
import { ITrack } from 'src/app/interfaces/ITrack'; // Presupunând că ai o interfață ITrack
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {
  topTracks: ITrack[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopTracks();
  }

  async getTopTracks() {
    const tracks = await this.spotifyService.getTopTracks(); 
    if (tracks) {
      this.topTracks = tracks;
    }
  }
}