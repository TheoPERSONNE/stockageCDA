import React, { Component } from 'react';
import Connexion from './Connexion';


export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Connexion />
      </div>
    );
  }
}
