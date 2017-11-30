import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter,
    ToastAndroid
} from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import WeChat from 'react-native-wechat-android';  //android 平台微信
import * as QQ from 'react-native-qqsdk';   // android 平台QQ 分享
let appId = 'wx1909173dd86c99b2';   // 微信的appid，
let webpageOptions = {
    title: '分享这个网页给你',
    desc: '我发现这个网页很有趣，特意分享给你',
    thumbSize: 150,
    scene: 1,
    type: 3,
    webpageUrl: 'https://github.com/beefe/react-native-wechat-android',
    thumbImage: 'http://img1.imgtn.bdimg.com/it/u=3924416677,403957246&fm=21&gp=0.jpg',
};


 export  default class Test extends React.Component{
    // _registerApp(){
    //     WeChat.registerApp(appId,(err,registerOK) => {
    //         ToastAndroid.show(registerOK + '',ToastAndroid.SHORT);
    //     });
    // }

//     _openApp(){
//         WeChat.openWXApp((err,res) => {
//
//         });
//     }
//
//     _share(){
//         WeChat.sendReq(webpageOptions,(err,sendOK) => {
//             console.log(sendOK)
//         });
//     }
//     _qqTextShare(){
//         QQ.shareNews('https://facebook.github.io/react-native/',resolveAssetSource(require('./img/aboutus.png')).uri,'分享新闻标题','分享新闻描述',QQ.shareScene.QQ)
//             .then((result)=>{console.log('result is', result)})
//             .catch((error)=>{console.log('error is', error)});
//     }
//
//     __qqlogin(){
//         QQ.ssoLogin()
//             .then((result)=>{'result is', result})
//             .catch((error)=>{console.log('error is', error)});
//     }
//
//     __wechatLogin(){
//         WeChatAndroid.sendAuthReq(null,null,(err,authReqOK) => {
//              console.log(authReqOK)
//         });
//     }
//
//
//
//     componentDidMount(){
//         console.log(QQ)
//     }
//     componentWillMount(){
//
//         DeviceEventEmitter.addListener('finishedShare',function(event){
//             if(event.success){
//                 ToastAndroid.show('分享成功',ToastAndroid.SHORT);
//             }else{
//                 ToastAndroid.show('分享失败',ToastAndroid.SHORT);
//             }
//         });
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 {/*<Text style={styles.text} onPress={this._registerApp.bind(this)} >*/}
//                     {/*注册到微信*/}
//                 {/*</Text>*/}
//                 <Text style={styles.text} onPress={this._openApp.bind(this)} >
//                     打开微信
//                 </Text>
//                 <Text style={styles.text} onPress={this._share.bind(this)} >
//                     分享网页到微信
//                 </Text>
//                 <Text style={styles.text} onPress={this._qqTextShare.bind(this)}>
//                     qq分享文本
//                 </Text>
//
//                 <Text  style={styles.text} onPress={this.__qqlogin.bind(this)}>
//                     qq登录
//                 </Text>
//                 <Text style={styles.text}  onPress={this.__wechatLogin.bind(this)}>
//                     微信登录
//                 </Text>
//
//             </View>
//         );
//     }
};
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     text: {
//         fontSize: 20,
//         textAlign: 'center',
//         color: '#333333',
//         margin: 10,
//     },
// });
