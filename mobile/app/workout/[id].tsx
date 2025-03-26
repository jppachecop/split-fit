import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Workout {
  id: string;
  name: string;
  muscleGroups: string[];
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

const MuscleGroup = [
  { label: "Peito", value: "CHEST" },
  { label: "Costas", value: "BACK" },
  { label: "Pernas", value: "LEGS" },
  { label: "Braços", value: "ARMS" },
  { label: "Ombro", value: "SHOULDERS" },
  { label: "Glúteo", value: "GLUTES" },
  { label: "Biceps", value: "BICEPS" },
  { label: "Triceps", value: "TRICEPS" },
];

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await axios.get(`http://localhost:3000/workout/${id}`);
      setWorkout(response.data);
    };

    fetchWorkout();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout?.name}</Text>
      <View style={styles.muscleGroupsContainer}>
        <Text style={styles.text}>Grupos Musculares:</Text>
        <View style={styles.labelMuscleGroupsContainer}>
          {workout?.muscleGroups.map((muscleGroup) => (
            <View key={muscleGroup} style={styles.muscleGroupRow}>
              <View style={styles.dot} />
              <Text style={styles.muscleGroups}>
                {MuscleGroup.find((mg) => mg.value === muscleGroup)?.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        {workout?.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseText}>{exercise.sets} séries</Text>
              <Text style={styles.exerciseText}>
                {exercise.reps} repetições
              </Text>
              <Text style={styles.exerciseText}>{exercise.weight} kg</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#25292e",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  muscleGroupsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
  },
  labelMuscleGroupsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    paddingLeft: 10,
  },
  muscleGroupRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50", // You can change this color
  },
  muscleGroups: {
    fontSize: 16,
    color: "#fff",
  },
  exercisesContainer: {
    width: "100%",
    gap: 10,
  },
  exerciseCard: {
    backgroundColor: "#2f3542",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  exerciseDetails: {
    gap: 4,
  },
  exerciseText: {
    fontSize: 14,
    color: "#a4b0be",
  },
});
