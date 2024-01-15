import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-playlistgenerator',
  templateUrl: './playlistgenerator.component.html',
  styleUrls: ['./playlistgenerator.component.css']
})
export class PlaylistgeneratorComponent {
  playlistName: string = '';
  showSuccessButton: boolean = false;
  playlistId: string | null = null;
  timeoutId: any = null;

  genres: string[] = ['Rock', 'Pop', 'Blues', 'Electronic', 'Jazz']; 

  selectedGenre: string = '';
  showModal: boolean = false;

  selectGenre(genre: string) {
    this.selectedGenre = genre;
    console.log('Selected genre:', genre);
  }

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  createRecommendedPlaylist() {

    const userId = this.spotifyService.user.id;
    if (!userId) {
      console.error('User ID is not available');
      return;
    }


    const seedData = {
      seed_artists: [''],
      seed_genres: [this.selectedGenre.toLocaleLowerCase()],
      seed_tracks: [''],
    };

    this.spotifyService.createRecommendedPlaylist(userId, seedData).then(playlist => {
      console.log("DATAAA: ", seedData)
      if (playlist) {
        console.log('Playlist created successfully:', playlist);
        this.showSuccessButton = true;
      this.playlistId = playlist.id;
      this.setTimeoutForButton();
      } else {
        console.error('Failed to create playlist');
      }
    }).catch(error => console.error('Error in creating playlist:', error));
  }


  setTimeoutForButton() {
    this.timeoutId = setTimeout(() => {
      this.showSuccessButton = false;
    }, 5000);
  }

  openPlaylist() {
    if (this.playlistId) {
      this.router.navigate(['/library']);
    }
  }
  
  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

}

