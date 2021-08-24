import React, { Component } from 'react';
import {View} from 'react-native';
import Styles from '../common/style';

const { styles } = Styles;

export default function Overlay(props) {

    return (
        props.isVisible ? 
        <View style={{position:'absolute',left:0,top:0,right:0,bottom:0,backgroundColor:'#000',opacity:0.2}}>

        </View> : 
        null
    );
}
