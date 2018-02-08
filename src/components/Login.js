import React, { Component } from 'react';
import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from 'react-native';
import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import DismissKeyboard from "dismissKeyboard";


export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
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

                        {/*<View style={styles.submit}>*/}
                        <View style={{paddingTop: 30}}>

                            {/*<Button onPress={this.signup} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>*/}
                            <Button onPress={this.signup} textStyle={{fontSize: 18}}>
                                Sign up
                            </Button>
                            {/*<Button onPress={this.login} style={styles.buttons} textStyle={{fontSize: 18}}>*/}
                            <Button onPress={this.login} textStyle={{fontSize: 18}}>
                                Login
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
