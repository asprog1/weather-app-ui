import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { musicData } from "@/data/music";
import Slider from "@react-native-community/slider";
import NeumorphicButton from "@/components/mine/NeumorphicButton";

type MusicItem = {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork: string;
};

const BOTTOM_PLAYER_HEIGHT = 80;

const Music: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);

  const currentSong: MusicItem = musicData[currentSongIndex];

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (sound && isPlaying) {
      interval = setInterval(async () => {
        const status = (await sound.getStatusAsync()) as AVPlaybackStatus;
        if (status.isLoaded && !status.didJustFinish) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 1);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sound, isPlaying]);

  const playSound = async (index: number) => {
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: musicData[index].url },
      { shouldPlay: true }
    );

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) handleNext();
    });

    setSound(newSound);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % musicData.length;
    playSound(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentSongIndex - 1 < 0 ? musicData.length - 1 : currentSongIndex - 1;
    playSound(prevIndex);
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const formatTime = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const renderSong: ListRenderItem<MusicItem> = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 4,
        backgroundColor: currentSongIndex === index ? "#383838" : "transparent",
        borderRadius: 12,
      }}
      onPress={() => playSound(index)}
    >
      <Image
        source={{ uri: item.artwork }}
        style={{ width: 48, height: 48, borderRadius: 24 }}
      />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
          {item.title}
        </Text>
        <Text style={{ color: "#999", fontSize: 14 }}>{item.artist}</Text>
      </View>
      {currentSongIndex === index && (
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={24}
          color="#E17645"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
      <StatusBar barStyle="light-content" />
      {!showPlaylist ? (
        <View className="flex-1 px-6 pt-12">
          <View className="flex-row justify-between items-center mb-8">
            <TouchableOpacity onPress={() => setShowPlaylist(true)}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-medium">PLAYING NOW</Text>
            <TouchableOpacity>
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-8">
            <View
              className="w-72 h-72 rounded-full overflow-hidden shadow-2xl shadow-white/40"
              style={{
                shadowColor: "#E17645",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Image
                source={{ uri: currentSong.artwork }}
                className="w-full h-full border-[8px] border-gray-800 rounded-full"
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="items-center mb-8">
            <Text className="text-white text-2xl font-bold mb-2">
              {currentSong.title}
            </Text>
            <Text className="text-gray-400 text-lg">{currentSong.artist}</Text>
          </View>

          <View className="mb-8">
            <Slider
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor="#E17645"
              maximumTrackTintColor="#4A4A4A"
              thumbTintColor="#E17645"
            />
            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-400">{formatTime(position)}</Text>
              <Text className="text-gray-400">{formatTime(duration)}</Text>
            </View>
          </View>

          <View className="flex-row justify-center items-center gap-8">
            <TouchableOpacity onPress={handlePrev}>
              <NeumorphicButton
                icon="play-skip-back"
                size={50}
                color="#808080"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              className="w-16 h-16 rounded-full bg-[#E17645] items-center justify-center"
            >
              <NeumorphicButton
                icon={isPlaying ? "pause" : "play"}
                size={60}
                color="#E17645"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <NeumorphicButton
                icon="play-skip-forward"
                size={50}
                color="#808080"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Playlist Screen
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity>
              <Ionicons name="heart" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              {currentSong.artist.toUpperCase()}
            </Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Playlist */}
          <FlatList
            data={musicData}
            renderItem={renderSong}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: BOTTOM_PLAYER_HEIGHT + 20,
            }}
          />

          {/* Bottom Player */}
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: BOTTOM_PLAYER_HEIGHT,
              backgroundColor: "#2A2A2A",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
            onPress={() => setShowPlaylist(false)}
          >
            <Image
              source={{ uri: currentSong.artwork }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ color: "white", fontSize: 16 }}>
                {currentSong.title}
              </Text>
              <Text style={{ color: "#999", fontSize: 14 }}>
                {currentSong.artist}
              </Text>
            </View>
            <TouchableOpacity onPress={handlePlayPause}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={40}
                color="#E17645"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Music;
