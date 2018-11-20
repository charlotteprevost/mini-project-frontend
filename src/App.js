import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import MovieContainer from './MovieContainer';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Cookie from 'js-cookie';

const My404 = () => {
  return (
    <div>
      You're lost, will you even be found?
    </div>
    )
}



class App extends Component {

  handleLogout = async (e) => {
    e.preventDefault();

    try {
      const cookie = Cookie('csrftoken');  
      const logoutRequest = await fetch('http://localhost:8000/users/logout/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      })

      const logoutRequestParsed = await logoutRequest.json();

      if (logoutRequestParsed.data === 'Logout Successful') {
        this.props.history.push('/')                               // Redirect to Login
      
      } else {
        console.error(`logoutRequestParsed.error: `, logoutRequestParsed.error);
      }

    } catch(err){
      console.error(`Error catch in handleLogout: `, err);
    }
  }


  getToken = async () => {
    const token = await fetch('http://localhost:8000/users/getToken', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const tokenParsed = token.json();
    return tokenParsed;
  }


  componentDidMount(){
    this.getToken();
  }


  render() {
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/movies" component={MovieContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
