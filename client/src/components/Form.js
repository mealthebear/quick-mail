import React, { Component } from 'react';
import { Box, Button, CircularProgress, Icon, TextField } from '@material-ui/core';
import Axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: '',
            email: '',
            emailError: false,
            loading: false,
            message: '',
            messageError: false,
            name: '',
            nameError: false,
            pending: '',
            success: false,
            unsuccessful: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputValidation = this.inputValidation.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
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
        let email = this.state.email;
        let message = this.state.message;
        let name = this.state.name;
        this.setState({ loading: true })
        Axios.post('/test')
            .then((response) => {
                console.log(response);
                this.setState({
                    loading: false,
                    pending: response.data.message, 
                    success: true
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false, 
                    unsuccessful: true 
                })
            });
    }

    render() {
        return (
            <div>
                <form noValidate autoComplete='off'>
                    <div>
                        <div className="input-section">
                            <TextField
                                error={ this.state.nameError ? true : false }
                                helperText={ this.state.nameError ? 'Please enter a name' : null }
                                id='outlined-multiline-flexible'
                                label={ !this.state.nameError ? 'Name' : 'Error' }
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
                        {this.state.loading ? <CircularProgress color='secondary' /> : null}
                        {this.state.success ? <div onClick={() => this.setState({ success: false })}><span className="send-message">Message sent successfully!</span> <CheckCircleIcon className="send-icon" style={{ fontSize: 40 }} /> </div> : null}
                        {this.state.unsuccessful ? <div onClick={() => this.setState({ unsuccessful: false })}><span className="send-message">Uh oh! Couldn't send message.</span> <ErrorIcon className="send-icon" style={{ fontSize: 40 }} /> </div> : null}
                    </div>
                </form>
                {this.state.pending ? <Box className="confirmation" component='div'>{this.state.pending}</Box> : null}
            </div>
        )
    }
}