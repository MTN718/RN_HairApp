
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
import style from '../common/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal"

export default function DetailScreen(props) {
    const [dlgInfo, setDialog] = useState({isActive:false,msg:""});
    const [iInfo, setIndicator] = useState({isActive:false,msg:""});
    const [uInfo, setUserInfo] = useState(props.navigation.state.params.info);
    const [answers, setAnswers] = useState([]);
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        loadUserInfo();
        loadTutorial();
    },[]);


    initDetail = () => {
        console.log('Reload');
        loadUserInfo();
        loadTutorial();
    }

    reAllocProfile = (info) => {
        let params = {};
        console.log(info);
        params['user'] = info.name;
        params['id'] = info.no;
        params['options'] = [];
        params['options'][1] = {"answer":info.quiz_1};
        params['options'][2] = {"answer":info.quiz_2};
        params['options'][3] = {"answer":info.quiz_3};
        params['options'][4] = {"answer":info.quiz_4};
        params['options'][5] = {"answer":info.quiz_5};
        params['options'][6] = {"answer":info.quiz_6};
        params['options'][7] = {"answer":info.quiz_7};
        params['options'][8] = {"answer":info.quiz_8};
        params['options'][9] = {"answer":info.quiz_9};
        console.log(params);

        // DefaultPreference.getMultiple(['contacts']).then(function(values) 
        // {          
        //     if (values[0] != null)
        //     {   
        //         let cs = JSON.parse(values[0]);
        //         for(i = 0;i < cs.length;i++)
        //         {
        //             if (cs[i].id == params.id)
        //             {
        //                 cs[i] = params;
        //                 break;
        //             }
        //         }
        //         DefaultPreference.setMultiple({contacts:JSON.stringify(cs)}).then(function(values) 
        //         {  
                    
        //         })
        //         .catch(err=>{
                    
        //         });
        //     }
        // })
        // .catch(err=>{            
            
        // });
    }

    loadUserInfo = () => {
        let params = {name:props.navigation.state.params.info.no,language:RNLocalize.getLocales()[0].languageCode}
        console.log(params);
        serviceUserDetail(params)
        .then(res=>{ 
            console.log(res);
            reAllocProfile(res.user);
            setAnswers(res.answers)
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    loadTutorial = () => {
        setIndicator({isActive:true,msg:'Getting User Details'});
        let params = {user:props.navigation.state.params.info.no}
        console.log(params);
        serviceGetTutorials(params)
        .then(res=>{ 
            setIndicator({isActive:false,msg:''});
            console.log(res)
            setTutorials(res)
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });

        
    }

    

    onClickBack = () => {
        props.navigation.goBack();
        props.navigation.state.params.onReload();
    }

    actionPrivacy = () => {
        setDialog({isActive:true,msg:translate('privacy_content')})
    }

    actionCredit = () => {
        setDialog({isActive:true,msg:translate('credit_content')})
    }

    clickQuiz = (index) => {
        console.log(index)
        props.navigation.navigate('Update',{quiz:index,profile:uInfo,onReload:initDetail});
    }

    actionClickTutorial = () => {
        props.navigation.navigate('TutorialList',{tutorials:tutorials,profile:uInfo});
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
                <TouchableOpacity onPress={() => onClickBack()}>
                    <Icon name="arrow-left" style={{marginRight:20}} size={25} color={Constants.BASE_GREEN}></Icon>
                </TouchableOpacity>
                <Image style={{width:50,height:40}}
                    source={require('../assets/hairapplogo.png')}
                    resizeMode="stretch"
                />
                <Text style={[styles.primaryText,{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}]}>Hair</Text>
            </View>
            <ScrollView>
                <View style={{flex:1}}>
                    <View style={[styles.vwContainer,{marginTop:20}]}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="user" size={25} color={Constants.BASE_GREEN}></Icon>
                            <Text style={[styles.primaryGrayBold,{marginLeft:10}]}>{translate('profile')}</Text>
                        </View>
                        
                        {
                            props.navigation.state.params.info.quiz_1 == 3?
                            <View>
                                <TouchableOpacity onPress={() => clickQuiz(9)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_1')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[8] && answers[8][0]? answers[8][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={() => clickQuiz(2)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_1')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[1] && answers[1][0]? answers[1][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => clickQuiz(7)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_2')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[6] && answers[6][0]? answers[6][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => clickQuiz(3)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_3')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[2] && answers[2][0]? answers[2][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => clickQuiz(4)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_4')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[3] && answers[3][0]? answers[3][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => clickQuiz(5)}>
                                    <View style={[styles.vwDetailAnswer]}>
                                        <View style={{marginLeft:20,width:100}}>
                                            <Text style={styles.primaryGray}>{translate('quiz_detail_5')}</Text>
                                        </View>
                                        <View style={{marginLeft:20,flex:1}}>
                                            <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[4] && answers[4][0]? answers[4][0].name :''}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {/* {
                                    props.navigation.state.params.info.quiz_1 == 1?
                                    <TouchableOpacity onPress={() => clickQuiz(8)}>
                                        <View style={[styles.vwDetailAnswer]}>
                                            <View style={{marginLeft:20,width:100}}>
                                                <Text style={styles.primaryGray}>{translate('quiz_detail_6')}</Text>
                                            </View>
                                            <View style={{marginLeft:20,flex:1}}>
                                                <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{answers[7] && answers[7][0]? answers[7][0].name :''}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                } */}
                            </View>
                        }
                    </View>
                    <TouchableOpacity style={{marginTop:20}} onPress={() => actionClickTutorial()}>
                        <View style={[styles.primaryBtnMediumBd]}>
                            <Text style={[styles.darkText,{fontWeight:'bold'}]}>{translate('Tutorials')}</Text>
                        </View>
                    </TouchableOpacity>  
                    {/* <View style={[styles.vwContainer,{marginTop:20}]}>
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
                    </View> */}


                    <View style={[styles.vwContainer,{marginTop:20}]}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="info-circle" size={25} color={Constants.BASE_GREEN}></Icon>
                            <Text style={[styles.primaryGrayBold,{marginLeft:10}]}>{translate('info')}</Text>
                        </View>
                        
                        <TouchableOpacity style={{marginTop:20}} onPress={() => actionPrivacy()}>
                            <View style={[styles.primaryBtnMediumBd]}>
                                <Text style={[styles.darkText,{fontWeight:'bold'}]}>{translate('privacy')}</Text>
                            </View>
                        </TouchableOpacity>  

                        <TouchableOpacity style={{marginTop:20}} onPress={() => actionCredit()}>
                            <View style={[styles.primaryBtnMediumBd]}>
                                <Text style={[styles.darkText,{fontWeight:'bold'}]}>{translate('credit')}</Text>
                            </View>
                        </TouchableOpacity>  
                    </View>
                </View>
            </ScrollView>

            {/* <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
                style={{marginTop:10}}
            /> */}
        </View>
        <Modal 
            backdropColor="#000"
            isVisible={dlgInfo.isActive}>
            <View style={{ backgroundColor:"#fff",padding:10,borderRadius:10,alignItems:'center',}}>
                <View style={{marginVertical:0}}>
                    
                    <Text style={{color:'#000',fontSize:18,textAlign:"left",marginVertical:20}}>
                        {dlgInfo.msg}
                    </Text>
                    <TouchableOpacity 
                    style={{alignSelf:'center'}}
                    onPress={()=>setDialog({isActive:false,msg:''})}>
                        <Text style={{padding:10,textAlign:'center',color:Constants.BASE_GREEN,fontWeight:'bold'}}> OK </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
      </KeyboardAvoidingView>
    );
}
