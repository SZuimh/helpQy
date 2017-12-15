/**
 * 登录页面，企业互助
 */

import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Alert,
    PixelRatio,
    ActivityIndicator,
    Modal,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import React, {Component,} from 'react';
import {UrlRegisterByPhone, UrlGetCode} from '../utils/url';
import UserPhoto from '../components/userPhoto';

let Platform = require('react-native').Platform;
let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
import UploadFile from '../utils/uploadFile';

let maxTime = 60;
export default class PageRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            password: null,
            verCode: null,
            controlVerifyCode: true,
            time: maxTime,
            userName: null,
            loading: false,
            respmsg: null,
            tipsModal: false,
            failSucessTips: '', //对不起，充值失败 或恭喜你，充值成功
            failSucessImage: require('./img/joinFail.png'),
            respMessage: null,
            retcode: 2001,
        };
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timergo && clearTimeout(this.timergo);
    }

    verify() { //检验邮箱密码是不是符合要求
        //输入完密码，点击return时，校验邮箱和密码是否合法
        //设置3个布尔变量，校验通过为true，否则false
        let email = this.state.userEmail;
        let password = this.state.userPassword;

        let regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let regP = /^[0-9|a-z|A-Z]\w{5,17}$/; //6-18w位数字和字母组成的密码
        //let testEm='@567890qwertyui';
        //console.log(regP.test(testEm));
        let Vemail = false;
        let Vpass = false;

        if (email !== null && email.length < 31 && email.length > 9 && regx.test(email)) {
            Vemail = true;
        }
        if (password !== null && password.length > 5 && password.length < 19 && regP.test(password)) {
            Vpass = true;
        }
        ;

        if (Vpass && Vemail) {
            return true;
        } else {
            return false;
        }
    }

    goRegister() {

        if (this.state.phone == null || this.state.phone.length != 11) {
            this.setState({
                tipsModal: true,
                failSucessTips: "",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: "请输入正确的11位手机号",
            })
            return
        }
        if (this.state.verCode == null || this.state.verCode.length != 4) {
            this.setState({
                tipsModal: true,
                failSucessTips: "",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: "请检查您的验证码格式",
            })
            return
        }
        if (this.state.password == null || this.state.password.length < 6 || this.state.password.length > 18) {
            this.setState({
                tipsModal: true,
                failSucessTips: "",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: "请输入6-18位长度的密码",
            })
            return
        }
        this.setState({
            loading: true
        })

        let formDataTemp = new FormData();
        formDataTemp.append("phone", this.state.phone);
        formDataTemp.append("userPassword", this.state.password);
        formDataTemp.append("verifycode", this.state.verCode);
        formDataTemp.append("shareUserUUID", 'sda');
        let option = {
            url: UrlRegisterByPhone,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {
            if (typeof(resp) == "undefined") {
                //弹出框
                this.setState({
                    tipsModal: true,
                    failSucessTips: "",
                    failSucessImage: require('./img/joinFail.png'),
                    respMessage: "你联网了吗？",
                })
                return;
            }

            if (resp.retcode == 2000) {
                this.setState({
                    loading: false,
                    tipsModal: true,
                    respmsg: resp.msg,
                    failSucessTips: "",
                    failSucessImage: require('./img/joinSuccess.png'),
                    respMessage: "恭喜你，注册成功",
                })
                this.timergo = setTimeout(() => {
                    this.goBack();
                }, 1000)

            }
            else {
                this.setState({
                    loading: false,
                    tipsModal: true,
                    respmsg: resp.msg,
                    failSucessTips: "",
                    failSucessImage: require('./img/joinFail.png'),
                    respMessage: resp.msg,
                })

            }
        }).catch(err => {

            this.setState({
                loading: false,
                tipsModal: true,
                failSucessTips: "",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: "服务器返回异常",
            });

        });
    }

    static navigationOptions = {
        title: '注册',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };

    handlePasswordChange(event) {
        this.setState({
            password: event.nativeEvent.text
        });
    }

    handleCodeChange(event) {
        this.setState({
            verCode: event.nativeEvent.text
        });
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.nativeEvent.text
        });
    }

    goBack() {
        this.props.navigation.goBack()
    }

    getCode() {
        if (this.state.phone == null || this.state.phone.length != 11) {
            this.setState({
                tipsModal: true,
                failSucessTips: "",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: "请输入正确的11位手机号",
            })
            return
        }

        //调用倒计时方法
        this.timeDown();

        // 调用后台获取验证码的接口
        let formDataTemp = new FormData();
        formDataTemp.append("phone", this.state.phone);
        let option = {
            url: UrlGetCode,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {

        }).catch(err => {

        });
    }

    timeDown() {
        this.setState({
            controlVerifyCode: false
        });
        let time = maxTime;
        this.timer = setInterval(() => {
            this.setState({time: --time});
            if (time === 0) {
                clearInterval(this.timer);
                this.setState({controlVerifyCode: true});
                this.setState({time: maxTime});
            }
        }, 1000);
    }

    hideTips() {
        this.setState({
            tipsModal: false
        })
    }

    render() {
        //把这里的根View 换成ScrollView应该可以在弹出键盘的时候上移
        return (
            <ScrollView style={{width: width, height: height}}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position' contentContainerStyle={{
                        width: width,
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <View style={styles.userPhoto}>
                            <UserPhoto/>
                        </View>

                        <View style={styles.email}>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.passwordinput}
                                    placeholder='输入您注册的手机号'
                                    keyboardType='numeric'
                                    underlineColorAndroid={'transparent'}
                                    maxLength={30}
                                    ref='refemail'
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    clearTextOnFocus={false}
                                    autoCorrect={false}
                                    onChange={this.handlePhoneChange.bind(this)}
                                />
                            </View>
                        </View>
                        <View style={styles.password}>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={[styles.passwordinput, {width: width * 0.55,}]}
                                    ref='refpass'
                                    keyboardType='numeric'
                                    maxLength={18}
                                    placeholder={'请输入验证码'}
                                    underlineColorAndroid={'transparent'}
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    autoCorrect={false}
                                    onChange={this.handleCodeChange.bind(this)}
                                />
                                {
                                    this.state.controlVerifyCode ?
                                        <TouchableOpacity onPress={this.getCode.bind(this)}>
                                            <Text style={{
                                                width: width * 0.25,
                                                fontSize: 12,
                                                color: '#1296db'
                                            }}>获取验证码</Text>
                                        </TouchableOpacity> :
                                        <View onPress={this.getCode.bind(this)}>
                                            <Text
                                                style={{
                                                    color: 'grey',
                                                    width: width * 0.25,
                                                    fontSize: 12
                                                }}>{this.state.time}秒后获取</Text>
                                        </View>
                                }
                            </View>
                        </View>
                        <View style={styles.email}>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.passwordinput}
                                    placeholder='请输入6-18位的密码'
                                    keyboardType='email-address'
                                    maxLength={30}
                                    ref='refemail'
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    underlineColorAndroid={'transparent'}
                                    clearTextOnFocus={false}
                                    autoCorrect={false}
                                    password={true}
                                    onChange={this.handlePasswordChange.bind(this)}
                                />
                            </View>
                        </View>
                        <View style={styles.loginwrap}>
                            <TouchableOpacity style={styles.loginTouch} onPress={this.goRegister.bind(this)}>
                                <Text style={{color: '#ffffff'}}>注册</Text>
                            </TouchableOpacity>
                        </View>


                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={this.state.loading}
                            onRequestClose={() => {
                                alert("Modal has been closed.")
                            }}>
                            <View style={styles.modalviewOut}>
                                <View style={styles.modalviewOIn}>
                                    <ActivityIndicator
                                        animating={this.state.loading}
                                        style={styles.activityIndicator}
                                        size="large"
                                    />
                                </View>
                            </View>
                        </Modal>
                    </KeyboardAvoidingView>
                    {this.state.tipsModal ?
                        <View style={styles.ModalView}>
                            <View style={styles.AlertView}>
                                <Image source={this.state.failSucessImage} resizeMode={'contain'}
                                       style={{width: 120, height: 90, marginTop: 10}}/>
                                <View style={{marginTop: 10}}>
                                    <Text style={{fontSize: 10}}>{this.state.respMessage}</Text>
                                </View>

                                <View style={styles.DownButtonView}>

                                    <TouchableOpacity onPress={this.hideTips.bind(this)}
                                                      style={[styles.DownButton, {
                                                          width: 230,
                                                          backgroundColor: '#ffffff'
                                                      }]}>
                                        <Text style={{color: '#018be6'}}>确定</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <View/>
                    }
                </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    modalviewOut: {
        width: width,
        height: height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalviewOIn: {
        width: 100,
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    tipsStyle: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 80
    },
    container: {
        flex: 1,
        width: width,
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
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
        //borderTopWidth: 1/ratio,
        //borderBottomWidth: 1/ratio,
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
    },
    err: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    loginwrap: {                                             //  按钮总的view
        flexDirection: 'row',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 46,
    },
    loginTouch: {                                                //touch的class
        width: width,
        height: 40,
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
        width: 230,
        height: 40,
        marginTop: 10,
        borderTopWidth: 1 / ratio,
        borderTopColor: '#4c4c4c'

    },
    DownButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    ModalView: {
        position: 'absolute',
        width: width,
        height: height,
        left: 0,
        top: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    AlertView: {
        width: 230,
        zIndex: 5,
        marginTop: -64,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },

});

