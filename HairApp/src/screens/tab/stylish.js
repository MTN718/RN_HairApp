
import React, { useState, useEffect }from 'react';
import {FlatList,Dimensions,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../../common/style';
import {translate,setI18nConfig} from '../../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../../config/constants'
export default function Stylish(props) {

    const [tutorials, setTDatas] = useState(props.datas);
    const [user,setUser] = useState(props.user);

    useEffect(() => {
        setTDatas(props.datas)
    });

    onClickTutorial = (item) => {
        console.log(item);
        props.context.navigation.navigate('Tutorial',{info:item,user:user.id});
    }

    return (
        <View style={{flex:1,paddingLeft:16,paddingRight:16}}>
            <ScrollView>
                <View style={[styles.vwContainer,{marginTop:20}]}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="book" size={25} color={Constants.BASE_GREEN}></Icon>
                        <Text style={[styles.primaryGrayBold,{marginLeft:10}]}>{translate('tutorial')}</Text>
                    </View>
                    {
                        tutorials.length == 0?
                            <Text style={[styles.primaryGray,{fontWeight:'600'}]}>{translate('no_match_tutorial')}</Text>
                        :
                        tutorials.map(item => (
                            <TouchableOpacity onPress={() => onClickTutorial(item)}>
                                <View style={[styles.vwDetailAnswer]}>
                                    {
                                        <Image style={{width:30,height:30,marginLeft:10}}
                                        source={{uri:item.data.picture}}
                                        resizeMode="stretch"
                                        />
                                    }
                                    
                                    <View style={{marginLeft:20,flex:1}}>
                                        <Text style={[styles.primaryGray,{fontWeight:'600'}]}>{item.data.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>  
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}
