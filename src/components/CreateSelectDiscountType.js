import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

// Dropdown list component for switching discount type
const CreateSelectDiscountType = ({handleChangeDiscountType}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "%", value: "%" },
    { label: "$", value: "$" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder="%"
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(value) => handleChangeDiscountType(value)}
      setItems={setItems}
      style={{ borderRadius: 0, width: "30%"}}
      textStyle={{
        fontSize: 30
      }}
    />
  );
};

export default CreateSelectDiscountType;
