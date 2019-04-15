import React, { Component } from 'react';
import {
   StyleSheet,
   View
} from 'react-native';

import Ball from './src/Ball'
import Line from './src/Line'
export default class App extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Ball/>
            <Line/>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
   }
});
