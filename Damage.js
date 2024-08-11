import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import LottieView from 'lottie-react-native';

export default function Damage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadModel = async () => {
            await tf.ready();
            const model = await mobilenet.load();
            setModel(model);
        };
        loadModel();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
            processImage(result.uri);
        }
    };

    const captureImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
            processImage(result.uri);
        }
    };

    const processImage = async (uri) => {
        if (!model) return;

        setLoading(true);
        const response = await fetch(uri);
        const imageBlob = await response.blob();
        const image = await createImageBitmap(imageBlob);

        const prediction = await model.classify(image);
        setPrediction(prediction);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={captureImage}>
                <Text style={styles.buttonText}>Capture an image</Text>
            </TouchableOpacity>
            {selectedImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                    {loading && (
                        <LottieView
                            source={require('./assets/animation.json')}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                    )}
                </View>
            )}
            {prediction && (
                <View style={styles.predictionContainer}>
                    <Text style={styles.predictionText}>Predictions:</Text>
                    {prediction.map((p, index) => (
                        <Text key={index} style={styles.predictionText}>
                            {p.className}: {p.probability.toFixed(2)}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#FFCD11',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    imageContainer: {
        position: 'relative',
        width: 300,
        height: 300,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    animation: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    predictionContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    predictionText: {
        fontSize: 16,
        color: 'black',
    },
});