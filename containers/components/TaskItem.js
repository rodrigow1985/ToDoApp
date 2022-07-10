
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { doneTask } from '../../data/api.js';

const TaskItem = ({ task, handleDelete }) => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(task.done)
    const [activeTask, setActiveTask] = useState([])

    useEffect(() => {
      setActiveTask(task);
      //setToggleCheckBox(task.done);
      //console.log(toggleCheckBox);
    }, []);

    const updateDoneAttribute = async () => {
      try {
        const res = await doneTask(activeTask.id);
        console.log('Res API:');
        console.log(res);
        setActiveTask(res.json());
        console.log('ActiveTask:');
        console.log(activeTask);
        setToggleCheckBox(activeTask.done);
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          //onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
        >
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text={activeTask.title}
                iconStyle={{ borderColor: "red" }}
                isChecked={toggleCheckBox}
                onPress={() => {updateDoneAttribute()}}
            />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
          //onPress={() => handleDelete(task.id)}
        >
          <Text style={{ color: "#fff" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
    itemContainer: {
      //backgroundColor: "#333333",
      padding: 20,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 5,
    },
    itemTitle: {
      //color: "#ffffff",
    },
    checkbox: {
        alignSelf: "center",
    },
  });

export default TaskItem;