import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
 render() {
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOption}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
    );
  }
}


export default App;
