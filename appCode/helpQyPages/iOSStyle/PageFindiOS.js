
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

const PageFindiOS= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    YaoqingImage:{
        width: width,
        height: 120+heightPixel
    },
    RulesText:{
        fontSize: 12+addPixel,
        color: '#008DF0'
    },
    YaoqingText: {
        fontSize: 12+addPixel,
        marginTop: 15,
        height: 35+heightPixel,
        textAlign: 'center'
    },
    MingdanGongshi: {
        color: '#ffffff',
        fontSize: 14+addPixel
    },
    MyRedMoney: {
        fontSize: 12+addPixel,
        marginTop: 10,
        color: '#F5A623'
    },
    YaoqingQinyou: {
        fontSize: 16+addPixel,
        fontWeight: 'bold'
    },
    huzhuDate: {
        marginLeft: 8,
        fontSize: 10+addPixel,
        marginTop: 10
    },
    huzhuPeople: {
        marginLeft: 8,
        fontSize: 15+addPixel
    },
    PageFindYaoqingQinyou: {
        width: width,
        height: 130+heightPixel,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    publicContain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        height: 80+heightPixel
    },
    publicLeft: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 0.6 * width,
        paddingLeft: 12,
        height: 44+heightPixel
    },
    publicRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        height: 30+heightPixel,
        width: 70,
        backgroundColor: '#0093EC',
    },
    inviteFriendContain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 210+heightPixel,
        backgroundColor: '#fff'
    },
    inviteLeft: {
        width: 0.6 * width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 12
    },
    inviteRight: {
        width: 0.38 * width
    },
    inviteTxt: {
        fontSize: 28+addPixel,
        color: '#FF6D00',
        fontWeight: 'bold'
    },
    myaward: {
        fontSize: 12+addPixel,
        color: '#0093EC',
        marginTop: 12
    },
    pageBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 80+heightPixel,
    },
    yaoqingContain: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
        height: 150+heightPixel,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    yaoqingWrapper: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        marginBottom: 10
    },
    yaoqingView: {
        width: 0.8 * width,
        backgroundColor: '#0093EC',
        height: 40+heightPixel,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 5
    },
    weixin: {
        width: 50, height: 50, borderRadius: 25
    },
    ruleWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: width,
        bottom: 10,
        left: 0,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20
    },
    ModalDisplay: {
        width: width,
        height: height - 20,
        backgroundColor: '#fff',
    },
    huoDongRuleWrapper: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center'
    },
    huoDongRule: {
        width: width,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeWrapper: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        marginTop: 50,

    },
    close: {
        width: 260,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008DF0',

    },
    txtWrapper: {
        marginTop: 20
    },
    txt: {
        margin: 5,
        flexWrap: 'wrap'
    }
});
export  default  PageFindiOS;