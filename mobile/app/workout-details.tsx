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
import { Controller, useForm } from "react-hook-form";
interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutFormData {
  name: string;
  muscles: string[];
  exercises: Exercise[];
}

const PLACEHOLDER_COLOR = "#ffffff64";

export default function WorkoutDetailsScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "", weight: "" },
  ]);

  const { control, handleSubmit, setValue } = useForm<WorkoutFormData>({
    defaultValues: {
      name: "",
      muscles: [],
      exercises: [{ name: "", sets: "", reps: "", weight: "" }],
    },
  });

  const toggleMuscleGroup = (muscle: string, value: string[]) => {
    setValue("muscles", [...value, muscle]);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const onSubmit = (data: WorkoutFormData) => {
    console.log(data);
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
              {["Peito", "Costas", "Pernas", "Braços"].map((muscle) => (
                <Controller
                  key={muscle}
                  control={control}
                  name={`muscles`}
                  render={({ field: { value } }) => (
                    <Pressable
                      key={muscle}
                      style={styles.checkboxRow}
                      onPress={() => toggleMuscleGroup(muscle, value)}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={value.includes(muscle)}
                        onValueChange={() => toggleMuscleGroup(muscle, value)}
                        color={value.includes(muscle) ? "#05a2ba" : undefined}
                      />
                      <Text style={styles.checkboxLabel}>{muscle}</Text>
                    </Pressable>
                  )}
                />
              ))}
            </View>
            <View style={{ width: "50%" }}>
              {["Biceps", "Triceps", "Ombro", "Glúteo"].map((muscle) => (
                <Controller
                  key={muscle}
                  control={control}
                  name={`muscles`}
                  render={({ field: { value } }) => (
                    <Pressable
                      key={muscle}
                      style={styles.checkboxRow}
                      onPress={() => toggleMuscleGroup(muscle, value)}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={value.includes(muscle)}
                        color={value.includes(muscle) ? "#05a2ba" : undefined}
                      />
                      <Text style={styles.checkboxLabel}>{muscle}</Text>
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
                    value={value}
                    onChangeText={onChange}
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
                    value={value}
                    onChangeText={onChange}
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
                    value={value}
                    onChangeText={onChange}
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
