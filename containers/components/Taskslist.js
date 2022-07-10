import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { getTasks } from '../../data/api.js';
import TaskItem from "./TaskItem";  
// import FontAwesome, { Icons } from 'react-native-fontawesome';

function TasksList ({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const loadTasks = async () => {
    try {
      const tasks = await getTasks();
      setData(tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
    console.log("called");
  }, []);

  const renderItem = ({ item }) => (
    <TaskItem task={item} />
  );

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
    <View>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data.tasks}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={onFlatListEmpty}
              renderItem={(item) => renderItem(item)}
            />
        )}
    </View>
  );
}

export default TasksList;