import React from "react";
import { View, StyleSheet, Button } from "react-native";

const IndexScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.viewContainer}>
        <Button
          title="AsyncStorage Example"
          onPress={() => navigation.navigate("AsyncScreen")}
        />
      </View>
      <View style={styles.viewContainer}>
        <Button
          title="SQLite Example"
          onPress={() => navigation.navigate("SQLiteScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    padding: 10,
    paddingBottom: 0,
  },
});

export default IndexScreen;
