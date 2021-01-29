import React from 'react';

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'photo-grid'>
        <div className = 'flex-container-row'>
          <img className='responsive-img primary-img' src = 'https://picsum.photos/500'/>
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