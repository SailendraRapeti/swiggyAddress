import {
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ScrollView,
    TextInput,
    FlatList 
   } from 'react-native';
   import React, {Component} from 'react';
  import SwiggyAddressController from './SwiggyAddressController';
   import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    PROVIDER_DEFAULT,
   } from 'react-native-maps';
   import Geocoder from 'react-native-geocoding';
   import Geolocation from '@react-native-community/geolocation';
   Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');
   import {
    addressAlertText,
    addressText,
    addAddressText,
    descriptionAddressText,
    leftArrowImg,
    selectText,
    locationImg,
    changeText,
    confirmLocationText,
    scopeImg,
    locateMeText,
    dummyText,
    voiceText,
    recordText,
    egText,
    saveAsText,
    homeText,
    workText,
    enterflatText,
    proceedText,
   } from "./config"
import HomeIcon from "./images/Home.png"
   export class SwiggyAddress extends SwiggyAddressController {
    render() {
    const {location} = this.state;
    const locationArea = location.split(',');
    let area: any = ['', '', ''];
    if (locationArea.length === 1) {
    area = [locationArea[0], locationArea[0], locationArea[0]];
    } else if (locationArea.length === 2) {
    area = [locationArea[0], locationArea[0], locationArea[1]];
    } else if (locationArea.length >= 3) {
    area = [
    locationArea[locationArea.length - 4],
    locationArea[locationArea.length - 3],
    locationArea[locationArea.length - 2],
    ];
    }
    const totalAddress = area.join(',', ' ');

const {addressList} = this.state 
console.log("add",addressList)


    return (
    <SafeAreaView style={styles.mainAdressContainer}>
    <Modal visible={this.state.isAddressModel} animationType="slide">
    <SafeAreaView style={styles.modelCrad}>
    <TouchableOpacity
    style={styles.modalCloseBtn}
    onPress={() => {
    this.setState({isAddressModel: false});
    }}>
    <Image style={styles.modelCloseArrow} source={leftArrowImg} />
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.loacteMeBtn}
    onPress={() => {
    this.getOneTimeLocation();
    }}>
    <Image style={styles.scopeImge} source={{uri: `${scopeImg}`}} />
    <Text style={styles.locateMeText}>{locateMeText}</Text>
    </TouchableOpacity>
    <MapView
    provider={
    Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
    }
    style={styles.addressMap}
    onPress={this.onPressmap}
    showsUserLocation={true}
    showsMyLocationButton={true}
    zoomEnabled={true}
    region={this.state.region}
    onRegionChange={() => this.getCurrentLocation()}
    onRegionChangeComplete={region =>
    this.setState({
    coordinateValues: {
    latitude: region.latitude,
    longitude: region.longitude,
    },
    region: {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
    },
    })
    }>
    <Marker
    coordinate={this.state.coordinateValues}
    draggable
    title="Order will be delivered here"
    description="Place the pin accurately on the mapS"
    />
    </MapView>
   
    <View style={styles.bottomAddressCrad}>
    <Text style={styles.selectText}>{selectText}</Text>
    <View style={styles.locationCrad}>
    <View style={styles.mainAreaLocationCrad}>
    <Image
    style={styles.locationImg}
    source={{uri: `${locationImg}`}}
    />
    <Text style={styles.mainAreaText}>{area[0]}</Text>
    </View>
    <TouchableOpacity style={styles.changeBtn}>
    <Text style={styles.chageText}>{changeText}</Text>
    </TouchableOpacity>
    </View>
    <View>
    <Text style={styles.locationAddressText}>{totalAddress}</Text>
    </View>
    <TouchableOpacity
    style={styles.conformLocationBtn}
    onPress={() => {
    this.setState({conformLocationModal: true});
    }}>
    <Text style={styles.confirmText}>{confirmLocationText}</Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
   
    <Modal visible={this.state.conformLocationModal} transparent={true}>
    <SafeAreaView style={styles.conformLocationModelCrad}>
    <TouchableOpacity
    style={styles.modalCloseBtn}
    onPress={() => {
    this.setState({conformLocationModal: false});
    }}>
    <Image style={styles.modelCloseArrow} source={leftArrowImg} />
    </TouchableOpacity>
    <View style={styles.confirmLocationCrad}>
    <View style={styles.bottomAddressCrad}>
    <View style={styles.locationCrad}>
    <View style={styles.mainAreaLocationCrad}>
    <Image
    style={{...styles.locationImg, tintColor: '#000'}}
    source={{uri: `${locationImg}`}}
    />
    <Text style={styles.mainAreaText}>{area[0]}</Text>
    </View>
    </View>
    <View>
    <Text style={styles.locationAddressText}>
    {totalAddress}
    </Text>
    </View>
    </View>
   
    <ScrollView>
    <View style={styles.confirmLocationScrollCrad}>
    <View style={styles.dummyCrad}>
    <Text style={styles.dummyText}>{dummyText}</Text>
    </View>
    <TextInput
    style={styles.locationInput}
    placeholder="HOUSE/FLAT/BLOCK NO."
    value={this.state.flatNo}
    onChangeText={(text: string) => {
    this.setState({flatNo: text});
    }}
    />
    <TextInput
    style={styles.locationInput}
    placeholder="AARTMENT/ROAD/AREA (OPTIONAL)"
    value={this.state.appartment}
    onChangeText={(text: string) => {
    this.setState({appartment: text});
    }}
    />
    <View>
    <Text style={styles.voiceHead}>{voiceText}</Text>
    <View style={styles.recordCrad}>
    <Text style={styles.recordText}>{recordText}</Text>
    </View>
    <View style={styles.recardBottomCard}>
    <Text style={styles.egText}>{egText}</Text>
    </View>
    </View>
    <Text style={styles.saveText}>{saveAsText}</Text>
    <View style={styles.savedCard}>
    <TouchableOpacity style={styles.savedBtn}>
    <Text style={styles.savedBtnText}>{homeText}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.savedBtn}>
    <Text style={styles.savedBtnText}>{workText}</Text>
    </TouchableOpacity>
    </View>
    <TouchableOpacity
    onPress={this.onPressAddAddress}
    style={{
    ...styles.enterFlatBtn,
    opacity: this.state.flatNo === '' ? 0.2 : 1,
    }}
    disabled={this.state.flatNo === ''}>
    <Text style={styles.confirmText}>
    {this.state.flatNo === '' ? enterflatText : proceedText}
    </Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    </SafeAreaView>
    </Modal>
    </Modal>
   
    <View style={styles.topCrad}>
    <Image style={styles.arrowImg} source={leftArrowImg} />
    <Text style={styles.addressText}>{addressText}</Text>
    </View>

{this.state.addressList.length  > 0  ?  <View style={{padding:10}}>
    <Text style={{marginTop:5}}>SAVED ADDRESSES</Text>
    <FlatList 
    data = {this.state.addressList}
    renderItem={({item}:{item:any})=>(
        <View style={{marginTop:10}}>
        <View style={{display:"flex",flexDirection:"row"}}>
            <Image source={HomeIcon}/>
            <Text style={{marginLeft:5}}>Home</Text>
        </View>
         
<View style={{marginLeft:30,marginTop:5,width:"80%"}}>
            <Text>{item.flatNo},{item.location}</Text>
            <Text style={{marginTop:5}}>Phone number: 6303521561</Text>

            </View>
            <View style={{display:"flex",flexDirection:"row",marginLeft:30,marginTop:5}}>
                <TouchableOpacity onPress={()=>{this.onEdit(item)}}>
                    <Text style={{color:"#f57c02",marginRight:8}}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.onDelete(item.id)}}>
                    <Text style={{color:"#f57c02",marginRight:8}}>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text  style={{color:"#f57c02",marginRight:8}}>SHARE</Text>
                </TouchableOpacity>
                </View>
            </View>
    )}/>
    <TouchableOpacity style={styles.add} onPress={()=>{this.setState({isAddressModel:true})}} >
    <Text style={{textAlign:"center",color:"green"}}>ADD NEW ADDRESS</Text>
    </TouchableOpacity>
