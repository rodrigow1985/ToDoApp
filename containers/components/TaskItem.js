import { React, useState } from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
//import { back } from 'react-native/Libraries/Animated/Easing';
import ModalItem from "./ModalItem";  

// TODO: Arreglar bug cuando se hace swipe hacia la izquierda luego de visualizarse el ícono de edit

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD_DISMISSED = -SCREEN_WIDTH * 0.3;
const TRANSLATE_X_THRESHOLD_EDITED = SCREEN_WIDTH * 0.2;

const TaskItem = ({
  task,
}) => {
  const [modalVisibleParam, setModalVisibleParam] = useState(false);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const backgroundColor = useSharedValue('red');
  const right = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX
      if (translateX.value > 0) {
        backgroundColor.value = 'blue'
        right.value = '79%'
      }  else {
        backgroundColor.value = 'red'
        right.value = '10%'
      }
      //console.log(translateX.value)
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD_DISMISSED
      const shouldBeEdited = translateX.value > TRANSLATE_X_THRESHOLD_EDITED
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0);
      } else if (shouldBeEdited) {
        translateX.value = withTiming(TRANSLATE_X_THRESHOLD_EDITED);
      } else {
        translateX.value = withTiming(0);
      }
    }
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconDeleteContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD_DISMISSED ? 1 : 0
    );
    return {
      right: right.value,
      opacity,
     };
  });

  const rIconEditContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD_EDITED ? 0 : 1
    );
    return {
      right: right.value,
      opacity,
     };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const rTaskBackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    }
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.taskBack, rTaskBackStyle]}>
      </Animated.View>
      <Animated.View style={[styles.iconContainer, rIconDeleteContainerStyle]}>
        <FontAwesome5
            name={'trash-alt'}
            size={LIST_ITEM_HEIGHT * 0.3}
            color={'white'}
          />
      </Animated.View>
      <Animated.View style={[styles.iconContainer, rIconEditContainerStyle]}>
        <TouchableOpacity
          onPress={()=> {
            setModalVisibleParam(true);
          }}>
            <FontAwesome5
                name={'edit'}
                size={LIST_ITEM_HEIGHT * 0.3}
                color={'white'}
              />
          </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <View style={[styles.triangleLeft]}></View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={[styles.triangleRight]}></View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    //marginVertical: 10,
  },
  taskBack: {
    height: LIST_ITEM_HEIGHT,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  triangleRight: {
    top: 0,
    right: 0,
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    //borderRightWidth: 50,
    borderBottomWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
  },
  triangleLeft: {
    top: 0,
    //left: -50,
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    //borderLeftWidth: 50,
    borderRightWidth: 30,
    borderTopWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "blue",
  },
  task: {
    //marginVertical: 10,
    width: '100%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 50,
    backgroundColor: 'white',
    //borderRadius: 10,
    // Shadow for iOS
    /*shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,*/
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    //right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem;