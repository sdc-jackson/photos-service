import React from 'react';
import $ from 'jquery';
import PhotoGrid from './PhotoGrid.jsx';
import PhotosModal from './PhotosModal.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      modalDisplay: 'none'
    };
  }

  componentDidMount() {
    // let url = window.location.href;
    // let urlParts = url.split('/');
    let roomId = this.props.roomId
    this.setState({
      roomId: roomId
    });
  }

  showModal() {
    this.setState({
      modalDisplay: 'block'
    });
  }

  hideModal() {
    this.setState({
      modalDisplay: 'none'
    });
  }

  render() {
    return (
      <div>
        <PhotoGrid roomId={this.state.roomId} showModal = {this.showModal.bind(this)}/>
        <div style={{display: this.state.modalDisplay}}>
          <PhotosModal roomId={this.state.roomId} hideModal = {this.hideModal.bind(this)}/>
        </div>
      </div>
    );
  }
}