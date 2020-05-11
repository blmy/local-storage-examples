import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Context } from "../context/AsyncStorageContext";
import UserInputForm from "../components/UserInputForm";

const AsyncStorageExample = () => {
  const { state, getUser, saveUser, removeUser } = useContext(Context);

  //getUser() will only be called one time while user is in this screen.
  //get User if there is a user.
  //[] will ensure that the code within useEffect will only run one time.
  useEffect(() => {
    getUser();
  }, []);

  //helper function
  onSaveSubmit = (name) => {
    saveUser(name);
  };
  //helper function
  onRemoveSubmit = (name) => {
    removeUser(name);
  };

  return (
    <View>
      <Text style={styles.greetingText}>
        Hello, {state.user ? state.user : "World"}!
      </Text>
      <UserInputForm
        //passing name argument from child prop function to callback function.
        saveUserProp={(name) => onSaveSubmit(name)}
        removeUserProp={(name) => onRemoveSubmit(name)}
      />
      <Text style={styles.headerText}>
        Async Storage resembles local storage in react native. This is an
        example with context, provider, useReducer, useEffect.
      </Text>
      <Text style={styles.headerText}>
        AsyncStorage is an unencrypted, asynchronous, persistent, key-value
        storage system that is global to the app.
      </Text>
      <Text style={styles.headerText}>
        It is mainly use for session management. For example, once we login we
        can store the user id in the AsyncStorage to remember the user and when
        we open the app again we check for the user id, If it is there in the
        AsyncStorage then we can directly send the user to the next screen
        without login else we will show the Login Screen.
      </Text>
      <Text style={styles.headerText}>
        If you need a way to securely store small data, do look at SecureStore
        to encrypt and securely store key.
      </Text>
      <Text style={styles.headerText}>
        If you need to store large data, use SQLite expo database. Your will be
        able to query the database.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    paddingBottom: 20,
    alignSelf: "center",
  },
  greetingText: {
    marginLeft: 20,
    fontSize: 30,
    paddingBottom: 20,
  },
});

export default AsyncStorageExample;
