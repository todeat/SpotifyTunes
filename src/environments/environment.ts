export const environment = {
    production: false,
  }
  
  export const SpotifyConfig = {
    clientId: '4c8d6f3b88e24c3b863369b49304afd3',
    redirectUrl: 'http://localhost:4200',
    authEndPoint: 'https://accounts.spotify.com/authorize',
    scopes: [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-recently-played",
      "user-top-read",
      "user-read-playback-position",
      "user-library-read",
      "user-library-modify",
      "playlist-read-private",
      "playlist-read-collaborative",
      'playlist-modify-public',
      'playlist-modify-private',
    ]
  }