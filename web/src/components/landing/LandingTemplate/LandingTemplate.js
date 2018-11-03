import React, { Component } from 'react';
import './LandingTemplate.scss';

import LogoSection from '../LogoSection';
import ValueSection from '../ValueSection';

class LandingTemplate extends Component {
  render() {
    return (
      <div className="landing">
        <LogoSection/>
        <ValueSection/>
      </div>
    )
  }
}

export default LandingTemplate;