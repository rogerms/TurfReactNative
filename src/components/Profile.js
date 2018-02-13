import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Button from "apsl-react-native-button";
import {GoogleSignin } from 'react-native-google-signin';


export default class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {currentUser: ''};

        this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){
        this.setState({currentUser: firebase.auth().currentUser});
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
        title: 'My Profile',
        tabBarLabel: 'My Profile',
        tabBarIcon: ({ tintColor }) => (<Icon
            name={'ios-person'}
            size={28} 
            style={[{ color: tintColor }, styles.icon]} 
        />)
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text></Text>
                <View style={styles.container}>
                    <Image style={{width: 80, height: 80, margin:20, borderRadius: 40}} source={{uri:this.state.currentUser.photoURL}} />
                    <Text style={{fontSize: 18}}>{this.state.currentUser.displayName}</Text>
                    <Text style={{fontSize: 18}}>{this.state.currentUser.email}</Text>
                </View>
              
                <View style={styles.buttonArea}>
                    <Button onPress={this.logOut} >Logout</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    icon: {
        paddingBottom: 2,
    },
    screen: {
        backgroundColor: '#ffffff',
        flex:1,
        alignSelf:'stretch',
    },
    buttonArea: {
        padding: 20,
    }
});