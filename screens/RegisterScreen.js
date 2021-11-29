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
import { Text, Input, Button, Icon, CheckBox } from "react-native-elements";
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
    <ScrollView>
      <View style={styles.container} behavior="padding">
        <View>
          <Text h2>Create New Account</Text>
        </View>
        <View>
          <Input
            label="Name"
            placeholder="Enter Name"
            inputContainerStyle={styles.inputContainer}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            label="Email"
            placeholder="Enter Email"
            inputContainerStyle={styles.inputContainer}
            value={email}
            onChangeText={(text) => setEmail(text)}
            textContentType="emailAddress"
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            inputContainerStyle={styles.inputContainer}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Input
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
            }}
          >
            <Text h4>Admin? </Text>
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
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "white",
  },
});
