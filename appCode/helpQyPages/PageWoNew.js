import {

    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    NativeAppEventEmitter,
    AsyncStorage,
    Alert,
    Platform
} from 'react-native';
import React, {Component} from 'react';
import {UrlGetShimingInfo} from '../utils/url';
import UploadFile from '../utils/uploadFile';


import  PageWoNewAndroid  from  './AndroidStyle/PageWoNewAndroid';
let styles=PageWoNewAndroid;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
var loginEmitterEvent;
var loginOutEmitterEvent;
export default class PageWo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernickname: '请登录',
            token: null,
            useruuid: null,
            isLogin: false,
            userphoto: "http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png",
            usertoken: null,
            unionid: null,
            phonebind: null,
            usertype: null,
            userphone: null,
        };
    }

    componentWillUnmount() {
        loginEmitterEvent.remove()
        loginOutEmitterEvent.remove()
    }

    componentDidMount() {
        // 无论哪里登录，都要触发loginEmitter事件
        loginEmitterEvent = NativeAppEventEmitter.addListener('loginEmitter', (data) => {
            AsyncStorage.multiGet(["token", "useruuid", "usernickname", "userphoto", "usertoken", "unionid", "phonebind", "usertype", "userphone"], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                this.setState({
                    token: result[0][1],
                    useruuid: result[1][1],
                    usernickname: result[2][1],
                    userphoto: result[3][1],
                    usertoken: result[4][1],
                    unionid: result[5][1],
                    phonebind: result[6][1],
                    usertype: result[7][1],
                    userphone: result[8][1],
                    isLogin: true
                })
            })

        });
        // console.log(this.state.usertype)
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
                userphoto: "http://oztdsemro.bkt.clouddn.com/putaoLogo@2x.png"
            })
            AsyncStorage.clear().catch(err => {
                // console.log(err);
            });
        });

        this.getUserMessage();

    }

    changeUserNameCallBack = (newUserName) => {

        this.setState({
            usernickname: newUserName
        })
        // console.log(this.state.usernickname)
    }

    getUserMessage() {
        //获取登录者的个人信息
        AsyncStorage.multiGet(["token", "useruuid", "usernickname", "userphoto", "usertoken", "unionid", "phonebind", "usertype", "userphone"], (errros, result) => {
            if (result[0][1] == null) {
                return
            }
            this.setState({
                token: result[0][1],
                useruuid: result[1][1],
                usernickname: result[2][1],
                userphoto: result[3][1],
                usertoken: result[4][1],
                unionid: result[5][1],
                phonebind: result[6][1],
                usertype: result[7][1],
                userphone: result[8][1],
                isLogin: true
            })
        })
    }

    goMyHomers() {
        if (this.state.isLogin) {
            this.props.navigation.navigate('MyHomerList', {useruuid: this.state.useruuid, token: this.state.token})
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }

    }

    goPagewoMyEmployee() {
        if (this.state.isLogin) {
            this.props.navigation.navigate('PageWoMyEmployee', {useruuid: this.state.useruuid, token: this.state.token})
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    goSetting() {
        if (this.state.isLogin) {
            this.props.navigation.navigate('PageSetting', {
                token: this.state.token, useruuid: this.state.useruuid,
                signOutCallBack: this.signOut_callBack,
                isLogin: this.state.isLogin, phone: this.state.userphone,
                changeUserNameCallBack: this.changeUserNameCallBack,
            })
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }


    }

    goNotificationList() {
        if (this.state.isLogin) {
            this.props.navigation.navigate('PageSystemNotificationList', {
                useruuid: this.state.useruuid,
                token: this.state.token
            })
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    goShiming() {
        if (this.state.isLogin) {
            let formData = new FormData();
            formData.append("token", this.state.token);
            formData.append("useruuid", this.state.useruuid);
            let option = {
                url: UrlGetShimingInfo,
                body: formData
            };
            let responseR = UploadFile(option);
            responseR.then(resp => {

                if (resp.retcode == 2001) {
                    //未查到数据 说明没有进行审核信息的提交
                    this.props.navigation.navigate('PageQiyeShiming', {
                        useruuid: this.state.useruuid,
                        token: this.state.token,
                        Status:'nostart'
                    })
                }
                else if (resp.retcode == 2000) {
                    if (resp.result.confirmif == "unhandle") {
                        //还在审核中
                        console.log("推啊哦转")
                        this.props.navigation.navigate('PageQiyeShimingShowData', {
                            useruuid: this.state.useruuid,
                            token: this.state.token,
                            ShimingInfo:resp.result,
                            Status:'unhandle'
                        })
                    }
                    else if (resp.result.confirmif == 'pass') {
                        // 审核信息已经通过了
                        this.props.navigation.navigate('PageQiyeShimingShowData', {
                            useruuid: this.state.useruuid,
                            token: this.state.token,
                            ShimingInfo:resp.result,
                            Status:'pass'
                        })
                    }
                    else if (resp.result.confirmif == 'refused') {
                        //审核信息有误，被拒绝
                        this.props.navigation.navigate('PageQiyeShiming',{
                            useruuid: this.state.useruuid,
                            token: this.state.token,
                            ShimingInfo:resp.result,
                            Status:'refused'
                        })
                    }
                }
            }).catch(err => {

            });
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    goLogin() {
        this.props.navigation.navigate('PageLogin')
    }

    goShenqing() {
        this.props.navigation.navigate('PageApplyHelp', {useruuid: this.state.useruuid, token: this.state.token})

    }


    signOut_callBack = () => {
        this.setState({
            isLogin: false,
            usernickname: '请登录',
            userphoto: "http://7xihgc.com1.z0.glb.clouddn.com/putaoLogo.png"
        })
    }

    render() {
        return (
            <View style={styles.PageWoNewMaxView}>
                <View style={styles.PageWoNewMaxHeader}>
                    {/*头像昵称要靠左边*/}
                    <View style={styles.PageWoNewHeader}>
                        {/*用户头像*/}
                        <View style={styles.PageWoNewUserPhotoView}>
                            <Image source={{uri: this.state.userphoto}} style={styles.userPhoto} resizeMode={'cover'}/>
                        </View>
                        {/*请登录，公司或者个人账户*/}
                        <View style={styles.PageWoNewTongzhi}>
                            <View style={styles.PageWoNewUserNameAndTongzhiView}>
                                {this.state.isLogin ?
                                    <Text style={styles.PageWoNewUserName}>{this.state.usernickname}</Text> :
                                    <TouchableOpacity onPress={this.goLogin.bind(this)}>
                                        <Text style={styles.PageWoNewUserName}>{this.state.usernickname}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.PageWoNewMyAccount}>
                                {this.state.usertype == '2' ?
                                    <Text style={styles.PageWoNewMyAccountFont}>公司账户</Text>
                                    :
                                    <Text style={styles.PageWoNewMyAccountFont}>个人账户</Text>
                                }
                                <View></View>
                            </View>
                        </View>
                    </View>

                    {/*消息通知*/}
                    <TouchableOpacity onPress={this.goNotificationList.bind(this)} style={styles.messageTouch}>
                        <Image source={require('./img/message.png')} style={styles.PageWoNewTongzhiImage} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.PageWoNewMyChoice}>
                    <View style={styles.PageWoNewChoiceView}>
                        <TouchableOpacity style={styles.PageWoNewChoice} onPress={this.goMyHomers.bind(this)}>
                            <Text style={styles.PageWoNewChoiceFont}>我的家人</Text>
                            <Image source={require('./img/putaoInWo.png')}/>
                        </TouchableOpacity>
                        <View style={styles.PageWoNewEmptyViewForLine}></View>
                    </View>
                    {this.state.usertype == '2' ?
                        <View style={styles.PageWoNewChoiceView}>
                            <TouchableOpacity style={styles.PageWoNewChoice}
                                              onPress={this.goPagewoMyEmployee.bind(this)}>
                                <Text style={styles.PageWoNewChoiceFont}>员工管理</Text>
                                <Image source={require('./img/employeeInWo.png')}/>
                            </TouchableOpacity>
                            <View style={styles.PageWoNewEmptyViewForLine}></View>
                        </View>
                        :
                        <View></View>
                    }
                    <View style={styles.PageWoNewChoiceView}>
                        <TouchableOpacity style={styles.PageWoNewChoice} onPress={this.goShenqing.bind(this)}>
                            <Text style={styles.PageWoNewChoiceFont}>申请互助</Text>
                            <Image source={require('./img/shenQingInWo.png')}/>
                        </TouchableOpacity>
                        <View style={styles.PageWoNewEmptyViewForLine}></View>
                    </View>
                    <View style={styles.PageWoNewChoiceView}>
                        <TouchableOpacity style={styles.PageWoNewChoice} onPress={this.goShiming.bind(this)}>
                            <Text style={styles.PageWoNewChoiceFont}>企业认证</Text>
                            <Image source={require('./img/shiMingInWo.png')}/>
                        </TouchableOpacity>
                        <View style={styles.PageWoNewEmptyViewForLine}></View>
                    </View>
                    <View style={styles.PageWoNewChoiceView}>
                        <TouchableOpacity style={styles.PageWoNewChoice} onPress={this.goSetting.bind(this)}>
                            <Text style={styles.PageWoNewChoiceFont}>设置</Text>
                            <Image source={require('./img/settingInWo.png')}/>
                        </TouchableOpacity>
                        <View style={styles.PageWoNewEmptyViewForLine}></View>
                    </View>
                </View>

                <View style={styles.PageWoNewTiShi}>
                    <Text style={{fontSize: 14, color: '#D8D8D8'}}>客服电话 4000539588</Text>
                </View>
            </View>

        );
    }

}
