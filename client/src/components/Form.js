import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: '',
            email: '',
            emailError: false,
            message: '',
            messageError: false,
            name: '',
            nameError: false,
            success: false,
            unsuccessful: false
        };
        this.checkState = this.checkState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputValidation = this.inputValidation.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    checkState() {
        console.log(this.state);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit() {
        if (this.inputValidation()) {
            this.setState({ 
                emailError: false, 
                messageError: false, 
                nameError: false 
            });
            this.sendEmail();
        }
    }

    inputValidation() {
        let isValid = true;
        if (!this.state.name) {
            this.setState({ nameError: true })
            isValid = false;
        }
        if (!this.state.email || this.state.email.indexOf('@') <= -1 ) {
            this.setState({ emailError: true })
            isValid = false;
        }
        if (!this.state.message) {
            this.setState({ messageError: true })
            isValid = false;
        }
        return isValid;
    }

    sendEmail() {
        let info = {
            email: this.state.email,
            message: this.state.message,
            name: this.state.name
        }
        Axios.post('/test', info)
            .then((response) => {
                console.log(response);
                this.setState({ success: true })
            })
            .catch((error) => {
                console.log(error);
                this.setState({ unsuccessful: true })
            });
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
                    <div>
                        <Button
                        variant='contained'
                        color='primary'
                        endIcon={ <Icon>send</Icon> }
                        onClick={this.handleSubmit}>
                        Send
                        </Button>
                        {this.state.success ? <div onClick={() => this.setState({ success: false })}><span className="send-message">Message sent successfully!</span> <CheckCircleIcon className="send-icon" style={{ fontSize: 40 }} /> </div> : null}
                        {this.state.unsuccessful ? <div onClick={() => this.setState({ unsuccessful: false })}><span className="send-message">Uh oh! Couldn't send message.</span> <ErrorIcon className="send-icon" style={{ fontSize: 40 }} /> </div> : null}
                    </div>
                </form>
            </div>
        )
    }
}