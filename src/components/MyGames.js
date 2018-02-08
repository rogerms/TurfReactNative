import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
//import Icon from '../../node_modules/react-native-vector-icons/EvilIcons';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import firebase from 'firebase';


export default class AddPerson extends Component {
    static navigationOptions = {
            tabBarLabel: 'My Games',
            tabBarIcon: ({ tintColor }) => (<Icon
                name={'ios-person'}
                size={28} 
                style={[{ color: tintColor }, styles.icon]} 
            />)
    }
  render() {
    return (
      <View style={styles.container}>
        <Text>My Games</Text>
        <Button onPress={() => firebase.auth().signOut()}  title='Logout' ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: 'wrap',
      padding: 20,
      backgroundColor: '#e5e5e5',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
      margin: 10,
    },
    icon: {
        paddingBottom: 2,
    },
  });