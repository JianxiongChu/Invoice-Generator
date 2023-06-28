import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Item list component for invoice creation screen
const CreateItemList = ({ newInvoice, setNewInvoice }) => {
  // State variable storing input of potential new items 
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "0",
    price: "0",
  });

  // Function for deleting item from item list
  const handleDeleteItem = (itemToDelete) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((item) => {
        if (item === itemToDelete) {
          return false;
        }
        return true;
      }),
    });
  };

  // Function for adding item to item list
  const handleAddItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, {
        name: newItem.name,
        quantity: parseFloat(newItem.quantity),
        price: parseFloat(newItem.price),
      }],
    });
    setNewItem({
      name: "",
      quantity: "0",
      price: "0",
    })
  };

  // Function for handling change of new item name
  const handleChangeItemName = (value) => {
    setNewItem({ ...newItem, name: value });
  };

  // Function for handling change of new item's quantity
  const handleChangeItemQuantity = (value) => {
    setNewItem({ ...newItem, quantity: value.replace(/[^0-9]/g, "")});
  };

  // Function for handling change of new item's price
  const handleChangeItemPrice = (value) => {
    if (+value || value === "" || value === "0" || value === "0.") {
      setNewItem({ ...newItem, price: value });
    }
  };

  return (
    <View>
      {/* Titles for item list table */}
      <View style={styles.itemRowLayout}>
        <Text style={styles.itemNamePosition}>Item Name</Text>
        <Text style={styles.itemQuantityPosition}>Quantity</Text>
        <Text style={styles.itemPricePosition}>Price</Text>
        <Text style={styles.itemSubtotalPosition}>Subtotal</Text>
      </View>

      {/* Flatlist tag for displaying item list */}
      <FlatList
        data={newInvoice.items}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemRowLayout}>
              <Text style={styles.itemNamePosition}>{item.name}</Text>
              <Text style={styles.itemQuantityPosition}>{item.quantity}</Text>
              <Text style={styles.itemPricePosition}>{item.price}</Text>
              <Text style={styles.itemSubtotalPosition}>
                {item.price * item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteItem(item);
                }}
              >
                <Text style={styles.itemDelete}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Input interface for adding new items */}
      <View style={styles.itemRowLayout}>
        <TextInput
          style={styles.itemNameInput}
          onChangeText={(value) => handleChangeItemName(value)}
          value={newItem.name}
        />
        <TextInput
          style={styles.itemQuantityInput}
          onChangeText={(value) => handleChangeItemQuantity(value)}
          value={newItem.quantity}
        />
        <TextInput
          style={styles.itemPriceInput}
          onChangeText={(value) => handleChangeItemPrice(value)}
          value={newItem.price}
        />
        <Text style={styles.itemSubtotalPosition}>
          {newItem.quantity * newItem.price}
        </Text>
        {/* Add button */}
        <TouchableOpacity
          onPress={() => {
            handleAddItem();
          }}
        >
          <Text style={styles.itemAdd}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: "15%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemPricePosition: {
    width: "15%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemNameInput: {
    width: "40%",
    alignSelf: "center",
    fontSize: 15,
    borderWidth: 1,
  },
  itemQuantityInput: {
    width: "15%",
    alignSelf: "center",
    fontSize: 15,
    borderWidth: 1,
  },
  itemPriceInput: {
    width: "15%",
    alignSelf: "center",
    fontSize: 15,
    borderWidth: 1,
  },
  itemSubtotalPosition: {
    width: "15%",
    alignSelf: "center",
    fontSize: 15,
  },
  itemDelete: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    backgroundColor: "red",
    borderWidth: 1,
  },
  itemAdd: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    backgroundColor: "green",
    borderWidth: 1,
  },
});

export default CreateItemList;
