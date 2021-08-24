import React, { Component } from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Animated, FlatList, TouchableOpacity, StyleSheet, StatusBar, View, Image, Text, TextInput } from 'react-native';
import styles from '../common/style';
import {changeTurn} from '../game/action';

export default function DialogWaiting(props) {


    return (
        props.isVisible ? 
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)',position:'absolute',left:0,top:0,right:0,bottom:0}}>
            <View style={{justifyContent:'center',alignItems:'center',padding:20,width:'100%',flex:1}}>
                <View style={{width:'100%'}}>
                    <Text style={{fontSize:25,color:'#D9D8D6',textAlign:'center',fontFamily:'Montserrat'}}>Waiting to confirm trade asset</Text>
                    
                    <TouchableOpacity style={{marginTop:20}} onPress={() => props.cancel()}>
                        <View style={[styles.primaryEmptyBtn,{width:'100%'}]}>
                            <Text style={[styles.primaryText,{textAlign:'center',fontSize:18}]}>Return to Game</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        :
        null
    );
}