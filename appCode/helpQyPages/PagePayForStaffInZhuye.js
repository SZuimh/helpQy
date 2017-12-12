/**
 *为公司员工充值
 */
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import React, {Component} from 'react';
import {NativeModules} from 'react-native';

var Alipay = NativeModules.Alipay;

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
import fetchTool from '../utils/fetchTool';
import {UrlalipayOrder} from '../utils/url';
import LoadingInPage from "../loading/LoadingInPage";

export default class PagePayForStaffInZhuye extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            amount: 0,
            staffall: 0,
            useruuid: '',
            helptype: '',
            checked: 0,     //选中
            aveNumber: 0,
            loading: false,
            tipsModal: false, //控制弹出框
            failSucessTips: null, //对不起，充值失败 或恭喜你，充值成功
            failSucessImage: require('./img/joinFail.png'),
            respMessage: null,
            retcode: 2001, //只有支付宝充值返回成功后，才执行回调
        };
    }

    componentDidMount() {
        // console.log(this.props)
        //这里要获取已经加入的人数
        const {params} = this.props.navigation.state;
        this.setState({
            useruuid: params.HelpTypeMessage.useruuid,
            staffall: params.HelpTypeMessage.staffall,
            helptype: params.HelpTypeMessage.helptype
        })

        AsyncStorage.multiGet(["token"], (erros, result) => {
            if (result[0][1] == null) {
                return
            }
            this.setState({
                token: result[0][1],
            })
        })
    }

    changeMoney(moneyNumber) {
        let moneyAllNumber;
        if (this.state.staffall == 0) {
            moneyAllNumber = moneyNumber;    //员工数量为0的时候，不能使用乘法来计算钱数
        }
        else {
            moneyAllNumber = moneyNumber * this.state.staffall;
        }
        this.setState({
            checked: moneyNumber,
            amount: moneyAllNumber

        })
    }

    goforPay() { //调用支付宝支付
        if (this.state.amount == 0) {
            return Alert.alert(
                '请检查所选金额',
                '充值金额必须大于0元',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        let params = {
            "token": this.state.token,
            // "amount": 0.01,
            "amount":this.state.amount,    //PayTest
            "userUUID": this.state.useruuid, //对于公司充值来说是固定值company
            "categoryType": this.state.helptype,
            "userName": "company", //公司充值用不到此字段，
            "accountUUID": "company",
            "payType": 'company',
        }
        let options = {
            url: UrlalipayOrder,
            body: JSON.stringify(params)
        };

        let response = fetchTool(options);
        response.then(resp => {
            this.setState({
                loading: false
            });

            if (typeof(resp) == "undefined") {
                //弹出框
                this.setState({
                    tipsModal: true,
                    failSucessTips: "对不起，充值失败",
                    failSucessImage: require('./img/joinFail.png'),
                    respMessage: "服务返回异常，你联网了吗",
                    retcode: 2003
                })
                return;
            }
            if (resp.retcode === 2000) {

                let oderStr = resp.oderStr; //这个是返回的加密的字符串

                Alipay.signedString(oderStr, (err, data) => {

                    if (err.resultStatus == "9000") {
                        this.setState({
                            tipsModal: true,
                            failSucessTips: "恭喜你，充值成功",
                            failSucessImage: require('./img/joinSuccess.png'),
                            respMessage: null,
                            retcode: 9000
                        })
                        const {payMoneyCallBack} = this.props.navigation.state.params;
                        payMoneyCallBack();
                    }
                    else {
                        this.setState({
                            tipsModal: true,
                            failSucessTips: "对不起，充值失败",
                            failSucessImage: require('./img/joinFail.png'),
                            respMessage: null,
                            retcode: 9001
                        })
                    }

                });


            } else {//弹出提示框
                this.setState({
                    tipsModal: true,
                    failSucessTips: "对不起，充值失败",
                    failSucessImage: require('./img/joinFail.png'),
                    respMessage: null,
                    retcode: 9001
                })
            }

        }).catch(err => {
            this.setState({
                loading: false,
                tipsModal: true,
                failSucessTips: "对不起，充值失败",
                failSucessImage: require('./img/joinFail.png'),
                respMessage: null,
                retcode: 2003
            })
        });
    }

    getPlans(plans) {
        if ('little' == plans)
            return '少儿互助计划'
        else if ('young' == plans)
            return '中青年互助计划'
        else if ('old' == plans)
            return '中老年互助计划'
        else if ('zonghe' == plans)
            return '综合意外互助计划'
        else if ('staff' == plans)
            return '企业员工大病互助'
        else if ('employee' == plans)
            return '企业员工综合意外互助'
    }

    hideTips() {
        this.setState({
            tipsModal: false
        })
    }

    goToParentPage() {
        this.props.navigation.goBack(this.props.navigation.state.params.PageZhuYeKey)
    }

    render() {
        const {params} = this.props.navigation.state;
        let backgroundColor1 = this.state.checked == 10 ? '#1296db' : 'white';
        let backgroundColor2 = this.state.checked == 30 ? '#1296db' : 'white';
        let backgroundColor3 = this.state.checked == 50 ? '#1296db' : 'white';
        let backgroundColor4 = this.state.checked == 100 ? '#1296db' : 'white';
        let backgroundColor5 = this.state.checked == 150 ? '#1296db' : 'white';
        let backgroundColor6 = this.state.checked == 180 ? '#1296db' : 'white';
        let borderColor1=this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 10 ? '#ffffff' : '#1296db';
        let borderColor2=this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 30 ? '#ffffff' : '#1296db';
        let borderColor3=this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 50 ? '#ffffff' : '#1296db';
        let borderColor4=this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 100 ? '#ffffff' : '#1296db';
        let borderColor5=this.state.checked == 150 ? '#ffffff' : '#1296db';
        let borderColor6=this.state.checked == 180 ? '#ffffff' : '#1296db';
        let color1 = this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 10 ? '#ffffff' : '#1296db';
        let color2 = this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 30 ? '#ffffff' : '#1296db';
        let color3 = this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 50 ? '#ffffff' : '#1296db';
        let color4 = this.props.navigation.state.params.FirstPay?'grey':this.state.checked == 100 ? '#ffffff' : '#1296db';
        let color5 = this.state.checked == 150 ? '#ffffff' : '#1296db';
        let color6 = this.state.checked == 180 ? '#ffffff' : '#1296db';
        return (
            <View style={styles.PagePayForStaffMaxView}>
                <View style={styles.PagePayForStaffView}>
                    <View style={styles.PagePayForStaffTitleView}>
                        <Text style={{
                            fontSize: 15,
                            color: '#4a4a4a',
                            fontWeight: 'bold'
                        }}>{this.getPlans(params.HelpTypeMessage.helptype)}</Text>
                    </View>
                    <View style={styles.PagePayForStaffContentView}>
                        <Text style={{fontSize: 13, color: '#4a4a4a'}}>共有员工{params.HelpTypeMessage.staffall}人</Text>
                    </View>
                    <View style={styles.PagePayForStaffContentView}>
                        <Text style={{fontSize: 13, color: '#4a4a4a'}}>人均余额{params.HelpTypeMessage.average}元</Text>
                    </View>
                    <View style={styles.PagePayForStaffEmptyView}></View>
                    <View style={styles.PagePayForStaffContentView}>
                        <Text style={{fontSize: 15, color: '#4a4a4a', fontWeight: 'bold'}}>选择人均充值金额</Text>
                    </View>
                    <View style={styles.PagePayForStaffEmptyLine}></View>
                    <View style={styles.PagePayForStaffChongzhiView}>
                        <TouchableOpacity disabled={this.props.navigation.state.params.FirstPay}
                                          style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor1,borderColor:borderColor1}]}
                                          onPress={() => {this.changeMoney(10, this)}}>
                            <Text style={{color: color1}}>10元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={this.props.navigation.state.params.FirstPay}
                                          style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor2,borderColor:borderColor2}]}
                                          onPress={() => {
                                              this.changeMoney(30, this)
                                          }}>
                            <Text style={{color: color2}}>30元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={this.props.navigation.state.params.FirstPay}
                                          style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor3,borderColor:borderColor3}]}
                                          onPress={() => {this.changeMoney(50, this)}}>
                            <Text style={{color: color3}}>50元</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PagePayForStaffChongzhiView}>
                        <TouchableOpacity disabled={this.props.navigation.state.params.FirstPay}
                                          style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor4,borderColor:borderColor4}]}
                                          onPress={() => {this.changeMoney(100, this)}}>
                            <Text style={{color: color4}}>100元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor5,borderColor:borderColor5}]}
                            onPress={() => {this.changeMoney(150, this)}}>
                            <Text style={{color: color5}}>150元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.PagePayForStaffChongzhi, {backgroundColor: backgroundColor6,borderColor:borderColor6}]}
                            onPress={() => {this.changeMoney(180, this)}}>
                            <Text style={{color: color6}}>180元</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.PagePayForStaffButtonView}>
                    <TouchableOpacity style={styles.DabingChongzhiButtonOne}>
                        <Text style={{color: '#4A4A4A'}}>共计{this.state.amount}元</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DabingChongzhiButtonTwo} onPress={() => {
                        this.goforPay(this)
                    }}>
                        <Text style={{color: 'white'}}>支付</Text>
                    </TouchableOpacity>
                </View>
                {/*自定义弹出框*/}
                {this.state.tipsModal ?
                    <View style={styles.ModalView}>
                        <View style={styles.AlertView}>
                            <View style={{marginTop: 15}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.failSucessTips}</Text>
                            </View>
                            <Image source={this.state.failSucessImage} resizeMode={'contain'}
                                   style={{width: 120, height: 90, marginTop: 10}}/>
                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 10}}>{this.state.respMessage}</Text>
                            </View>

                            <View style={styles.DownButtonView}>
                                <TouchableOpacity onPress={this.goToParentPage.bind(this)}
                                                  style={[styles.DownButton, {width: 115,}]}>
                                    <Text>返回</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.hideTips.bind(this)}
                                                  style={[styles.DownButton, {width: 115, backgroundColor: '#1296db'}]}>
                                    <Text style={{color: 'white'}}>继续充值</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View/>
                }
                <LoadingInPage modalVisible={this.state.loading}/>
            </View>
        );//return
    }//render
}

