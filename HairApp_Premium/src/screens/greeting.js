
import React, { useState, useEffect }from 'react';
import {KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {translate,setI18nConfig} from '../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import { Globals } from '../config/globals';
export default function GreetingScreen(props) {

    useEffect(() => {
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
                
            }
        })
        .catch(err=>{            
            
        });
    },[]);

    actionNext = () => {
        props.navigation.navigate('GetStart');
    }

    return (
      <KeyboardAvoidingView style={[styles.primaryFullBG]}>
        <StatusBar hidden={true} />
        <View style={{flex:1,marginTop:50,paddingLeft:16,paddingRight:16}}>
            <View style={{flexDirection:'row'}}>
                <Image style={{width:50,height:40}}
                    source={require('../assets/hairapplogo.png')}
                    resizeMode="stretch"
                />
                <Text style={[styles.primaryText,{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}]}>HairApp</Text>
            </View>
            <View style={{justifyContent:'center',flex:1}}>
                <View style={[styles.vwContainer,{marginTop:20}]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:50,height:70}}
                            source={require('../assets/avatar.png')}
                            resizeMode="stretch"
                        />
                        <View style={{marginLeft:20,flex:1}}>
                            <Text style={styles.primaryGray}>{translate('introduce_me')}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.vwContainer}>
                    <View style={{padding:10}}>
                        <Text style={[styles.primaryGray,{fontSize:20,lineHeight:30}]}>{translate('intro_description')}</Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    
                </View>

                <TouchableOpacity style={{marginBottom:50}} onPress={() => actionNext()}>
                    <View style={[styles.primaryBtn]}>
                        <Text style={[styles.darkText,{fontWeight:'bold'}]}>Next</Text>
                    </View>
                </TouchableOpacity>  
            </View>


        </View>
      </KeyboardAvoidingView>
    );
}
