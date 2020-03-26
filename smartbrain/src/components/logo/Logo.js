import React, { Component } from 'react';
import brain from './brain.png';
import './Logo.css';

class Logo extends Component {
    state = {
        posts: [ ]
    }
    render() {
        return (
            <img src={brain} alt = "The Logo"/>
        )
    }
}

export default Logo;