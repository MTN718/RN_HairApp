
import React, { useState, useEffect }from 'react';
import {ScrollView,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {Globals} from '../config/globals';
import {translate,setI18nConfig} from '../common/translate_helper';
import {serviceGetQuestion,serviceGetUserInfo,serviceSubmitProfile} from '../service/api';
import * as RNLocalize from "react-native-localize";
import Modal from "react-native-modal"
import Accordion from 'react-native-collapsible/Accordion';
import DefaultPreference from 'react-native-default-preference';

export default function QuestionScreen(props) {

    const [contacts, setContacts] = useState([]);
    const [username, setUsername] = useState("");
    const [question, setQuestion] = useState(1);
    const [quizText, setQuizText] = useState("");
    const [iInfo, setIndicator] = useState({isActive:false,msg:""});
    const [errInfo, setError] = useState({isActive:false,msg:""});
    const [isShowInput, setShowInput] = useState(false);
    const [userProfile, setProfile] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [activeSections, setActiveSections] = useState([]);
    const [hasDescription, isDescription] = useState(false);
    

    useEffect(() => {
        loadQuestion(question)
    },[]);


    storeUserInfo = (params) => {
        // let cs = contacts;
        // Globals.isUpdateContact = 1;
        // for(i = 0;i < cs.length;i++)
        // {
        //     if (cs[i].id == params.id)
        //     {
        //         Globals.contacts = cs;
        //         props.navigation.navigate('Main');
        //         return;
        //     }
        // }
        // cs.push(params);
        // Globals.contacts = cs;
        // setContacts(cs)
        // DefaultPreference.setMultiple({contacts:JSON.stringify(cs)}).then(function(values) 
        // {  
        //     props.navigation.navigate('Main');
        // })
        // .catch(err=>{
            
        // });
        
        props.navigation.goBack();
        props.navigation.state.params.onReload()

        // props.navigation.state.params.onReload();
        // props.navigation.navigate('Main');
    }
    submitUserProfile = () => {
        let params = {user:username,options:userProfile,login_id:Globals.userNo}
        setIndicator({isActive:true,msg:'Storing User information'});
        serviceSubmitProfile(params)
        .then(res=>{ 
            setIndicator({isActive:false,msg:''});
            init();
            props.navigation.goBack();
            props.navigation.state.params.onReload()
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    init = () => {
        loadQuestion(1)
        setUsername('')
        setProfile([])
    }

    loadQuestion = (qNumber) => {
        if (qNumber == 9 && userProfile.length > 0 && (userProfile[1].answer == '1' || userProfile[1].answer == '2'))
        {
            submitUserProfile()
            return;
        }
        else if (userProfile.length > 0 && userProfile[1].answer == '3' && qNumber > 1)
        {
            if (qNumber == 10)
            {
                submitUserProfile()
                return;
            }
            else qNumber = 9
        }
        setQuestion(qNumber)
        isDescription(false)
        let params = {number:qNumber,language:RNLocalize.getLocales()[0].languageCode}
        setIndicator({isActive:true,msg:'Loading Question..'});
        serviceGetQuestion(params)
        .then(res=>{ 
            setIndicator({isActive:false,msg:''});
            console.log(res);
            if (res.question == null)
            {
                setQuizText(translate('select_choice'))
            }
            else
            {
                setQuizText(res.question.name)
            }
            setActiveSections([]);
            for (i = 0;i < res.answers.length;i++)
            {
                if (res.answers[i].description != null && res.answers[i].description != "") {
                    isDescription(true)
                    break;
                }
            }
            if (qNumber == 1)
            {
                let aws = [];
                for (t = 0; t < res.answers.length;t++)
                {
                    var isSkip = false;
                    for (k = 0;k < Globals.contacts.length;k++)
                    {
                        if (res.answers[t].is_answer == Globals.contacts[k].quiz_1)
                        {
                            isSkip = true;
                            break;
                        }
                    }
                    if (!isSkip)
                    {
                        aws.push(res.answers[t])
                    }
                }
                setAnswers(aws);
            }
            else
                setAnswers(res.answers);
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    onAnswer = (info) => {
        console.log('Clicked Item:' + JSON.stringify(info));
        let profile = userProfile;
        profile[info.quiz_no] = {'answer':info.is_answer};
        if (info.quiz_no == 1)
        {
            setShowInput(true)
        }
        else
        {
            loadQuestion(question + 1);
        }
        setProfile(profile);
    }

    onSubmitName = () => {
        if (username == '')
        {
            setError({isActive:true,msg:"Please fill username"});
            return;
        }
        loadQuestion(question + 1);
        setShowInput(false)
        // let params = {user:username}
        // serviceGetUserInfo(params)
        // .then(res=>{ 
        //     setIndicator({isActive:false,msg:'Checking Username'});
        //     console.log(res);
        //     if (res.name === null)
        //     {
        //         loadQuestion(question + 1);
        //         setShowInput(false)
        //     }
        //     else
        //     {
        //         let params = {}
        //         params['id'] = res.name.no;
        //         params['user'] = res.name.name;
        //         params['options'] = [];
        //         params['options'][0] = null;
        //         params['options'][1] = {"answer":res.name.quiz_1};
        //         params['options'][2] = {"answer":res.name.quiz_2};
        //         params['options'][3] = {"answer":res.name.quiz_3};
        //         params['options'][4] = {"answer":res.name.quiz_4};
        //         params['options'][5] = {"answer":res.name.quiz_5};
        //         params['options'][6] = {"answer":res.name.quiz_6};
        //         params['options'][7] = {"answer":res.name.quiz_7};
        //         params['options'][8] = {"answer":res.name.quiz_8};
        //         params['options'][9] = {"answer":res.name.quiz_9};
        //         console.log(params)
        //         storeUserInfo(params);
        //     }
        // })
        // .catch(err=>{
        //   setIndicator({isActive:false,msg:''});
        // });
    }

    renderHeader = (section, _, isActive) => {
        return (
            <View style={[styles.primaryBtnMediumBd,{flexDirection:'row',alignItems:'center',marginBottom:10}]}>
                <TouchableOpacity style={{flex:1}} onPress={() => onAnswer(section)}>
                    <View>
                        <Text style={[styles.darkText,{fontWeight:'bold',textAlign:'left',paddingLeft:10}]}>{section.name}</Text>
                    </View>
                </TouchableOpacity>
                {
                    hasDescription?
                    <View>
                        <Image style={{width:30,height:30,marginRight:10}}
                            source={require('../assets/question.png')}
                            resizeMode="stretch"
                        />
                    </View>
                    :
                    null
                }
            </View>
        );
    };



    renderContent = (section, _, isActive) => {
        return (
            <View style={[styles.primaryDescription, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
                <Text animation={isActive ? 'bounceIn' : undefined}>
                    {section.description}
                </Text>
            </View>
        );
    }

    setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    };



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
            <View style={{flex:1}}>
                {
                    isShowInput?
                    <View style={[styles.vwContainer,{marginTop:20}]}>
                        <Text style={[styles.primaryGray,{fontSize:16,marginTop:10,textAlign:'center'}]}>{translate('description_input_name')}</Text>
                        <Text style={[styles.primaryText,{fontSize:20,marginTop:10}]}>{translate('input_name')}</Text>
                        <TextInput
                            value={username}
                            style={[styles.primaryInput,{marginTop:10,fontWeight:'200'}]}
                            onChangeText={text => setUsername(text)}
                        />
                        <TouchableOpacity style={{marginBottom:20,marginTop:20}} onPress={() => onSubmitName()}>
                            <View style={[styles.primaryBtnMediumBd]}>
                                <Text style={[styles.darkText,{fontWeight:'bold'}]}>{translate('next')}</Text>
                            </View>
                        </TouchableOpacity>  
                    </View>:
                    <View style={{justifyContent:'center',flex:1}}>
                        <ScrollView>
                            <View style={[styles.vwContainer,{marginTop:20}]}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image style={{width:70,height:70}}
                                        source={require('../assets/question.png')}
                                        resizeMode="stretch"
                                    />
                                    <View style={{marginLeft:20,flex:1}}>
                                        <Text style={styles.primaryGray}>{quizText}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.vwContainer,{flex:1,marginTop:10}}>
                                <View style={{padding:10}}>
                                <Accordion
                                    activeSections={activeSections}
                                    sections={answers}
                                    duration={400}
                                    renderHeader={renderHeader}
                                    renderContent={renderContent}
                                    onChange={setSections}
                                    disabled= {!hasDescription}
                                />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                }
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
