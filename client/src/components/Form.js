import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuliTextField-root': {
//             margin: theme.spacing(1),
//             width: 200,
//         },
//     },
// }));

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: '',
            name: '',
            email: '',
            message: ''
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
                        <TextField
                            id='outlined-multiline-flexible'
                            label='Name'
                            multiline
                            name='name'
                            onChange={this.handleChange}
                            variant='outlined'
                        />
                        <TextField
                            id='outlined-multiline-flexible'
                            label='E-mail'
                            multiline
                            name='email'
                            onChange={this.handleChange}
                            variant='outlined'
                        />
                        <TextField
                            id='outlined-multiline-flexible'
                            label='Message'
                            multiline
                            name='message'
                            onChange={this.handleChange}
                            variant='outlined'
                        />
                    </div>
                </form>
            </div>
        )
    }
}