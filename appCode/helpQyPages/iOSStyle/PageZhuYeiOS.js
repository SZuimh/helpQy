
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


const PageZhuYeiOS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7F9',
        height: 3000
    },
    LunBoView: {
        //轮播图
        position: 'absolute',
        top: 0,
        left: 0,
        height: 200,
        width: width,
        zIndex: 5
    },
    selectPayMoney: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40+heightPixel,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1 / ratio,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80+heightPixel,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemico: {
        width: 26+heightPixel,
        height: 26+heightPixel,
        marginBottom: 3
    },
    huzhuTipsWrapper: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 5
    },
    huzhuTips: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEFDDD',
        height: 50+heightPixel,
        borderRadius: 5
    },
    joinHuzhu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 6,
        backgroundColor: '#fff',
        height: 40+heightPixel
    },
    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 1,
        height: 100+heightPixel,
        paddingLeft: 10,
        paddingRight: 10
    },
    planItemText: {
        fontSize: 15+addPixel,
        fontWeight: 'bold',
        color: '#4B4B4B',
        marginBottom: 5
    },
    planItemtxt: {
        fontSize: 10+addPixel,
        marginTop: 5
    },
    bigImg: {
        width: 70+heightPixel,
        height: 70+heightPixel
    },
    planItemMiddle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    joinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 70+heightPixel
    },
    joinWrapper: {
        backgroundColor: '#008BE6',
        width: 60+heightPixel*2,
        height: 30+heightPixel,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export  default PageZhuYeiOS;
