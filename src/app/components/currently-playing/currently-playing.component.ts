import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITrack } from 'src/app/interfaces/ITrack';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.css']
})
export class CurrentlyPlayingComponent implements OnInit, OnDestroy {
  currentTrack: ITrack | null = null;
  isPlaying: boolean = false;
  private updateInterval: any;

  constructor(private spotifyService: SpotifyService) { }

  async ngOnInit() {
    await this.updateCurrentTrack();
    // this.updateInterval = setInterval(() => this.updateCurrentTrack(), 30000); // Actualizează la fiecare 30 secunde
  }

  async updateCurrentTrack() {
    this.currentTrack = await this.spotifyService.getCurrentlyPlaying();
    console.log("Artists:", this.currentTrack?.artists);
  }

  async next() {
    this.spotifyService.next();
    setTimeout(() => this.updateCurrentTrack(), 500);
  }

  async back() {
    this.spotifyService.back();
    setTimeout(() => this.updateCurrentTrack(), 500);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
