import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const register = async () => {
    console.log(
      "username:" +
        data1.username +
        " " +
        "password" +
        data1.password +
        " " +
        data1.confirmPassword
    );
    try {
      const response = await Axios.post("http://localhost:8000/data/register", {
        username: data1.username,
        password: data1.password,
        confirmPassword: data1.confirmPassword,
      });
      if (response.status === 200) {
        Alert.alert("Registration successful!");
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      alert("Error!");
    }
  };

  const [data1, setData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    isValidUser: true,
    isValidPassword: true,
  });

  const setUsername = (val) => {
    if (val.length >= 4) {
      setData({
        ...data1,
        username: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data1,
        username: val,
        isValidUser: false,
      });
    }
  };

  const setPassword = (val) => {
    if (val.length >= 8) {
      setData({
        ...data1,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data1,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const setConfirmPassword = (val) => {
    if (val.length >= 8) {
      setData({
        ...data1,
        confirmPassword: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data1,
        confirmPassword: val,
        isValidPassword: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={styles.backButton}
>
  <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.View1}>
        <Text style={styles.userdata}>Username:</Text>
        <TextInput
          placeholder="Enter Username"
          style={styles.username}
          onChangeText={(e) => setUsername(e)}
        />
        <Text style={styles.userdata}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.username}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
        />
        <Text style={styles.userdata}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          style={styles.username}
          onChangeText={(e) => setConfirmPassword(e)}
          secureTextEntry
        />
        <TouchableOpacity>
          <LinearGradient
            colors={["#C70039", "#C70039"]}
            style={styles.LoginUser}
          >
            <Text style={styles.Button1} onPress={register}>
              SignUp
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: '#E6D5B8',
  },
  View1: {
    marginTop: 60,
    backgroundColor: "#fff",
    height: 700,
    paddingTop: 80,
    alignContent: 'center',
    alignSelf: "center",
    width: "95%",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.5)", 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  username: {
    fontFamily: "sans-serif",
    alignSelf: "center",
    padding: 18,
    textAlign: "center",
    borderBottomColor: "rgba(100,50,40,0.2)",
    borderBottomWidth: 1,
    borderWidth: 2,
    borderColor: "rgba(100,50,40,0.2)",
    width: "70%",
    backgroundColor: "#d8dbd7",
    justifyContent: "center",
    fontSize: 20,
    borderRadius: 10,
  },
  userdata: {
    paddingTop: 20,
    paddingBottom: 10,
    alignSelf: "center",
    color: "#080808",
    fontSize: 20,
    justifyContent: "center",
  },
  LoginUser: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    width: "70%",
  },
  Button1: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
});
