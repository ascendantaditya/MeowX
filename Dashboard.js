import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SectionList, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by vehicle name or type"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <SectionList
                sections={[{ title: 'Vehicles', data: filteredVehicles }]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('V2F', { vehicle: item })}>
                        <View style={styles.vehicleItem}>
                            <View style={styles.vehicleDetails}>
                                <Text style={styles.vehicleName}>{item.name}</Text>
                                <Text style={styles.vehicleDate}>Last Inspected: {item.lastInspected}</Text>
                                <Text style={styles.vehicleType}>Type: {item.category}</Text>
                            </View>
                            <Image source={item.image} style={styles.vehicleImage} />
                        </View>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#888',
    },
    vehicleItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleDetails: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    vehicleDate: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
    },
    vehicleType: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
    },
    vehicleImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
});