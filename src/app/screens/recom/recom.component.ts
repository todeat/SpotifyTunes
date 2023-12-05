import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';

@Component({
  selector: 'app-recom',
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {


  rec: any[] = [];

  constructor(
    private spotifyService: SpotifyService,
  ) {}

  ngOnInit(): void {
    this.getRec();
  }

  async getRec() {
    // const rec = await this.spotifyService.test();
    // if(rec) {
    //   console.log(rec);
    //   this.rec = rec;
    // }
  }

}
