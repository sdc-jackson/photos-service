import React from 'react';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryPhoto: '',
      photoTopLeft: '',
      photoTopRight: '',
      photoBottomLeft: '',
      photoBottomRight: ''
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    fetch('getPhotosByRoomId?roomid=100')
      .then((response) => response.json())
      .then((photos) => {
        let primaryPhoto = photos.find(photo => photo.is_primary);
        let secondaryPhotos = photos.filter((photo) => photo.is_primary === false);
        this.setState({
          primaryPhoto: primaryPhoto.storage_url,
          photoTopLeft: secondaryPhotos[0].storage_url,
          photoTopRight: secondaryPhotos[1].storage_url,
          photoBottomLeft: secondaryPhotos[2].storage_url,
          photoBottomRight: secondaryPhotos[3].storage_url
        });
      });
  }

  render() {
    return (
      <div className = 'photo-grid'>
        <div className = 'flex-container-row'>
          <img className='responsive-img primary-img' src = {this.state.primaryPhoto} alt = 'https://picsum.photos/700'/>
          <div className = 'flex-container-column'>
            <img className='responsive-img secondary-img' src = 'https://picsum.photos/500'/>
            <img className='responsive-img secondary-img' src = 'https://picsum.photos/500'/>
          </div>
          <div className = 'flex-container-column'>
            <img className='responsive-img secondary-img secondary-img-top' src = 'https://picsum.photos/500'/>
            <div className = 'photo-btn-container'>
              <img className = 'responsive-img secondary-img secondary-img-bottom' src = 'https://picsum.photos/500'/>
              <button className = 'photo-btn'>Show All Photos</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}