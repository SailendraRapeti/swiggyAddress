import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import baseUrl from "./config.js"

class Address extends Component {
    componentDidMount(): void {
        this.GetData();
        console.log(baseUrl)
    }
    GetData= async ()=>{
        const url = baseUrl+"/users?page=2"
        const response = await fetch(url)
        const data = await response.json()
console.log(data.data)
    }

    postData= async () =>{
        const data ={
            "name": "sailendra",
            "job": "leader",
            "PLACE":"HYD"
        }
        const options ={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accecpt:"application/json",
            },
            body:JSON.stringify(data)
        }
        const url = baseUrl+"/users"
        try{
            const res = await fetch(url,options)
            const resData = await res.json()
            console.log(resData)
        }catch(error){
            console.log(error)
        }

    }


    putData= async () =>{
        const data ={
            "name": "sailendra",
            "job": "leader"
        }
        const options ={
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Accecpt:"application/json",
            },
            body:JSON.stringify(data)
        }
        const url = baseUrl+"/users/2S"
        try{
            const res = await fetch(url,options)
            const resData = await res.json()
            console.log(resData)
        }catch(error){
            console.log(error)
        }

    }

    onDelete= async () =>{
        const data ={
            "name": "sailendra",
            "job": "leader"
        }
        const options ={
            method:"DELETE",
            
        }
        const url = baseUrl+"/users/2"
        try{
            const res = await fetch(url,options)
           console.log(res)
            
        }catch(error){
            console.log(error)
        }

    }



  render() {
    return (
      <View>
        <Text>Address</Text>
        <Button  onPress={this.postData} title='POST'/>
        <Button  onPress={this.postData} title='PUT'/>
        <Button  onPress={this.onDelete} title='Delete'/>
      </View>
    )
  }
}

export default Address