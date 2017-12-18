import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    NativeAppEventEmitter,
    AsyncStorage,
    View,
    TextInput,
    Dimensions,
    Alert,
    PixelRatio,
    ScrollView
} from 'react-native';
import React, {Component,} from 'react';
import LoadingInPage from '../loading/LoadingInPage';
import {UrlLoginByPhone} from '../utils/url';
import UserPhoto from '../components/userPhoto';
import UploadFile from '../utils/uploadFile';
import {UrlWechatLogin} from '../utils/url';

import resolveAssetSource from 'resolveAssetSource';
import WeChat from 'react-native-wechat-android';  //android 平台微信
let Platform = require('react-native').Platform;
let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
let regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let regP = /^[0-9|a-z|A-Z]\w{5,17}$/; //6-18w位数字和字母组成的密码

var subscription = {};
let appId = 'wxbdcf30c9232401a4';


let loginEmitterEvent;
export default class PageLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            phone: null,
            password: null,
            userPassword: null,
            modalVisible: false,

            tipsModal:false,
            failSucessTips:'' , //对不起，充值失败 或恭喜你，充值成功
            failSucessImage:require('./img/joinFail.png'),
            respMessage:null,
            retcode:2001,

        };
    }

    componentDidMount() {
        subscription = NativeAppEventEmitter.addListener("WeChat_Resp", info => {


            this.setState({
                modalVisible: true
            })
            let formData = new FormData();
            formData.append('code', info.code)
            let option = {
                url: UrlWechatLogin,
                body: formData
            };
            let responseR = UploadFile(option);
            responseR.then(resp => {
                this.setState({
                    modalVisible: false
                })
                if (resp.retcode == 2000) {
                    //微信成功登陆，需要判断是否 关联过手机号码  关联过，就跳转到我的界面 否则直接跳转到关联界面
                    if (resp.result.phonebind == 'yes') {
                        //存数据，触发事件
                        AsyncStorage.multiSet([
                            ['useruuid', resp.result.useruuid || ""],
                            ['token', resp.result.token || ""],
                            ['usernickname', resp.result.usernickname || ""],
                            ['userphoto', resp.result.userphoto || ""],
                            ['usertoken', resp.result.usertoken || ""],
                            ['unionid', resp.result.unionid || ""],
                            ['phonebind', resp.result.phonebind || ""],
                            ['usertype', resp.result.usertype.toString() || ""],
                            ['userphone', resp.result.userphone || ""],
                            ['companyname', resp.result.company || ""],
                        ], (errors) => {
                        });

                        loginEmitterEvent = NativeAppEventEmitter.emit('loginEmitter', {});

                        this.timer = setTimeout(() => {
                            this.props.navigation.goBack();
                        }, 500)

                    } else {
                        this.props.navigation.navigate('PageWechatBindPhone',
                            {
                                userMessage: resp.result,
                                PageWoNewKey: this.props.navigation.state.key,
                        })
                    }
                }
                else{
                   this.setState({
                       tipsModal:true,
                       failSucessTips:"",
                       failSucessImage:require('./img/joinFail.png'),
                       respMessage:resp.msg,
                   })
                }

            }).catch(err => {
                this.setState({
                    modalVisible: false,
                    tipsModal:true,
                    failSucessTips:"",
                    failSucessImage:require('./img/joinFail.png'),
                    respMessage:"服务器异常",
                })
            });
        });
    }


    componentWillUnmount() {
        subscription.remove();
        this.timer && clearTimeout(this.timer)
    }

    static navigationOptions = {
        title: '登录',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };

    _wechatLogin(){
        WeChat.sendAuthReq(null,null,(err,authReqOK) => {
             console.log(authReqOK)
        });
    }
    // _wechatLogin() {
    //     WeChat.sendAuthRequest("snsapi_userinfo", "123", (err) => {
    //         // console.log(err)
    //     });
    // }
    verify() { //检验邮箱密码是不是符合要求
        //输入完密码，点击return时，校验邮箱和密码是否合法
        //设置3个布尔变量，校验通过为true，否则false
        let email = this.state.userEmail;
        let password = this.state.userPassword;
        let Vemail = false;
        let Vpass = false;
        if (email !== null && email.length < 31 && email.length > 9 && regx.test(email)) {
            Vemail = true;
        }
        if (password !== null && password.length > 5 && password.length < 19 && regP.test(password)) {
            Vpass = true;
        }
        if (Vpass && Vemail) {
            return true;
        } else {
            return false;
        }
    }

    goLogin() {
        this.setState({
             modalVisible: true
         })

        if (this.state.phone == null || this.state.phone.length != 11) {
            this.setState({
                modalVisible: false,
                tipsModal:true,
                failSucessTips:"",
                failSucessImage:require('./img/joinFail.png'),
                respMessage:"请输入正确的11位手机号码",
            })
            return
        }
        if (this.state.password == null || this.state.password.length < 6 || this.state.password.length > 18) {
            this.setState({
                modalVisible: false,
                tipsModal:true,
                failSucessTips:"",
                failSucessImage:require('./img/joinFail.png'),
                respMessage:"请输入正确的6-18位密码",
            })
            return
        }

        let formDataTemp = new FormData();
        formDataTemp.append("phone", this.state.phone);
        formDataTemp.append("userPass", this.state.password);
        let option = {
            url: UrlLoginByPhone,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {

            this.setState({
                modalVisible: false
            })

            if (resp.retcode == 2000) {
                // console.log(resp)
                AsyncStorage.multiSet([
                    ['useruuid', resp.data.useruuid || ""],
                    ['token', resp.data.token || ""],
                    ['usernickname', resp.data.usernickname || ""],
                    ['userphoto', resp.data.userphoto || ""],
                    ['usertoken', resp.data.usertoken || ""],
                    ['unionid', resp.data.unionid || ""],
                    ['phonebind', resp.data.phonebind || ""],
                    ['usertype', resp.data.usertype.toString() || ""],
                    ['userphone', resp.data.userphone || ""],
                    ['companyname', resp.data.company || ""],
                ], (errors) => {
                });
                loginEmitterEvent = NativeAppEventEmitter.emit('loginEmitter', {});
                this.props.navigation.goBack();
            } else {
                    this.setState({
                    modalVisible: false,
                    tipsModal:true,
                    failSucessTips:"",
                    failSucessImage:require('./img/joinFail.png'),
                    respMessage:resp.msg,
                })
            }
        }).catch(err => {
            // console.log(err)
            this.setState({
                modalVisible: false,
                tipsModal:true,
                failSucessTips:"",
                failSucessImage:require('./img/joinFail.png'),
                respMessage:"服务器出现异常",

            })
        });
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.nativeEvent.text
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.nativeEvent.text
        });
    }

    goRegister() {
        this.props.navigation.navigate('PageRegister');
    }

    goFindPassword() {
        this.props.navigation.navigate('PageFindPasswd');
    }


    hideTips(){
        this.setState({
            tipsModal:false
        })
    }

    render() {
        //把这里的根View 换成ScrollView应该可以在弹出键盘的时候上移
        return (
            <ScrollView>

            <View style={styles.container}>
                <View style={styles.userPhoto}>
                    <UserPhoto/>
                </View>
                <View style={styles.email}>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.passwordinput}
                            placeholder='输入您注册的手机号'
                            keyboardType='numeric'
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                            ref='refemail'
                            autoCapitalize='none'
                            clearButtonMode='always'
                            clearTextOnFocus={false}
                            autoCorrect={false}
                            onChange={this.handlePhoneChange.bind(this)}
                        />
                    </View>
                </View>
                <View style={styles.email}>

                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.passwordinput}
                            placeholder='请输入6-18位密码'
                            keyboardType='email-address'
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                            ref='refemail'
                            autoCapitalize='none'
                            clearButtonMode='always'
                            clearTextOnFocus={false}
                            autoCorrect={false}
                            password={false}
                            secureTextEntry={true}
                            onChange={this.handlePasswordChange.bind(this)}
                        />
                    </View>
                </View>
                <View style={styles.loginwrap}>
                    <TouchableOpacity style={styles.loginTouch} onPress={this.goLogin.bind(this)}>
                        <Text style={{color: '#FFFFFF'}}>登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.underButton}>
                    <TouchableOpacity onPress={this.goFindPassword.bind(this)}>
                        <Text style={{fontSize: 12, color: '#4a4a4a'}}>忘记密码</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goRegister.bind(this)}>
                        <Text style={{fontSize: 12, color: '#4a4a4a'}}>注册</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.aaa}>
                    <Text style={{fontSize: 12, color: '#979797'}}>第三方登录</Text>
                </View>
                <View style={styles.thirdLogin}>
                    <TouchableOpacity style={styles.thirdLoginPress} onPress={this._wechatLogin.bind(this)}>
                        <Image source={require('./img/weixin.png')} resizeMode={'contain'}
                               style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                </View>


                {this.state.tipsModal ?
                    <View style={styles.ModalView}>
                        <View style={styles.AlertView}>
                            <Image source={this.state.failSucessImage} resizeMode={'contain'}   style={{width: 120, height: 90, marginTop: 10}}/>
                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 10}}>{this.state.respMessage}</Text>
                            </View>

                            <View style={styles.DownButtonView}>

                                <TouchableOpacity onPress={this.hideTips.bind(this)}
                                                  style={[styles.DownButton, {width: 230, backgroundColor: '#ffffff'}]}>
                                    <Text style={{color: '#018be6'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View/>
                }
                <LoadingInPage modalVisible={this.state.modalVisible}/>
            </View>
            </ScrollView>

        );
    }
}

