import Button from "@/components/Button";
import axios from "axios";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutFormData {
  name: string;
  muscleGroups: string[];
  exercises: Exercise[];
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

const PLACEHOLDER_COLOR = "#ffffff64";

export default function WorkoutDetailsScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: 0, reps: 0, weight: 0 },
  ]);

  const { control, handleSubmit, setValue } = useForm<WorkoutFormData>({
    defaultValues: {
      name: "",
      muscleGroups: [],
      exercises: [{ name: "", sets: 0, reps: 0, weight: 0 }],
    },
  });

  const toggleMuscleGroup = (muscle: string, value: string[]) => {
    setValue("muscleGroups", [...value, muscle]);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const onSubmit = async (data: WorkoutFormData) => {
    console.log(data);

    try {
      const response = await axios.post("http://localhost:3000/workout", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Crie o seu treino</Text>
        <View style={{ width: "100%" }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nome do treino"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={PLACEHOLDER_COLOR}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.text}>Grupos Musculares</Text>
          <View style={styles.checkboxContainer}>
            <View style={{ width: "50%" }}>
              {MuscleGroup.slice(0, 4).map((muscle) => (
                <Controller
                  key={muscle.value}
                  control={control}
                  name={`muscleGroups`}
                  render={({ field: { value } }) => (
                    <Pressable
                      key={muscle.value}
                      style={styles.checkboxRow}
                      onPress={() => toggleMuscleGroup(muscle.value, value)}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={value.includes(muscle.value)}
                        onValueChange={() =>
                          toggleMuscleGroup(muscle.value, value)
                        }
                        color={
                          value.includes(muscle.value) ? "#05a2ba" : undefined
                        }
                      />
                      <Text style={styles.checkboxLabel}>{muscle.label}</Text>
                    </Pressable>
                  )}
                />
              ))}
            </View>
            <View style={{ width: "50%" }}>
              {MuscleGroup.slice(4).map((muscle) => (
                <Controller
                  key={muscle.value}
                  control={control}
                  name={`muscleGroups`}
                  render={({ field: { value } }) => (
                    <Pressable
                      key={muscle.value}
                      style={styles.checkboxRow}
                      onPress={() => toggleMuscleGroup(muscle.value, value)}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={value.includes(muscle.value)}
                        color={
                          value.includes(muscle.value) ? "#05a2ba" : undefined
                        }
                      />
                      <Text style={styles.checkboxLabel}>{muscle.label}</Text>
                    </Pressable>
                  )}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Exercícios</Text>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <Controller
                control={control}
                name={`exercises.${index}.name`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.exerciseInput}
                    placeholder="Nome do exercício"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name={`exercises.${index}.sets`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.exerciseInput}
                    placeholder="Séries"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    keyboardType="numeric"
                    value={value.toString()}
                    onChangeText={(text) => onChange(Number(text))}
                  />
                )}
              />
              <Controller
                control={control}
                name={`exercises.${index}.reps`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.exerciseInput}
                    placeholder="Repetições"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    keyboardType="numeric"
                    value={value.toString()}
                    onChangeText={(text) => onChange(Number(text))}
                  />
                )}
              />
              <Controller
                control={control}
                name={`exercises.${index}.weight`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={styles.exerciseInput}
                    placeholder="Peso"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    keyboardType="numeric"
                    value={value.toString()}
                    onChangeText={(text) => onChange(Number(text))}
                  />
                )}
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
            onPress={handleSubmit(onSubmit)}
            theme="primary"
            icon="save"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
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
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
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
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
