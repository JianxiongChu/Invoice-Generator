import React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import DividingLine from "./DividingLine";


// Component for handling customer name and phone number change
const CreateCustomerInfo = ({ newInvoice, setNewInvoice }) => {
  const handleChangeCustomer = (value) => {
    setNewInvoice({ ...newInvoice, customer: value });
  };

  const handleChangePhone = (value) => {
    setNewInvoice({ ...newInvoice, phone: value.replace(/[^0-9]/g, "") });
  };
  return (
    <View >
      <View style={styles.customerInfo}>
        <Text style={styles.customerInfoLabel}>Customer Name: </Text>
        <TextInput
          style={styles.customerInfoInput}
          onChangeText={(value) => handleChangeCustomer(value)}
          value={newInvoice.customer}
        />
      </View>
      <View style={styles.customerInfo}>
        <Text style={styles.customerInfoLabel}>Customer Phone Number: </Text>
        <TextInput
          style={styles.customerInfoInput}
          onChangeText={(value) => handleChangePhone(value)}
          value={newInvoice.phone}
          maxLength={10}
        />
      </View>
      <DividingLine />
    </View>
  );
};

const styles = StyleSheet.create({
  customerInfo: {
    flexDirection: "row",
  },

  customerInfoInput: {
    width: "40%",
    alignSelf: "center",
    borderWidth: 1,
    padding: 3.5,
  },

  customerInfoLabel: {
    width: "50%",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 15,
  },
});

export default CreateCustomerInfo;
