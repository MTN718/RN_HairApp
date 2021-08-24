
import React, { useState, useEffect }from 'react';
import {ScrollView,KeyboardAvoidingView,View,ActivityIndicator,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import { AppRegistry ,StatusBar} from 'react-native';
import styles from '../common/style';
import {Globals} from '../config/globals';
import {translate,setI18nConfig} from '../common/translate_helper';
import {serviceGetQuestion,serviceUpdateAnswer} from '../service/api';
import * as RNLocalize from "react-native-localize";
import Modal from "react-native-modal"
import Accordion from 'react-native-collapsible/Accordion';
import DefaultPreference from 'react-native-default-preference';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../config/constants'


export default function UpdateScreen(props) {

    const [contacts, setContacts] = useState([]);
    const [username, setUsername] = useState("");
    const [question, setQuestion] = useState(1);
    const [quizText, setQuizText] = useState("");
    const [iInfo, setIndicator] = useState({isActive:false,msg:""});
    const [errInfo, setError] = useState({isActive:false,msg:""});
    const [userProfile, setProfile] = useState(props.navigation.state.params.profile);
    const [answers, setAnswers] = useState([]);
    const [activeSections, setActiveSections] = useState([]);
    const [hasDescription, isDescription] = useState(false);
    
    useEffect(() => {
        console.log('Info:' + JSON.stringify(props.navigation.state.params.profile));
        loadQuestion(props.navigation.state.params.quiz)
    },[]);

    onClickBack = () => {
        props.navigation.goBack();

    }

    submitUserProfile = () => {
        let params = {user:props.navigation.state.params.profile.no,options:userProfile}
        setIndicator({isActive:true,msg:'Storing User information'});
        serviceUpdateAnswer(params)
        .then(res=>{ 
            setIndicator({isActive:false,msg:''});
            props.navigation.goBack();
            props.navigation.state.params.onReload();
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    loadQuestion = (qNumber) => {
        isDescription(false)
        let params = {number:qNumber,language:RNLocalize.getLocales()[0].languageCode}
        setIndicator({isActive:true,msg:'Loading Question..'});
        serviceGetQuestion(params)
        .then(res=>{ 
            setIndicator({isActive:false,msg:''});
            setQuizText(res.question.name)
            setActiveSections([]);
            for (i = 0;i < res.answers.length;i++)
            {
                if (res.answers[i].description != null && res.answers[i].description != "") {
                    isDescription(true)
                    break;
                }
            }
            setAnswers(res.answers);
        })
        .catch(err=>{
          setIndicator({isActive:false,msg:''});
        });
    }

    onAnswer = (info) => {
        console.log('Clicked Item:' + JSON.stringify(info));
        let profile = userProfile;
        if (info.quiz_no == 1)
            profile.quiz_1 = info.is_answer;
        else if (info.quiz_no == 2)
            profile.quiz_2 = info.is_answer;
        else if (info.quiz_no == 3)
            profile.quiz_3 = info.is_answer;
        else if (info.quiz_no == 4)
            profile.quiz_4 = info.is_answer;
        else if (info.quiz_no == 5)
            profile.quiz_5 = info.is_answer;
        else if (info.quiz_no == 6)
            profile.quiz_6 = info.is_answer;
        else if (info.quiz_no == 7)
            profile.quiz_7 = info.is_answer;
        else if (info.quiz_no == 8)
            profile.quiz_8 = info.is_answer;
        else if (info.quiz_no == 9)
            profile.quiz_9 = info.is_answer;
        submitUserProfile();
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
                <TouchableOpacity onPress={() => onClickBack()}>
                    <Icon name="arrow-left" style={{marginRight:20}} size={25} color={Constants.BASE_GREEN}></Icon>
                </TouchableOpacity>
                <Image style={{width:50,height:40}}
                    source={require('../assets/hairapplogo.png')}
                    resizeMode="stretch"
                />
                <Text style={[styles.primaryText,{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}]}>HairApp</Text>
            </View>
            <View style={{flex:1}}>
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
