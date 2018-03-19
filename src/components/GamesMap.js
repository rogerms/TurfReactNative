import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import MaterialIcon from '../../node_modules/react-native-vector-icons/MaterialIcons';
import Button from "apsl-react-native-button";
import MapView, { Marker } from 'react-native-maps';


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
    backgroundColor: '#8577EE',
    borderColor: '#8577EE',                               
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Games extends Component {
    constructor(props) {
        super(props);

        this.state = {
          myPosition: null,
    
          markers: [
            {title: 'Center St.', latlng: {latitude:40.23389833333333, longitude:-111.65799999999999 }},
            {title: 'Provo Library', latlng: {latitude:40.242281, longitude:-111.657500 }},
            {title: 'Smiths', latlng: {latitude:40.239448, longitude:-111.661362 }},
          ],

          error: null,
        };

        this.goToScreen = this.goToScreen.bind(this);
        this.getMyPosition = this.getMyPosition.bind(this);
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
      this.props.navigation.dispatch({
        type: 'ReplaceCurrentScreen',
        routeName: 'Games',
        params: {user: 'currentUser'},
        key: 'Games'
      });
    }
    //ion-ios-basketball
    //ion-map

    componentDidMount() {
      this.getMyPosition();
    }
  
    componentWillUnmount() {
      //remove watch
      navigator.geolocation.clearWatch(this.watchId);
    }
  
    getMyPosition() {
      var options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            myPosition: position.coords,
          });
        },
        (error) =>{ this.setState({ error: error.message }); },
        options,
      );
      
      //watch for changes
      this.watchId =navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            myPosition: position.coords,
          });
        },
        (error) =>{ this.setState({ error: error.message }); },
        options
      );
    }

  render() {
    const { myPosition } = this.state;
    if (!myPosition) return null;

    return (
        <View style={[styles.screen ]}>
            <View style={[styles.container ]}>
                <Text>Games Map</Text>
                <MapView
                    style={styles.map}
                    region={{
                      latitude: myPosition.latitude,
                      longitude: myPosition.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }}
                  >
                {this.state.markers.map((marker, i) => (
                    <Marker key={i}
                      coordinate={marker.latlng}
                      title={marker.title}
                    />
                ))}
                </MapView>
            </View>
            <Button onPress={ this.goToScreen } style={styles.fab} >
              <Icon
                  name={'md-list'} 
                  size={42}
                  style={{color: 'white'}} 
                  />
            </Button>
      </View>
    );
  }
}