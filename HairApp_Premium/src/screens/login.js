
import React, { useState, useEffect }from 'react';
import {KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {translate,setI18nConfig} from '../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import Modal from "react-native-modal";
import {serviceSubmitEmail} from '../service/api';
import {Globals} from '../config/globals';

export default function LoginScreen(props) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errInfo, setError] = useState({isActive:false,msg:""});
    const [iInfo, setIndicator] = useState({isActive:false,msg:"Signing User..."});

    useEffect(() => {
        
    },[]);

    actionCheckemail = () => {
        if (userName == '')
        {
            setError({isActive:true,msg:translate('err_empty_email')});
            return;
        }
        if (!userName.includes("@"))
        {
            setError({isActive:true,msg:translate('err_validate_email')});
            return;
        }
        if (password == '')
        {
            setError({isActive:true,msg:translate('err_empty_password')});
            return;
        }
        let params = {
            user:userName,
            password:password
        };
        setIndicator({isActive:true,msg:translate('submit_email_indicator')});
        serviceSubmitEmail(params)
        .then(res=>{ 
            console.log(res);
            setIndicator({isActive:false,msg:''});
            Globals.userNo = res.name;
            DefaultPreference.setMultiple({userNo:res.name.toString()}).then(function(values) 
            {  
                if (res.new)
                {
                    props.navigation.navigate('Main');
                }
                else
                {
                    props.navigation.navigate('Main');
                }
            })
            .catch(err=>{
                
            });

            
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    return (
      <KeyboardAvoidingView style={[styles.primaryFullBG]}>
        <StatusBar hidden={true} />
        {
            iInfo.isActive == true &&
            <View style={styles.loading}>
                <View style={styles.loaderView}>
                    <ActivityIndicator color="#d84c41" style={styles.activityIndicator}/>
                    <Text style={styles.loadingText}>{iInfo.msg}</Text>
                </View>
            </View>
        }
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
                        <View style={{marginLeft:20,flex:1}}>
                            <Text style={styles.primaryGray}>{translate('login_description')}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.vwContainer}>
                    <View style={{padding:10}}>
                        <Text style={[styles.primaryText,{fontSize:20,fontWeight:'200'}]}>Email</Text>
                        <TextInput
                            style={[styles.primaryInput,{marginTop:10,fontWeight:'200'}]}
                            value={userName} 
                            onChangeText={text => setUserName(text)}
                        />

                        <Text style={[styles.primaryText,{fontSize:20,marginTop:20,fontWeight:'200'}]}>Password</Text>
                        <TextInput
                            style={[styles.primaryInput,{marginTop:10,fontWeight:'200'}]}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                </View>

                <View style={{flex:1}}>
                    
                </View>

                <TouchableOpacity style={{marginBottom:50}} onPress={() => actionCheckemail()}>
                    <View style={[styles.primaryBtn]}>
                        <Text style={[styles.darkText,{fontWeight:'bold'}]}>Next</Text>
                    </View>
                </TouchableOpacity>  
            </View>


        </View>
        <Modal 
            backdropColor="#000"
            isVisible={errInfo.isActive}>
            <View style={{ backgroundColor:"#FC4236",padding:10,borderRadius:10,alignItems:'center',}}>
                <View style={{marginVertical:0}}>
                    
                    <Text style={{color:'#FFF',fontSize:18,textAlign:"center",marginVertical:20}}>
                        {errInfo.msg}
                    </Text>
                    <TouchableOpacity 
                    style={{alignSelf:'center'}}
                    onPress={()=>setError({isActive:false,msg:''})}>
                        <Text style={{padding:10,textAlign:'center',color:'#fff',fontWeight:'bold'}}> Dismiss </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
      </KeyboardAvoidingView>
    );
}
