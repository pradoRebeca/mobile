import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import axiosURL from "../API";
import { ActivityIndicator, Colors } from 'react-native-paper';

import CardJobPreview from "../components/CardJobPreview";
import { setWarningFilter } from "react-native/Libraries/LogBox/Data/LogBoxData";
import NotFound from "../components/NotFound";

const userData = [
  {
    idJob: "hueh3ey2828u3434428u28",
    jobTitle: "Desenvolvedor de Sistemas",
    company: "Nubank",
    imageUriLogo:
      "https://t.ctcdn.com.br/Ol7_EBe_y4dg8j4wND2Dcftesxo=/660x0/smart/i452004.png",
    district: "Alphavile",
    state: "sp",
    info: "Mental",
  },
  {
    idJob: "hueh3ey28282323u2ewew8u28",
    jobTitle: "Vaga para o Welington",
    company: "Accurate Software",
    imageUriLogo:
      "https://pbs.twimg.com/profile_images/1343520363259555842/efkaRrKI_400x400.jpg",
    district: "Alphavile",
    state: "sp",
    info: "visual",
  },
  {
    idJob: "hueh3ey2828u28sdssu2sss8",
    jobTitle: "Jovem Aprendiz",
    company: "Burguer King",
    imageUriLogo:
      "https://boasmart.com/wp-content/uploads/2020/08/Y59a4-Jh.jpg",
    district: "Alphavile",
    state: "sp",
    info: "Mental",
  },
  {
    idJob: "hueh3eywwe2828u28ssssu28",
    jobTitle: "Desenvolvedor de Sistemas",
    company: "Nubank",
    imageUriLogo:
      "https://t.ctcdn.com.br/Ol7_EBe_y4dg8j4wND2Dcftesxo=/660x0/smart/i452004.png",
    district: "Alphavile",
    state: "sp",
    info: "Auditiva",
  },
  {
    idJob: "hueh3eysadsd2dsd828u28u28",
    jobTitle: "Recursos Humanos",
    company: "Banco do Brasil",
    imageUriLogo:
      "https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/07/bancodobrasil_marca.jpg",
    district: "Alphavile",
    state: "sp",
    info: "Motora",
  },
  {
    idJob: "hueh3ey2828u28uddd2334sss38",
    jobTitle: "Adm",
    company: "Bradesco",
    imageUriLogo:
      "https://t.ctcdn.com.br/SgIVt6gyFH7RoIV0ayvRf04g0YU=/400x400/smart/i490023.jpeg",
    district: "Ipanema",
    state: "RJ",
    info: "visual",
  },
];

const CandidateHome = ({ navigation }) => {
  const [activityIndicator, setActivityIndicator] = useState(true)

  const [error, setError] = useState(false);
  const [job, setJob] = useState([]);
  //const imageWithouJob = "https://sim.marica.rj.gov.br/img/icones/empresa2.pngs";

  useEffect(() => {
    axiosURL
      .get(`vaga/listar`)
      .then((response) => {
        setJob(response.data.content);
        setActivityIndicator(false)
        setError(false);
        return true;
      })
      .catch((error) => {
        setActivityIndicator(false)
        setError(true);
        return false;
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#1E7596" />
      {/* <SearchBar /> */}
      {/* <TopNavigation navigation={navigation} /> */}
      <View
        style={
          error
            ? {
                ...style.content,
                justifyContent: "space-between",
              }
            : { ...style.content }
        }
      >
        {error && <NotFound />}

        
          <ActivityIndicator animating={error ? false : true} color={'red'} />
        

        {job && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={job}
            renderItem={(item) => (
              <CardJobPreview data={item.item} key={item.id} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CandidateHome;

const style = StyleSheet.create({
  content: {
    marginTop: 10,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageNotFound: {
    width: 300,
    minHeight: 300,
  },
});