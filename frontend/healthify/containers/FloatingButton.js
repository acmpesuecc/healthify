import React, {useState} from "react";
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons"
import CameraTrial from "./CameraTrial";

export default function floatingButton() 
{
    const animation = new Animated.Value(0);
    const [camOpen, setCamOpen] = useState(false);
    var open;

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        
        Animated.spring(animation,{
            toValue,
            friction : 5
        }).start();
        
         open = !open;
    };
            
    const camStyle = {
        transform: [
            {scale : animation},
            {
                translateY : animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, -140]
                })
            }
        ]
    };
        
    const formStyle = {
        transform: [
            {scale : animation},
            {
                translateY : animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, -80]
                })
            }
        ]
    }; 
        
    const rotation = {
        transform : [
            {
                rotate : animation.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    };

    const camHandler = ()=> {
        setCamOpen(!camOpen)
    };
    
        return(
            <>
            <View style = {[styles.container, ]}>
                <TouchableWithoutFeedback onPress={camHandler} >
               
                    <Animated.View style = {[styles.button, styles.secondary, camStyle]} >
                        <Entypo 
                            name = "camera"
                            size =  {20}
                            color = "#002B5B" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback>
                    <Animated.View style = {[styles.button, styles.secondary, formStyle]}>
                        <Entypo 
                            name = "text-document"
                            size =  {20}
                            color = "#002B5B" />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={toggleMenu}>
                    <Animated.View style = {[styles.button, styles.menu, rotation]}>
                        <AntDesign 
                            name = "plus"
                            size =  {24}
                            color = "#FFF"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                
            </View>
            {camOpen && <CameraTrial />}
            </>
        );
}

const styles = StyleSheet.create({
    container : {
        alignItems: "center",
        position: "absolute",
        bottom: 80,
        right: 50
    },
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#002B5B",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    menu: {
        backgroundColor: "#002B5B"
    },
    secondary : {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor:"#FFF"
    }
});
