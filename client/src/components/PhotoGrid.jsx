import React from 'react';
import styled from 'styled-components';

const PhotoGridStyle = styled.div`
  display: flex;
`;

const PhotoGridRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: auto;
`;

const PhotoGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PrimaryImage = styled.img`
  width: 100%;
  height: auto;
  margin: 1px;
  border-radius: 6px 0 0 6px;
  min-width: 150px;
  max-width: 300px;
`;

const SecondaryImage = styled.img`
  width: 100%;
  height: auto;
  margin: 1px;
  min-width: 75px;
  max-width: 150px;
`;

const SecondaryTopImage = styled(SecondaryImage)`
  border-radius: 0 6px 0 0;
`;

const SecondaryBottomImage = styled(SecondaryImage)`
  border-radius: 0 0 6px 0;
`;

const ButtonContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 75%;
  left: 45%;
  padding: 5px;
  border-radius: 3px;
  border-style: solid;
  border-width: 0.5px;
  font-size: 7px;
  width: 100%;
  height: auto;
  max-width: 70px;
  cursor: pointer;
`;

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
      <PhotoGridStyle>
        <PhotoGridRow>
          <PrimaryImage src = {this.state.primaryPhoto} alt = 'Photo Unavailable'/>
          <PhotoGridColumn>
            <SecondaryImage src = {this.state.photoTopLeft} alt = 'Photo Unavailable'/>
            <SecondaryImage src = {this.state.photoBottomLeft} alt = 'Photo Unavailable'/>
          </PhotoGridColumn>
          <PhotoGridColumn>
            <SecondaryTopImage src = {this.state.photoTopRight} alt = 'Photo Unavailable'/>
            <ButtonContainer>
              <SecondaryBottomImage src = {this.state.photoBottomRight} alt = 'Photo Unavailable'/>
              <Button onClick={this.handleShowAllPhotosButtonClick.bind(this)}>Show All Photos</Button>
            </ButtonContainer>
          </PhotoGridColumn>
        </PhotoGridRow>
      </PhotoGridStyle>
    );
  }
}