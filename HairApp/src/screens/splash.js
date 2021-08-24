
import React, { useState, useEffect }from 'react';
import {KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {translate,setI18nConfig} from '../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import { Globals } from '../config/globals';
export default function SplashScreen(props) {

    useEffect(() => {
        setTimeout(() => checkFirsttime(), 3000)
    },[]);

    checkFirsttime =() => {
        DefaultPreference.getMultiple(['userNo']).then(function(values) 
        {         
            console.log(values);
            if (values[0] != null)
            {              
                Globals.userNo = values[0];
                props.navigation.navigate('Main');
            }
            else
            {
                props.navigation.navigate('Greeting');
            }
        })
        .catch(err=>{            
            props.navigation.navigate('Greeting');
        });
    }

    return (
      <KeyboardAvoidingView style={[styles.primaryFullBG]}>
        <StatusBar hidden={true} />
        <View style={{flex:1,marginTop:50,paddingLeft:16,paddingRight:16,backgroundColor:'#fff',justifyContent:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Image style={{width:200,height:200}}
                    source={require('../assets/hairapplogo.png')}
                    resizeMode="stretch"
                />
            </View>
        </View>
      </KeyboardAvoidingView>
    );
}
