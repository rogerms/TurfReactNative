import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import MaterialIcon from '../../node_modules/react-native-vector-icons/MaterialIcons';
import Button from "apsl-react-native-button";


export default class Games extends Component {
    constructor(props) {
        super(props);
        this.goToScreen = this.goToScreen.bind(this);
    }

    static navigationOptions = {
            title: 'Games',
            tabBarLabel: 'Games',
            tabBarIcon: ({ tintColor }) => (<Icon
                name={'ios-basketball'}
                size={28} 
                style={[{ color: tintColor }, styles.icon]} 
            />)
    }

    goToScreen(){
      console.log('goToScreen');
      this.props.navigation.dispatch({
        key: 'GamesMap',
        type: 'ReplaceCurrentScreen',
        routeName: 'GamesMap',
        params: {location: 'localtion'},
      });
    }
    //ion-ios-basketball
    //ion-map

  render() {
    return (
        <View style={styles.screen}>
            <View style={[styles.container ]}>
                <Text>Games</Text>
            </View>
            <Button onPress={ this.goToScreen  } style={styles.fab} >
              <Icon
                  name={'md-map'} 
                  size={42}
                  style={{color: 'white'}} 
                  />
            </Button>
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
    fab:{
      width: 60,  
      height: 60,   
      borderRadius: 30,            
      backgroundColor: '#ee6e73',
      borderColor: '#ee6e73',                               
      position: 'absolute',                                          
      bottom: 10,                                                    
      right: 10, 
    }
  });