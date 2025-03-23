import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push("/workout-details")}
        android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
        style={({ pressed }) => [
          styles.cardContainer,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Treino A</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentText}>
            {["Chest", "Back", "Shoulders", "Arms", "Legs"].join(", ")}
          </Text>
        </View>
      </Pressable>
      {/* <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View> */}
      {/* <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View> */}
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
    flex: 1,
    padding: 40,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
