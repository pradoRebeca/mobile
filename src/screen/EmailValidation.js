import React, { useState } from "react";
import { Image, StyleSheet, View, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputData from "../components/InputData";
import ButtonHome from "../components/ButtonHome";
import TitleScreen from "../components/TitleSreen";
import ButtonCancel from "../components/ButtonCancel";
import {showToast } from "../Functions";

const EmailValidation = () => {
  const navigation = useNavigation();
  const [personalData, setPersonalData] = useState({
    codigo: "",
    
  });

  const next = () => {
    navigation.navigate({ name: "Redefinicao de senha" });
  };

  const sendCode = () => {
    showToast('Novo código enviado')
  };

  return (
    <SafeAreaView style={style.content}>
      <Image style={style.image} source={require("../img/logoLogin.png")} />

      <TitleScreen
        title="Validação de E-mail"
        descreption="Enviamos um código de verificação para ***. Insira o código para realizar a verificação."
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <InputData
          object={personalData}
          onChangeObject={setPersonalData}
          keyObject="codigo"
          label="Digite o código"
          nameIcon="lock"
          mode={true}
        />
      </View>

      <ButtonHome text="Proximo" functionClicked={next} />

      <ButtonCancel title="Enviar novo código" functionClicked={sendCode} />

      <Image
        style={style.imageWaveInferior}
        source={require("../img/waveInferior.png")}
      />
    </SafeAreaView>
  );
};

export default EmailValidation;

const style = StyleSheet.create({
  image: {
    height: 130,
    width: "100%",
  },
  content: {
    width: "100%",

    //   paddingLeft: 50,
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // alignItens: "center",
  },

  imageWaveInferior: {
    height: 60,
    width: "100%",
  },
});