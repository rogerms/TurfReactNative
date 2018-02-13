import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Toolbar from './Toolbar';


export default class Games extends Component {
    static navigationOptions = {
            title: 'Games',
            tabBarLabel: 'Games',
            tabBarIcon: ({ tintColor }) => (<Icon
                name={'ios-basketball'}
                size={28} 
                style={[{ color: tintColor }, styles.icon]} 
            />)
    }
    //ion-ios-basketball
    //ion-map

  render() {
    return (
        <View style={styles.screen}>
            <View style={[{padding: 20}, styles.container ]}>
                <Text>Games</Text>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: 'wrap',
      padding: 20,
      backgroundColor: 'white',
    },
    screen: {
      backgroundColor: '#ffffff',
      flex:1,
      alignSelf:'stretch',
    },
    icon: {
        paddingBottom: 2,
    },
  });