import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'API KEY'
});

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: 0,
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const facePosition = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    return {
      leftCol: facePosition.left_col * imageWidth,
      topRow: facePosition.top_row * imageHeight,
      rightCol: imageWidth - (facePosition.right_col * imageWidth),
      bottomRow: imageHeight - (facePosition.bottom_row * imageHeight)
    }
  }

  displayFaceBox = (boxData) => {
    this.setState({box: boxData});
  }

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
              .then(response => { 
                if (response) {
                  fetch("http://localhost:3000/image", {
                     method: 'put',
                     headers: {'Content-Type': 'application/json'},
                     body: JSON.stringify({
                       id: this.state.user.id,
                    })
                  })
                  .then(response => response.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
                  });
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
              })
              .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false});
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === "home"
          ? <div> 
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === "signin"
              ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
    );
  }
}

export default App;
