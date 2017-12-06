/**
 * 这个是发现页面
 */

import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    Modal,
    AsyncStorage,
    NativeAppEventEmitter
} from 'react-native';
import React, {Component} from 'react';
import RedMoneyList from './RedMoneyList'
import resolveAssetSource from 'resolveAssetSource';

import {NativeModules} from 'react-native';

var WeChat = NativeModules.WeChat;  //iOS平台微信，王后涛封装

const {QQSDK} = NativeModules;   //iOS平台QQ，复制自qqsdk，与qqsdk同，复制了其代码

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();

let appId = 'wxbdcf30c9232401a4';   // 微信的appid，
const shareScene = {'QQ': QQSDK.QQ, 'QQZone': QQSDK.QQZone, 'Favorite': QQSDK.Favorite};
var loginEmitterEvent;
var loginOutEmitterEvent;
export default class PageFind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transparent: false,
            animationType: 'slide',
            modalVisible: false,
            usernickname: '请登录',
            token: null,
            useruuid: null,
            isLogin: false,
            userphoto: "require('./img/putaoLogo.png')",
            usertoken: null,
            unionid: null,
            phonebind: null,
            usertype: null
        };
    }

    componentWillUnmount() {
        loginEmitterEvent.remove();
        loginOutEmitterEvent.remove();
    }

    componentDidMount() {
        //获取登录者的个人信息
        AsyncStorage.multiGet(["token", "useruuid",], (errros, result) => {
            if (result[0][1] == null) {
                return
            }
            this.setState({
                token: result[0][1],
                useruuid: result[1][1],
                isLogin: true
            })
        })

        loginEmitterEvent = NativeAppEventEmitter.addListener('loginEmitter', (data) => {
            AsyncStorage.multiGet(["token", "useruuid"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                this.setState({
                    token: result[0][1],
                    useruuid: result[1][1],
                    isLogin: true
                })
            })

        });
        loginOutEmitterEvent = NativeAppEventEmitter.addListener('loginOutEmitter', (data) => {
            this.setState({
                token: null,
                useruuid: null,
                usertoken: null,
                unionid: null,
                phonebind: null,
                usertype: null,
                isLogin: false,
                usernickname: '请登录',
                userphoto: "require('./img/putaoLogo.png')"
            })
        });

        //这里要获取已经加入的人数
        WeChat.registerApp(appId, (err, registerOK) => {
            //iOS版本注册到微信
        });
    }


    static navigationOptions = {
        title: '邀请',
    };
    goPublicList() {
        this.props.navigation.navigate('PublicList');
    }

    goRedMoneyList() {
        if (!!this.state.isLogin) {
            this.props.navigation.navigate('RedMoneyList', {useruuid: this.state.useruuid, token: this.state.token});
        }
        else {
            this.props.navigation.navigate('PageLogin');
        }
    }

    _shareToWechatSession() { // 分享到微信会话
        if (!!this.state.isLogin) {
            WeChat.webShareWeXinWithScene(0, '葡萄互助', '您的好友邀请您加入葡萄互助，注册成为会员最高享30万元健康保障', 'http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png',
                'http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + this.state.useruuid, (err, sendOK) => {
                    console.log(sendOK)
                });
        } else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToWechatPengyouQuan() { //分享到朋友圈
        if (!!this.state.isLogin) {
            WeChat.webShareWeXinWithScene(1, '葡萄互助', '您的好友邀请您加入葡萄互助，注册成为会员最高享30万元健康保障', 'http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png', 'http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + this.state.useruuid, (err, sendOK) => {
                console.log(sendOK)
            });
        } else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToqqSession() { //分享到qq会话
        if (!!this.state.isLogin) {
            QQSDK.shareNews('http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + this.state.useruuid, resolveAssetSource(require('./img/putaoLogo@3x.png')).uri, '葡萄互助', '您的好友邀请您加入葡萄互助，注册成为会员最高享30万元健康保障', shareScene.QQ)
                .then((result) => {
                    console.log('result is', result)
                })
                .catch((error) => {
                    console.log('error is', error)
                });
        } else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToqqzone() { //分享到qqzone
        if (!!this.state.isLogin) {
            QQSDK.shareNews('http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + this.state.useruuid, resolveAssetSource(require('./img/putaoLogo@3x.png')).uri, '葡萄互助', '您的好友邀请您加入葡萄互助，注册成为会员最高享30万元健康保障', shareScene.QQZone)
                .then((result) => {
                    console.log('result is', result)
                })
                .catch((error) => {
                    console.log('error is', error)
                });
        } else {
            this.props.navigation.navigate('PageLogin')
        }
    }goRules(){
        this.props.navigation.navigate('PageRulesofPlans')
    }


    render() {
        return (
            <View style={styles.container}>
                {/*公示*/}
                <View style={styles.publicContain}>
                    <View style={styles.publicLeft}>
                        <Text style={{marginLeft: 8, fontSize: 15}}>互助人员公示</Text>
                        <Text style={{marginLeft: 8, fontSize: 10, marginTop: 10}}>公式周期一个月，每次公式10天</Text>
                    </View>
                    <View style={styles.publicRight}>
                        <Text onPress={this.goPublicList.bind(this)}
                              style={{color: '#ffffff', fontSize: 14}}>名单公示</Text>
                    </View>
                </View>
                <View>
                    <Image source={require('./img/yaoqing.png')} style={{width: width, height: 120}}/>
                </View>
                <View style={styles.PageFindYaoqingQinyou}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>喊亲友，一起加入葡萄互助吧~</Text>
                    <Text style={{fontSize: 12, marginTop: 15, height: 35, textAlign: 'center'}}>每邀请一人，即可获得<Image
                        source={require('./img/redMoney.png')}/>红包</Text>
                    <TouchableOpacity onPress={this.goRedMoneyList.bind(this)}><Text
                        style={{fontSize: 12, marginTop: 10, color: '#F5A623'}}>我的红包>></Text></TouchableOpacity>

                </View>

                {/*邀请亲友加入方舟互助*/}
                <View style={styles.yaoqingContain}>
                    <View style={styles.pageBottom}>
                        <TouchableOpacity onPress={this._shareToWechatSession.bind(this)}>
                            <Image source={require('./img/weixin@2x.png')} resizeMode={'cover'} style={styles.weixin}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._shareToWechatPengyouQuan.bind(this)}>
                            <Image source={require('./img/pengyouquan@2x.png')} resizeMode={'contain'}
                                   style={styles.weixin}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._shareToqqSession.bind(this)}>
                            <Image source={require('./img/qq@2x.png')} resizeMode={'contain'} style={styles.weixin}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._shareToqqzone.bind(this)}>
                            <Image source={require('./img/kongjian@2x.png')} resizeMode={'contain'}
                                   style={styles.weixin}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ruleWrapper}>
                    <TouchableOpacity onPress={this.goRules.bind(this)}>
                        <Text style={{fontSize: 12, color: '#008DF0'}}>规则说明>></Text>
                    </TouchableOpacity>
                </View>



            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    PageFindYaoqingQinyou: {
        width: width,
        height: 130,
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
        height: 80
    },
    publicLeft: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 0.6 * width,
        paddingLeft: 12,
        height: 44
    },
    publicRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        height: 30,
        width: 70,
        backgroundColor: '#0093EC',
    },
    inviteFriendContain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 210,
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
        fontSize: 28,
        color: '#FF6D00',
        fontWeight: 'bold'
    },
    myaward: {
        fontSize: 12,
        color: '#0093EC',
        marginTop: 12
    },
    pageBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 80,
    },
    yaoqingContain: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
        height: 150,
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
        height: 40,
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



















