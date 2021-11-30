import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import {
  Text,
  Input,
  Button,
  Icon,
  CheckBox,
  Card,
} from "react-native-elements";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import baseURL from "../assets/common/baseURL";
import { useNavigation } from "@react-navigation/core";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  // const [user, setUser] = useState({ id, name, email, phone });

  const signUp = () => {
    let user = {
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status != 400) {
          navigation.navigate("MyTabs");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.outContainer}>
      <ScrollView>
        <View style={styles.container} behavior="padding">
          <View>
            <Text h2 style={styles.text}>
              Create New Account
            </Text>
          </View>
          <Card containerStyle={styles.card}>
            <View>
              <Input
                labelStyle={styles.inputLabel}
                inputStyle={{ color: "#f1faee" }}
                label="Name"
                placeholder="Enter Name"
                inputContainerStyle={styles.inputContainer}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <Input
                labelStyle={styles.inputLabel}
                inputStyle={{ color: "#f1faee" }}
                label="Email"
                placeholder="Enter Email"
                inputContainerStyle={styles.inputContainer}
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
              />
              <Input
                labelStyle={styles.inputLabel}
                inputStyle={{ color: "#f1faee" }}
                label="Password"
                placeholder="Enter Password"
                inputContainerStyle={styles.inputContainer}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
              <Input
                labelStyle={styles.inputLabel}
                inputStyle={{ color: "#f1faee" }}
                label="Confirm Password"
                placeholder="Enter Password again"
                inputContainerStyle={styles.inputContainer}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text h4 style={styles.text}>
                  Admin?{" "}
                </Text>
                <CheckBox
                  checked={isAdmin}
                  onIconPress={() => setAdmin(!isAdmin)}
                />
              </View>

              <View>
                <Button
                  title="Sign Up"
                  onPress={() => {
                    signUp();
                  }}
                />
              </View>
            </View>
          </Card>
          <View style={styles.oldUser}>
            <Text h4 style={styles.text}>
              Already a Member?
            </Text>
            <Button
              title="Login"
              onPress={() => {
                navigation.goBack();
              }}
              type="clear"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    backgroundColor: "#1d3557",
  },
  container: {
    paddingTop: 100,
    justifyContent: "center",
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
  oldUser: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});
