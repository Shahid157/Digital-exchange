/**
 * @format
 */

import { AppRegistry, Text, TextInput, LogBox } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";
import "./i18n";

LogBox.ignoreLogs([
  "new NativeEventEmitter",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'VirtualizedLists should never be nested'
]);
// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
