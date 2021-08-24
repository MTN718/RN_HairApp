import React, { Component } from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Animated, FlatList, TouchableOpacity, StyleSheet, StatusBar, View, Image, Text, TextInput } from 'react-native';
import styles from '../common/style';
import { priceFormat } from '../game/util';
import { Globals } from '../config/globals';
import {tradePlayer} from '../game/action';
import { GameValue } from '../config/game';

export default function DialogSelectTrader(props) {

    actionSelect = (item) => {
        let info = {
            playerId:item.playerId,
            amount:props.info.amount,
            info:props.info.info
        };  
        tradePlayer(info);
        props.openWaiting();
        props.backMain();
    }


    return (
        props.isVisible ? 
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)',position:'absolute',left:0,top:0,right:0,bottom:0}}>
            <View style={{justifyContent:'center',alignItems:'center',padding:20,width:'100%',flex:1}}>
                <View style={{width:'100%'}}>
                    <Text style={{fontSize:25,color:'#D9D8D6',textAlign:'center',fontFamily:'Montserrat'}}>Please select Player to send ${priceFormat(props.info.amount)}</Text>
                    <ScrollView>
                        <View>
                            {
                                props.players.map(item => (
                                    item.playerId != Globals.userNo ?
                                    <TouchableOpacity style={{marginTop:20}} onPress={() => actionSelect(item)}>
                                        <View style={[styles.primaryBtn,{width:'100%'}]}>
                                            <Text style={[styles.darkText]}>{item.playerName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                ))
                            }
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{marginTop:20}} onPress={() => props.cancel()}>
                        <View style={[styles.primaryEmptyBtn,{width:'100%'}]}>
                            <Text style={[styles.primaryText,{textAlign:'center',fontSize:18}]}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        :
        null
    );
}