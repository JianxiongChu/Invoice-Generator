import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import DividingLine from "./DividingLine";
import CreateSubmitButton from "./CreateSubmitButton";
import CreateSelectDiscountType from "./CreateSelectDiscountType";

const CreateTotalInfo = ({ newInvoice, setNewInvoice, writeToDB }) => {
  // Function for calculating discount
  const discount = () => {
    if (newInvoice.discounttype === "%") {
      return (
        (newInvoice.items.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0) *
          newInvoice.discount) /
        100
      );
    } else {
      return newInvoice.discount;
    }
  };

  // Function for handling change of discount amount input
  const handleChangeDiscount = (value) => {
    if(+value || value === "" || value === "0" || value === "0."){
        setNewInvoice({ ...newInvoice, discount: value });
    }
  };

  // Function for handling change of tax amount input
  const handleChangeTax = (value) => {
    if(+value || value === "" || value === "0" || value === "0."){
        setNewInvoice({ ...newInvoice, tax: value });
    }
  };

  // Function for handling change of discount type input
  const handleChangeDiscountType = (value) => {
    setNewInvoice({ ...newInvoice, discounttype: value });
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <DividingLine />
      <View style={styles.totalTermLayout}>
        <Text style={styles.totalTermTitle}>Total</Text>
        <Text style={styles.totalTermWithoutContext}>
          {newInvoice.items.reduce((total, item) => {
            return total + item.quantity * item.price;
          }, 0)}
        </Text>
      </View>
      <View style={styles.totalTermLayout}>
        <Text style={styles.totalTermTitle}>Tax</Text>
        <TextInput
          style={styles.totalTermAmount}
          onChangeText={(value) => handleChangeTax(value)}
          value={newInvoice.tax}
        />
        <Text style={styles.totalTermContext}>%</Text>
      </View>
      <View style={styles.totalTermLayout}>
        <Text style={styles.totalTermTitle}>Discount</Text>
        <TextInput
          style={styles.totalTermAmount}
          keyboardType = 'number-pad'
          onChangeText={(value) => handleChangeDiscount(value)}
          value={newInvoice.discount}
        />
        <CreateSelectDiscountType handleChangeDiscountType = {handleChangeDiscountType}/>
      </View>
      <View style={styles.totalTermLayout}>
        <Text style={styles.totalTermTitle}>Grand Total</Text>
        <Text style={styles.totalTermWithoutContext}>
          {newInvoice.items.reduce((total, item) => {
            return total + item.quantity * item.price;
          }, 0) *
            (1 + newInvoice.tax / 100) -
            discount()}
        </Text>
      </View>
      <DividingLine />
      <CreateSubmitButton writeToDB={writeToDB} />
    </View>
  );
};

const styles = StyleSheet.create({
  totalTermLayout: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  totalTermTitle: { width: "50%", fontSize: 30 },
  totalTermWithoutContext: { width: "50%", fontSize: 30, height: "100%" },
  totalTermAmount: {
    width: "20%",
    fontSize: 30,
    borderWidth: 1,
  },
  totalTermContext: {
    width: "30%",
    fontSize: 30,
    textAlign: "center",
    
  },
});

export default CreateTotalInfo;
