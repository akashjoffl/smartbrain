import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Signin from './components/Signin/Signin';
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
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const claifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: claifaiFace.left_col * width,
      topRow: claifaiFace.top_row * height,
      rightCol: width - (claifaiFace.right_col * width),
      bottomRow: height - (claifaiFace.bottom_row * height)
      // the maths is fucked here to figure out
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
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
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOption}
      />
      <Navigation onRouteChange={this.onRouteChange}/>
      { this.state.route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSumbit={this.onButtonSumbit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          }
      </div>
    );
  }
}


export default App;
