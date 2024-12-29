import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

interface TabIconProps {
  icon: any;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 w-20">
      <Ionicons color={focused ? "white" : "#8f8989"} size={24} name={icon} />
      <Text
        className={
          focused ? "text-white font-semibold" : "text-[#8f8989] font-normal"
        }
      >
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#8f8989",
          tabBarActiveTintColor: "#f0e9e9",
          tabBarStyle: {
            backgroundColor: "#011",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            paddingTop: 10,
            height: 90,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"home"} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: "Music",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"musical-notes"} name="Music" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"map"} name="Map" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="travel"
          options={{
            title: "Travel",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"airplane"} name="Travel" focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
