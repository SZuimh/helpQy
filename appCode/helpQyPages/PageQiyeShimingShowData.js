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
    static navigationOptions = {
        title: '企业实名认证',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.QiyeShimingScrollView}>
                <ScrollView>
                    <View style={styles.QiyeShimingMaxView}>
                        {params.Status == 'unhandle' ?
                            <View style={styles.QiyeShimingStatus}>
                                <Text style={{height:20,color:'#F5A623',fontSize:15,marginTop:10}}>审核中</Text>
                                <Text style={{height:20,fontSize:15,marginTop:10,marginBottom:10}}>您的资料正在审核中</Text>
                            </View>
                            :
                            <View style={styles.QiyeShimingStatus}>
                                <Text style={{height:20,color:'#1296db',fontSize:15,marginTop:10}}>审核已通过</Text>
                                <Text style={{height:20,fontSize:15,marginTop:10,marginBottom:10}}>您提交的资料已经审核通过</Text>
                            </View>
                        }
                        <View style={{width:width,height:5,backgroundColor:'#fafafa'}}></View>
                        <View style={styles.TextinputView}>
                            <View  style={styles.passwordinputTitleView}>
                                <Text style={styles.inputName}>公司</Text>
                            </View>
                            <View  style={styles.passwordinput}>
                                <Text>{params.ShimingInfo.name}</Text>
                            </View>
                        </View>
                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <View  style={styles.passwordinputTitleView}>
                                <Text style={styles.inputName}>统一征信码</Text>
                            </View>
                            <View  style={styles.passwordinput}>
                                <Text>{params.ShimingInfo.numberid}</Text>
                            </View>
                        </View>

                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <View  style={styles.passwordinputTitleView}>
                                <Text style={styles.inputName}>法人</Text>
                            </View>
                            <View  style={styles.passwordinput}>
                                <Text>{params.ShimingInfo.legalperson}</Text>
                            </View>
                        </View>

                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <View  style={styles.passwordinputTitleView}>
                                <Text style={styles.inputName}>手机</Text>
                            </View>
                            <View  style={styles.passwordinput}>
                                <Text>{params.ShimingInfo.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.emptyViewForLine}></View>
                        <View style={styles.TextinputView}>
                            <View  style={styles.passwordinputTitleView}>
                                <Text style={styles.inputName}>邮箱</Text>
                            </View>
                            <View  style={styles.passwordinput}>
                                <Text>{params.ShimingInfo.email}</Text>
                            </View>
                        </View>

                        <View style={styles.emptyViewForLine}></View>

                        <View style={styles.uploadImgView}>
                            <View style={styles.uploadImageOneView}>
                                <View
                                                  style={styles.imgButton}>
                                    <Image key={1} source={this.state.imgOneUrl}
                                           style={{width: 60, height: 60}}
                                           resizeMode={'cover'}/>
                                    <Text style={styles.uploadText}>公司执照</Text>
                                </View>
                            </View>
                            <View style={styles.uploadImageOneView}>
                                <View>
                                    <Image key={2} source={this.state.imgTwoUrl} style={{width: 60, height: 60}}
                                           resizeMode={'contain'}/>
                                </View>
                                <Text style={styles.uploadText}>法人身份证</Text>
                            </View>
                            <View style={styles.uploadImageOneView}>
                                <View>
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
    inputName:{
        fontWeight:'bold',
        fontSize:14,
    },
    QiyeShimingStatus:{
        width:width*0.8,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
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
        paddingLeft: 10,
        width:width*0.6,
        height:40,
        flexDirection:'row',
        alignItems:'center'
    },
    passwordinputTitleView:{
        paddingLeft: 10,
        width:width*0.25,
        height:40,
        flexDirection:'row',
        alignItems:'center'
    },
    TextinputView: {
        marginTop: 15,
        height: 40,
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextinputViewTitle:{
        width:width*0.2,
        marginTop: 15,
        height: 40,
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



















