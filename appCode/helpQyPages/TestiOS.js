/**
 * Created by aihaitao on 30/8/2017.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter,
    ToastAndroid
} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

import { NativeModules } from 'react-native';
var WeChat = NativeModules.WeChat;
const {QQSDK} =  NativeModules;

const shareScene = {'QQ': QQSDK.QQ, 'QQZone': QQSDK.QQZone, 'Favorite': QQSDK.Favorite};
let appId = 'wx1909173dd86c99b2';   // 微信的AppId
let webpageOptions = {
    title: '分享这个网页给你',
    desc: '我发现这个网页很有趣，特意分享给你',
    thumbSize: 150,
    scene: 1,
    type: 3,
    webpageUrl: 'https://github.com/beefe/react-native-wechat-android',
    thumbImage: 'http://img1.imgtn.bdimg.com/it/u=3924416677,403957246&fm=21&gp=0.jpg',
};

export  default class TestiOS extends React.Component{
    // _registerApp(){
    //     WeChat.registerApp(appId,(err,registerOK) => {
    //
    //     });
    // }
    // __wechatLogin(){
    //
    // }
    //
    // _openApp(){
    //     WeChat.openWXApp((err,res) => {
    //     });
    // }
    //
    // _wechatShare(){
    //     WeChat.webShareWeXinWithScene(0,'你好','我很好','http://www.baidu.com/img/baidu_sylogo1.gif','https://facebook.github.io/react-native/',(err,sendOK) => {
    //         console.log(sendOK)
    //     });
    // }
    //
    // __qqRegister(){
    // }
    //
    // __qqlogin(){
    //     QQSDK.ssoLogin()
    //         .then((result)=>{'result is', result})
    //         .catch((error)=>{console.log('error is', error)});
    // }
    //
    // _qqWebShare(){
    //     QQSDK.shareNews('https://facebook.github.io/react-native/',resolveAssetSource(require('./img/aboutus.png')).uri,'分享新闻标题','分享新闻描述',shareScene.QQZone)
    //         .then((result)=>{console.log('result is', result)})
    //         .catch((error)=>{console.log('error is', error)});
    // }
    // componentDidMount(){
    //     //console.log(QQSDK)
    // }
    //
    // componentWillMount(){
    //     DeviceEventEmitter.addListener('finishedShare',function(event){
    //         if(event.success){
    //             ToastAndroid.show('分享成功',ToastAndroid.SHORT);
    //         }else{
    //             ToastAndroid.show('分享失败',ToastAndroid.SHORT);
    //         }
    //     });
    // }
    //
    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Text   style={styles.text} onPress={this._registerApp.bind(this)} >
    //                 注册到微信
    //             </Text>
    //             <Text  style={styles.text}  onPress={this.__wechatLogin.bind(this)}>
    //                 微信登录
    //             </Text>
    //             <Text style={styles.text} onPress={this._openApp.bind(this)} >
    //                 打开微信
    //             </Text>
    //             <Text style={styles.text} onPress={this._wechatShare.bind(this)} >
    //                 分享网页到微信
    //             </Text>
    //
    //             <Text  style={styles.text} onPress={this.__qqRegister.bind(this)}>
    //                 注册到QQ
    //             </Text>
    //             <Text  style={styles.text} onPress={this.__qqlogin.bind(this)}>
    //                 qq登录
    //             </Text>
    //             <Text  style={styles.text} onPress={this._qqWebShare.bind(this)}>
    //                 qq分享网页
    //             </Text>
    //
    //         </View>
    //     );
    // }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});
