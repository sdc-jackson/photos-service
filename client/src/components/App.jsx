import React from 'react';
import $ from 'jquery';
import PhotoGrid from './PhotoGrid.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: ''
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let urlParts = url.split('/');
    this.setState({
      roomId: urlParts[4]
    });
  }

  render() {
    return (
      <PhotoGrid roomId={this.state.roomId} />
    );
  }
}