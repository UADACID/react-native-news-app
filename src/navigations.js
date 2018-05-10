import { createStackNavigator } from 'react-navigation'

import Sources from './screens/sources'
import Articles from './screens/articles'
import WebViews from './screens/webViews'

const StackNavigatorConfig = {
  headerMode : 'float'
}

const RouteConfigs = {
  Sources : {
    screen : Sources
  },
  Articles : {
    screen : Articles
  },
  WebViews : {
    screen : WebViews
  }
}

export default createStackNavigator(RouteConfigs, StackNavigatorConfig)
