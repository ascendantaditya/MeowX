import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function GeolocationScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getLocation = async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLoading(false);
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}></Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={getLocation} style={styles.button}>
                    <Text style={styles.buttonText}>Get Location</Text>
                </TouchableOpacity>
            </View>
            {loading ? <ActivityIndicator size="large" color="yellow" /> : <Text style={styles.text}>{text}</Text>}
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                        image={require('./assets/pin.png')}
                    />
                </MapView>
            )}
            <TouchableOpacity style={styles.checklistButton} onPress={() => navigation.navigate('CheckList')}>
                <Text style={styles.checklistButtonText}>CHECKLIST</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        marginTop: -120,
    },
    text: {
        color: 'white',
        margin: 10,
    },
    map: {
        width: '100%',
        height: '50%',
        marginTop: 20,
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        overflow: 'hidden',
    },
    checklistButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FFCD11',
        borderRadius: 5,
    },
    checklistButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FFCD11',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});