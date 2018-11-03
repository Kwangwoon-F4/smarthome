import React, { Component } from 'react';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';

class LandingTemplate extends Component {
  render() {
    return (
      <div className="landing">
        <LogoSection/>
      </div>
    )
  }
}

export default LandingTemplate;