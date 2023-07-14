import { PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
interface IProps {}
interface IState {
    isAddressModel: boolean;
    coordinateValues: any;
    location: any;
    region: any;
    cgangeAddressModel: boolean;
    conformLocationModal: boolean;
    flatNo: string;
    appartment: string;
    savedPlace: string,
    addressList: any[],
    isEdit:boolean;
    activeId:any
}
export class SwiggyAddressController extends Component<IProps,IState> {
  state = {
    isAddressModel: false,
    cgangeAddressModel: false,
    conformLocationModal: false,
    coordinateValues: {
      latitude: 17.376262847127638,
      longitude: 78.52636646479368,
    },
    region: {
      latitude: 17.45071910374192,
      longitude: 78.39152913540602,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    location: '',
    flatNo: '',
    appartment: '',
    addressList: [],
    savedPlace: '',
    isEdit:false,
    activeId:""
  };
  componentDidMount() {
    this.getOneTimeLocation();
  }
  getCurrentLocation = () => {
    Geocoder.from(this.state.coordinateValues.latitude, this.state.coordinateValues.longitude)
    .then(json => {
      var addressComponent = json.results[0].formatted_address;
      this.setState({location: addressComponent})
      
    })
    .catch(error => console.warn(error));
  };
  getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position: any) => {
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        this.setState({
          coordinateValues: {
            latitude: currentLatitude,
            longitude: currentLongitude,
          },
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        },() => {
          this.getCurrentLocation();
        });
      },
      (error: any) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  onPressmap = async (event: any) => {
    const {coordinate} = event.nativeEvent;
    console.log(coordinate);
    await Geocoder.from(coordinate.latitude, coordinate.longitude)
      .then(response => {
        const selectedLocation = response.results[0].formatted_address;
        console.log('data', selectedLocation);
        this.setState({
          coordinateValues: coordinate,
          location: selectedLocation,
        }, () => {
          this.getCurrentLocation();
        });
      })
      .catch(error => {
        console.log('Error', error);
      });
  };
  onPressAddAddress = () => {
    const {isEdit,activeId,addressList} = this.state
if (! isEdit){

    const addressObj = {
        id: new Date().toString(),
        location: this.state.location,
        flatNo: this.state.flatNo,
        appartment: this.state.appartment,
        savedPlace: this.state.savedPlace
      }
      
      this.setState({addressList:[...this.state.addressList,addressObj]},()=>this.setState({isAddressModel:false}))


} else {

    const updatedArray = addressList.map((each: any)=>
    each.id === activeId ? {...each,flatNo:this.state.flatNo} : each)

this.setState({addressList:updatedArray,isEdit:false})
 
}
    
  };

  onDelete = (id:any)=>{
   const deleteAddress = this.state.addressList.filter(item =>
    item.id != id )
   this.setState({addressList:deleteAddress})
  }
  onEdit = (item:any) =>{

    this.setState({isEdit:true,activeId:item.id,flatNo:item.flatNo})

  }
}

export default SwiggyAddressController