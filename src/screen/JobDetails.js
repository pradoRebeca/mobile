import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

//file-text-o
import ButtonOptionsJob from "../components/ButtonOptionsJob";
import JobRequirements from "../components/JobRequirements";
import axiosURL from "../API";
import { emptyField, showMessage, showToast } from "../Functions";
import { AuthContext } from "../contexts/AuthContext";

//import JobRequirements from "../components/JobRequirements";

const JobDetails = ({ route }) => {
  const {
    setRealoadPage,
    setPutReloadPage,
    putReloadPage,
    idUser,
    reloadPage,
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const [dataVaga, setDataVaga] = useState(
    route.params.dataVaga ?? {
      deficiencia: [],
      beneficio: [],
      formacaoDesejada: [],
      rquisitos: "",
    }
  );
  const [buttonsOptions, setButtonsOptions] = useState(0);

  const { type } = route.params;
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
      "Encountered two children with the same key",
      'Each child in a list should have a unique "key" prop',
    ]);
  }, []);

  console.log("PUT RELOAD", putReloadPage);
  console.log("POST RELOAD", reloadPage);

  useEffect(() => {
    let actionOK;
    let actionCancel;
    switch (buttonsOptions) {
      case 1:
        actionOK = "candidatada";
        actionCancel = "candidatar";
        break;
      case 2:
        actionOK = "salva";
        actionCancel = "salvar";
        break;
      case 3:
        actionOK = "dispensada";
        actionCancel = "dispensar";
        break;
    }

    if (
      buttonsOptions != undefined &&
      buttonsOptions != "" &&
      buttonsOptions != 0
    ) {
      if (type) {
        axiosURL
          .put(
            `vaga/candidatar?idVaga=${dataVaga.id}&idStatus=${buttonsOptions}&idCandidato=${idUser}`
          )
          .then((response) => {
            LogBox.ignoreLogs([
              "VirtualizedLists should never be nested",
              "Encountered two children with the same key",
              "Each child in a list should have a unique 'key' prop",
            ]);

            setPutReloadPage(buttonsOptions);
            showMessage(`Vaga ${actionOK} com sucesso`);
            console.log(`Vaga ${actionOK} com sucesso`);
          })
          .catch((error) => {
            showMessage(`Houve erro ao se ${actionCancel}`);
            console.log(`Houve erro ao se ${actionCancel} => `, error);
          });
      } else {
        axiosURL
          .post(
            `vaga/candidatar?idVaga=${dataVaga.id}&idStatus=${buttonsOptions}&idCandidato=${idUser}`
          )
          .then((response) => {
            LogBox.ignoreLogs([
              "VirtualizedLists should never be nested",
              "Encountered two children with the same key",
              "Each child in a list should have a unique 'key' prop",
            ]);

            setRealoadPage(buttonsOptions);
            showMessage(`Vaga ${actionOK} com sucesso`);
            console.log(`Vaga ${actionOK} com sucesso`);
          })
          .catch((error) => {
            showMessage(`Houve erro ao se ${actionCancel}`);
            console.log(`Houve erro ao se ${actionCancel}`);
          });
      }
    } else {
      console.log("nenhuma opcao escolhida");
    }
  }, [buttonsOptions]);

  // useEffect(() => {
  //   axiosURL
  //     .put(`vaga/candidatar/${1}?idStatus=${3}`)
  //     .then((response) => {
  //       return true;
  //     })
  //     .catch((error) => {
  //       return false;
  //     });
  // }, [buttonsOptions]);

  //METHOD POST -> salvar status da vaga como 'salva, dispensada, e candidata''
  const saveStatus = () => {
    setRealoadPage(buttonsOptions);
    let actionOK;
    let actionCancel;
    switch (buttonsOptions) {
      case 1:
        actionOK = "candidatada";
        actionCancel = "candidatar";
        break;
      case 2:
        actionOK = "salva";
        actionCancel = "salvar";
        break;
      case 3:
        actionOK = "dispensada";
        actionCancel = "dispensar";
        break;
    }

    if (
      buttonsOptions != undefined &&
      buttonsOptions != "" &&
      buttonsOptions != 0
    ) {
      console.log("button value =>", buttonsOptions);

      if (type) {
        axiosURL
          .put(`vaga/candidatar/${1}?idStatus=${3}`)
          .then((response) => {
            console.log(`Vaga ${actionOK} com sucesso`);
          })
          .catch((error) => {
            console.log(`Houve erro ao se ${actionCancel}`);
          });
      } else {
        axiosURL
          .post(
            `vaga/candidatar?idVaga=${dataVaga.id}&idStatus=${buttonsOptions}&idCandidato=1`
          )
          .then((response) => {
            showMessage(`Vaga ${actionOK} com sucesso`);
            console.log(`Vaga ${actionOK} com sucesso`);
          })
          .catch((error) => {
            showMessage(`Houve erro ao se ${actionCancel}`);
            console.log(`Houve erro ao se ${actionCancel}`);
          });
      }
    } else {
      console.log("nenhuma opcao escolhida");
    }
  };

  //console.log("opcao", buttonsOptions);

  const returnText = (objText, title) => {
    if (objText != "" && objText != null) {
      return (
        <>
          <Text style={style.requisitoVaga}>{title}</Text>
          <Text style={style.descricaoRequisitoVaga}>
            {dataVaga.requisitos}
          </Text>
        </>
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={style.content}>
        <View style={style.contentInformation}>
          <View style={style.firstPart}>
            <View style={style.viewCompanyLogo}>
              <Image
                style={style.companyLogo}
                source={{
                  uri: "https://sim.marica.rj.gov.br/img/icones/empresa2.png",
                }}
              />
            </View>
            <View style={style.viewInfoFirstPart}>
              <Text style={style.infoText}>{dataVaga.titulo}</Text>
              {dataVaga.deficiencia.map((type) => (
                <Text style={style.infoText}>
                  Deficiencia {type.tipoDeficiencia}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <View style={style.button}>
              <ButtonOptionsJob
                label="Candidatar-se"
                type="blue"
                icon="check-circle-outline"
                stateButton={setButtonsOptions}
                id={1}
                // functionClicked={saveStatus}
              />
              <ButtonOptionsJob
                label="Salvar"
                icon="bookmark-border"
                stateButton={setButtonsOptions}
                id={2}
                // functionClicked={saveStatus}
              />
              <ButtonOptionsJob
                label="Dispensar"
                icon="block"
                stateButton={setButtonsOptions}
                id={3}
                // functionClicked={saveStatus}
              />
            </View>
            <View style={style.details}>
              {returnText(dataVaga.requisitos, "Requisitos")}

              {dataVaga.salario && (
                <>
                  <Text style={style.requisitoVaga}>Salário</Text>
                  <Text style={style.descricaoRequisitoVaga}>
                    R$ {dataVaga.salario.salario}
                  </Text>
                </>
              )}

              <Text style={style.requisitoVaga}>Suporte</Text>
              {dataVaga.suporte &&
                dataVaga.suporte.map((item) => (
                  <Text style={style.descricaoRequisitoVaga}>
                    {item.suporte}
                  </Text>
                ))}

              <Text style={style.requisitoVaga}>Benefícios</Text>
              {dataVaga.beneficio &&
                dataVaga.beneficio.map((item) => (
                  <Text style={style.descricaoRequisitoVaga}>
                    {item.beneficio}
                  </Text>
                ))}

              <Text style={style.requisitoVaga}>Formaçoes Acadêmicas</Text>

              {dataVaga.formacaoDesejada &&
                dataVaga.formacaoDesejada.map((item) => (
                  <Text style={style.descricaoRequisitoVaga}>{item.curso}</Text>
                )) }

              <Text style={style.requisitoVaga}>Local de Trabalho</Text>

              {dataVaga.localTrabalho && (
                <Text style={style.descricaoRequisitoVaga}>
                  {dataVaga.localTrabalho.bairro},{" "}
                  {dataVaga.localTrabalho.cidade}/
                  {dataVaga.localTrabalho.estado}
                </Text>
              )}

              <Text style={style.requisitoVaga}>Horário</Text>

              <Text style={style.descricaoRequisitoVaga}>
                Horário Inicial : {dataVaga.horario.horarioInicio}
              </Text>
              <Text style={style.descricaoRequisitoVaga ?? "Não informado"}>
                Horário Final :{" "}
                {dataVaga.horario.horarioInicio ?? "Não informado"}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={style.linkCompanyProfile}
                onPress={() =>
                  navigation.navigate("Perfil da Empresa", {
                    idCompany: dataVaga.empresa.id,
                  })
                }
              >
                <View style={style.viewLinkImage}>
                  <Image
                    style={style.linkImage}
                    source={{
                      uri: "https://cdn.bettha.com/images/company/logo/menu_default.png",
                    }}
                  />
                </View>
                <Text style={style.linkText}>Visite nosso perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;

const style = StyleSheet.create({
  content: {
    padding: 10,
  },
  contentInformation: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "auto",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  firstPart: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    // backgroundColor: "yellow",
    height: 100,
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  viewCompanyLogo: {
    height: "100%",
    width: "25%",
  },
  viewInfoFirstPart: {
    display: "flex",
    // backgroundColor: "red",
    height: "100%",
    width: "72%",
  },

  infoText: {
    textTransform: "capitalize",
    marginBottom: 10,
    maxWidth: "100%",
    maxHeight: "100%",
    color: "black",
    fontSize: 14,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  companyLogo: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    marginTop: 20,
    width: "100%",
    minHeight: 10,
    marginBottom: 20,
  },
  viewLinkImage: {
    borderColor: "#1E7596",
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
    width: 30,
    height: 30,
  },
  linkCompanyProfile: {
    minHeight: 40,
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "#1E7596",
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    minWidth: 10,
    alignItems: "center",
  },
  linkImage: {
    width: "100%",
    height: "100%",
  },
  linkText: {
    color: "#1E7596",
  },
  requisitoVaga: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    // backgroundColor: "blue",
    minHeight: 10,
    width: "100%",
    fontSize: 15,
  },
  descricaoRequisitoVaga: {
    marginBottom: 10,
    textTransform: "capitalize",
    width: "100%",
    minHeight: 10,
    // backgroundColor: "yellow",
  },
});
