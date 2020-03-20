import React, { Component } from 'react';
import Form from './Form.js';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div>
                <Form />
            </div>
        )
    }
}