let styles = StyleSheet.create({
    tipsStyle:{
        flexDirection:'row',
        width:width,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    container: {
        flex: 1,
        width:width,
        height:height,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    aaa: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 30
    },
    thirdLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 50
    },
    thirdLoginPress: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 50
    },
    userPhoto: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
    },

    uploadAvatar: {
        width: 100,
        height: 100
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        height: 40,
        width: width * 0.9,
        marginTop: 10
    },
    emailText: {
        fontSize: 16,
        marginLeft: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    emailinput: {
        width: width - 60,
        height: 44,
        fontSize: 14,
        paddingLeft: 10,
        color: '#666666'

    },
    password: {
        flexDirection: 'row',
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        width: width * 0.9,
        height: 40,
        justifyContent: 'center',
        marginTop: 10
    },
    labelWrap: {
        height: 45,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginLeft: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    underButton: {
        width: width * 0.8,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1 / ratio,
        borderBottomColor: '#CCCCCC',
    },
    inputWrap: {
        flexDirection: 'row',
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1 / ratio,
        alignItems: 'center'
    },
    passwordinput: {
        height: 40,
        width: width * 0.8,
        fontSize: 12,
        paddingLeft: 10,
        borderWidth:0,
    },
    err: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    loginwrap: {
        flexDirection: 'row',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 60,
    },
    loginTouch: {
        width: width,
        height: 45,
        backgroundColor: '#1296db',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        fontSize: 16,
        width: width,
        textAlign: 'center',
    },

    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 200,
    },
    DownButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:230,
        height:40,
        marginTop:10,
        borderTopWidth:1/ratio,
        borderTopColor:'#4c4c4c'

    },
    DownButton:{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
    },
    ModalView: {
        position: 'absolute',
        width:width,
        height:height,
        left:0,
        top:0,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    AlertView: {
        width: 230,
        zIndex: 5,
        marginTop:-64,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius:5
    },

});

