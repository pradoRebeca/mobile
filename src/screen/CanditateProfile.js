import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Image,
  Text,
  SafeAreaView,
} from "react-native";

import axiosURL from "../API";
import DisplayInformation from "../components/DisplayInformations";

const user = [
  {
    id: "1",
    nome: "valor obj",
    dataNascimento: "valor obj",
    profi: null,
    email: ["eemil@1", "eemil@2"],
  },
  {
    idCurrssoannsns: "2",
    nome: "valor obj",
    dataNascimento: "valor obj",
    profi: null,
    maisATRI: "Home.js",
    telefone: ["11 942778653", "11 942778611"],
  },
  {
    idMamsskaas: "3",
    nome: "valor obj",
    dataNascimento: "valor obj",
    profi: null,
    maisATRI: "",
  },
];

const endereco = {
  rua: "rua a",
  numero: "12",
  bairro: "",
  cidade: "sao paulo",
  sigla: "",
  cep: "",
};

const CandidateProfile = () => {
  const image = "https://www.promoview.com.br/uploads/2017/04/b72a1cfe.png";
  const [personalData, setPersonalData] = useState([]);
  const [personalInformation, setPersonalInformation] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [cursoData, setCursoData] = useState([]);
  const [deficienciaData, setDeficienciaData] = useState([]);

  useEffect(() => {
    axiosURL
      .get(`candidato/buscar/1`)
      .then((response) => {
        setPersonalData(response.data);
        setExperienceData(response.data.experiencia);
        setCursoData(response.data.curso);
        setPersonalInformation({
          ...personalData,
          experiencia: null,
          curso: null,
          deficiencia: null,
        });
        setDeficienciaData(response.data.deficiencia);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }, []);

  //Filtro para cada seção
  useEffect(() => {
    setExperienceData(personalData.experiencia);
    setCursoData(personalData.curso);
    setPersonalInformation({ ...personalData, experiencia: null, curso: null });
  }, [personalData]);

  return (
    <SafeAreaView>
      {/* <SearchBar /> */}
      <ScrollView>
        <View style={style.infoPreview}>
          <View style={style.viewImage}>
            <Image
              style={style.image}
              source={{
                uri: personalData.image ?? image,
              }}
            />
          </View>
          <View style={style.infoText}>
            <View style={style.info}>
              <Text style={style.infoTitle}>Nome</Text>
              <Text style={style.infoDescretion}>{personalData.nome}</Text>
            </View>
            <View style={style.info}>
              <Text style={style.infoTitle}>Deficiencia</Text>
              <Text style={style.infoDescretion}>{personalData.email}</Text>
            </View>
          </View>
        </View>
        <View style={style.conatinerInformations}>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Informações Pessoais"
              mode="personalInformation"
              data={[endereco]}
              nameSreen="RegisterPersonalData"
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Cadastrar Endereço"
              data={[endereco]}
              nameSreen="Cadastrar Endereço"
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Formações Academicas"
              data={user}
              nameSreen="Formação Academica"
              addInformation={true}
            />
          </View>
          <View style={style.container}>
            <DisplayInformation
              titleSection="Experiencia Profissional"
              data={user}
              nameSreen="Experiencia Profissional"
              addInformation={true}
              mode={"profissionalExperience"}
            />
          </View>
          {/* <View style={style.container}>
            <DisplayInformation
              // data={}
              titleSection="Informacoes Adicionais"
              nameSreen="Informacoes Adicionais"
              addInformation={true}
            />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CandidateProfile;

const style = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
  infoPreview: {
    paddingTop: "5%",
    paddingBottom: "5%",
    width: "100%",
    minHeight: 120,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#DCEBF2",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  viewImage: {
    height: 90,
    width: "25%",
  },
  infoText: {
    minHeight: 90,
    width: "60%",
  },
  conatinerInformations: {
    width: "100%",
    padding: 15,
  },
  info: {
    minHeight: 0,
    height: "auto",
    marginBottom: 10,
    maxWidth: "100%",
  },
  infoTitle: {
    minHeight: 0,
    color: "#AAAAAA",
    fontSize: 13,
  },

  infoDescretion: {
    minHeight: 0,
  },

  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },

  titleSection: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
  container: {
    borderRadius: 5,
    width: "100%",
    backgroundColor: "white",
    minHeight: 100,
    padding: 15,
    marginBottom: 15,
  },
});

{
  /* <View style={style.canditateInfo}
 <DisplayInformation titleSection={'nome'} title={'rbecea'} descretion={'ola'} /> 
   <FlatList
      data={userData}
      renderItem={(item) => <DisplayInformation titleSection={item.endereço} title={item.bairro} descretion={item.cep} />}
  /> 

</View> */
}
