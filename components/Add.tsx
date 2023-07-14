import { Alert, StyleSheet, Text, Touchable, TouchableOpacity, View,Modal,SafeAreaView, Image  } from 'react-native'
import React, { Component } from 'react'
import MapView, {Marker} from 'react-native-maps';
import arrow from "../components/images/arrow.png";
import location from "../components/images/locaton.png"
import Geolocation from '@react-native-community/geolocation';

import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');



 class Add extends Component {
    state={
        modalVisible:false,
        secondModal:false,
        locationValues: {
            latitude: 17.376262847127638,
            longitude: 78.52636646479368,
          },
          region: {
            latitude: 37.4219983,
            longitude: -122.084,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          marker: {
            latitude: 37.4219983,
            longitude: -122.084,
          },

          position:""
    }

    componentDidMount(): void {
   this.getCurrentLatLong()
    }
    getCurrentLatLong = () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            marker: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }),
            () => this.getLocation;
        },
        error => {
          console.log(error.code, error.message, 'getting geolocation');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    getLocation = (location: any) => {
      console.log('Getting location', location);
      this.setState({region: location});
    };

    handleMap = (event: any) => {
        const {coordinate} = event.nativeEvent;
        const {latitude, longitude} = coordinate;
        console.log('location', longitude);
        console.log(coordinate);
        this.setState({lat: latitude, long: longitude});
        Geocoder.from(latitude, longitude)
          .then((response: any) => {
            const address = response.results[0].formatted_address;
            this.setState({position: address, locationValues: coordinate});
          })
          .catch(error => {
            console.log('Error', error);
          });
      };
    
    onModal=()=>{
        this.setState({modalVisible:true})
    }
  render() {
    const {modalVisible,position}=this.state
    const villageName = position.split(",")
    console.log(villageName)
    return (
      <SafeAreaView style={style.container}>
<View>


    <TouchableOpacity style={style.add} onPress={this.onModal}>
    <Text style={{textAlign:"center",color:"green"}}>ADD NEW ADDRESS</Text>
    </TouchableOpacity>

    </View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        this.setState({modalVisible:!modalVisible})
        }}>
            <SafeAreaView style={style.model}>

            
                
    <MapView
          onPress={this.handleMap}
          style={{height: "75%", width: '100%'}}
          // initialRegion={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}>
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          region={this.state.region}
          >
     <TouchableOpacity onPress={()=>{this.setState({modalVisible:!modalVisible})}} style={style.arrowCard}>
      
<Image  style={{height:10,width:10}} source={arrow}/>

      </TouchableOpacity>   


          <Marker
          draggable
            coordinate={this.state.locationValues}
            title="marker"
            description="sai"
          />
     
      
        
        </MapView>
      <View style={style.addressCard}>
      <Text style={{fontSize:10,color:"#85837e"}}>SELECT DELEVERY LOCATION</Text>
      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:15}}>

    <View style={{display:"flex",flexDirection:"row"}}>
      
      <Image style={{height:15,width:15,marginTop:10}} source={location}/>
<Text style={{fontSize:24,fontWeight:"bold"}}>{villageName[1]}</Text>

</View>
<TouchableOpacity style={style.changeBtn}>
        <Text style={{color:"#FC8019",fontWeight:"bold",fontSize:10}}>CHANGE</Text>
      </TouchableOpacity>

      </View>
     <Text>{villageName[0]},{villageName[2]}</Text>
     <Text>{villageName[1]},{villageName[0]}</Text>
      <TouchableOpacity style={style.conformLocationBtn} onPress={()=>{this.setState({secondModal:true})}}>
        <Text style={{color:"white",fontWeight:"bold"}}>CONFIRM LOCATION</Text>
      </TouchableOpacity>
      </View>

        
                </SafeAreaView>    
            </Modal>
      </SafeAreaView>
    )
  }
}
const style=StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    add:{
        width:"97%",
        height:40,
        borderWidth:2,
        borderColor:"green",
        padding:10,
        textAlign:"center"
    },
    model:{
        backgroundColor:"white",
        flex:1,
        marginTop:0,
       
    },
    arrowCard:{
      height:25,
      width:25,
      backgroundColor:"white",
      borderRadius:80,
      textAlign:"center",
      justifyContent:"center",
      alignItems:"center",
      marginTop:14,
      marginLeft:7
    },
    addressCard:{
      padding:7,

    },
    conformLocationBtn:{
      backgroundColor:"#FC8019",
      height:35,
      width:"100%",
      textAlign:"center",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:4,
      marginTop:22,
    },
    changeBtn:{
      backgroundColor:"#e3dfd5",
      height:20,
      width:70,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:4,
      marginTop:10
    },
    secondModall:{
      height:"100%",
      marginTop:30,
    }
})
export default Add