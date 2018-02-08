import React, { Component } from 'react';
import firebase from 'firebase';
import Login from './Login';
import Navigation from './Navigation'


export default class App extends Component {
    state = {loggedIn: false};

    componentWillMount(){

        const config = {
            apiKey: "AIzaSyB3w5UGpeYEzgvCCRw7neYb7P831C_1QDI",
            authDomain: "turf-sports.firebaseapp.com",
            databaseURL: "https://turf-sports.firebaseio.com",
            projectId: "turf-sports",
            storageBucket: "turf-sports.appspot.com",
            messagingSenderId: "610689124815"
        };

        firebase.initializeApp(config);
    
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
            this.setState({loggedIn: true});
          }
          else{
            this.setState({loggedIn: false});
          }
        });
      }

    renderInitialView(){
        if(this.state.loggedIn === true){
            return <Navigation />;
        }
        return <Login />;
    }

    render() {
        return (
            this.renderInitialView()
        );
    }
}

