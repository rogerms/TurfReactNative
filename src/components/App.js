import React, { Component } from 'react';
import firebase from 'firebase';
import Login from './Login';
import RootNavigation from './Navigation'
import Loader from './Loader';
import { GoogleSignin } from 'react-native-google-signin';

export default class App extends Component {

    state = {loggedIn: null};

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

        //Google initializer
        GoogleSignin.configure({
            iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
          })
          .then(() => {
            // you can now call currentUserAsync()
          });
    }

    renderInitialView(){
        if(this.state.loggedIn === true){
            return <RootNavigation />;
        }
        if(this.state.loggedIn === false){
            return <Login />;
        }
        return <Loader size='large'/>
    }

    render() {
        return (
            this.renderInitialView()
        );
    }
}

