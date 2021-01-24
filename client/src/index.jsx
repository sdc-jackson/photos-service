import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>INDEX</div>
    );
  }

  componentDidMount() {
    $.get('/getPhotosByRoomID?roomid=100', results => {
    });

  }
}

ReactDOM.render(<App />, document.getElementById('main'));