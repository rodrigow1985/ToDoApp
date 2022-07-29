import { React, useState } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity } from 'react-native';

  function ModalItem (modalVisibleParam) {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(modalVisibleParam);
        //console.log("API: getTasks");
      }, []);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    );
    }

  const styles = StyleSheet.create({

  })

  export default ModalItem;