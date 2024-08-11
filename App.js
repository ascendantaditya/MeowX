import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon
//Route imports
import CheckList from './CheckList';
import Dashboard from './Dashboard';
import V2F from './V2F';
import GeoLoc from './GeoLoc';
import Damage from './Damage';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const handleLogin = () => {
    // Handle login logic here, e.g., connect to a database in future
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleCaterpillarLogin = () => {
    // Redirect to the Dashboard page
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageBackground source={require('./assets/realcat.png')} style={styles.logoImage} imageStyle={styles.logoImageCrop} />
      </View>
      <Text style={styles.text}>MANAGEMENT SYSTEM</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on passwordVisible state
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCaterpillarLogin}>
          <Text style={styles.buttonText}>Login With Caterpillar ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: '#FFCD11',
            headerTitleStyle: { color: '#FFCD11' },
          }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="V2F" component={V2F} />
        <Stack.Screen name="GeoLoc" component={GeoLoc} />
        <Stack.Screen name="CheckList" component={CheckList} />
        <Stack.Screen name="Damage" component={Damage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Change to black
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 50, // Adjust the top position as needed
    alignItems: 'center',
    width: '100%',
  },
  logoImage: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain',
  },
  logoImageCrop: {
    marginTop: -20, // Crop the image from the top
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  text: {
    color: '#FFCD11',
    fontSize: 30,
    marginTop: 150, // Add margin to prevent overlapping
    marginBottom: 20, // Add some spacing below the text
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    paddingRight: 40, // Add padding to the right to make space for the eye icon
    color: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // Position the eye icon inside the password container
    padding: 10, // Add padding to the eye icon
  },
  button: {
    backgroundColor: '#FFCD11',
    padding: 15,
    borderRadius: 50, // Make the button round
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});