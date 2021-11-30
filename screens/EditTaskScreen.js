import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Switch } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import baseURL from "../assets/common/baseURL";
// import { editTasks } from "../api/firebaseFunctions";

const EditTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const task = route.params.task;

  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const [hrsWorked, setHrsWorked] = useState(task.hoursWorked);
  const [comments, setComments] = useState(task.comments);

  const [isEnabled, setIsEnabled] = useState(task.status);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input label="Task Id" editable={false} value={task.id} />
        <Input
          label="Task Name"
          placeholder="Enter Task Name"
          editable={false}
          value={task.name}
        />
        <Input
          label="Task Type"
          placeholder="Enter Task Type"
          editable={false}
          value={task.description}
        />
        <Input label="Project Name" editable={false} value={task.project} />
        <Input label="Member Email Id" editable={false} value={task.member} />
        <Input
          label="Start Date"
          placeholder="MM/DD/YYYY"
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
        />
        <Input
          label="End Date"
          placeholder="MM/DD/YYYY"
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
        />
        <Input
          label="Hrs Worked"
          keyboardType="numeric"
          value={hrsWorked}
          onChangeText={(text) => setHrsWorked(text)}
        />
        <View style={styles.switchView}>
          <Text style={{ fontSize: 18 }}>Status: </Text>
          <Switch
            trackColor={{ false: "white", true: "blue" }}
            thumbColor={isEnabled ? "red" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Input
          label="Comments"
          multiline={true}
          value={comments}
          onChangeText={(text) => setComments(text)}
        />

        <Button
          title="Save"
          onPress={() => {
            const t = {
              name: task.name,
              description: task.type,
              project: task.project,
              startDate: startDate,
              endDate: endDate,
              hoursWorked: 0,
              status: isEnabled,
            };
            axios
              .put(`${baseURL}tasks/taskQ.id`, t)
              .then((res) => {
                navigation.goBack();
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

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  switchView: {
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
