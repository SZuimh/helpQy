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
    AlertIOS
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
            errMsg: ''
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    goResetPassword() {
        this.props.navigation.navigate('PageFindPasswordFromSetting', {PageWoKey: this.props.navigation.state.key,})
    }

    logOut() {

        logOutEmitterEvent = NativeAppEventEmitter.emit('loginOutEmitter', {});
        Alert.alert(
            '退出成功',
            '',
            [
                {text: '好的', onPress: () => this.goBack()}

            ]
        );

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
                    errMsg: "服务出现异常"
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
                Alert.alert(
                    '修改成功',
                    "",
                    [
                        {text: '好的'},
                    ]
                )

            } else {
                this.setState({
                    errMsg: '请输入正确的用户名'
                })
            }

        }).catch(err => {
            this.setState({
                errMsg: '请输入正确的用户名'
            })
        });
    }

    changeModalVisible(modalVisible) {
        this.setState({
            modalVisible: modalVisible
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
                    <Text>修改昵称</Text>
                    <Image source={require('./img/turnRight.png')} resizeMode={'contain'} style={styles.wrapperImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goResetPassword.bind(this)} style={styles.commonStyle}>
                    <Text>修改密码</Text>
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
                        <View style={styles.PageSettingChanegNameView}>
                            <View style={styles.PageSettingChanegNameButtonView}>
                                <Text style={styles.UserName}>用户名</Text>
                            </View>

                            <View style={styles.TextinputForChange}>
                                <TextInput
                                    style={styles.PageSettingInput}
                                    placeholder='输入昵称'
                                    keyboardType='email-address'
                                    maxLength={30}
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
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1 / ratio,
        borderBottomColor: '#F4F4F4',
        paddingLeft: 10
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
        height: 40,
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

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        zIndex: 1000
    },
    PageSettingChanegNameView: {
        width: 200,
        height: 160,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        marginTop: -50
    },
    PageSettingInput: {
        height: 25,
        width: 180,
        fontSize: 10,
        color: '#4a4a4a',
        borderWidth: 1 / ratio,
        borderRadius: 2,
        borderColor: '#c7c7cd',
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop: 20
    },
    PageSettingChanegNameButtonView: {
        width: 200,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1 / ratio,
        borderTopColor: '#4a4a4a'
    },
    PageSettingChanegNameButton: {
        width: 100,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});