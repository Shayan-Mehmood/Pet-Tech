import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { auth } from "./firebaseConfig";
import PetIdentification from "./PetIdentification";
import newLogin from "../assets/new_login.png";

function HomeScreen({ navigation }) {
  const MoveToCatModel = () => {
    navigation.navigate('CatBreedIdentifier');
  };

  const MoveToDogModel = () => {
    navigation.navigate('CatBreedIdentifier');
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={newLogin} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Pet Tech</Text>
        <Text style={styles.subtitle}>
          Explore our models to identify your pet.
        </Text>

        {user ? null : (
          <Text style={styles.subtitle}>
            Please log in to access the app
          </Text>
        )}

        <PetIdentification onCatModel={MoveToCatModel} onDogModel={MoveToDogModel} />

        {user && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    width: width > 600 ? "60%" : "80%",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: width > 600 ? 32 : 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: height > 600 ? 20 : 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#FF8C80",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
