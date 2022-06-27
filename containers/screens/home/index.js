import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
// import FontAwesome, { Icons } from 'react-native-fontawesome';

function HomeScreen ({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  /*static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Este es un título'
    };
  };*/

  const getTasks = async () => {
	  try {
		  const response = await fetch('http://192.168.1.117:4000/tasks');
		  const json = await response.json();
      console.log(json);
		  setData(json.tasks);
	  } catch (error) {
		  console.error(error);
	  } finally {
		  setLoading(false)
	  }
  }

  useEffect(() => {
    getTasks();
    console.log('---------------- NUEVA CONSULTA ----------------');
  }, []);

    return (
      <View>
        <Text>This is the Home screen</Text>
	      <View style={{ flex:1, padding: 24}}>
          {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ tasks }) => (
              console.log(tasks)
            )}
          />
          )}
	      </View>
      </View>
    )
  }

export default HomeScreen


const styles = StyleSheet.create({

});
