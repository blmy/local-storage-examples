import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";

const UserInputForm = ({ saveUserProp, removeUserProp, updateUserProp }) => {
  const [name, setName] = useState(null);

  return (
    <View>
      <TextInput
        style={styles.inputText}
        value={name}
        onChangeText={(input) => setName(input)}
      />
      <View style={styles.buttonContainer}>
        {/* passing name argument to prop function */}
        <Button
          title="Save User"
          onPress={() => {
            saveUserProp(name), setName(null);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Update User"
          onPress={() => {
            updateUserProp(name), setName(null);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Remove User" onPress={removeUserProp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    //marginLeft: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "blue",
  },
  buttonContainer: {
    padding: 10,
  },
});

export default UserInputForm;
