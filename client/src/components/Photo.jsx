import React from 'react';
import styled from 'styled-components';

const PhotoCarouselImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  margin-bottom: 50px;
`;

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PhotoCarouselImage src = {this.props.imageURL}></PhotoCarouselImage>
      </div>
    );
  }
}