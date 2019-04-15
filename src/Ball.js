//import liraries
import React, { Component } from 'react';
import { View, StyleSheet , PanResponder , Animated , Dimensions } from 'react-native';


const Dim = Dimensions.get('window')


class Ball extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
         //   onStartShouldSetPanResponder: () => true,
           onStartShouldSetPanResponder: (evt, gestureState) => true,
           onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
           onMoveShouldSetPanResponder: (evt, gestureState) => true,
           onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
         //   onPanResponderMove: (event, gesture) => {
         //      position.setValue({ x: gesture.dx, y: gesture.dy });
         //   },
        
        
        onPanResponderGrant: (evt, gestureState) => {
         // position.setValue({ x: gestureState.dx, y: gestureState.dy })
         this.setState({ color: 'blue'})
        
      },
        

        onPanResponderMove: (event, gestureState) => {
         position.setValue({ x: gestureState.dx, y: gestureState.dy })


         // console.warn(gesture.dx , gesture.dy)
         // if (gesture.dx < -155 && gesture.dy < -275 ) {

         //    this.setState({ currentEmoji: emojis.tounge })

         // } else if ( gesture.dx > -150 && gesture.dy > -270 ) {

         //    this.setState({ currentEmoji: emojis.wonder })

         // }else if (Math.abs(gesture.dx) < 50 && Math.abs(gesture.dy) < 50) {

         //    this.setState({ currentEmoji: emojis.sleep })

         // }


         if(gestureState.dx> 80 || gestureState.dy > 80){
            this.setState({color:'green'})
         }else{
            this.setState({color:'red'})
         }
         
      },

      onPanResponderRelease: (evt, gestureState) => {
         position.setValue({ x: gestureState.dx, y: gestureState.dy })
         if (gestureState.dy < - Dim.height * (5 / 100)) {
            Animated.timing(this.state.position.y, {
               toValue: -Dim.height * (190 / 100),
               timing: 600,
               useNativeDriver: true
            }).start(() => {
               position.setValue({ x: 0, y: Dim.height * (60 / 100) });
               Animated.timing(this.state.position.y, {
                  toValue: 0,
                  timing: 300,
                  useNativeDriver: true
               }).start(() => { this.setState({ color: 'pink' }) })
            })
         } else {
            Animated.spring(this.state.position, {
               toValue:0,
               damping : 10,
               useNativeDriver: true
            }).start()
         }

      }

   });
     
        this.state = { 
           panResponder, 
           position,
           color : 'yellow'
      };
      
     }
   render() {
      let handles = this.state.panResponder.panHandlers;
      return (
         <View style={styles.container}>
         <Animated.View style={[styles.ball, { backgroundColor: this.state.color, transform: [{ translateX: this.state.position.x }, { translateY: this.state.position.y }] }]} {...handles}>
            </Animated.View>
            </View>
        
      );
   }
}

const styles = StyleSheet.create({
   container:{
flex:1,
justifyContent:"center",
alignItems:"center"
   },
   ball: {
      height: 120,
      width: 120,
      borderColor: 'black',
      borderRadius: 40,
   },
});

export default Ball;