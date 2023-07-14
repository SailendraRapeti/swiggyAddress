import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
interface Iprops{
navigation ?:any;
}
export class Splash extends Component <Iprops> {
    componentDidMount(): void {
        setTimeout( ()=>{
            this.props.navigation.navigate('Add')

        },1000)
    }
  render() {
    return (
 
      <View style={style.container}>
        <Text style={{color:"white",fontSize:30,fontWeight:"bold"}}>Swiggy</Text>
      </View>
    )
  }
}
const style= StyleSheet.create({
    container:{
        backgroundColor:"#FC8019",
        flex:1,
        justifyContent:"center",
        alignItems:"center"

    }
})

export default Splash