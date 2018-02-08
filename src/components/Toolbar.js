import React, { Component } from 'react';
import { View, ToolbarAndroid, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import firebase from 'firebase';


export default class Toolbar extends Component {
    constructor(props){
        super(props);

        this.completeAction = this.completeAction.bind(this);
    }

    completeAction(position){
        if(position == 0) {
            firebase.auth().signOut(); 
        }
        //...
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