import React, { Component } from 'react';
import { View, ToolbarAndroid, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {GoogleSignin } from 'react-native-google-signin';

export default class Toolbar extends Component {
    constructor(props){
        super(props);

        this.completeAction = this.completeAction.bind(this);
    }

    componentDidMount()
    {
        GoogleSignin.configure({
            iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
          })
          .then(() => {
            // you can now call currentUserAsync()
          });
    }

    completeAction(position){
        if(position == 0) {
            //sign out from google and then from firebase
            GoogleSignin.signOut()
            .then(() => {
                console.log('logged out');
                firebase.auth().signOut();
            })
            .catch((err) => {
                console.log('error trying to log out from Google : '+ err);
            });
           
        }
        //...
        //profile case
    }

    render() {
        return (
            <ToolbarAndroid style={styles.toolbar}
                title={this.props.title}
                actions={[
                    {title: 'Logout', icon: require('../images/email2x.png'), show: 'never'},
                    {title: 'Profile', icon: require('../images/email2x.png'), show: 'never'}
                ]} 
                onActionSelected={this.completeAction}/>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#26a69a',
        height: 56,
        alignSelf: 'stretch',
      }, 
  });

//   export default Toolbar;