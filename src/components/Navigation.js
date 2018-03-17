import { StackNavigator, TabNavigator } from 'react-navigation';
import Games from './Games';
import MyGames from './MyGames';
import Profile from './Profile';
import GamesMap from './GamesMap';


//****** TabNavigation docs/ API **********************************
//https://reactnavigation.org/docs/tab-navigator.html
//https://reactnavigation.org/docs/tab-based-navigation.html
//
//**************************************************************** */

export const GamesStack = StackNavigator({
    Games: {screen: Games},
    GamesMap: {screen: GamesMap},
},
{
    headerMode: 'none',
}
);


const Navigation = TabNavigator({
    GamesStack: {screen: GamesStack},
    MyGames: {screen: MyGames},
    Profile: {screen: Profile},
},
{
    tabBarOptions:{
        labelStyle: {
            fontSize: 12,
        },
        showLabel: true,
        showIcon : true,
        activeTintColor:'white',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,

        style:{
            backgroundColor: '#26a69a'
        },
        tabStyle: {
    
        },
    },
    tabBarPosition: 'bottom',
});

const RootNavigation = StackNavigator({
    Navigation: {screen: Navigation},

},
{
    headerMode: 'float', 
    navigationOptions:{
        headerTintColor: 'rgba(255, 255, 255, .85)',
        headerStyle: {
            backgroundColor: '#26a69a',
            borderBottomColor: '#ffffff', 
        },
    }
}
);

const prevGetStateForActionHomeStack = GamesStack.router.getStateForAction;

GamesStack.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForActionHomeStack(action, state);
}


export default RootNavigation;