import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Workout {
  id: string;
  name: string;
  muscleGroups: string[];
}

export default function Index() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/workout/user/1"
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      {workouts.map((workout) => (
        <Pressable
          key={workout.id}
          onPress={() => router.push(`/workout/${workout.id}`)}
          android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
          style={({ pressed }) => [
            styles.cardContainer,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>{workout.name}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardContentText}>
              {workout.muscleGroups.join(", ")}
            </Text>
          </View>
        </Pressable>
      ))}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/workout/create")}
      >
        <FontAwesome name="plus" size={18} color="#25292e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#333333",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444444",
    width: 350,
    height: 125,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  cardHeader: {
    justifyContent: "center",
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    justifyContent: "center",
  },
  cardContentText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    flex: 1,
    padding: 40,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  floatingButton: {
    backgroundColor: "#05a2ba",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
