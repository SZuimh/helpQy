
import React, {
    StyleSheet,

    PixelRatio,
    Dimensions
} from 'react-native';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ratio = PixelRatio.get();
let addPixel=0; //增加的像素值
let heightPixel=0;
let pixelRatio = PixelRatio.get();
if(pixelRatio>2){
    addPixel=2;
    heightPixel=4;
}

// if iPhone  0
// if iPhone7 2
// if iPhone8 plus  3


const PageWoNewAndroid = StyleSheet.create({
    PageWoNewMaxView: {
        width: width,
        height: 300,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    PageWoNewMaxHeader: {
        width: width-35,
        height: 90,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:32
    },
    messageTouch: {
        width: 30,
        height: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop:-10
    },
    PageWoNewUserPhotoView: {
        width: 80,
        height: 80+heightPixel,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PageWoNewHeader: {
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor: 'white',
        marginTop: 10,
        height:60
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    PageWoNewImageAndUserName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    PageWoNewUserNameView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    PageWoNewTongzhi: {
        flexDirection: 'column',
        justifyContent:'space-around',
        alignItems:'flex-end',
        height:60

    },
    PageWoNewUserNameAndTongzhiView: {
        width: 110,
    },
    PageWoNewTongzhiImage: {

    },
    PageWoNewUserName: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black'
    },
    PageWoNewMyAccount: {
        width: 110,
    },
    PageWoNewTurnRight: {
        marginRight: 20
    },
    PageWoNewMyAccountFont: {
        fontSize: 10,
        color:'black'
    },
    PageWoNewMyChoice: {
        width: width,
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PageWoNewChoiceView: {
        width: width - 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PageWoNewChoice: {
        width: width - 70,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PageWoNewEmptyViewForLine: {
        width: width - 70,
        height: 1 / ratio,
        backgroundColor: '#E0DCDC'
    },
    PageWoNewChoiceFont: {
        fontSize: 12+addPixel,
        fontWeight: 'bold',
        color:'black'
    },
    PageWoNewTiShi: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 50+heightPixel,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default PageWoNewAndroid;