let styles = StyleSheet.create({
    PagePayForStaffMaxView: {
        width: width,
        height: height,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    PagePayForStaffView: {
        width: width * 0.85,
        flexDirection: 'column',
        alignItems: 'center',
    },
    PagePayForStaffTitleView: {
        width: width * 0.9,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    PagePayForStaffContentView: {
        width: width * 0.9,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    PagePayForStaffEmptyView: {
        width: width,
        height: 10,
        backgroundColor: '#faf9f9'
    },
    PagePayForStaffEmptyLine: {
        width: width,
        height: 1 / ratio,
        backgroundColor: 'grey'
    },
    PagePayForStaffChongzhi: {
        width: width * 0.25,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1 / ratio,
        borderColor: '#1296db',
        borderRadius: 3
    },
    PagePayForStaffChongzhiView: {
        width: width * 0.85,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    PagePayForStaffButtonView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DabingChongzhiButtonOne: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        width: width * 0.35,
        height: 50
    },
    DabingChongzhiButtonTwo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008BE6',
        width: width * 0.65,
        height: 50
    },
    PageMessageMaxView: {
        width: width,
        flex: 1
    },
    DownButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 230,
        height: 40,
        marginTop: 10
    },
    DownButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalView: {
        position: 'absolute',
        width: width,
        height: height - 50,
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
        backgroundColor: 'white'
    },
});



















