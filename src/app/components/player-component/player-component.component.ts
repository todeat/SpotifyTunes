import { Component } from '@angular/core';
import { ITrack } from 'src/app/interfaces/ITrack';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponentComponent {
  currentTrack: ITrack | null = null;

  constructor(private spotifyService: SpotifyService) {}

  async ngOnInit() {
    this.currentTrack = await this.spotifyService.getCurrentlyPlaying();
  }

  
}
