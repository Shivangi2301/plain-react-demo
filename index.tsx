import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Posts from './Components/Posts';

class App extends Component<{},{} > {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>        
        <Posts />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
