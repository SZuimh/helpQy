/**
 * 暂时为修改密码、清除缓存、上传公司log等
 *
 */
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    PixelRatio,
    Dimensions,
    TextInput,
    Alert,
    NativeAppEventEmitter,
    AsyncStorage,
    Modal,
    AlertIOS,
    Keyboard
} from 'react-native';
import React, {Component} from 'react';
import UploadFile from '../utils/uploadFile';

let ratio = PixelRatio.get();
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import {UrlModifyUserName} from '../utils/url';

export default class PageSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOneUrl: null,
            visible: false,
            modalVisible: false,
            userName: "",
            respmsg: null,
            errMsg: '',
            tipsModal:false,
            failSucessTips:'' , //对不起，充值失败 或恭喜你，充值成功
            failSucessImage:require('./img/joinFail.png'),
            respMessage:null,
            retcode:2001,
        }
    }
    static navigationOptions = {
        title: '设置',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };
    componentWillMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);

    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.timer && clearTimeout(this.timer);
    }
    _keyboardDidShow=()=>{
        this.setState({
            modalAlignItem:'flex-end'
        })
    }
    hideTips(){
        this.setState({
            tipsModal:false
        })
        this.props.navigation.goBack()
    }
    goResetPassword() {
        this.props.navigation.navigate('PageFindPasswordFromSetting', {PageWoKey: this.props.navigation.state.key,})
    }

    logOut() {

        logOutEmitterEvent = NativeAppEventEmitter.emit('loginOutEmitter', {});
        this.setState({
            tipsModal:true,
            failSucessTips:"",
            failSucessImage:require('./img/joinFail.png'),
            respMessage:'退出成功',
            modalAlignItem:'center'
        })

    }

    goBack() {
        this.props.navigation.goBack();
    }


    changeUserName() {

        if (this.state.userName == null) {

            this.setState({
                errMsg: '请输入正确的用户名'
            })
            return
        }

        if (this.state.userName.length < 2 || this.state.userName.length > 16) {
            this.setState({
                errMsg: '请输入正确的用户名'
            })
            return
        }

        let formTemp = new FormData();
        formTemp.append("token", this.props.navigation.state.params.token);
        formTemp.append("phone", this.props.navigation.state.params.phone);
        formTemp.append("userName", this.state.userName);
        let option = {
            url: UrlModifyUserName,
            body: formTemp
        };
        let response = UploadFile(option);

        response.then(resp => {

            if (typeof(resp) == "undefined") {
                this.setState({
                    errMsg: "服务出现异常",
                    modalAlignItem:'center'
                })
            }
            if (resp.retcode == 2000) {
                this.changeModalVisible(!this.state.modalVisible)
                const {changeUserNameCallBack} = this.props.navigation.state.params;
                changeUserNameCallBack(this.state.userName);//回调成功
                AsyncStorage.multiSet([
                    ['usernickname', this.state.userName],
                ], (errors) => {
                });
                this.setState({
                    tipsModal:true,
                    failSucessTips:"",
                    failSucessImage:require('./img/joinSuccess.png'),
                    respMessage:'恭喜您，修改成功',
                    modalAlignItem:'center'
                })

            } else {
                this.setState({
                    errMsg: '请输入正确的用户名',
                    modalAlignItem:'center'
                })
            }

        }).catch(err => {
            this.setState({
                errMsg: '请输入正确的用户名',
                modalAlignItem:'center'
            })
        });
    }

    changeModalVisible(modalVisible) {
        this.setState({
            modalVisible: modalVisible,
            errMsg:'',
            modalAlignItem:'center'
        })

    }

    handleNickNameChange(event) {
        this.setState({
            userName: event.nativeEvent.text
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={this.changeModalVisible.bind(this, !this.state.modalVisible)}
                                  style={styles.commonStyle}>
                    <Text style={styles.changeUserNameText}>修改昵称</Text>
                    <Image source={require('./img/turnRight.png')} resizeMode={'contain'} style={styles.wrapperImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goResetPassword.bind(this)} style={styles.commonStyle}>
                    <Text style={styles.changeUserNameText}>修改密码</Text>
                    <Image source={require('./img/turnRight.png')} resizeMode={'contain'} style={styles.wrapperImage}/>
                </TouchableOpacity>
                <View style={styles.tipsStyle}>
                    <Text style={{color: 'red'}}>{this.state.respmsg}</Text>
                </View>
                <TouchableOpacity onPress={this.logOut.bind(this)} style={styles.chongzhiWrapper}>
                    <View style={styles.chongzhi}>
                        <Text style={styles.chongzhiTxt}>退出登录</Text>
                    </View>
                </TouchableOpacity>

                {this.state.modalVisible ?
                    <View style={styles.PageSettingChanegNameModal}>
                        <View style={[styles.PageSettingChanegNameView,{alignSelf:this.state.modalAlignItem}]}>
                            <View style={styles.PageSettingChanegNameButtonView}>
                                <Text style={styles.UserName}>用户名</Text>
                            </View>

                            <View style={styles.TextinputForChange}>
                                <TextInput
                                    style={styles.PageSettingInput}
                                    placeholder='输入昵称'
                                    keyboardType='default'
                                    maxLength={30}
                                     underlineColorAndroid={'transparent'}
                                    ref='refemail'
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    clearTextOnFocus={false}
                                    keyboardAppearance='dark'
                                    autoCorrect={false}
                                    onChange={this.handleNickNameChange.bind(this)}
                                />
                                <Text style={styles.ErrMsg}>{this.state.errMsg}</Text>
                            </View>
                            <View style={styles.PageSettingChanegNameButtonView}>
                                <TouchableOpacity onPress={this.changeModalVisible.bind(this, !this.state.modalVisible)}
                                                  style={styles.PageSettingChanegNameButton}>
                                    <Text style={{color: '#0071ff'}}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.PageSettingChanegNameButton, {borderLeftWidth: 1 / ratio,}]}
                                    onPress={this.changeUserName.bind(this)}>
                                    <Text style={{color: '#0071ff'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View/>
                }
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
            </View>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ErrMsg:{
        marginTop: 10,
        fontSize: 10,
        color: 'red'
    },
    changeUserNameText:{
        fontSize:16
    },
    TextinputForChange: {
        height: 80,
        flexDirection: 'column',
        alignItems: 'center'
    },
    UserName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    tipsStyle: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    head: {
        flexDirection: 'row',
        height: 50,
        width: width,
        borderBottomWidth: 1 / ratio,
        borderBottomColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#43AC43',
        paddingLeft: 5,
        paddingRight: 5
    },
    returnButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    backImg: {
        height: 24,
        width: 24
    },
    commonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1 / ratio,
        borderBottomColor: '#F4F4F4',
        paddingLeft: 10,
    },
    wrapperImage: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    chongzhiWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
    },
    chongzhi: {
        width: width,
        backgroundColor: '#008BE6',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chongzhiTxt: {
        color: '#ffffff',
        fontSize: 15
    },
    PageSettingChanegNameModal: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: width,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        zIndex: 1000
    },
    PageSettingChanegNameView: {
        width: width*0.6,
        height: 160,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        marginTop: -50,
    },
    PageSettingInput: {
        justifyContent:'center',
        alignItems:'center',
        height: 40,
        width: width*0.6-40,
        fontSize: 10,
        color: '#4a4a4a',
        borderWidth: 1 / ratio,
        borderRadius: 2,
        borderColor: '#c7c7cd',
        backgroundColor: 'white',
        textAlign: 'center',
        // marginTop: 20
    },
    PageSettingChanegNameButtonView: {
        width: width*0.6,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1 / ratio,
        borderTopColor: '#4a4a4a'
    },
    PageSettingChanegNameButton: {
        width: width*0.3,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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