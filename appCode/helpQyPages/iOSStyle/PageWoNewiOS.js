
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


const PageWoNewiOS = StyleSheet.create({
        PageWoNewMaxView: {
            width: width,
            height: 300,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        PageWoNewMaxHeader: {
            width: width,
            height: 90+heightPixel,
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        PageWoNewUserPhotoView: {
            width: 80,
            height: 80+heightPixel,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        PageWoNewHeader: {
            width: width - 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: 10
        },
        userPhoto: {
            width: 60,
            height: 60+heightPixel,
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
            alignItems: 'flex-start'
        },
        PageWoNewTongzhi: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        PageWoNewUserNameAndTongzhiView: {
            height: 40+heightPixel,
            width: width - 110,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        PageWoNewTongzhiImage: {},
        PageWoNewUserName: {
            alignSelf: 'flex-start',
            fontSize: 18+addPixel,
            fontWeight: 'bold'
        },
        PageWoNewMyAccount: {
            height: 20,
            width: width - 110,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        PageWoNewTurnRight: {
            marginRight: 20
        },
        PageWoNewMyAccountFont: {
            fontSize: 10+addPixel,
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
            fontSize: 14+addPixel,
            fontWeight: 'bold'
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
export default PageWoNewiOS;


