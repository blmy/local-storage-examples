import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from "./src/screens/IndexScreen";
import SQLiteExample from "./src/screens/SQLiteExample";
import AsyncStorageExample from "./src/screens/AsyncStorageExample";

import { Provider as AsyncStorageProvider } from "./src/context/AsyncStorageContext";
import { Provider as SQLiteDBProvider } from "./src/context/SQLiteDBContext";

const navigator = createStackNavigator(
  {
    Index: {
      screen: IndexScreen,
      navigationOptions: {
        title: "Local Storage Example",
        headerStyle: { backgroundColor: "blue" },
        headerTintColor: "white",
      },
    },
    AsyncScreen: {
      screen: AsyncStorageExample,
      navigationOptions: {
        title: "Async Storage Example",
        headerStyle: { backgroundColor: "blue" },
        headerTintColor: "white",
      },
    },
    SQLiteScreen: {
      screen: SQLiteExample,
      navigationOptions: {
        title: "SQLite Storage Example",
        headerStyle: { backgroundColor: "blue" },
        headerTintColor: "white",
      },
    },
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      headerTitleAlign: "center",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <AsyncStorageProvider>
      <SQLiteDBProvider>
        <App />
      </SQLiteDBProvider>
    </AsyncStorageProvider>
  );
};
