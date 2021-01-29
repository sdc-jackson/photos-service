import React from 'react';
import $ from 'jquery';
import PhotoGrid from './PhotoGrid.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PhotoGrid />
    );
  }
}