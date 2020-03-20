import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: '',
            name: '',
            email: '',
            message: '',
            nameError: false,
            emailError: false,
            messageError: false
        };
        this.checkState = this.checkState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    checkState() {
        console.log(this.state);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <p onClick={this.checkState}>Let's check state!</p>
                <form noValidate autoComplete='off'>
                    <div>
                        <div className="input-section">
                            <TextField
                                error={ this.state.nameError ? true : false }
                                helperText={ this.state.nameError ? 'Please enter a name' : null }
                                id='outlined-multiline-flexible'
                                label={ !this.state.nameError ? 'Name' : 'Error' }
                                mr={10}
                                multiline
                                name='name'
                                onChange={this.handleChange}
                                variant='outlined'
                            />
                        </div>
                        <div className="input-section">
                            <TextField
                                error={ this.state.emailError ? true : false }
                                helperText={ this.state.emailError ? 'Please enter a valid e-mail' : null }
                                id='outlined-multiline-flexible'
                                label={ !this.state.emailError ? 'E-mail' : 'Error' }
                                multiline
                                name='email'
                                onChange={this.handleChange}
                                variant='outlined'
                            />
                        </div>
                        <div className="input-section">
                            <TextField
                                error={ this.state.messageError ? true : false }
                                helperText={ this.state.messageError ? 'Please enter a message' : null }
                                id='outlined-multiline-flexible'
                                label={ !this.state.MessageError ? 'Message' : 'Error' }
                                multiline
                                name='message'
                                onChange={this.handleChange}
                                variant='outlined'
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}