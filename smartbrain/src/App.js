import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7245a1d56bbb40f88236b18c451371f4'
});

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
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  onButtonSumbit = () => {
    this.setState({imageUrl: this.state.input});
    console.log("click");
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {
        // there was an error
      }
    );
  }

  render() {
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOption}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSumbit={this.onButtonSumbit}
        />
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
    );
  }
}


export default App;
