const React = require('react');
const audio = document.createElement('audio');

const fakeAlbum = {
  name: 'Abbey Road',
  imageUrl: 'http://fillmurray.com/300/300',
  songs: [{
    id: 1,
    name: 'Romeo & Juliette',
    artists: [{name: 'Bill'}],
    genre: 'Funk',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 2,
    name: 'White Rabbit',
    artists: [{name: 'Bill'}, {name: 'Bob'}],
    genre: 'Fantasy',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 3,
    name: 'Lucy in the Sky with Diamonds',
    artists: [{name: 'Bob'}],
    genre: 'Space',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }]
};

class Album extends React.Component {
  constructor () {
    super(); // refers to the React.Component -- we have to create an instance of the component before we can construct extra stuff on its extension (Album)
    this.state = {
      album: fakeAlbum,
      activeSong: {}
    };
    this.start = this.start.bind();
  }

  start (song) {
    audio.src = `/api/songs/${song.id}/song.id`;
    audio.load();
    audio.play();
    this.setState({activeSong: song});
  }

  componentDidMount () {
    const toJson = response => response.json();
    const log = console.log.bind(console);
    const logError = console.error.bind(console);

    fetch('api/albums/4')
    .then(toJson)
    .then(albumFromServer => {
      albumFromServer.imageUrl = `/api/albums/${albumFromServer.id}/image`;
      this.setState({album: albumFromServer});
      })
    .catch(logError);
    }

  render () {
    return (
      <div>
        <div className="album col-xs-10">
          <div>
            <h3>{this.state.album.name}</h3>
            <img src={this.state.album.imageUrl} className="img-thumbnail" />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Artists</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {this.state.album.songs.map(function (song, idx) {
                return(
                  <tr key = {idx}>
                    <td>
                      <button onClick={this.start} className="btn btn-default btn-xs">
                        <span className="glyphicon glyphicon-play"></span>
                      </button>
                    </td>
                    <td>{song.name}
                    </td>
                    <td>{song.artists.map(function(obj) {
                      return obj.name}).join(', ')}
                    </td>
                    <td>{song.genre}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

module.exports = Album;