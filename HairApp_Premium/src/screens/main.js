
import React, { useState, useEffect }from 'react';
import {FlatList,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {translate,setI18nConfig} from '../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Globals } from '../config/globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import {serviceGetContacts,serviceDeleteProfile} from '../service/api';

export default function MainScreen(props) {
    const [contacts, setContacts] = useState([]);
    const storedContacts = [];

    useEffect(() => {
        getContacts();
    },[]);


    init = () => {
        getContacts();
    }
    getContacts = () => {
        serviceGetContacts()
        .then(res=>{ 
            console.log(res);
            if (res.users == null || res.users.length == 0)
            {
                setContacts([])
                Globals.contacts = [];
                props.navigation.navigate('Question',{onReload:init});
                // setTimeout(() => {}, 1000)
            }
            else 
            {
                setContacts(res.users)
                Globals.contacts = res.users;
            }
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }
    actionAddPerson = () => {
        props.navigation.navigate('Question',{onReload:init});
    }

    onClickPerson = (item) => {
        console.log(item);
        props.navigation.navigate('Details',{info:item,onReload:init});
    }

    clickTrash = (item,index) => {

        let params = {user_id:contacts[index].no}
        serviceDeleteProfile(params)
        .then(res=>{ 
            console.log(res);
            getContacts()
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    renderItem = (item,index) => {
        let imageIcon = require('../assets/avatar.png');
        if (contacts[index].quiz_1 == "1")
        {
            imageIcon = require('../assets/avatar_man.png');
        }
        else if (contacts[index].quiz_1 == "3")
        {
            imageIcon = require('../assets/avatar_kid.png');
        }
        return (
            <TouchableOpacity onPress={() => onClickPerson(item)}>
                <View style={[styles.vwContainer,{marginTop:20}]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{width:50,height:70}}
                            source={imageIcon}
                            resizeMode="stretch"
                        />
                        <View style={{marginLeft:20,flex:1}}>
                            <Text style={styles.primaryGray}>{item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => clickTrash(item,index)}>
                            <Icon name="trash" style={{marginRight:20}} size={25} color={'#f00'}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    //getContacts();
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
            <View style={{flex:1}}>
                {
                    (contacts != null && contacts.length > 0) ? 
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{marginTop:10}}
                        keyExtractor={(item, index) => index.toString()}
                        data={contacts}
                        renderItem={({item,index}) => renderItem(item,index)}
                    />
                    :
                    <Text style={[styles.primaryGray,{marginTop:10,textAlign:'center'}]}>{translate('no_contacts')}</Text>
                }
                
            </View>

            <TouchableOpacity style={{position:'absolute',right:20,bottom:50}} onPress={() => actionAddPerson()}>
                <View style={[styles.primaryCircle]}>
                    <Text style={[styles.darkText,{fontWeight:'bold',fontSize:30}]}>+</Text>
                </View>
            </TouchableOpacity> 

        </View>
      </KeyboardAvoidingView>
    );
}
