/*
 * @Author: showtan
 * @Date: 2021-10-28 17:55:07
 * @Version: 1.0
 * @LastEditTime: 2021-11-11 10:31:33
 * @LastEditors: showtan
 * @Description: index
 * @FilePath: /test/index.js
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  BackHandler
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';


function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.hello} onPress={() => {
        BackHandler.exitApp();
      }}>Back to Android</Text>
      <Text style={styles.hello} onPress={() => {
        NativeModules.IntentModule.startActivity('com.android.android.Message', '数据');
      }}>Jump to the Android Message page</Text>
      <Text style={styles.hello} onPress={() => {
        navigation.navigate('Other');
      }}>Go to React Native Other page</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Other() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.hello} onPress={() => {
        navigation.goBack();
      }}>goBack</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ title: 'React Native page' }} name='Home' component={Home} />
        <Stack.Screen options={{ title: 'React Native Other page' }} name='Other' component={Other} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  hello: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent(
  'MyReactNativeApp',
  () => App
);