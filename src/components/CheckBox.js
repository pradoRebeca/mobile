import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const CheckboxComponent = ({ data, type, text }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  const [idChecked, setIdChecked] = useState([]);

  const handleOnChange = (position, id) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    checkedState.map((item, index) => {
      if (index === position) {
        setIdChecked((idChecked[Symbol.iterator] = [...idChecked, id]));
      }
    });
  };

  useEffect(() => {
    const camposCheckedsemRepeticao = [...new Set(idChecked)];
    console.log("array com os itens checkados: ", camposCheckedsemRepeticao);
  }, [checkedState]);

  let textTitle = text;

  const render = () => {
    if (type == "Deficiencia") {
      return data.map(({ id, tipo }, index) => {
        return (
          <Checkbox.Item
            key={id}
            labelStyle={style.item}
            style={style.item}
            color="#1E7596"
            label={tipo}
            value={id}
            status={checkedState[index] ? "checked" : "unchecked"}
            onPress={() => handleOnChange(index, id)}
          />
        );
      });
    } else {
      return data.map(({ id, tipo }, index) => {
        return (
          <Checkbox.Item
            key={id}
            labelStyle={style.item}
            style={style.item}
            color="#1E7596"
            label={tipo}
            value={id}
            status={checkedState[index] ? "checked" : "unchecked"}
            onPress={() => handleOnChange(index, id)}
          />
        );
      });
    }
  };

  return (
    <View style={style.container}>
      {textTitle && <Text style={style.title}>{textTitle}</Text>}
      {render()}
    </View>
  );
};

export default CheckboxComponent;

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    paddingLeft: 15,
    // borderBottomColor: '#F0F0F0',
    // borderBottomWidth: 2,
    // backgroundColor: "white",
    width: "100%",
    fontSize: 17,
  },
  item: {
    textTransform: "capitalize",
    // backgroundColor: 'yellow',
    fontSize: 15,
  },
});