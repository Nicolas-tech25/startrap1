import {
    Alert,
    Pressable,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
  } from "react-native";
  import * as React from 'react';
//   import { Checkbox } from 'react-native-paper';
  import { auth } from "../../firebase.config";
  import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { useState } from "react";
  import logo from "../../assets/logo.png";
  
  export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // const [checked, setChecked] = React.useState(false);
  
    const login = async () => {
      if (!email || !senha) {
        Alert.alert("Atenção", "Preencha e-mail e senha");
        return;
      }
      // console.log(senha, email);
  
      try {
        await signInWithEmailAndPassword(auth, email, senha);
        navigation.navigate("Home");
      } catch (error) {
        console.error(error.code);
        let mensagem;
        switch (error.code) {
          case "auth/invalid-credential":
            mensagem = "Dados inválidos!";
            break;
          case "auth/invalid-email":
            mensagem = "Endereço de e-mal inválido!";
            break;
  
          default:
            mensagem = "Houve um erro, tente mais tarde!";
            break;
        }
        Alert.alert("Ops!", mensagem);
      }
    };
  
    const recuperarSenha = async () => {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert("Recuperar senha", "Verifique a sua caixa de e-mails!");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <ScrollView style={estilos.container}>
        <Image style={estilos.logo} source={logo} />
          <View style={estilos.formulario}>
  
            <View style={estilos.inputs}>
              <Text style={estilos.titulo}>E-mail</Text>
              <TextInput
                onChangeText={(valor) => setEmail(valor)}
                placeholder="Entre com seu e-mail"
                placeholderTextColor="#6f6f6f" // Cor do texto do placeholder
                style={[estilos.input, { color: "#6f6f6f" }]}
              />
            </View>
  
            <View style={estilos.inputs}>
            <Text style={estilos.titulo}>Senha</Text>
            <TextInput
              onChangeText={(valor) => setSenha(valor)}
              placeholder="Entre com a sua senha"
              placeholderTextColor="#6f6f6f" // Cor do texto do placeholder
              style={[estilos.input, { color: "#6f6f6f" }]}
              secureTextEntry
            />
            </View>
  
            <View>
              <View style={estilos.botaoRecuperar}>
  
              <Pressable  onPress={recuperarSenha}>
                <Text style={estilos.textoBotaoRecuperar}>Recuperar a senha</Text>
              </Pressable>
  
              </View>
  
              <Pressable style={estilos.botoes} onPress={login}>
                <Text style={estilos.textoBotao}>Login</Text>
              </Pressable>
  
              <Pressable
                style={estilos.textoBotaoCadastro}
                onPress={recuperarSenha}
              >
                <Text style={{ color: "#f8f8f8", fontWeight: "bold" }}>
                  Ainda não possui cadastro?{" "}
                  <Text
                    style={estilos.textoBotaoCadastro}
                    onPress={() => navigation.navigate("Cadastro")}
                  >
                    Cadastre-se
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  
  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    logo: {
      width: "85%",
      height: 100,
      alignSelf: "center",
      marginVertical: 90,
    },
    formulario: {
      padding: 15,
    },
    input: {
      borderWidth: 1,
      padding: 15,
      borderColor: "#ffffff",
      backgroundColor: "#ffffff",
      color: "#6f6f6f",
      borderRadius: 7,
      marginVertical: 10,
      width:"90%",
      marginHorizontal:10,
    },
    botoes: {
      borderWidth: 1,
      padding: 10,
      borderColor: "#FFDE59",
      borderRadius: 7,
      marginVertical: 10,
      width:"90%",
      backgroundColor: "#FFDE59",
      alignItems: "center",
      alignSelf: "center",
    },
    textoBotao: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
    },
    botaoRecuperar: {
      padding: 0,
      marginBottom: 30,
      justifyContent: "space-between",
      flexDirection: "row",
      marginVertical: 4,
      marginHorizontal:10,
    },
    textoBotaoRecuperar: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#f8f8f8",
    },
    botaoCadastro: {
      padding: 0,
      marginVertical: 4,
      alignItems: "center",
    },
    textoBotaoCadastro: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#FFDE59",
      alignItems: "center",
    },
    titulo: {
      fontSize: 18,
      fontWeight: "bold",
      color:"f8f8f8",
      marginHorizontal:10,
    },
  
  });