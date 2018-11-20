import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import './style.css';
import Cookie from 'js-cookie';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }


  handleSubmit = async (e) => {
    e.preventDefault();

    const cookie = Cookie('csrftoken');

    try {

      const loginResponse = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      });

      const parsedResponse = await loginResponse.json();

      if(parsedResponse.data === 'Login Successful'){
        // this automatically get passed to your component as a prop
        console.log(`Login Successful`);
        this.props.history.push('/movies');
      } else {
        console.log(`Login NOT Successful`);
      }

    } catch(err){
      console.error(`Error: `, err);
    }
  }


  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <Label> Username</Label>
        <Form.Input type='text' name="username" onChange={this.handleChange} />
        <Label> Password</Label>
        <Form.Input type='password' name="password" onChange={this.handleChange} />
        <Button type="Submit" color="green">Login</Button>
      </Form>
      )
  }
}

export default Login;
