import React from 'react';
import Photo from './Photo.jsx';
import styled from 'styled-components';

const PhotosModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 1;
  background-color: white;
`;

const PhotosCarouselHeader = styled.div`
  margin: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PhotosCarouselBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
`;

const CarouselButton = styled.button`
  border-radius: 50%;
  border-style: solid;
  border-width: 0.5px;
  padding: 10px;
`;

const CloseButton = styled.button`
  padding: 4px 8px;
  font-size: 8px;
  font-weight: 400;
  border-radius: 4px;
  border-style: none;
  border-width: 0;
  background-color: rgb(224, 225, 226);
`;

const CloseIcon = styled.i`
  opacity: .64;
  width: 10px;
  height: 9px;
  background-position: -297px -5px;
  background-image: url('https://fec-icons.s3-us-west-1.amazonaws.com/icons.png');
  display: inline-block;
  vertical-align: top;
  background-size: 400px 900px;
  background-repeat: no-repeat;
`;

const PhotoCounter = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
`;

export default class PhotosModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      photoCount: 0,
      photoArray: [],
      currentPhoto: '',
      currentPhotoIndex: 0,
      nextVisibility: 'inline',
      previousVisibility: 'none'
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      roomId: props.roomId
    };
  }

  componentDidUpdate() {
    if (this.state.photoCount === 0) {
      this.fetchPhotos();
    }
  }

  fetchPhotos() {
    fetch(`/rooms/${this.state.roomId}/getPhotosByRoomId`)
      .then((response) => response.json())
      .then((data) => {
        let photos = data[0].photos;
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
    this.setState({
      currentPhoto: this.state.photoArray[0],
      currentPhotoIndex: 0,
      nextVisibility: 'inline',
      previousVisibility: 'none'
    });
  }

  handleNextButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex + 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex + 1],
      previousVisibility: 'inline',
      nextVisibility: this.state.currentPhotoIndex + 1 === this.state.photoCount - 1 ? 'none' : 'inline'
    });
  }

  handlePreviousButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex - 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex - 1],
      nextVisibility: 'inline',
      previousVisibility: this.state.currentPhotoIndex - 1 === 0 ? 'none' : 'inline'
    });
  }

  render() {
    return (
      <PhotosModalStyles>
        <PhotosCarouselHeader>
          <div>
            <CloseButton onClick={this.handleCloseButtonClick.bind(this)}><CloseIcon></CloseIcon> Close</CloseButton>
          </div>
          <PhotoCounter>
            { this.state.currentPhotoIndex + 1 }&nbsp;/&nbsp;{this.state.photoCount}
          </PhotoCounter>
          <div>
          </div>
        </PhotosCarouselHeader>
        <PhotosCarouselBody>
          <div>
            <CarouselButton style = {{display: this.state.previousVisibility}} onClick={this.handlePreviousButtonClick.bind(this)}></CarouselButton>
          </div>
          <Photo imageURL = {this.state.currentPhoto.storage_url} />
          <div>
            <CarouselButton style = {{display: this.state.nextVisibility}} onClick={this.handleNextButtonClick.bind(this)}></CarouselButton>
          </div>
        </PhotosCarouselBody>
      </PhotosModalStyles>
    );
  }
}