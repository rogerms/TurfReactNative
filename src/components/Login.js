import React, { Component, createElement } from 'react';
import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import DismissKeyboard from "dismissKeyboard";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {AccessToken, LoginButton, LoginManager } from 'react-native-fbsdk';
/**********************************************************************************
// Google SignIn Doc
// https://github.com/devfd/react-native-google-signin
// video for IOS
// https://www.youtube.com/watch?v=dFnnXlJq7tg&t=644s
**********************************************************************************/


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: "",
            user: null,
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
        this.signInWithFacebook = this.signInWithFacebook.bind(this);
        this.getFacebookUserInfo = this.getFacebookUserInfo.bind(this);
        
    }

    signInWithGoogle()
    {
        GoogleSignin.signIn()
        .then((data) => {
            //create a new credential with this token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            //login with credential
            return firebase.auth().signInWithCredential(credential);
        })
        .then((user) =>{
            this.setState({user});
            console.log(`Logged in user: ${user.displayName}`);
        })
        .catch((err) =>{
            console.log(`Firebase (google) Login failed ${err}`);
        })
    }

    signInWithFacebook()
    { 
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            if(result.isCancelled){
                return Promise.reject(new Error("FB request canceled"));
            }
            console.log(`Facebook login success, permission: ${result.grantedPermissions}`);

            return AccessToken.getCurrentAccessToken();
        })
        .then((data) => {
            console.log("facebook call user");
            this.getFacebookUserInfo();
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
            console.log(`Logged in user: ${user.displayName}`);
        })
        .catch((error) => {
            console.log(`Firebase (facebook) login failed: ${error}`);
        })
    }

    getFacebookUserInfo()
    {
        AccessToken.getCurrentAccessToken()
        .then((data) => {
            this.initUser(data.accessToken);
        })
        .catch((error) =>{
            console.log(`Error trying to get fb user info ${error}`);
        })
    }

    //*** fields = https://developers.facebook.com/docs/graph-api/reference/user/
    initUser(token) {
        const user = {};
        fetch('https://graph.facebook.com/v2.5/me?fields=birthday,email,gender&redirect=false&access_token=' + token)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          user.name = data.name;
          user.id = data.id;
          user.user_friends = data.friends;
          user.email = data.email;
          console.log(user);
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })
      }

    async signup() {

        DismissKeyboard();

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async login() {

        DismissKeyboard();

        // try {
        //     await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

        //     this.setState({
        //         response: "Logged In!"
        //     });

        // } catch (error) {
        //     this.setState({
        //         response: error.toString()
        //     })
        // }

        // code above was givin warning: state called on unmounted component
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({response: 'Logged In!'});
        })
        .catch((error) => {
            this.setState({response: error.toString()})
        });
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={styles.container}>
                    <View style={styles.formGroup}>
                    <View>

                        <Text style={styles.title}>Log in</Text>
                        <TextInput
                            placeholder="put email here"
                            onChangeText={(email) => this.setState({email})}
                        />
                        <TextInput
                            placeholder="put password here"
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry={true}
                        />

                        {/*Google button*/}
                        <View style={{paddingTop: 30}}>

                            {/*<Button onPress={this.signup} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>*/}
                            <Button onPress={this.signup} textStyle={{fontSize: 18}}>
                                Sign up
                            </Button>
                            {/*<Button onPress={this.login} style={styles.buttons} textStyle={{fontSize: 18}}>*/}
                            <Button onPress={this.login} textStyle={{fontSize: 18}} color='#3b5998'>
                                Login
                            </Button>
                            <GoogleSigninButton
                                style={{width: 312, height: 48}}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.signInWithGoogle}
                            />
                        </View>
                        {/* Facebook button */}
                        <View style={{paddingTop: 10, paddingLeft:5}}>
                            <Button style={{backgroundColor: '#4267B2', borderColor:'#4267B2', borderRadius:0}} textStyle={{fontSize: 18, color:'white'}}
                                    onPress={this.signInWithFacebook}>
                                Continue with Facebook
                            </Button>
                        </View>
                    </View>
                    <View>
                        {/*<Text style={styles.response}>{this.state.response}</Text>*/}
                        <Text>{this.state.response}</Text>
                    </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    formGroup: {
       
        width: 300,
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    }
});
