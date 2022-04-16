import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Dashboard from "../containers/Dashboard";
import NotFoundScreen from "../containers/NotFoundScreen";
import FirstScreen from "../containers/FirstScreen";
import WelcomeScreen from "../containers/WelcomeScreen";
import SignUp from "../containers/SignUp";
import Verify from "../Verify";
import login from "../login";
import SearchResults from "../containers/searchResults";

const screens = {
  
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      title: "Welcome Screen",
    },
  },

  First: {
    screen: FirstScreen,
    navigationOptions: {
      title: "",
    },
  }, 
  
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "SignUp",
    },
  },

  Verify: {
    screen: Verify,
    navigationOptions: {
      title: "Verify",
    },
  },

  login: {
    screen: login,
    navigationOptions: {
      title: "login",
    },
  },

  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: "Dashboard",
    },
  },
  NotFoundScreen: {
    screen: NotFoundScreen,
    navigationOptions: {
      title: "Not Found",
    },
  },
  SearchResults: {
    screen: SearchResults,
    navigationOptions: {
      title: "Search Results",
    },
  },

  
};

const Navigator = createStackNavigator(screens, {
  initialRouteName: "Dashboard",
});

export default createAppContainer(Navigator);