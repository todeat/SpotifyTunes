import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITrack } from 'src/app/interfaces/ITrack';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent {

  songs: any[] = [];
  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

    ngOnInit(): void {
      this.getTopSongs();
    }

    async getTopSongs() {
      const songs = await this.spotifyService.getTracks();
      if(songs) {
        this.songs = songs;
      }
    }

}
