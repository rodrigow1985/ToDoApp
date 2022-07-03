
import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          //onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
        >
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text={task.title}
                iconStyle={{ borderColor: "red" }}
                onPress={(isChecked) => {setToggleCheckBox(isChecked)}}
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