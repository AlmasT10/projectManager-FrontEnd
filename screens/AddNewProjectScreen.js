import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Text,
  Input,
  Button,
  Icon,
  ListItem,
  Avatar,
  CheckBox,
  Overlay,
  ButtonGroup,
} from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { v4 as uuidv4 } from "uuid";
import ProjectMemberScreen from "./ProjectMemberScreen";
import { AddProjectData } from "../api/firebaseFunctions";
import { readData } from "../api/firebaseFunctions";
import { auth } from "../firebase";
import axios from "axios";
import baseURL from "../assets/common/baseURL";

const AddNewProjectScreen = (props) => {
  const [id, setId] = useState("Project - " + uuidv4());
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [data, setData] = useState();
  const navigation = useNavigation();
  let user = "Admin";
  // const AddProjectMembers = () => {
  //   setProject({members:})
  // }

  const handleCallback = (childData) => {
    setData(childData);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4 style={{ paddingBottom: 20 }}>
          Project Details
        </Text>
        <Input
          label="Project Id"
          editable={false}
          value={id}
          onChangeText={(text) => setId(text)}
        />
        <Input
          label="Project Name"
          placeholder="Project Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          label="Project Type"
          placeholder="Project Type"
          value={type}
          onChangeText={(text) => setType(text)}
        />
        <Input
          label="Start Date"
          placeholder="MM/DD/YYYY"
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
          rightIcon={
            <Icon
              name="calendar"
              type="font-awesome"
              color="black"
              onPress={() => {}}
            />
          }
        />
        <Input
          label="End Date"
          placeholder="MM/DD/YYYY"
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
          rightIcon={
            <Icon
              name="calendar"
              type="font-awesome"
              color="black"
              onPress={() => {}}
            />
          }
        />
        <View style={styles.memberContainer}>
          <Text h4 style={{ paddingBottom: 20 }}>
            Members
          </Text>
          {/* <Icon
            raised
            name="right"
            type="antdesign"
            color="black"
            size={16}
            onPress={() => {
              navigation.navigate("ProjectMember");
            }}
          /> */}
        </View>
        <ProjectMemberScreen parentCallback={handleCallback} />
        <Button
          title="Save"
          onPress={() => {
            let project = {
              name: name,
              type: type,
              createdBy: user,
              starDate: startDate,
              endDate: endDate,
              members: data,
              status: false,
            };
            axios
              .post(`${baseURL}projects/`, project)
              .then((res) => {
                if (res.status != 400) {
                  navigation.navigate("Projects");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddNewProjectScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
  },
  memberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.7,
  },
});
