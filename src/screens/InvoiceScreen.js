import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import DividingLine from "../components/DividingLine";

// App screen responsible for displaying invoice details on signal from home screen
// Takes route parameter containing the details of invoice to be displayed
const InvoiceScreen = ({ route, navigation }) => {
  // Function for calculating discount amount based on total and discount amount/type
  const discount = () => {
    if (screenInvoice.discounttype === "%") {
      return (
        (screenInvoice.items.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0) *
          screenInvoice.discount) /
        100
      );
    } else {
      return screenInvoice.discount;
    }
  };

  // State variable containing information of the invoice on display 

  // Has a default dummy variable set for validation
  const [screenInvoice, setScreenInvoice] = useState({
    customer: "",
    phone: "",
    tax: "8",
    discount: "0",
    discounttype: "%",
    items: [],
  });

  // When item list of the displayed screen is empty (which indicates dummy set of
  // variables is engaged), display the loading screen and load the variable set from
  // passed route parameter.
  if (screenInvoice.items.length === 0) {
    setScreenInvoice(route.params);
    return (
      <View>
        <Text style={{ alignSelf: "center" }}>Loading...</Text>
      </View>
    );
  } else
    return (
      <View style={{ height: "100%" }}>
        {/*Information regarding the invoice's serial id, customer name and phone number*/}
        <View>
          <Text style={styles.invoiceHeaderTerm}>
            Invoice #{screenInvoice.id}
          </Text>
          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invoiceHeaderTerm}>Customer Name: </Text>
            <Text style={styles.invoiceHeaderInfo}>
              {screenInvoice.customer}
            </Text>
          </View>

          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invoiceHeaderTerm}>Customer Phone: </Text>
            <Text style={styles.invoiceHeaderInfo}>{screenInvoice.phone}</Text>
          </View>
          <DividingLine />
        </View>

        {/*Information regarding the list of items associated with the invoice*/}
        <View style={{ height: "60%" }}>
          <View style={styles.itemRowLayout}>
            <Text style={styles.itemNamePosition}>Item Name</Text>
            <Text style={styles.itemQuantityPosition}>Quantity</Text>
            <Text style={styles.itemPricePosition}>Price</Text>
            <Text style={styles.itemSubtotalPosition}>Subtotal</Text>
          </View>
          <FlatList
            data={screenInvoice.items}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemRowLayout}>
                  <Text style={styles.itemNamePosition}>{item.name}</Text>
                  <Text style={styles.itemQuantityPosition}>
                    {item.quantity}
                  </Text>
                  <Text style={styles.itemPricePosition}>{item.price}</Text>
                  <Text style={styles.itemSubtotalPosition}>
                    {item.price * item.quantity}
                  </Text>
                </View>
              );
            }}
          />
          <DividingLine />
        </View>
        {/*Information regarding the calculated total, tax and discount*/}
        <View>
          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invioceTotalText}>Total: </Text>
            <Text style={styles.invioceTotalText}>
              {screenInvoice.items.reduce((total, item) => {
                return total + item.quantity * item.price;
              }, 0)}
            </Text>
          </View>

          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invioceTotalText}>Tax: </Text>
            <Text style={styles.invioceTotalText}>{screenInvoice.tax}%</Text>
          </View>

          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invioceTotalText}>Discount: </Text>
            <Text style={styles.invioceTotalText}>
              {screenInvoice.discount}
              {screenInvoice.discounttype}
            </Text>
          </View>

          <View style={styles.invoiceHorizontalRow}>
            <Text style={styles.invioceTotalText}>Grand Total: </Text>
            <Text style={styles.invioceTotalText}>
              {screenInvoice.items.reduce((total, item) => {
                return total + item.quantity * item.price;
              }, 0) *
                (1 + screenInvoice.tax / 100) -
                discount()}
            </Text>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  invoiceHeaderTerm: {
    fontWeight: "bold",
    fontSize: 20,
  },
  invoiceHeaderInfo: {
    fontSize: 20,
  },
  invoiceHorizontalRow: {
    flexDirection: "row",
  },
  itemRowLayout: {
    flexDirection: "row",
    height: 30,
  },

  itemNamePosition: {
    width: "40%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemQuantityPosition: {
    width: "20%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemPricePosition: {
    width: "20%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemSubtotalPosition: {
    width: "20%",
    alignSelf: "center",
    fontSize: 15,
  },
  invioceTotalText: {
    fontSize: 25,
  },
});

export default InvoiceScreen;
