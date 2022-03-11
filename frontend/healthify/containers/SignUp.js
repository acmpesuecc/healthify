import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Platform,  TextInput, Button, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';





export default class SignUp extends React.Component
{
    // const handlePress = () => console.log("text in signup pressed");
    constructor()
    {
        super();
        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            confirmpassword: '',
            passwordError: '',
            phonenumber: '',
            dob: '',
        }
    }
    


    submit()
    {
        let regex=/^[a-zA-Z]+$/;
        let isvalid = regex.test(this.state.name);
        console.log(isvalid);
        if(!isvalid)
        {
            this.setState({nameError:"Name field cant be empty and it must be alphabets only"})
        }
        else
        {
            this.setState({nameError:""})
        }
        if(this.state.password != this.state.confirmpassword)
        {
            this.setState({passwordError:"The passwords do not match"})
        }
        else
        {
            this.setState({passwordError:""})

        }
    }

    emailValidator()
    {
        if(this.state.email=='')
        {
            this.setState({emailError:"Email can't be blank"})
        }
        else
        {
            this.setState({emailError:""})
        }
    }
    render(){
    return (
      <SafeAreaView style={styles.SignUp}>
        <Text style={styles.header}>SIGN UP</Text>
        <StatusBar style="auto" />
        <TextInput 
            style={styles.textinput} 
            placeholder="Name"
            onChangeText={(text) => {this.setState({name: text})}} 
            underlineColorAndroid={'transparent'} />
        <Text style={{color: 'red'}}>{this.state.nameError}</Text>
        <TextInput 
            style={styles.textinput} 
            onChangeText={(text) => {this.setState({email: text})}} 
            onBlur={()=>this.emailValidator()} 
            placeholder="Email" 
            keyboardType="email-address" 
            underlineColorAndroid={'transparent'} />
        <Text style={{color: 'red'}}>{this.state.emailError}</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={(text) => {this.setState({password: text})}} 
            placeholder="Password" 
            secureTextEntry={true} 
            underlineColorAndroid={'transparent'} />
        <TextInput 
            style={styles.textinput}
            onChangeText={(text) => {this.setState({confirmpassword: text})}} 
            placeholder="Confirm Password" 
            secureTextEntry={true} 
            underlineColorAndroid={'transparent'} />
        <Text style={{color: 'red'}}>{this.state.passwordError}</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={(text) => {this.setState({phonenumber: text})}} 
            keyboardType='numeric' 
            maxLength={10} 
            placeholder="Phone Number" 
            underlineColorAndroid={'transparent'} />
        <TextInput 
            style={styles.textinput} 
            placeholder="DOB"
            onChangeText={(text) => {this.setState({dob: text})}} 
            underlineColorAndroid={'transparent'} />
        <TouchableOpacity style = {styles.button} onPress={() => {this.submit()}}>
            <Text style={styles.btnstyle}>Sign Up</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    );
        }
  }
  


  const styles = StyleSheet.create({
    SignUp: {
        alignSelf: 'stretch',
        },
    header: {
        fontSize: 25,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#173F5F',
        borderBottomWidth: 2,
    },
    textinput:
    {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button:
    {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#59cbbd',
        marginTop: 20,
    },
    btnstyle:
    {
        color: '#fff',
        fontWeight: 'bold',
    }
  });
  
  