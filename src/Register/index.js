import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import Cookie from 'js-cookie';

class Register extends Component {
	constructor(){
	    super();
	    this.state = {
	        username: '',
	        email: '',
	        password: ''
	    }
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const cookie = Cookie('csrftoken');

		const userCreate = await fetch('http://localhost:8000/users/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': cookie
			}
		})
		
		const userCreateParsed = await userCreate.json();

		if (userCreateParsed.data === 'Registration Successful') {

			this.props.history.push('/movies');

		} else {
			console.error(`Could not register`);
		}

	}

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
            	<Label>Username:</Label>
            	<Form.Input type='text' name='username' onChange={this.handleChange}/>
            	<Label>Email:</Label>
            	<Form.Input type='email' name='email' onChange={this.handleChange}/>
            	<Label>Password:</Label>
            	<Form.Input type='password' name='password' onChange={this.handleChange}/>
            	<Button type='submit'>Submit</Button>
            </Form>
        )
    }
}
export default Register;
