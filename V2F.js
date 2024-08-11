import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const vehicles = [
    { id: '1', name: '785', lastInspected: '2023-01-01', category: 'Mining Trucks', image: require('./assets/785.jpeg') },
    { id: '2', name: '785D', lastInspected: '2023-02-15', category: 'Mining Trucks', image: require('./assets/785D.jpeg') },
    { id: '3', name: '794 AC', lastInspected: '2023-02-15', category: 'Mining Trucks', image: require('./assets/794AC.jpeg') },
    { id: '4', name: '797F', lastInspected: '2023-02-15', category: 'Mining Trucks', image: require('./assets/797F.jpeg') },
    { id: '5', name: 'Cat® C32B', lastInspected: '2023-03-10', category: 'Water Trucks', image: require('./assets/C32B.jpeg') },
    { id: '6', name: 'Cat® 3512C HD', lastInspected: '2023-03-10', category: 'Water Trucks', image: require('./assets/3512C.jpeg') },
    { id: '7', name: 'Cat® C15 ACERT™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks', image: require('./assets/C15.jpeg') },
    { id: '8', name: 'Cat® C18 ACERT™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks', image: require('./assets/C18.jpeg') },
    { id: '9', name: 'Cat® C27 ACERT™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks', image: require('./assets/C27.jpeg') },
    { id: '10', name: '770 Bare Chassis™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks Bare Chassis', image: require('./assets/770B.jpeg') },
    { id: '11', name: '785 Bare Chassis™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks Bare Chassis', image: require('./assets/785B.jpeg') },
    { id: '12', name: '789D Bare Chassis™', lastInspected: '2023-08-01', category: 'Off-Highway Trucks Bare Chassis', image: require('./assets/789D.jpeg') },
];

let inspectionIdCounter = 1;

export default function App({ navigation }) {
    const [serialNumber, setSerialNumber] = useState('');
    const [model, setModel] = useState('');
    const [inspectionId, setInspectionId] = useState(inspectionIdCounter);
    const [dateTime, setDateTime] = useState('');
    const [recordedText, setRecordedText] = useState('');
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            console.log('Stopping recording..');
            if (!recording) {
                console.warn('No recording found');
                return;
            }
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);

            // Ensure the directory exists
            const directory = `${FileSystem.documentDirectory}recordings/`;
            const dirInfo = await FileSystem.getInfoAsync(directory);
            if (!dirInfo.exists) {
                console.log('Directory does not exist, creating...');
                await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
            }

            // Save the recording to a specific location
            const newUri = `${directory}recording-${Date.now()}.m4a`;
            await FileSystem.moveAsync({
                from: uri,
                to: newUri,
            });
            console.log('Recording saved to', newUri);
            setRecordingUri(newUri);
        } catch (error) {
            console.error('Failed to stop recording', error);
        } finally {
            setRecording(undefined);
            setIsRecording(false);
        }
    };

    const generateRandomInspection = () => {
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
        return {
            serialNumber: randomVehicle.name,
            model: randomVehicle.category,
            dateTime: randomDate,
        };
    };

    const handleAddInspection = () => {
        const { serialNumber, model, dateTime } = generateRandomInspection();

        console.log('Generated Inspection:', { serialNumber, model, dateTime });

        // Fill the input fields with the generated values
        setSerialNumber(serialNumber);
        setModel(model);
        setDateTime(dateTime);
        setRecordedText('');
    };

    const handleCheckGeolocation = () => {
        console.log('Check Geolocation button pressed');
        navigation.navigate('GeoLoc');
    };

    const handleClear = () => {
        setSerialNumber('');
        setModel('');
        setDateTime('');
        setRecordedText('');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Truck Serial Number"
                placeholderTextColor="grey"
                value={serialNumber}
                onChangeText={setSerialNumber}
            />
            <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Truck Model"
                placeholderTextColor="grey"
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={[styles.input, { color: 'white' }]}
                placeholder="Date & Time of Inspection"
                placeholderTextColor="grey"
                value={dateTime}
                onChangeText={setDateTime}
            />
            <Text>Inspection ID: {inspectionId}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={startRecording} style={[styles.touchableOpacity, { backgroundColor: isRecording ? "darkgrey" : "#FFCD11" }]}>
                    <Text style={styles.touchableOpacityText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={stopRecording} style={styles.touchableOpacity}>
                    <Text style={styles.touchableOpacityText}>Stop</Text>
                </TouchableOpacity>
            </View>
            <Text>Recorded Text: {recordedText}</Text>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={handleAddInspection} style={styles.touchableOpacity}>
                    <Text style={styles.touchableOpacityText}>Add Inspection</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClear} style={styles.touchableOpacity}>
                    <Text style={styles.touchableOpacityText}>Clear</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.centerButton}>
                <TouchableOpacity onPress={handleCheckGeolocation} style={styles.touchableOpacity}>
                    <Text style={styles.touchableOpacityText}> GEOLOCATION</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -190, // Adjust this value to move the inputs upwards
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 12,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 12,
    },
    centerButton: {
        alignItems: 'center',
        marginBottom: 12,
    },
    touchableOpacity: {
        backgroundColor: '#FFCD11',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
        marginHorizontal: 5,
    },
    touchableOpacityText: {
        color: 'white',
        fontSize: 16,
    },
});