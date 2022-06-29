import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Box
} from 'react-native';
import { getTasks } from '../../../data/api.js';
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

  const loadTasks = async () => {
    try {
      const tasks = await getTasks();
      setData(tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
    /*const apiData = await getTasks();
    //console.log(apiData)
    setData(apiData);
    console.log('data');
    console.log(data);
    setLoading(false);*/
  }

  useEffect(() => {
    loadTasks();
    console.log("called");
  }, []);

  const onFlatListEmpty = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          No Data Found in FlatList
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data.tasks}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={onFlatListEmpty}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.done}</Text>
          )}
        />
      )}
    </View>
  );
}

export default HomeScreen


const styles = StyleSheet.create({

});