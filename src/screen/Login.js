import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { useNavigation } from "@react-navigation/native";

import InputData from "../components/InputData";
import ButtonHome from "../components/ButtonHome";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

console.log(windowWidth);
const Login = () => {
  const navigation = useNavigation();

  const logon = () => {
    navigation.navigate({ name: "CandidateHome" });
  };

  return (
    <SafeAreaView style={style.content}>
      <ScrollView>
        <StatusBar backgroundColor="#DCEBF2" />
        <Image style={style.image} source={require("../img/logoLogin.png")} />
        <Text style={style.titleScreen}>Login</Text>
        <View style={{ width: "100%", padding: "8%" }}>
          <InputData
            keyObject="nome"
            label="Usuario"
            nameIcon="account"
            mode={true}
          />
          <InputData
            keyObject="nome"
            label="Senha"
            nameIcon="lock"
            mode={true}
          />
        </View>
        <View style={style.passwordRedefinir}>
          <TouchableOpacity
            onPress={() => navigation.navigate({ name: "Register" })}
          >
            <Text style={{ ...style.text, fontWeight: "700" }}>
              Esqueci senha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.buttonContent}>
          <ButtonHome text="Login" functionClicked={logon} />
        </View>

        {/* <Text style={style.text}>OU ENTRE COM</Text>
        <TouchableOpacity
          accessible={true}
          accessibilityHint="Fazer o cadastro com a conta do google"
          accessibilityLabel="Cadastrar-se com o google "
        >
          <View style={style.viewButtonGoogle}>
            <FontAwesome name="google" size={18} color="blue" />
            <Text style={style.titleButtonGoogle}>Entrar com Google</Text>
          </View>
        </TouchableOpacity>

 */}

        <View style={style.footer}>
          <Image
            style={style.footerWave}
            source={require("../img/waveInferior.png")}
          />

          <View
            accessible={true}
            accessibilityHint="Ir para a tela de Cadastro"
            style={style.footerOptions}
          >
            <Text style={style.text}>Não tem cadastro?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate({ name: "Register" })}
            >
              <Text style={{ ...style.text, fontWeight: "700" }}>
                Cadastrar-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const style = StyleSheet.create({
  image: {
    height: 130,
    width: windowWidth,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  viewButton: {
    height: 50,
    width: 300,
    backgroundColor: "#225E77",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  titleButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  titleScreen: {
    width: "100%",
    textAlign: "center",
    color: "#225E77",
    fontSize: 40,
    letterSpacing: 3,
    marginBottom: 40,
  },
  viewButtonGoogle: {
    height: 40,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "#225E77",
    borderWidth: 2,
  },
  titleButtonGoogle: {
    marginLeft: 15,
    color: "#225E77",
    fontSize: 13,
  },
  text: {
    color: "#225E77",
    fontSize: 15,
  },
  footer: {
    width: "100%",
    height: 80,
  },
  footerWave: {
    width: "100%",
    height: 80,
  },
  footerOptions: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    position: "absolute",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  passwordRedefinir: {
    width: 340,
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 40,
    fontSize: 15,
    color: "#DCEBF2",
  },
  buttonContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});