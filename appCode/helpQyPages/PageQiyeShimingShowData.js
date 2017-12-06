import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    PixelRatio,
    TextInput,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import React, {Component} from 'react';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
import Loading from '../loading/loading';
import {UrlUploadImage, UrlGetCode} from '../utils/url';
import UploadFile from '../utils/uploadFile';
import LoadingInPage from "../loading/LoadingInPage";

let regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;   //正则验证Email
let regP = /^[0-9|a-z|A-Z]\w{5,17}$/; //6-18w位数字和字母组成的密码
let formData = new FormData();
let ImagePicker = require('react-native-image-picker');
let imgUrl = require('./img/uploadImg.png');
let maxTime = 60;

export default class PageQiyeShimingShowData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOneUrl: {uri:this.props.navigation.state.params.ShimingInfo.imgone},
            imgTwoUrl: {uri:this.props.navigation.state.params.ShimingInfo.imgtwo},
            imgThreeUrl: {uri:this.props.navigation.state.params.ShimingInfo.imgthree},
            imgUrlInter:{uri:this.props.navigation.state.params.ShimingInfo.imgone},
            visible: false,
            companyName: null,
            Zhengxindaima: null,
            Faren: null,
            phone: "15621062963",
            verCode: null,
            yaoqingma: null,
            companyEmail: null,
            modalVisible: false,
            tipsModal: false,
            tipsText: "恭喜你，加入成功",
            authtype: null,
            address: null,
            controlVerifyCode: true,
            time: maxTime,
        };
    }

    goCompleteProfile(tag) {

        let options = {
            title: '',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.setState({
            visible: true
        });
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {

                this.setState({
                    visible: false
                });
            } else if (response.error) {
                this.setState({
                    visible: false
                });

            } else if (response.customButton) {
                this.setState({
                    visible: false
                });

            } else {

                let uri = response.uri;
                if (uri.indexOf('file://') < 0) {
                    uri = 'file://' + uri;
                } else {
                    uri = uri.replace('file://', '')
                }
                // let source = {uri: uri, isStatic: true};
                var source = {uri: uri};
                let type = 'image/jpg';
                if (tag == 1) {
                    this.setState({
                        imgOneUrl: source,
                        visible: false
                    });
                    formData.append("imageOne", {uri: uri, type: 'image/jpeg', name: 'imageOne'});
                }
                else if (tag == 2) {
                    this.setState({
                        imgTwoUrl: source,
                        visible: false
                    });
                    formData.append("imageTwo", {uri: uri, type: 'image/jpeg', name: 'imageTwo'});
                } else if (tag == 3) {
                    this.setState({
                        imgThreeUrl: source,
                        visible: false
                    });
                    formData.append("imageThree", {uri: uri, type: 'image/jpeg', name: 'imageThree'});
                }
            }//else
        });
    }

    goRenzheng() {
        //添加所有的数据
        if (this.state.companyName == null || this.state.companyName == '') {
            return Alert.alert(
                '请检查输入',
                '公司名称不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.Zhengxindaima == null) {
            return Alert.alert(
                '请检查输入',
                '公司征信代码名称不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.Faren == null) {
            return Alert.alert(
                '请检查输入',
                '公司法人不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.verCode == null) {
            return Alert.alert(
                '请检查输入',
                '公司验证码名称不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.phone == null) {
            return Alert.alert(
                '请检查输入',
                '联系人手机号不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.companyEmail == null) {
            return Alert.alert(
                '请检查输入',
                '公司邮箱不能为空',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.Zhengxindaima.length != 18) {
            return Alert.alert(
                '请检查输入',
                '请检查征信代码格式(18位)',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.phone.length != 11) {
            return Alert.alert(
                '请检查输入',
                '请检查手机号码格式(11位)',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if (this.state.verCode.length != 4) {
            return Alert.alert(
                '请检查输入',
                '请检查验证码格式(4位)',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }

        if (!regx.test(this.state.companyEmail)) {
            return Alert.alert(
                '请检查输入',
                '请输入正确的邮箱格式',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }

        this.setState({
            modalVisible: true
        })

        formData.append('token', this.props.navigation.state.params.token);
        formData.append('useruuid', this.props.navigation.state.params.useruuid);
        formData.append('authtype', "2");
        formData.append('name', this.state.companyName);      //公司名称
        formData.append('numberid', this.state.Zhengxindaima);   //企业征信代码
        formData.append('legalPerson', this.state.Faren);
        formData.append('phone', this.state.phone);
        formData.append('verifyCode', this.state.verCode);
        formData.append('email', this.state.companyEmail);

        let option = {
            url: UrlUploadImage,
            body: formData
        };

        let responseR = UploadFile(option);
        responseR.then(resp => {
            //formData = new FormData();
            if (typeof(resp) == "undefined") {
                this.setState({
                    modalVisible: false,
                    tipsText: "oops，提交失败",
                    tipsModal: true
                });
                return
            }
            this.setState({
                modalVisible: false
            });
            if (resp.retcode === 2000) {
                this.setState({
                    tipsText: "恭喜你，提交成功",
                    tipsModal: true
                })
            } else {
                this.setState({
                    tipsText: resp.msg,
                    tipsModal: true
                })
            }
        }).catch(err => {

            this.setState({
                modalVisible: false,
                tipsText: "oops，提交失败",
                tipsModal: true
            });

        });
    }

    getCode() {
        if (this.state.phone == null || this.state.phone == '' || this.state.phone.length != 11)
            return Alert.alert(
                '请检查输入',
                '请输入正确的手机号格式',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        //调用倒计时方法
        this.timeDown();

        // // 调用后台获取验证码的接口
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

    handleCompanyNameChange(event) {
        this.setState({
            companyName: event.nativeEvent.text
        });
    }

    handleZhengxindaimaChange(event) {
        this.setState({
            Zhengxindaima: event.nativeEvent.text
        })
    }

    handleFarenChange(event) {
        this.setState({
            Faren: event.nativeEvent.text
        })
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.nativeEvent.text
        })
    }

    handleVerCodeChange(event) {
        this.setState({
            verCode: event.nativeEvent.text
        })
    }


    handleEmailChange(event) {
        this.setState({
            companyEmail: event.nativeEvent.text
        })
    }

    hideTips() {
        this.setState({
            tipsModal: false
        })
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.QiyeShimingScrollView}>
                <ScrollView>
                    <View style={styles.QiyeShimingMaxView}>
                        {params.Status == 'unhandle' ?
                            <View style={styles.QiyeShimingStatus}>
                                <Text style={{height:20,color:'#F5A623',fontSize:15,marginTop:10}}>审核中</Text>
                                <Text style={{height:20,fontSize:15}}>您的资料正在审核中</Text>
                            </View>
                            :
                            <View style={styles.QiyeShimingStatus}>
                                <Text style={{height:20,color:'#1296db',fontSize:15,marginTop:10}}>审核已通过</Text>
                                <Text style={{height:20,fontSize:15}}>您提交的资料已经审核通过</Text>
                            </View>
                        }
                        <View style={{width:width,height:5,backgroundColor:'#fafafa'}}></View>
                        <View style={styles.TextinputView}>
                            <Text style={styles.passwordinput}>{params.ShimingInfo.name}</Text>
                        </View>
                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <Text style={styles.passwordinput}>{params.ShimingInfo.numberid}</Text>
                        </View>
                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <Text style={styles.passwordinput}>{params.ShimingInfo.legalperson}</Text>
                        </View>
                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <Text style={styles.passwordinput}>{params.ShimingInfo.phone}</Text>
                        </View>
                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <Text style={styles.passwordinput}>{params.ShimingInfo.email}</Text>
                        </View>

                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.uploadImgView}>
                            <View style={styles.uploadImageOneView}>
                                <View onPress={this.goCompleteProfile.bind(this, 1)}
                                                  style={styles.imgButton}>
                                    <Image key={1} source={this.state.imgOneUrl}
                                           style={{width: 60, height: 60}}
                                           resizeMode={'cover'}/>
                                    <Text style={styles.uploadText}>公司执照</Text>
                                </View>
                            </View>
                            <View style={styles.uploadImageOneView}>
                                <View onPress={this.goCompleteProfile.bind(this, 2)}>
                                    <Image key={2} source={this.state.imgTwoUrl} style={{width: 60, height: 60}}
                                           resizeMode={'contain'}/>
                                </View>
                                <Text style={styles.uploadText}>法人身份证</Text>
                            </View>
                            <View style={styles.uploadImageOneView}>
                                <View onPress={this.goCompleteProfile.bind(this, 3)}>
                                    <Image key={3} source={this.state.imgThreeUrl} style={{width: 60, height: 60}}
                                           resizeMode={'cover'}/>
                                </View>
                                <Text style={styles.uploadText}>法人手持身份证</Text>
                            </View>
                        </View>
                        <View style={styles.ShiMingTips}>
                            <Text style={styles.ShiMingTipsText}>请根据提示，务必上传真实资料,以上选项皆为必填项</Text>
                        </View>
                        <View style={{width: width, height: 50}}></View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}
let styles = StyleSheet.create({
    PageMessageMaxView: {
        width: width,
        flex: 1
    },
    QiyeShimingStatus:{
        width:width,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    ShiMingTips: {
        marginTop: 20,
        width: width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ShiMingTipsText: {
        fontSize: 10,
        color: '#b9b9b9',
        textAlign: 'center'
    },
    uploadImageOneView: {
        width: width * 0.22,
        flexDirection: 'column',
        alignItems: 'center'
    },
    uploadText: {
        marginTop: 10,
        width: width * 0.23,
        height: 20,
        fontSize: 10,
        color: '#b9b9b9',
        textAlign: 'center'
    },

    DownButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        height: 40,
        marginTop: 15
    },
    DownButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    AlertView: {
        width: 249,
        zIndex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    PageSettingChanegNameModal: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
    PageSettingChanegNameView: {
        width: 160,
        height: 160,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 6
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
    QiyeShimingScrollView: {
        backgroundColor: '#fff',
        width: width,
        flex: 1,
    },
    QiyeShimingMaxView: {

        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    QiyeShimingTitleView: {
        width: width,
        height: 35,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyViewForLine: {
        width: width - 40,
        height: 1 / ratio,
        backgroundColor: '#b9b9b9'
    },
    password: {
        flexDirection: 'row',
        //borderTopWidth: 1/ratio,
        //borderBottomWidth: 1/ratio,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        height: 40,
        marginTop: 15,
        justifyContent: 'center'
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
        backgroundColor: '#FFFFFF',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordinput: {

        fontSize: 15,
        paddingLeft: 10,
        textAlign: 'center',
        color: '#4a4a4a'
    },
    TextinputView: {
        marginTop: 15,
        height: 40,
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    QiyeShimingButton: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 50,
        backgroundColor: '#008BE6'
    },
    uploadImgView: {
        width: 0.75 * width,
        height: 100,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgButton: {
        width: width * 0.2,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});



















