import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemSeparator from "./ItemSeparator";

const Information = ({ data, nameSreen }) => {
  const navigation = useNavigation();
  const [titleText, setTitleText] = useState([]);

  let id;
  let action = "Editar";

  switch (nameSreen) {
    case "Formação Academica":
      id = "idCursoCandidato";
      action = "Vizualizar";
      break;

    case "Cadastrar Endereço":
      //titleSection = 'Email de Recuperação'
      id = "aa";
      break;
  }

  useEffect(() => {
    setTitleText(Object.entries(data));
  }, []);

  const renderText = (title, des) => {
    if (!title.startsWith("id")) {
      if (des != "" && des != null) {
        if (Array.isArray(des)) {
          return des.map((item) => (
            <View>
              <Text style={style.infoTitle}>{title}</Text>
              <Text style={style.infoDescretion}>{item}</Text>
            </View>
          ));
        } else {
          return (
            <View>
              <Text style={style.infoTitle}>{title}</Text>
              <Text style={style.infoDescretion}>{des}</Text>
            </View>
          );
        }
      }
    } else {
      console.log(title);
    }
  };

  const renderItem = () => {
    return titleText.map((item) => renderText(item[0], item[1]));
  };

  console.log("data ", data);
  console.log("titleText ", titleText);

  return (
    <View style={style.viewInfo}>
      {renderItem()}
      <TouchableOpacity
        style={style.button}
        onPress={() =>
          navigation.navigate(nameSreen, {
            edit: true,
            id: data[id],
          })
        }
      >
        <Text style={{ color: "#1E7596" }}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Information;

const style = StyleSheet.create({
  viewInfo: {
    marginTop: 10,
    minHeight: 0,
    height: "auto",
    marginBottom: 10,
    maxWidth: "100%",
  },
  infoTitle: {
    textTransform: "capitalize",
    color: "#AAAAAA",
    fontSize: 13,
  },
  title: {
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
  },

  button: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1E7596",
    width: 80,
    height: 30,
    borderRadius: 5,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoDescretion: {
    textTransform: "capitalize",
    color: "black",
    marginBottom: 5,
  },
});
