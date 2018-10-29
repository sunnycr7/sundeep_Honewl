import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/honeywell-Logo.png';
import PromoImage from './images/promo2.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="header">
          <a href="https://honeywell.com">
            <img src={Banner} alt="Honeywell" />
          </a>
          <div className="hon-cloud-name">Honeywell Cloud Automation</div>
          {/* <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/features">
            Features
          </Link>
        </div> */}
        </div>
        <div className="honeywell-cloud-promo-container">
          <img style={{width: '100%'}} className="promo-background-image" src={PromoImage} alt="Honeywell Cloud Automation" />

        <div style={{textAlign: 'center', position: 'absolute', top: '30%', left: '35%'}} className="promo-heading"><h1 style= {{color: 'white', fontSize: '44px'}}>Design for the Future!</h1></div>
        </div>
        {/* <div style={{textAlign: 'center'}} className="promo-heading"><h1 style= {{color: 'white'}}>Design for the Future!</h1></div> */}
      </div>
    );
  }
}

export default Header;
