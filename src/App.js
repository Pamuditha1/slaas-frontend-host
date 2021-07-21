import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.css'
import "rsuite/lib/styles/index.less";

import Main from './components/Main'

class App extends Component{

  render() {

    return (
      <>
        <Main /> 
      </>
    );
  }
}

export default App;
