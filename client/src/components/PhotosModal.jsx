import React from 'react';
import Photo from './Photo.jsx';

export default class PhotosModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      photoCount: 0,
      photoArray: [],
      currentPhoto: '',
      currentPhotoIndex: 0,
      nextVisibility: 'show',
      previousVisibility: 'hidden'
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      roomId: props.roomId
    };
  }

  componentDidUpdate() {
    if (this.state.photoCount == 0) {
      this.fetchPhotos();
    }
  }

  fetchPhotos() {
    fetch(`/rooms/${this.state.roomId}/getPhotosByRoomId`)
    .then((response) => response.json())
    .then((photos) => {
      this.setState({
        photoArray: photos,
        photoCount: photos.length,
        currentPhoto: photos[0]
      });
    });
  }

  handleCloseButtonClick(e) {
    e.preventDefault();
    this.props.hideModal();
  }

  handleNextButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex + 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex + 1],
      previousVisibility: 'show',
      nextVisibility: this.state.currentPhotoIndex + 1 === this.state.photoCount -1 ? 'hidden' : 'show'
    });
  }

  handlePreviousButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex - 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex - 1],
      previousVisibility:  this.state.currentPhotoIndex - 1 === 0 ? 'hidden' : 'show'
    });
  }

  render() {
    return (
      <div className='photos-modal'>
        <button onClick={this.handleCloseButtonClick.bind(this)}>Close</button>
        <button style = {{visibility: this.state.previousVisibility}} onClick={this.handlePreviousButtonClick.bind(this)}>Previous</button>
        <button style = {{visibility: this.state.nextVisibility}} onClick={this.handleNextButtonClick.bind(this)}>Next</button>
        <div>{ this.state.currentPhotoIndex + 1 }/{this.state.photoCount}</div>
        <Photo imageURL = {this.state.currentPhoto.storage_url} />
      </div>
    );
  }
}