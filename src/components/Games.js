import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';



export default class AddPerson extends Component {
    static navigationOptions = {
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
      <View style={styles.container}>
        <Text>Games</Text>
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