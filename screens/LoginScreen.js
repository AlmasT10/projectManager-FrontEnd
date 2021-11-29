import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";

import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import baseURL from "../assets/common/baseURL";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const signIn = () => {
    let user = {
      email: email.toLowerCase(),
      password: password,
    };

    axios
      .post(`${baseURL}users/login`, user)
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("MyTabs");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text h1>Project-M</Text>
      </View>
      <View>
        <Input
          label="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputContainerStyle={styles.inputContainer}
          secureTextEntry={true}
        />
        <View>
          <Button
            title="Login"
            onPress={() => {
              signIn();
            }}
          />
        </View>
      </View>

      <View style={styles.newUser}>
        <Text h4>New User?</Text>
        <Button
          title="Register"
          onPress={() => {
            props.navigation.navigate("Register");
          }}
          type="clear"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "white",
    padding: 5,
    marginVertical: 5,
  },
  newUser: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
