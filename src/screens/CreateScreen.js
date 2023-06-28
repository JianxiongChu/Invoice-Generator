import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CreateCustomerInfo from "../components/CreateCustomerInfo";
import CreateItemList from "../components/CreateItemList";
import CreateTotalInfo from "../components/CreateTotalInfo";
import * as SQLite from "expo-sqlite";

const CreateScreen = ({ navigation }) => {
  // State variable that stores user-customized data for new invoice
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    phone: "",
    tax: "8",
    discount: "0",
    discounttype: "%",
    items: [],
  });


  const db = SQLite.openDatabase("sqlite.db");

  const writeToDB = async () => {
    // Converts item list back to string for writing to DB
    let iString = "";
    newInvoice.items.forEach((item) => {
      iString += `${item.name}quantity${item.quantity}price${item.price}||`;
    });
    
    // Validation phase before creating new invoice, validation will fail if:
    // 1. Customer name is missing
    // 2. Customer phone number is less than 10 digits
    // 3. Invoice has no items
    if (newInvoice.customer === "") {
      alert("Customer name invalid");
    } else if (newInvoice.phone.length < 10) {
      alert("Phone invalid");
    } else if (newInvoice.items.length === 0) {
      alert("Item list unverified");
    } else {
      alert("Invoice created");
      await db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO invoices VALUES (null, "${newInvoice.customer}", ${newInvoice.phone}, ${newInvoice.tax}, ${newInvoice.discount}, "${newInvoice.discounttype}", "${iString}")`, 
          null, 
          (txObj, resultSet) => console.log("Success"), 
          (txObj, error) => console.log(error)
        );
      });
  
      navigation.navigate("Home")
    }
  };

  return (
    <View style={{ height: "100%" }}>
      {/*Component that handles input of customer name and phone number*/}
      <CreateCustomerInfo
        newInvoice={newInvoice}
        setNewInvoice={setNewInvoice}
      />

      {/*Component that stores and allows user to modify the item list of the invoice*/}
      <CreateItemList newInvoice={newInvoice} setNewInvoice={setNewInvoice} />

      {/*Component that handles customization of tax/discount policy, as well as submission of completed invoice*/}
      <CreateTotalInfo
        newInvoice={newInvoice}
        setNewInvoice={setNewInvoice}
        writeToDB={writeToDB}
      />
    </View>
  );
};

export default CreateScreen;
