import React, { useEffect, useContext, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Icon, Input, Text } from "react-native-elements";

import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import baseURL from "../assets/common/baseURL";
import AuthGlobal from "../context/store/AuthGlobal";
import { isAdmin, loginUser } from "../context/actions/authActions";
export let adminUser;

const LoginScreen = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setVisible] = useState(false);

  const navigation = useNavigation();

  const signIn = () => {
    let user = {
      email: email.toLowerCase(),
      password: password,
    };

    axios
      .get(`${baseURL}users/?${user.email}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        for (var x in data) {
          if (data[x].email.toLowerCase() === user.email.toLowerCase()) {
            adminUser = data[x].isAdmin;
            console.log("Admin User " + adminUser);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (email == "" || password == "") {
      console.log("error login");
    } else {
      loginUser(user);
      navigation.navigate("MyTabs");
    }

    // axios
    //   .post(`${baseURL}users/login`, user)
    //   .then((res) => {
    //     if (res.status == 200) {
    //       navigation.navigate("MyTabs");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text h1 style={styles.text}>
          Project-M
        </Text>
      </View>
      <Card containerStyle={styles.card}>
        <View>
          <Input
            labelStyle={styles.inputLabel}
            inputStyle={{ color: "#f1faee" }}
            label="Email"
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            labelStyle={styles.inputLabel}
            inputStyle={{ color: "#f1faee" }}
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputContainerStyle={styles.inputContainer}
            secureTextEntry={isVisible}
            rightIcon={
              <Icon
                name="remove-red-eye"
                size={24}
                color="#f1faee"
                onPress={() => setVisible(!isVisible)}
              />
            }
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
      </Card>
      <View style={styles.newUser}>
        <Text h4 style={styles.text}>
          New User?
        </Text>
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
    backgroundColor: "#1d3557",
    flex: 1,
    paddingBottom: 100,
    paddingTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "#fff2",
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#f1faee",
    shadowOffset: { width: 2, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  newUser: {
    marginTop: 20,
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(230, 57, 70, 0.5)",
    borderRadius: 20,
    paddingVertical: 50,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  text: {
    color: "rgba(241, 250, 238, 1)",
  },
  inputLabel: {
    color: "rgba(241, 250, 238, 1)",
  },
});
