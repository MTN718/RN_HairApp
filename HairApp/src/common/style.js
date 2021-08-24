import
{
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

const primaryGreen = '#82A8D7';
export default StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#000',
      opacity:0.9,
      zIndex:999999999999999999,
      elevation:10
    },
    loaderView: {
      width:(250),
      height:(60),
      backgroundColor:'#fff',
      borderRadius:5,
      flexDirection:'row',
      alignItems:'center'
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    activityIndicator: {
        margin:(15)
    },
    loadingText:{
        fontSize:(14),
    },
    primaryFullBG:{
      flex:1,
      backgroundColor:'#EFEFEF'
    },

    titleVw: {
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center'
    },
    centerParent:{
        justifyContent:'center',
        alignItems:'center'
    },
    lblTitle:{
        fontSize:35,
        fontWeight:'bold'
    },
    lblInput:{
        color:'#555',
        fontSize:14
    },
    vwInput:{
        borderRadius:10,
        borderColor:'#ccc',
        padding:10,
        borderWidth:1
    },
    lblLogo:{
      fontSize:16,
      fontWeight:'bold'
    },
    
    primaryText:{
      color:primaryGreen,
      // fontWeight:'bold'
    },
    vwContainer:{
      marginTop:10,backgroundColor:'#fff',borderRadius:10,padding:10
    },
    primaryGray:{
      fontSize:16,
      lineHeight:25,
      color:'#4E4E4E'
    },
    primaryGrayBold:{
      fontSize:20,
      fontWeight:'bold',
      lineHeight:25,
      color:'#4E4E4E'
    },
    primaryInput:{
      borderWidth:1,
      borderColor:'#e0e0e0',
      borderRadius:5,
      padding:10,
      color:'#000',
      fontSize:20
    },
    primaryBtn:{
      backgroundColor:primaryGreen,
      paddingTop:15,
      paddingBottom:15,
      borderRadius:30,
      height:60,
      justifyContent:'center',
      alignContent:'center'
    },
    primaryCircle:{
      backgroundColor:primaryGreen,
      borderRadius:30,
      justifyContent:'center',
      alignContent:'center',
      width:60,height:60
    },
    primaryBtnMediumBd:{
      backgroundColor:primaryGreen,
      paddingTop:15,
      paddingBottom:15,
      borderRadius:10,
      height:60,
      justifyContent:'center',
      alignContent:'center'
    },
    disableBtn:{
      backgroundColor:'#64626d',
      paddingTop:15,
      paddingBottom:15,
      borderRadius:30,
      height:60,
      justifyContent:'center',
      alignContent:'center'
    },

    primaryDescription:{
      marginBottom:10,
      backgroundColor:'#fff',
      padding:15,
      borderRadius:10,
      justifyContent:'center',
      alignContent:'center'
    },
    darkText:{
      color:'#fff',
      fontSize:18,
      textAlign:'center'
    },
    whiteText:{
      fontSize:16,
      color:'#D9D8D6',
      fontWeight:'normal'
    },
    whiteBold:{
      fontSize:16,
      color:'#D9D8D6',
      fontWeight:'bold'
    },
    separator:{
      height:1,backgroundColor:'#f00',marginTop:10
    },
    separatorPrimary:{
      height:1,backgroundColor:'#FF8136',marginTop:10
    },
    separatorBlack:{
      height:1,backgroundColor:'#2F2E35',marginTop:4,marginBottom:4
    },
    btnVw:{
      width:50,height:30,alignItems:'center',justifyContent:'center'
    },
    imgTabIcon:{
      width:40,
      height:40
    },

    imgTabIcon30:{
      width:30,
      height:30
    },
    menuText:{
      color:'#D9D8D6',marginLeft:16,fontSize:30,fontWeight:'400'
    },
    vwDetailAnswer:{
      flexDirection:'row',alignItems:'center',alignItems:'center',paddingTop:16,paddingBottom:16,borderRadius:8,backgroundColor:'#efefef',marginTop:10
    }
});