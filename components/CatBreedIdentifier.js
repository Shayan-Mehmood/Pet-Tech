import React, { useState } from 'react';
import { Button, Image, View, Text, ActivityIndicator, StyleSheet, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';

export default function CatBreedIdentifier() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [breed, setBreed] = useState('Unknown Breed');
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedData, setRecommendedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setResult(null);
      setRecommendedData(null);
    }
  };

  const classifyImage = async () => {
    if (image) {
      try {
        setIsLoading(true);

        const form = new FormData();
        const blob = await (await fetch(image)).blob();
        form.append('file', new File([blob], 'image.jpg', { type: 'image/jpeg' }));

        const response = await fetch('http://ec2-54-199-145-91.ap-northeast-1.compute.amazonaws.com:5000/classify', {
          method: 'POST',
          body: form,
        });

        if (response.ok) {
          const result = await response.json();
          setResult(result.result || 'Failed to get the result. Unexpected response format.');
          setBreed(result.class || 'Unknown Breed');
          setConfidence(parseFloat(result.confidence || 0));

          // Map the breed to the recommended data
          const breedRecommendations = {
            Abyssinian: "Annual core vaccinations, regular grooming, interactive play sessions, monitor for dental issues, maintain a balanced diet",
            Bengal: "Annual core vaccinations, regular grooming, provide climbing structures, monitor for dental issues, provide safe outdoor access",
            Birman: "Annual core vaccinations, rabies vaccine as needed,Regular grooming, playtime and social interaction,Monitor for dental issues, regular veterinary check-ups",
            Bombay:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide scratching posts,Monitor for dental issues, provide dental toys",
            British_Shorthair:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, interactive play sessions,Monitor for dental issues, regular veterinary check-ups",
            Egyptian_Mau:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide toys for mental stimulation,Monitor for dental issues, provide a balanced diet",
            Maine_Coon:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide ample exercise space,Monitor for dental issues, regular veterinary check-ups",
            Persian:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, daily attention to coat,Monitor for dental issues, eye care",
            Ragdoll:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide soft bedding,Monitor for dental issues, provide joint supplements",
            Russian_Blue:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide hiding spots,Monitor for dental issues, provide regular veterinary check-ups",
            Siamese:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, provide interactive toys,Monitor for dental issues, provide a balanced diet",
            Sphynx:"Annual core vaccinations, rabies vaccine as needed,Regular grooming, bathing as needed,Monitor for dental issues, regular veterinary check-ups",
          };

          setRecommendedData(breedRecommendations[result.class] || null);
          setModalVisible(true); // Show the modal after classification
        } else {
          console.error('Error during classification:', response.status, response.statusText);
          setResult('Failed to classify the image. Unexpected response.');
          setRecommendedData(null);
        }
      } catch (error) {
        console.error('Error during classification:', error);
        setResult('Failed to classify the image.');
        setRecommendedData(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResult('No image selected for classification.');
      setRecommendedData(null);
    }
  };

  const formattedConfidence = (parseFloat(confidence) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} style={styles.button} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button title="Classify Image" onPress={classifyImage} style={styles.classifyButton} />}
      {isLoading && <ActivityIndicator size="large" color="#3498db" />}
    
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Breed Information</Text>
            <Text style={styles.modalText}>
              Breed: {breed} with {formattedConfidence}% accuracy

            </Text>
            {recommendedData && (
              <Text style={styles.modalText}>
                Recommended care: {recommendedData}
              </Text>
            )}
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%', // Set width to 100% for web view
    aspectRatio: 4 / 3, // Maintain aspect ratio (adjust as needed)
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    maxWidth: 600, // Limit max width for larger screens
  },
  classifyButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  recommendedText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#27ae60',
    marginTop: 10,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#3498db',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
