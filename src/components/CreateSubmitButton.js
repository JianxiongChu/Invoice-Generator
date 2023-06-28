import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

// Component for submit button of invoice creation screen
const CreateSubmitButton = ({ writeToDB }) => {
  return (
    <View style={styles.buttonLayout}>
      <TouchableOpacity onPress={() => writeToDB()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLayout: { paddingTop: 20, paddingLeft: 20, paddingRight: 250 },
  buttonText: {
    fontSize: 30,
    backgroundColor: "teal",
    alignSelf: "center",
  },
});

export default CreateSubmitButton;
