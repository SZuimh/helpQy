
import React, {
    StyleSheet,
    Platform,
    PixelRatio,
    Dimensions
} from 'react-native';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let ratio = PixelRatio.get();

let addPixel=0; //增加的像素值

const EmployeePlansFromZhuyeItemAndroid=StyleSheet.create({
    PageWoMyEmployeeView:{
        width:width,
        height:150,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:15,
        marginBottom:5
    },
    PageWoMyEmployeeViewContent:{
        width:width-30,
        height:150,
        flexDirection:'column',
        alignItems:'center'
    },
    PlansFontView:{
        width:width-30,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    PlansNumberAndMoney:{
        width:width-50,
        height:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15,
    },
    PageWoMyEmployeeButton:{
        width:45,
        height:25,
        backgroundColor:'#1296db',
        borderRadius:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
});

export default EmployeePlansFromZhuyeItemAndroid