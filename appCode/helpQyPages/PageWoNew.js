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
    Alert
} from 'react-native';
import React, {Component} from 'react';
import {UrlGetShimingInfo} from '../utils/url';
import UploadFile from '../utils/uploadFile';

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
        console.log(this.state.usertype)
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
                console.log(err);
            });
        });

        this.getUserMessage();

    }

    changeUserNameCallBack = (newUserName) => {

        this.setState({
            usernickname: newUserName
        })
        console.log(this.state.usernickname)
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
            // if (this.state.usertype == 2) {
            //     return Alert.alert(
            //         '您已认证过了!',
            //         '无需重复认证',
            //         [
            //             {text: '好的'}
            //
            //         ]
            //     );
            // }
            // else if (this.state.usertype == 3) {
            //     return Alert.alert(
            //         '您的资料正在审核中!',
            //         '请耐心等待',
            //         [
            //             {text: '好的'}
            //
            //         ]
            //     );
            // } else {
            //     this.props.navigation.navigate('PageQiyeShimingShowData', {
            //         useruuid: this.state.useruuid,
            //         token: this.state.token
            //     })
            //
            // }
            let formData = new FormData();
            formData.append("token", this.state.token);
            formData.append("useruuid", this.state.useruuid);
            let option = {
                url: UrlGetShimingInfo,
                body: formData
            };
            let responseR = UploadFile(option);
            responseR.then(resp => {
                console.log(resp)
                if (resp.retcode == 2001) {
                    //未查到数据 说明没有进行审核信息的提交
                    this.props.navigation.navigate('PageQiyeShiming', {
                        useruuid: this.state.useruuid,
                        token: this.state.token,
                        Status:'nostart'
                    })
                }
                else if (resp.retcode == 2000) {
                    if (resp.result.confirmif == 'unhandle') {
                        //还在审核中
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
                        console.log("ssss")
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
                    <View style={styles.PageWoNewHeader}>
                        <View style={styles.PageWoNewUserPhotoView}>
                            <Image source={{uri: this.state.userphoto}} style={styles.userPhoto} resizeMode={'cover'}/>
                        </View>
                        <View style={styles.PageWoNewTongzhi}>
                            <View style={styles.PageWoNewUserNameAndTongzhiView}>
                                <TouchableOpacity style={{
                                    alignSelf: 'flex-end',
                                    width: 30,
                                    height: 20,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                                  onPress={this.goNotificationList.bind(this)}>
                                    <Image source={require('./img/message.png')} style={styles.PageWoNewTongzhiImage}/>
                                </TouchableOpacity>
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
let styles = StyleSheet.create({
    PageWoNewMaxView: {
        width: width,
        height: 300,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    PageWoNewMaxHeader: {
        width: width,
        height: 90,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    PageWoNewUserPhotoView: {
        width: 80,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PageWoNewHeader: {
        width: width - 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    PageWoNewImageAndUserName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    PageWoNewUserNameView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    PageWoNewTongzhi: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    PageWoNewUserNameAndTongzhiView: {
        height: 40,
        width: width - 110,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    PageWoNewTongzhiImage: {},
    PageWoNewUserName: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold'
    },
    PageWoNewMyAccount: {
        height: 20,
        width: width - 110,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    PageWoNewTurnRight: {
        marginRight: 20
    },
    PageWoNewMyAccountFont: {
        fontSize: 12,
    },
    PageWoNewMyChoice: {
        width: width,
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PageWoNewChoiceView: {
        width: width - 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PageWoNewChoice: {
        width: width - 70,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PageWoNewEmptyViewForLine: {
        width: width - 70,
        height: 1 / ratio,
        backgroundColor: '#E0DCDC'
    },
    PageWoNewChoiceFont: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    PageWoNewTiShi: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});