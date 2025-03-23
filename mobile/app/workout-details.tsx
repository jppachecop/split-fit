import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import Button from "@/components/Button";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export default function WorkoutDetailsScreen() {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "", weight: "" },
  ]);

  const toggleMuscleGroup = (muscle: string) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle)
        ? prev.filter((m) => m !== muscle)
        : [...prev, muscle]
    );
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const updateExercise = (
    index: number,
    field: keyof Exercise,
    value: string
  ) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Workout details screen</Text>
          <TextInput style={styles.input} placeholder="Nome do treino" />
        </View>
        <View>
          <Text style={styles.text}>Grupos Musculares</Text>
          <View style={styles.checkboxContainer}>
            {[
              "Peito",
              "Costas",
              "Pernas",
              "Braços",
              "Biceps",
              "Triceps",
              "Ombro",
              "Glúteo",
            ].map((muscle) => (
              <Pressable
                key={muscle}
                style={styles.checkboxRow}
                onPress={() => toggleMuscleGroup(muscle)}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={selectedMuscles.includes(muscle)}
                  onValueChange={() => toggleMuscleGroup(muscle)}
                  color={
                    selectedMuscles.includes(muscle) ? "#007AFF" : undefined
                  }
                />
                <Text style={styles.checkboxLabel}>{muscle}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Exercícios</Text>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <TextInput
                style={styles.exerciseInput}
                placeholder="Nome do exercício"
                value={exercise.name}
                onChangeText={(value) => updateExercise(index, "name", value)}
              />
              <TextInput
                style={styles.exerciseInput}
                placeholder="Séries"
                keyboardType="numeric"
                value={exercise.sets}
                onChangeText={(value) => updateExercise(index, "sets", value)}
              />
              <TextInput
                style={styles.exerciseInput}
                placeholder="Repetições"
                keyboardType="numeric"
                value={exercise.reps}
                onChangeText={(value) => updateExercise(index, "reps", value)}
              />
              <TextInput
                style={styles.exerciseInput}
                placeholder="Peso"
                keyboardType="numeric"
                value={exercise.weight}
                onChangeText={(value) => updateExercise(index, "weight", value)}
              />
            </View>
          ))}
          <Button
            theme="primary"
            label="Adicionar exercício"
            onPress={addExercise}
            icon="plus"
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            label="Salvar"
            onPress={() => console.log("Salvar")}
            theme="primary"
            icon="save"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "flex-start",
    padding: 40,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#333333",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444444",
    height: 40,
    padding: 10,
    marginTop: 10,
    color: "#fff",
  },
  checkboxContainer: {
    width: "100%",
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#444444",
    backgroundColor: "#333333",
    marginRight: 10,
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 16,
  },
  exerciseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444444",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 10,
  },
  exerciseInput: {
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#444444",
    padding: 10,
    width: "60%",
  },
});
