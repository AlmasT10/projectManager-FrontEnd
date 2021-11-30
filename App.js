import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen, { adminUser, isAdmin } from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProjectListScreen from "./screens/ProjectListScreen";
import MembersScreen from "./screens/MembersScreen";
import AddNewProjectScreen from "./screens/AddNewProjectScreen";
import { Button } from "react-native-elements";
import {
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { auth } from "./firebase";
import { useNavigation } from "@react-navigation/core";
import ProfileScreen from "./screens/ProfileScreen";
import TaskListScreen from "./screens/TaskListScreen";
import AddNewTaskScreen from "./screens/AddNewTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import ProjectMemberScreen from "./screens/ProjectMemberScreen";
import ProjectSalaryScreen from "./screens/ProjectSalaryScreen";

import Auth from "./context/store/Auth";
import AuthGlobal from "./context/store/AuthGlobal";
// import { userAdmin } from "./context/actions/authActions";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  // console.log(userAdmin);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: (props) => (
            <Button
              icon={<FontAwesome5 name="home" size={24} color="black" />}
              type="clear"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProjectStack"
        component={ProjectStack}
        options={{
          tabBarLabel: "Project",
          headerShown: false,
          tabBarIcon: (props) => (
            <Button
              icon={<FontAwesome5 name="folder-open" size={24} color="black" />}
              type="clear"
            />
          ),
        }}
      />
      {adminUser === true ? (
        <Tab.Screen
          name="MembersStack"
          component={MemberStack}
          options={{
            tabBarLabel: "Members",
            headerShown: false,
            tabBarIcon: (props) => (
              <Button
                icon={<FontAwesome name="group" size={24} color="black" />}
                type="clear"
              />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => (
            <Button
              icon={<FontAwesome5 name="user-circle" size={24} color="black" />}
              type="clear"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  const navigation = useNavigation();
  const signOut = () => {
    auth.signOut();
    navigation.navigate("Login");
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: (props) => (
            <Button
              icon={<SimpleLineIcons name="logout" size={24} color="black" />}
              type="clear"
              onPress={() => signOut()}
            />
          ),
          headerRight: (props) => (
            <Button
              icon={
                <Ionicons name="chatbubbles-outline" size={24} color="black" />
              }
              type="clear"
            />
          ),
        }}
      />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
    </Stack.Navigator>
  );
}

function ProjectStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectListScreen} />
      <Stack.Screen name="NewProject" component={AddNewProjectScreen} />
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="CreateTask" component={AddNewTaskScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen name="ProjectMember" component={ProjectMemberScreen} />
    </Stack.Navigator>
  );
}

function MemberStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="MemberSalary" component={ProjectSalaryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
