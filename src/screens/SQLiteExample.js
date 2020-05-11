import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import UserInputForm from "../components/UserInputForm";

import { Context } from "../context/SQLiteDBContext";

import * as SQLite from "expo-sqlite";

const SQLiteExample = () => {
  const [selectedUserID, setSelectedUserID] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const {
    state,
    sqliteSaveUser,
    sqliteRemoveUser,
    sqliteGetUsers,
    sqliteUpdateUser,
  } = useContext(Context);

  //Open a database, creating it if it doesn't exist.
  const db = SQLite.openDatabase("myDB");
  //create a table in db.
  //users is the table name. id is the first column and userName is the second column.
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists users (id integer primary key not null, userName text not null);"
    );
  });

  //get user from database if there is a user.
  useEffect(() => {
    sqliteGetUsers();
  }, []);

  //helper save function
  onSaveSubmit = (name) => {
    sqliteSaveUser(name);
  };
  //helper udpate function
  onUpdateSubmit = (name, userID) => {
    sqliteUpdateUser(name, userID);
  };
  //helper remove function
  onRemoveSubmit = (userID) => {
    sqliteRemoveUser(userID);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetingText}>Selected user: {selectedUser}</Text>
        <UserInputForm
          //Child will call onSaveSubmit and pass the name from the child to parent.
          saveUserProp={(name) => onSaveSubmit(name)}
          //Child will call onRemoveSubmit with the selectedUserID passed down from parent.
          removeUserProp={() => onRemoveSubmit(selectedUserID)}
          //Child will call onUpdateSubmit and pass the name from child to parent.
          updateUserProp={(name) => onUpdateSubmit(name, selectedUserID)}
        />
      </View>
      <View style={{ paddingBottom: 10 }}>
        <Text>Total result is {state.length}:</Text>
      </View>
      <View style={styles.flatlistStyle}>
        <FlatList
          data={state}
          scrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlistItems}>
                <TouchableOpacity
                  style={styles.buttonItem}
                  onPress={() => {
                    setSelectedUser(item.userName), setSelectedUserID(item.id);
                  }}
                >
                  <Text>
                    {item.id} {item.userName}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 16,
  },
  greetingText: {
    marginLeft: 20,
    fontSize: 30,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  flatlistStyle: {
    flex: 1,
  },
  flatlistItems: {
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  buttonItem: {
    flex: 1,
    //borderWidth: 1,
    //borderColor: "red",
    justifyContent: "center",
  },
});

export default SQLiteExample;
