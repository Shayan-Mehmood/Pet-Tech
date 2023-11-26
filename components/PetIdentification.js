import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function PetIdentification({ onCatModel, onDogModel }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Identify Your Pet</Text>

        <Text style={styles.contentText}>
          Follow these steps to identify your pet:
        </Text>
        <Text style={styles.contentText}>
          1. Select the model (Cat or Dog) you want to use.
        </Text>
        <Text style={styles.contentText}>
          2. Choose to upload an image of your pet.
        </Text>
        <Text style={styles.contentText}>
          3. Get results, breed Identification and more pet recommendations.
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        <Pressable style={styles.optionButton} onPress={onCatModel}>
          <Text style={styles.buttonText}>Cat Model</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={onDogModel}>
          <Text style={styles.buttonText}>Dog Model</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  contentContainer: {
    width: "80%",
    marginBottom: 20,
  },
  contentText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#69A5E0",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PetIdentification;
