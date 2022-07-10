import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView
} from 'react-native';
import Layout from '../../components/Layout';
import { ThemeContext } from '../../../App';
const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )
const Col = ({ numRows, children }) => {
    return  (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}
const SettingsScreen = ({ navigation }) => {
    const { setTheme, theme } = React.useContext(ThemeContext);
    // Switch
    const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setTheme(theme === 'Light' ? 'Dark' : 'Light');
    }
    return (
        <Layout>
            <ScrollView>
                <TouchableOpacity>
                    <View style={styles.settingContainer}>
                        <Row>
                            <Col numRows={3}>
                                <Text style={styles.title}>Dark Theme / Light</Text>
                                <Text style={styles.subtitle}>Change de app's theme</Text>
                            </Col>
                            <Col numRows={1}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </Col>
                        </Row>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </Layout>
    );
};

export default SettingsScreen

const styles = StyleSheet.create({
    settingContainer: {
        flex: 2, // the number of columns you want to devide the screen into
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 20,
      },
      row: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "gray",
      },
      "1col":  {
        flex:  1
      },
      "2col":  {
        flex:  2
      },
      "3col":  {
        flex:  3
      },
      title: {
        fontWeight: 'bold',
      },
      subtitle: {
        fontStyle: 'italic',
      }
});