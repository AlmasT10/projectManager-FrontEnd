import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Button,
  Text,
  ListItem,
  Avatar,
  CheckBox,
  FAB,
} from "react-native-elements";
import {
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { auth } from "../firebase";
import { LinearProgress } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { readProjectTasks } from "../api/firebaseFunctions";
import axios from "axios";
import baseURL from "../assets/common/baseURL";
import { adminUser } from "./LoginScreen";

const TaskListScreen = ({ route }) => {
  const navigation = useNavigation();
  const pName = route.params.title;
  const [list, setList] = useState([]);

  console.log(pName);

  // const list = readProjectTasks(pName);

  useEffect(() => {
    axios
      .get(`${baseURL}tasks/${pName}`)
      .then((res) => {
        setList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setList([]);
    };
  }, []);
  // const list = [
  //   {
  //     name: "Task 1",
  //     subtitle: "Almas",
  //   },
  //   {
  //     name: "Task 2",
  //     subtitle: "Almas",
  //   },
  //   {
  //     name: "Task 2",
  //     subtitle: "xyz",
  //   },
  //   {
  //     name: "Task 1",
  //     subtitle: "xyz",
  //   },
  //   {
  //     name: "Task 2",
  //     subtitle: "Almas",
  //   },
  // ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      containerStyle={{
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#a8dadccc",
      }}
      onPress={() => {
        navigation.navigate("EditTask", { task: item });
      }}
    >
      <CheckBox checked={item.status} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>

        <Text>End Date: {item.endDate}</Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
        />
      </View>
      {adminUser === true ? (
        <FAB
          icon={<Ionicons name="add-outline" size={24} color="white" />}
          placement="right"
          style={styles.fab}
          onPress={() => {
            navigation.navigate("CreateTask", { projectName: pName });
          }}
        />
      ) : null}
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1d3557cc",
  },
  fab: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
