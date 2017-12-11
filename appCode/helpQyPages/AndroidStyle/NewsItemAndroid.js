
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
let heightPixel=0;
let pixelRatio = PixelRatio.get();
if(pixelRatio>2){
    addPixel=2;
    heightPixel=4;
}

const NewsItemAndroid = StyleSheet.create({
    newsZongView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    newsTypeone: {
        width: width - 30,
        marginLeft: 15,
        marginRight: 15,
        height: 120+heightPixel,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    newsTypeoneImg: {},
    newsTypeoneTitleAndTypeView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 227,
        height: 120+heightPixel,
        flex: 1
    },
    newsTypeoneImgView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 130,
        height: 120+heightPixel,
    },
    newsTypeoneImg: {
        width: 90,
        height: 90+heightPixel,
    },
    newsTypeoneTitleAndType: {
        alignSelf: 'flex-start',
        fontSize: 15+addPixel,
        fontWeight: 'bold',
        color: '#4B4B4B'
    },
    newsTypeoneAuthorAndDate: {
        alignSelf: 'flex-start',
        marginTop: 12,
        color: '#a3a7b1',
        fontSize: 12+addPixel
    },
    bottomLine: {
        width: width - 30,
        height: 1 / ratio,
        backgroundColor: '#d2d4d9'
    },
    newsTypeTwo:{
        flexDirection:'column',
        width:width-30,
    },
    newsTypeTwoImg:{
        width:width-30,
        height:180+heightPixel
    },
    newsTypeTwoTitleAndType:{
        fontSize: 17+addPixel,
        fontWeight: 'bold',
        color: '#4B4B4B',
        marginTop:15
    },
    newsTypeTwoAuthorAndDate:{
        marginTop: 12,
        color: '#a3a7b1',
        fontSize: 12+addPixel
    },
});
export  default  NewsItemAndroid;