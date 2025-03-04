import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";



export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',

    },
    boxMiddle:{
        height:Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:20,
    },
    boxBottom:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        
    },
    logo:{
        width:150,
        height:150,
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
    },
    titleInput:{
        fontSize:16,
        marginLeft:10,
        color:themes.colors.gray,
        marginTop:20,
    },
    boxInput:{
        height:40,
        width:'100%',
        borderWidth:1,
        borderRadius:40,
        paddingHorizontal:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:themes.colors.lightGray,
        borderColor:themes.colors.lightGray,
    },
    input:{
        height:'100%',
        width:'90%',
        borderRadius:40,
        paddingLeft:5,
    },
    button:{
        height:50,
        width:250,
        backgroundColor:themes.colors.primary,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,

        elevation: 23,
    },
    textButton:{
        fontSize:16,
        color:'#fff',
        fontWeight:'bold',
    },
    textBottom:{
        fontSize:16,
        color:themes.colors.gray,
        marginTop:20,
    },
    textBottomCreate:{
        fontSize:16,
        color:themes.colors.primary,
        fontWeight:'bold',
    }

});