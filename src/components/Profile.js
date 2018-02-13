import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Button from "apsl-react-native-button";
import {GoogleSignin } from 'react-native-google-signin';


export default class Profile extends Component {
    constructor(props){
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut(){
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

    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (<Icon
            name={'ios-person'}
            size={28} 
            style={[{ color: tintColor }, styles.icon]} 
        />)
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Profile</Text>
            <Button onPress={this.logOut} >Logout</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
      }, 
    icon: {
        paddingBottom: 2,
    },
});