import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Landing } from 'pages';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing}/>
        <Route path="/home" component={Home}/>
      </div>
    );
  }
}

export default App;