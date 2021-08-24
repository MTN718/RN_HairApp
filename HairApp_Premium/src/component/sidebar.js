import React, {useState} from 'react';
import {View,TouchableOpacity,Text,Image} from 'react-native';
import styles from '../common/style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Constants} from '../config/constants'

export default function Sidebar(props) {

    return (
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.8)',flex:1}}>
            <View style={{marginTop:10}}>
                <TouchableOpacity>
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',justifyContent:'flex-end'}}>
                        <Image source={require('../assets/close.png')} style={{width:40,height:40}} resizeMode="stretch"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',marginTop:20}}>
                        <Text style={[styles.menuText]}>Join Game</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',backgroundColor:'#efefef',height:1,marginLeft:24,marginRight:24,marginTop:10}}/>
                <TouchableOpacity onPress={() => props.onMenuClicked(0)}>
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',marginTop:10}}>
                        <Text style={[styles.menuText]}>How to Videos</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',backgroundColor:'#efefef',height:1,marginLeft:24,marginRight:24,marginTop:10}}/>

                <TouchableOpacity >
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',marginTop:10}}>
                        <Text style={[styles.menuText]}>Rule Book</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection:'row',backgroundColor:'#efefef',height:1,marginLeft:24,marginRight:24,marginTop:10}}/>

                <TouchableOpacity>
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',marginTop:10}}>
                        <Text style={[styles.menuText]}>About  Contango</Text>
                    </View>
                </TouchableOpacity>

                <View style={{flexDirection:'row',backgroundColor:'#efefef',height:1,marginLeft:24,marginRight:24,marginTop:10}}/>

                <TouchableOpacity onPress={() => props.onMenuClicked(4)}>
                    <View style={{flexDirection:'row',padding:16,alignItems:'center',marginTop:10}}>
                        <Text style={[styles.menuText]}>Sign out</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}
