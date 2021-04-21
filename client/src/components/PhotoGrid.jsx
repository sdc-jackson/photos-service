import React from 'react';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      primaryPhoto: null,
      photoTopLeft: null,
      photoTopRight: null,
      photoBottomLeft: null,
      photoBottomRight: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      roomId: props.roomId
    };
  }

  componentDidUpdate() {
    if (this.state.primaryPhoto === null) {
      this.fetchPhotos();
    }
  }

  fetchPhotos() {
    fetch(`/rooms/${this.state.roomId}/getPhotosByRoomId`)
      .then((response) => response.json())
      .then((data) => {
        let photos = data[0].photos;
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

  handleShowAllPhotosButtonClick(e) {
    e.preventDefault();
    this.props.showModal();
  }

  render() {
    return (
      <div className = 'photo-grid'>
        <div className = 'flex-container-row'>
          <img className='responsive-img primary-img' src = {this.state.primaryPhoto} />
          <div className = 'flex-container-column'>
            <img className='responsive-img secondary-img' src = {this.state.photoTopLeft} />
            <img className='responsive-img secondary-img' src = {this.state.photoBottomLeft} />
          </div>
          <div className = 'flex-container-column'>
            <img className='responsive-img secondary-img secondary-img-top' src = {this.state.photoTopRight} />
            <div className = 'photo-btn-container'>
              <img className = 'responsive-img secondary-img secondary-img-bottom' src = {this.state.photoBottomRight} />
              <button className = 'photo-btn' onClick={this.handleShowAllPhotosButtonClick.bind(this)}>Show All Photos</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}