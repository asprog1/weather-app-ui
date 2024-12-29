import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import backgroundImage from "@/assets/weatherapp/cloud.jpg";
import profile from "@/assets/weatherapp/person.jpg";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import satelitemap from "@/assets/weatherapp/city satelite view.jpg";

const { height: screenHeight } = Dimensions.get("window");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daynum = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1];

const index = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "#111"]}
          style={styles.gradient}
        />
        <SafeAreaView>
          <View className="mx-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-end">
                <Text className="text-white text-[70px] font-bold">
                  72&#176;
                </Text>
                <Text className="text-white text-[36px] font-semibold">
                  c, London
                </Text>
              </View>
              <View>
                <Image
                  source={profile}
                  alt="Person"
                  width={24}
                  height={24}
                  className="w-16 h-16 rounded-full"
                />
              </View>
            </View>
            <View className="mt-4">
              <View className="my-1 flex-row items-center gap-3">
                <Ionicons name="cloudy-night" size={20} color={"white"} />
                <Text className="text-white text-xl font-semibold">
                  It's foggy
                </Text>
              </View>
              <View className="my-1 flex-row items-center gap-3">
                <Ionicons name="thermometer" size={20} color={"white"} />
                <Text className="text-white text-xl font-semibold">
                  Real feel: 16&#176;
                </Text>
              </View>
              <View className="my-1 flex-row items-center gap-3">
                <Ionicons name="swap-horizontal" size={20} color={"white"} />
                <Text className="text-white text-xl font-semibold">
                  Wind: WSW 6mhp
                </Text>
              </View>
              <View className="my-1 flex-row items-center gap-3">
                <Ionicons name="trending-down" size={20} color={"white"} />
                <Text className="text-white text-xl font-semibold">UV: 7</Text>
              </View>
            </View>

            <View className="mt-24">
              <View className="flex-row gap-3 items-center">
                <Text className="text-white text-2xl font-semibold">
                  Event Calender
                </Text>
                <View className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Ionicons name="add" size={20} />
                </View>
              </View>
              <View className="mt-2">
                <View className="flex-row justify-between">
                  {days.map((day) => (
                    <View
                      key={day}
                      className="w-12 flex items-center justify-center"
                    >
                      <Text className="text-gray-300 text-sm font-semibold">
                        {day}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="mt-2">
                <View className="flex-row justify-between">
                  {daynum.slice(0, 7).map((day, index) => (
                    <View
                      key={index}
                      className={`flex justify-center items-center w-12 h-12 border border-gray-300 ${
                        index === 3 ? "bg-gray-300" : "bg-transparent"
                      } rounded-full`}
                    >
                      <Text
                        className={`${
                          index === 3 ? "text-black" : "text-gray-300"
                        } text-sm font-semibold`}
                      >
                        {day}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="flex-row justify-between mt-3">
                  {daynum.slice(7, 14).map((day) => (
                    <View
                      key={day}
                      className="flex justify-center items-center w-12 h-12 border border-gray-300 rounded-full"
                    >
                      <Text className="text-gray-300 text-sm font-semibold">
                        {day}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View className="flex-row h-72 mt-16 flex gap-3 items-center">
              <View className="w-1/2 h-full rounded-lg relative">
                <Image
                  source={satelitemap}
                  className="w-full h-full rounded-lg"
                />
                <View className="absolute bg-black/60 top-4 left-4 right-4 px-3 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="location" size={16} color={"white"} />
                  <Text numberOfLines={1} className="text-white">
                    Unit 43, The Colon...
                  </Text>
                </View>
                <View className="bg-black/80 rounded-full flex items-center justify-center w-14 h-14 absolute bottom-4 right-4">
                  <Ionicons name="compass" size={24} color={"white"} />
                </View>
              </View>
              <View className="w-1/2 h-full rounded-lg flex flex-col gap-3">
                <View className="bg-gray-900 h-32 rounded-lg p-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[52px] text-white font-bold">16</Text>
                    <View className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded-full">
                      <Ionicons name="resize" size={20} color={"b;ack"} />
                    </View>
                  </View>
                  <Text className="text-sm text-gray-200 mt-4">
                    Top beautiful trails nearby
                  </Text>
                </View>
                <View className="bg-gray-900 h-32 rounded-lg p-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[52px] text-white font-bold">5</Text>
                    <View className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded-full">
                      <Ionicons name="resize" size={20} color={"b;ack"} />
                    </View>
                  </View>
                  <Text className="text-sm text-gray-200 ">
                    Personalized activity recommendations
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: screenHeight * 0.7,
    backgroundColor: "#111",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "20%",
    height: "50%",
  },
});
