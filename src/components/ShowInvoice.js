import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

// This component displays the extracted invoice list invoice by invoice
// The displayed information contains invoice serial id, customer name and phone number, 
// total, and an interactable button that directs to the invoice detail page
const ShowInvoice = ({ navigation, list }) => {
  return (
    <View>
      {/* Table header */}
      <View style={styles.tableBulk}>
        <View style={styles.tableInvoiceSerialTitle}>
          <Text style={styles.tableWhiteDataText}>Invoice No.</Text>
        </View>
        <View style={styles.tableCustomerNameTitle}>
          <Text style={styles.tableWhiteDataText}>Customer Name</Text>
        </View>
        <View style={styles.tablePhoneNumTitle}>
          <Text style={styles.tableWhiteDataText}>Phone No.</Text>
        </View>
        <View style={styles.tableTotalTitle}>
          <Text style={styles.tableWhiteDataText}>Total</Text>
        </View>
        <View style={styles.tableViewButtonTitle}>
          <Text style={styles.tableWhiteDataText}>View</Text>
        </View>
      </View>
      {/* Flatlist tag that displays each invoice with designated view button */}
      <FlatList
        data={list}
        renderItem={({ item }) => {
          // Function which calculates the discount amount based on raw amount and type
          const calculateDiscountAmnt = (item) => {
            if (item.discounttype === "%") {
              return (
                (item.items.reduce((total, item) => {
                  return total + item.quantity * item.price;
                }, 0) *
                  item.discount) /
                100
              );
            } else {
              return item.discount;
            }
          };
          return (
            <View style={styles.tableBulk}>
              <View style={styles.tableInvoiceSerial}>
                <Text style={styles.tableDataText}>{item.id}</Text>
              </View>
              <View style={styles.tableCustomerName}>
                <Text style={styles.tableDataText}>{item.customer}</Text>
              </View>
              <View style={styles.tablePhoneNum}>
                <Text style={styles.tableDataText}>{item.phone}</Text>
              </View>
              <View style={styles.tableTotal}>
                <Text style={styles.tableDataText}>
                  {item.items.reduce((total, item) => {
                    return total + item.quantity * item.price;
                  }, 0) *
                    (1 + item.tax / 100) -
                    calculateDiscountAmnt(item)}
                </Text>
              </View>
              <View style={styles.tableViewButton}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Invoice", item);
                  }}
                >
                  <Text style={styles.tableButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableBulk: {
    flexDirection: "row",
  },

  tableInvoiceSerialTitle: {
    width: "20%",
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },

  tableCustomerNameTitle: {
    width: "25%",
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },

  tablePhoneNumTitle: {
    width: "30%",
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },

  tableTotalTitle: {
    width: "15%",
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },

  tableViewButtonTitle: {
    width: "10%",
    backgroundColor: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },

  tableInvoiceSerial: {
    width: "20%",
  },

  tableCustomerName: {
    width: "25%",
  },

  tablePhoneNum: {
    width: "30%",
  },

  tableTotal: {
    width: "15%",
  },

  tableViewButton: {
    width: "10%",
  },

  tableDataText: {
    textAlign: "center",
    fontSize: 12,
  },

  tableWhiteDataText: {
    textAlign: "center",
    fontSize: 12,
    color: "white",
  },

  tableButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "blue",
  },
});

export default ShowInvoice;
