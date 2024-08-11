import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function CheckList() {
    const navigation = useNavigation(); // Get navigation object

    const [tirePressureLeft, setTirePressureLeft] = useState('');
    const [tirePressureRight, setTirePressureRight] = useState('');
    const [tireConditionLeft, setTireConditionLeft] = useState('');
    const [tireConditionRight, setTireConditionRight] = useState('');
    const [batteryRust, setBatteryRust] = useState('');
    const [batteryCondition, setBatteryCondition] = useState('');
    const [batteryWaterLevel, setBatteryWaterLevel] = useState('');
    const [brakeFluidLevel, setBrakeFluidLevel] = useState('');
    const [emergencyBrake, setEmergencyBrake] = useState('');

    const randomValues = {
        tireConditions: ['Good', 'Worn', 'New'],
        batteryRustOptions: ['yes', 'no'],
        batteryConditions: ['Good', 'Bad'],
        batteryWaterLevels: ['yes', 'no'],
        brakeFluidLevels: ['Good', 'Ok', 'Low'],
        emergencyBrakeLevels: ['Good', 'Ok', 'Low']
    };

    const setRandomValues = () => {
        const randomValue = (values) => values[Math.floor(Math.random() * values.length)];
        setTirePressureLeft((Math.random() * 50).toFixed(2));
        setTirePressureRight((Math.random() * 50).toFixed(2));
        setTireConditionLeft(randomValue(randomValues.tireConditions));
        setTireConditionRight(randomValue(randomValues.tireConditions));
        setBatteryRust(randomValue(randomValues.batteryRustOptions));
        setBatteryCondition(randomValue(randomValues.batteryConditions));
        setBatteryWaterLevel(randomValue(randomValues.batteryWaterLevels));
        setBrakeFluidLevel(randomValue(randomValues.brakeFluidLevels));
        setEmergencyBrake(randomValue(randomValues.emergencyBrakeLevels));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={setRandomValues}>
                <Text style={styles.buttonText}>GET VALUES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Damage')}>
                <Text style={styles.buttonText}>DAMAGE FINDER</Text>
            </TouchableOpacity>
            <ScrollView>
                <Text style={styles.header}>Tires</Text>
                <Text>Pressure (Left Tire):</Text>
                <TextInput
                    style={styles.input}
                    value={tirePressureLeft}
                    onChangeText={setTirePressureLeft}
                    placeholder="Enter PSI"
                    keyboardType="numeric"
                />
                <Text>Pressure (Right Tire):</Text>
                <TextInput
                    style={styles.input}
                    value={tirePressureRight}
                    onChangeText={setTirePressureRight}
                    placeholder="Enter PSI"
                    keyboardType="numeric"
                />
                <Text>Condition (Left Tire):</Text>
                <TextInput
                    style={styles.input}
                    value={tireConditionLeft}
                    onChangeText={setTireConditionLeft}
                    placeholder="Enter Condition"
                />
                <Text>Condition (Right Tire):</Text>
                <TextInput
                    style={styles.input}
                    value={tireConditionRight}
                    onChangeText={setTireConditionRight}
                    placeholder="Enter Condition"
                />

                <Text style={styles.header}>Battery</Text>
                <Text>Rust:</Text>
                <Picker
                    selectedValue={batteryRust}
                    style={styles.picker}
                    onValueChange={(itemValue) => setBatteryRust(itemValue)}
                >
                    <Picker.Item label="Yes" value="yes" />
                    <Picker.Item label="No" value="no" />
                </Picker>
                <Text>Condition:</Text>
                <TextInput
                    style={styles.input}
                    value={batteryCondition}
                    onChangeText={setBatteryCondition}
                    placeholder="Enter Condition"
                />
                <Text>Water Level:</Text>
                <Picker
                    selectedValue={batteryWaterLevel}
                    style={styles.picker}
                    onValueChange={(itemValue) => setBatteryWaterLevel(itemValue)}
                >
                    <Picker.Item label="Yes" value="yes" />
                    <Picker.Item label="No" value="no" />
                </Picker>

                <Text style={styles.header}>Brakes</Text>
                <Text>Fluid Level:</Text>
                <Picker
                    selectedValue={brakeFluidLevel}
                    style={styles.picker}
                    onValueChange={(itemValue) => setBrakeFluidLevel(itemValue)}
                >
                    <Picker.Item label="Good" value="Good" />
                    <Picker.Item label="Ok" value="Ok" />
                    <Picker.Item label="Low" value="Low" />
                </Picker>
                <Text>Emergency Brake:</Text>
                <Picker
                    selectedValue={emergencyBrake}
                    style={styles.picker}
                    onValueChange={(itemValue) => setEmergencyBrake(itemValue)}
                >
                    <Picker.Item label="Good" value="Good" />
                    <Picker.Item label="Ok" value="Ok" />
                    <Picker.Item label="Low" value="Low" />
                </Picker>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FFCD11',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});