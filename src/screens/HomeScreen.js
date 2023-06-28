import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ShowInvoice from "../components/ShowInvoice";
import * as SQLite from "expo-sqlite";

const HomeScreen = ({ navigation }) => {
  // State variable that stores list of invoices extracted from database
  const [list, setList] = useState([]);

  // State variable that represents a signal that informs of need for updating list state variable, 
  // true indicates the list is in need of update, while false suggests the opposite
  const [updateSig, setUpdateSig] = useState(true);

  // Initializes the local db connection
  const db = SQLite.openDatabase("sqlite.db");

  // Whenever home page receives focus, update the list accordingly based on update signal state variable
  useFocusEffect(() => {
    // Create the "invoices" entity if it hasn't been created
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS invoices (id INTEGER PRIMARY KEY AUTOINCREMENT, customer TEXT, phone INTEGER, tax DOUBLE, discount DOUBLE, discounttype TEXT, items TEXT)"
      );
    });
    
    if (updateSig === true) {
      getList();
      console.log(list)

      // After update of invoice list, shift signal to inactive
      setUpdateSig(false);
    }
  });

  // Function which extracts invoice list from the database and updates state variable accordingly
  const getList = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM invoices",
        null,
        (txObj, resultSet) => {
          setList(
            // As item list is stored in database in the form of a string, the wrapper deciphers incomeing
            // item string and converts it into a list readable by display component
            resultSet.rows._array.map((invoice) => {
              const items = invoice.items.split("||").filter((item) => {
                if (item !== "") {
                  return item;
                }
              });
              const formattedItems = [];
              items.forEach((item) => {
                formattedItems.push({
                  name: item.split("quantity")[0],
                  quantity: item.split("quantity")[1].split("price")[0],
                  price: item.split("price")[1],
                });
              });

              return { ...invoice, items: formattedItems };
            })
          );
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <View>
      {/*A customized button that redirects to invoice create menu */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          navigation.navigate("Create");
          // After navigation has commit, due to potential of invoice list change, shift signal
          setUpdateSig(true);
        }}
      >
        <Text style={styles.createButtonText}>Create a new invoice</Text>
      </TouchableOpacity>

      {/*Component that displays the invoice list state variable as a table */}
      <ShowInvoice list={list} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  createButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default HomeScreen;
