import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
// import FontAwesome, { Icons } from 'react-native-fontawesome';

import TaskList from "../../components/Taskslist";

  /*static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Este es un título'
    };
  };*/
  
const HomeScreen = () => {
  return (
    <View>
      <TaskList />
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({

});