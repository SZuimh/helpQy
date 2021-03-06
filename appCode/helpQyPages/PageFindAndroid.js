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
    AsyncStorage,
    NativeAppEventEmitter,
    Platform
} from 'react-native';
import React, {Component} from 'react';
import RedMoneyList from './RedMoneyList'

import resolveAssetSource from 'resolveAssetSource';
import WeChat from 'react-native-wechat-android';  //android 平台微信
import * as QQ from 'react-native-qqsdk';   // android 平台QQ 分享
import  PageFindAndroidStyle from  './AndroidStyle/PageFindAndroidStyle';

let styles=null;
if (Platform.OS==='android') {
    styles=PageFindAndroidStyle;

}else{
    styles=PageFindiOS;
}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
let appId = 'wxbdcf30c9232401a4';   // 微信的appid，

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
            usertype: null,
            usernickname: null,
            companyname: null
        };
    }

    componentWillUnmount() {
        loginEmitterEvent.remove();
        loginOutEmitterEvent.remove();
    }

    componentDidMount() {
        this._registerApp();
        //获取登录者的个人信息
        AsyncStorage.multiGet(["token", "useruuid", "usernickname", "companyname"], (errros, result) => {
            if (result[0][1] == null) {
                return
            }
            this.setState({
                token: result[0][1],
                useruuid: result[1][1],
                usernickname: result[2][1],
                companyname: result[3][1],
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
    }

    _registerApp(){
        WeChat.registerApp(appId,(err,registerOK) => {

        });
    }

    __wechatLogin(){
        WeChat.sendAuthReq(null,null,(err,authReqOK) => {
             console.log(authReqOK)
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
            AsyncStorage.multiGet(["token","useruuid","usernickname"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                let webpageOptions = {
                    title: '葡萄互助',
                    desc: '【' + result[2][1] + '】邀请您加入葡萄互助，注册成为会员最高享30万元健康保障',
                    thumbSize: 150,
                    scene: 0,
                    type: 3,
                    webpageUrl:  'http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + result[1][1],
                    thumbImage: 'http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png',
                };
                WeChat.sendReq(webpageOptions,(err,sendOK) => {
                    //console.log(sendOK)
                });

            })
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToWechatPengyouQuan() { //分享到朋友圈
        if (!!this.state.isLogin) {
            AsyncStorage.multiGet(["token","useruuid","usernickname"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                let webpageOptions = {
                    title: '葡萄互助',
                    desc: '【' + result[2][1] + '】邀请您加入葡萄互助，注册成为会员最高享30万元健康保障',
                    thumbSize: 150,
                    scene: 1,
                    type: 3,
                    webpageUrl:  'http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + result[1][1],
                    thumbImage: 'http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png',
                };
                WeChat.sendReq(webpageOptions,(err,sendOK) => {
                    //console.log(sendOK)
                });

            })
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToqqSession() { //分享到qq会话

        if (!!this.state.isLogin) {
            AsyncStorage.multiGet(["token","useruuid","usernickname"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                QQ.shareNews('http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + result[1][1],resolveAssetSource(require('./img/putaoLogo@3x.png')).uri,'葡萄互助','【' + result[2][1] + '】邀请您加入葡萄互助，注册成为会员最高享30万元健康保障',QQ.shareScene.QQ)
                    .then((result)=>{console.log('result is', result)})
                    .catch((error)=>{console.log('error is', error)});
            })
        } else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    _shareToqqzone() { //分享到qqzone


        if (!!this.state.isLogin) {
            AsyncStorage.multiGet(["token","useruuid","usernickname"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                QQ.shareNews('http://www.putaohuzhu.cn/glove/grape/joinByShare.do?useruuid=' + result[1][1],resolveAssetSource(require('./img/putaoLogo@3x.png')).uri,'葡萄互助','【' + result[2][1] + '】邀请您加入葡萄互助，注册成为会员最高享30万元健康保障',QQ.shareScene.QQZone)
                    .then((result)=>{console.log('result is', result)})
                    .catch((error)=>{console.log('error is', error)});
            })
        } else {
            this.props.navigation.navigate('PageLogin')
        }

    }

    goRules() {
        this.props.navigation.navigate('PageRulesofPlans')
    }


    render() {
        return (
            <View style={styles.container}>
                {/*公示*/}
                <View style={styles.publicContain}>
                    <View style={styles.publicLeft}>
                        <Text style={styles.huzhuPeople}>互助人员公示</Text>
                        <Text style={styles.huzhuDate}>公示周期一个月，每次公示10天</Text>
                    </View>
                    <View style={styles.publicRight}>
                        <Text onPress={this.goPublicList.bind(this)}
                              style={styles.MingdanGongshi}>名单公示</Text>
                    </View>
                </View>
                <View>
                    <Image source={require('./img/yaoqing.png')} style={styles.YaoqingImage}/>
                </View>
                <View style={styles.PageFindYaoqingQinyou}>
                    <Text style={styles.YaoqingQinyou}>喊亲友，一起加入葡萄互助吧~</Text>
                    <Text style={styles.YaoqingText}>每邀请一人，即可获得<Image
                        source={require('./img/redMoney.png')}/>红包</Text>
                    <TouchableOpacity onPress={this.goRedMoneyList.bind(this)}><Text
                        style={styles.MyRedMoney}>我的红包>></Text></TouchableOpacity>

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
                        <Text style={styles.RulesText}>规则说明>></Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}




















