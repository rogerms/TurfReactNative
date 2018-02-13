import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
//import Icon from '../../node_modules/react-native-vector-icons/EvilIcons';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Toolbar from './Toolbar';


export default class AddPerson extends Component {
    static navigationOptions = {
            tabBarLabel: 'My Games',
            tabBarIcon: ({ tintColor }) => (<Icon
                name={'ios-contacts'}
                size={28} 
                style={[{ color: tintColor }, styles.icon]} 
            />)
    }
  render() {
    return (
        <View>
            <Toolbar title='My Games' />
            <View style={{padding: 20}}>
                <Text>My Games</Text>
            </View>
         </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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