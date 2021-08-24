
import React, { useState, useEffect }from 'react';
import {Linking,ScrollView,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {Globals} from '../config/globals';
import {translate,setI18nConfig} from '../common/translate_helper';
import {serviceGetProducts,serviceClickpremiumlink,serviceGetTutorialDetail,serviceGetPremiumUnlock} from '../service/api';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../config/constants'
import Video from 'react-native-video';
import Share from "react-native-share";

export default function TutorialScreen(props) {

    const [info, setInfo] = useState(props.navigation.state.params.info);
    const [user, setUser] = useState(props.navigation.state.params.user);
    const [products, setProducts] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(1);
    const [clickCount, setClickcount] = useState(0);
    
    useEffect(() => {
        loadProducts()
        loadDetailTutorial()
        getClickcount()
        console.log(user)
    },[]);

    onClickBackMain = () => {
        props.navigation.goBack();

    }

    getClickcount = () => {
        if (info.data.membership == 1)
        {
            let params = {user_id:Globals.userNo,tutorial_id:info.data.no}
            console.log(params)
            serviceGetPremiumUnlock(params)
            .then(res=>{ 
                console.log(res);
                setClickcount(res.count);
            })
            .catch(err=>{

            });
        }
    }

    saveClickcount = () => {
        let params = {user_id:Globals.userNo,tutorial_id:info.data.no}
        serviceClickpremiumlink(params)
        .then(res=>{ 
            console.log(res);
            setClickcount(res.count);
        })
        .catch(err=>{

        });
    }

    loadDetailTutorial = () => {
        let params = {no:info.data.no}
        serviceGetTutorialDetail(params)
        .then(res=>{ 
            setSteps(res.steps);
            if (res.steps.length > 0)
                setStepIndex(1)
        })
        .catch(err=>{

        });
    }

    loadProducts = () => {
        let params = {tutorial:info.data.no}
        serviceGetProducts(params)
        .then(res=>{ 
            setProducts(res.products);
        })
        .catch(err=>{

        });
    }

    clickProduct = (item) => {

    }

    clickNextStep = () => {
        if (stepIndex < steps.length)
            setStepIndex(stepIndex + 1);
    }

    clickBackStep = () => {
        if (stepIndex > 1)
            setStepIndex(stepIndex - 1);
    }

    actionVisitPage = () => {

        // saveClickcount();
        const shareOptions = {
            title: 'Share Url',
            url: "https://hairapp.it/backend/index.php/Admin/visitPage/" + Globals.userNo,
            failOnCancel: false,
        };
        Share.open(shareOptions);
        // Linking.canOpenURL("http://hairapp.it").then(supported => {
        //     if (supported) {
        //       Linking.openURL("http://hairapp.it");
              
        //     } else {
        //       console.log("Don't know how to open URI: " + this.props.url);
        //     }
        // });
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
                <Text style={[styles.primaryText,{flex:1,marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}]}>HairApp</Text>
                <TouchableOpacity onPress={() => onClickBackMain()}>
                    <Icon name="close" style={{marginRight:20}} size={25} color={Constants.BASE_GREEN}></Icon>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                {
                    info.data.membership == 1 && clickCount < 5?
                    <View>
                        <Text style={[styles.primaryGrayBold,{marginLeft:10,marginTop:10}]}>{translate('unlock_text')}</Text>
                        <Text style={{textAlign:'center',marginTop:50}}>Current visit count:{clickCount}</Text>
                        <TouchableOpacity style={{marginTop:50}} onPress={() => actionVisitPage()}>
                            <View style={[styles.primaryBtnMediumBd,{flexDirection:'row',alignItems:'center'}]}>
                                <Image style={{width:50,height:50}}
                                    source={require('../assets/icon-full.png')}
                                    resizeMode="stretch"
                                />
                                <Text style={[styles.darkText,{fontWeight:'bold',marginLeft:20}]}>{translate('visit_page')}</Text>
                            </View>
                        </TouchableOpacity>  
                    </View>
                    :
                    <View style={{justifyContent:'center',flex:1}}>
                        <ScrollView>
                            <View>
                            {
                                steps.length > 0?   
                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <TouchableOpacity onPress={() => clickBackStep()}>
                                        <Icon name="arrow-left" style={{marginRight:20}} size={25} color={'#bcbcbc'}></Icon>
                                    </TouchableOpacity>
                                    <Text style={[styles.primaryGrayBold,{marginLeft:10,textAlign:'center',flex:1}]}>{stepIndex +  translate('of') + steps.length + translate('steps')}</Text>
                                    <TouchableOpacity onPress={() => clickNextStep()}>
                                        <Icon name="arrow-right" style={{marginRight:20}} size={25} color={'#bcbcbc'}></Icon>
                                    </TouchableOpacity>
                                </View> : 
                                null
                            }
                            
                            
                            <View style={[styles.vwContainer,{marginTop:20}]}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{width:'100%',height:250}}
                                        source={{uri:steps.length > 0 ? steps[stepIndex - 1].picture : ''}}
                                        resizeMode="stretch"
                                    />
                                </View>
                                <HTMLView
                                    value={steps.length > 0 ? steps[stepIndex - 1].content:''}
                                    style={{marginTop:10}}
                                />
                            </View>
                            <Text style={[styles.primaryGrayBold,{marginLeft:10,marginTop:10}]}>{translate('video')}</Text>
                            <Video 
                                // source={require('../assets/intro.mp4')} 
                                source={{uri:steps.length > 0 ? steps[stepIndex - 1].video:''}}   // Can be a URL or a local file.
                                style={{width:'100%',height:250}}
                            />
                            <View style={[styles.vwContainer,{marginTop:20}]}>
                                <Text style={[styles.primaryGrayBold,{marginLeft:10}]}>{translate('products')}</Text>
                                {
                                    products.map(item => (
                                        <TouchableOpacity onPress={() => clickProduct(item)}>
                                            <View style={[styles.vwDetailAnswer]}>
                                                <Image style={{width:100,height:70,marginLeft:10}}
                                                    source={{uri:item.picture}}
                                                    resizeMode="stretch"
                                                />
                                                <View style={{marginLeft:20,flex:1}}>
                                                    <Text style={[styles.primaryGray,{fontWeight:'600',textAlign:'center'}]}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>


                            
                            </View>
                        </ScrollView>
                    </View>

                }
                
            </View>
        </View>
      </KeyboardAvoidingView>
    );
}
