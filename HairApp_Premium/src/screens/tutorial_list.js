
import React, { useState, useEffect }from 'react';
import {ScrollView,FlatList,Dimensions,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {translate,setI18nConfig} from '../common/translate_helper';
import DefaultPreference from 'react-native-default-preference';
import {serviceUserDetail,serviceGetTutorials} from '../service/api';
import { TabBar,TabView, SceneMap,NavigationState,SceneRendererProps} from 'react-native-tab-view';
import {Constants} from '../config/constants'
import * as RNLocalize from "react-native-localize";
import Wellness from './tab/wellness'
import Stylish from './tab/stylish'
import style from '../common/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal"

export default function TutoriallistScreen(props) {
    const [uInfo, setUserInfo] = useState(props.navigation.state.params.profile);
    const [tutorials, setTutorials] = useState(props.navigation.state.params.tutorials);
    const [index, setIndex] = useState(0);
    const [routes,setRoutes] = useState([
        { key: 'wellness', title: 'Wellness'},
        { key: 'stylish', title: 'Styling'},
    ])
    const [wellTutorial, setWellTutorial] = useState([]);
    const [styleTutorial, setStyleTutorial] = useState([]);
    const initialLayout = { width: Dimensions.get('window').width };

    useEffect(() => {
        console.log('Tutorial List');
        console.log(tutorials);
        setData();
    },[]);

    setData = () => {
        console.log(tutorials);
        let stDatas = [];
        let wlDatas = [];
        for (i = 0;i < tutorials.length;i++)
        {
            if (tutorials[i].data.category == 1)
            {
                stDatas.push(tutorials[i]);
            }
            else
            {
                wlDatas.push(tutorials[i]);
            }
        }
        console.log(wlDatas);
        setWellTutorial(wlDatas);
        setStyleTutorial(stDatas);
    }
    onClickTutorial = (item) => {
        console.log(item);
        props.navigation.navigate('Tutorial',{info:item,user:props.navigation.state.params.info.id});
    }

    backDetail = () => {
        props.navigation.goBack();
    }

    renderItem = (route) => {
    
        return (
            <View style={{flex:1}}>
                <Text>{route.title}</Text>
            </View>
        );
      };

    renderTabBar = (props) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white' }}
                style={styles.tabbar}
                style={{ backgroundColor: Constants.BASE_GREEN}}
            />
        );
    }

    renderScene = ({route}) => {
        console.log(route);
        if (route.key == "wellness")
        {
            return <Wellness context={props}  datas={wellTutorial} user={uInfo}></Wellness>
        }
        else if (route.key == "stylish")
        {
            return <Stylish context={props} datas={styleTutorial} user={uInfo}></Stylish>
        }
    };

    return (
      <KeyboardAvoidingView style={[styles.primaryFullBG]}>
        <StatusBar hidden={true} />
        <View style={{marginTop:50,paddingLeft:16,paddingRight:16}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => backDetail()}>
                    <Icon name="arrow-left" style={{marginRight:20}} size={25} color={Constants.BASE_GREEN}></Icon>
                </TouchableOpacity>
                <Image style={{width:50,height:40}}
                    source={require('../assets/hairapplogo.png')}
                    resizeMode="stretch"
                />
                <Text style={[styles.primaryText,{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}]}>HairApp</Text>
            </View>
        </View>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={initialLayout}
            style={{marginTop:10}}
        />
      </KeyboardAvoidingView>
    );
}