</View> :  <View style={styles.addressContainer}>
    <Text style={styles.alertAddressText}>{addressAlertText}</Text>
    <Text style={styles.descriptionText}>{descriptionAddressText}</Text>
    <TouchableOpacity
    style={styles.addAddressBtn}
    onPress={() => {
    this.getCurrentLocation();
    this.setState({isAddressModel: true});
    }}>
    <Text style={styles.addAddressText}>{addAddressText}</Text>
    </TouchableOpacity>
    </View>}
   


   
    



    </SafeAreaView>
    );
    }
   }
   const styles = StyleSheet.create({
    mainAdressContainer: {
    flex: 1,
    },
    add:{
        width:"97%",
        height:35,
        borderWidth:2,
        borderColor:"green",
       
        textAlign:"center",
        justifyContent:"center",
        alignContent:"center",
        marginTop :8
    },
    addressContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    },
    topCrad: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#dee0e3',
    borderBottomWidth: 1,
    },
    addressText: {
    fontSize: 20,
    marginLeft: 30,
    },
    arrowImg: {
    height: 20,
    width: 30,
    marginRight: 10,
    },
    alertAddressText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
    },
    descriptionText: {
    textAlign: 'center',
    color: '#dee0e3',
    marginBottom: 20,
    },
    addAddressBtn: {
    borderColor: '#f57c02',
    borderWidth: 1,
    width: 190,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    },
    addAddressText: {
    color: '#f57c02',
    },
    modelCrad: {
    flex: 1,
    },
    modalCloseBtn: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 50,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    top: 30,
    zIndex: 3,
    },
    loacteMeBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 35,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10,
    top: '63%',
    zIndex: 3,
    },
    scopeImge: {
    height: 15,
    width: 15,
    marginRight: 10,
    tintColor: '#f57c02',
    },
    locateMeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f57c02',
    },
    modelCloseArrow: {
    height: 10,
    width: 15,
    },
    addressMap: {
    height: '70%',
    width: '100%',
    },
    markerLog: {
    backgroundColor: '#000',
    },
    bottomAddressCrad: {
    padding: 15,
    },
    selectText: {
    color: '#8f9394',
    fontSize: 12,
    marginBottom: 10,
    },
    locationCrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
    mainAreaLocationCrad: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    locationImg: {
    height: 30,
    width: 20,
    tintColor: '#f57c02',
    marginRight: 15,
    },
    changeBtn: {
    backgroundColor: '#fff',
    borderColor: '#7d7f80',
    borderWidth: 1,
    width: 70,
    padding: 2,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    },
    mainAreaText: {
    fontSize: 20,
    color: '#000',
    },
    chageText: {
    fontSize: 13,
    color: '#f57c02',
    fontWeight: '500',
    },
    locationAddressText: {
    fontSize: 17,
    width: 300,
    marginTop: 10,
    color: '#8f9394',
    marginBottom: 10,
    },
    conformLocationBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57c02',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    },
    confirmText: {
    color: '#fff',
    fontSize: 15,
    },
    //conformLocationModelCrad
    conformLocationModelCrad: {
    flex: 1,
    },
    confirmLocationCrad: {
    backgroundColor: '#fff',
    marginTop: '25%',
    padding: 15,
    },
    confirmLocationScrollCrad: {
    marginBottom: 150,
    },
    dummyCrad: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2e2c9',
    borderColor: '#947543',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    },
    dummyText: {
    color: '#947543',
    fontSize: 10,
    width: '95%',
    },
    locationInput: {
    fontSize: 17,
    fontWeight: '400',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    marginBottom: 15,
    },
    voiceHead: {
    fontSize: 17,
    fontWeight: '400',
    color: '#c9c9c9',
    },
    recordCrad: {
    borderColor: '#c9c9c9',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    },
    recordText: {
    fontSize: 15,
    fontWeight: '500',
    },
    recardBottomCard: {
    height: 100,
    padding: 10,
    borderColor: '#c9c9c9',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    },
    egText: {
    color: '#c9c9c9',
    },
    saveText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    },
    savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    },
    savedBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c9c9c9',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 8,
    width: 80,
    },
    savedBtnText: {
    color: '#c9c9c9',
    fontSize: 17,
    },
    enterFlatBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57c02',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    opacity: 0.2,
    },
   });
   export default SwiggyAddress;