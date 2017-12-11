/**
 * 提供加入计划页面，要请求网络展现共有多少人加入，显示loading
 *
 */
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    Alert,
    FlatList,
    Image,
    AsyncStorage,
} from 'react-native';
import React, {Component} from 'react';
import {UrlGetOrderSet} from "../utils/url";
import fetchTool from '../utils/fetchTool';
import PageJoinInItem from './PageJoinInItem';

import {NativeModules} from 'react-native';

var Alipay = NativeModules.Alipay;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
import LoadingInPage from '../loading/LoadingInPage'

export default class PageJoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: true,
            token:'',
            useruuid:'',
            dataSource: [{number: 0, nickName: '', IDCard: '', moneyNumber: ''}],
            tipsModal:false, //控制弹出框
            failSucessTips:null , //对不起，充值失败 或恭喜你，充值成功
            failSucessImage:require('./img/joinFail.png'),
            respMessage:null,
            retcode:2001, //只有支付宝充值返回成功后，才执行回调
        };
    }

    componentDidMount() {
        AsyncStorage.multiGet(["token","useruuid" ], (errros, result) => {
            if(result[0][1]==null){
                return
            }
            this.setState({
                token:result[0][1],
                useruuid:result[1][1]
            })
        })

    }
    addEmployee_callBack = (addEmployeeNumber) => {
        //添加一位家人的 回调函数
        let tempData = this.state.dataSource;
        tempData.push({number: addEmployeeNumber, nickName: '', IDCard: '', moneyNumber: ''})
        this.setState({
            dataSource: tempData
        })

    }
    deleteEmployee_callBack = (deleteEmployeeNumber) => {
        // 删除一位家人的  回调函数
        let tempData = this.state.dataSource;
        tempData.splice(deleteEmployeeNumber, 1); //开始删除的地方，删除的个数
        let tempDataSource = [];
        for (let i = 0; i < tempData.length; i++) {
            tempDataSource.push({
                number: i,
                nickName: tempData[i].nickName,
                IDCard: tempData[i].IDCard,
                moneyNumber: tempData[i].moneyNumber
            })
        }
        this.setState({
            dataSource: tempDataSource
        })
    }

    changeUserName_callBack = (number, nickName) => {
        //  更改某一个子组件的家人名称的  回调函数
        let tempData = this.state.dataSource;
        for (let i = 0; i < tempData.length; i++) {
            if (i == number) {
                tempData[i].nickName = nickName;
                break
            }
        }
        this.setState({
            dataSource: tempData
        })
    }
    changeIDcard_callBack = (number, IDCard) => {
        //  更改某一个子组件的家人身份证号的  回调函数
        let tempData = this.state.dataSource;
        for (let i = 0; i < tempData.length; i++) {
            if (i == number) {
                tempData[i].IDCard = IDCard;
                break;
            }
        }
        this.setState({
            dataSource: tempData
        })
    }
    changeMoneyNumber_callBack = (number, moneyNumber) => {
        //更改子组件的 钱数的 回调函数
        let tempData = this.state.dataSource;
        for (let i = 0; i < tempData.length; i++) {
            if (i == number) {
                tempData[i].moneyNumber = moneyNumber;
                break
            }
        }
        this.setState({
            dataSource: tempData
        })
    }


    goChongZhi() {
        //  空值验证 和格式验证
        var dataSource = this.state.dataSource;

        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].nickName == null || dataSource[i].nickName == '') {
                return Alert.alert(
                    '格式错误',
                    '请检查所有家人的姓名',
                    [{
                        text: '好的'
                    }]
                )
            }
            if (dataSource[i].IDCard == null || dataSource[i].IDCard.length != 18) {
                return Alert.alert(
                    '格式错误',
                    '请检查所有家人的身份证号',
                    [{
                        text: '好的'
                    }]
                )
            }
            if (dataSource[i].moneyNumber == null || dataSource[i].moneyNumber == '') {
                return Alert.alert(
                    '格式错误',
                    '请检查所有家人的充值金额',
                    [{
                        text: '好的'
                    }]
                )
            }
        }    //发送请求之前，需要添加验证
        //发送请求的时候，添加loading动画
        this.setState({
            modalVisible: true
        })
        let alipayorderuserlist = new Array();
        for (let i = 0; i < dataSource.length; i++) {
            alipayorderuserlist.push({
                "username": dataSource[i].nickName,
                "accountuuid": dataSource[i].IDCard,
                "money": dataSource[i].moneyNumber
                // "money": 0.01    //PayTest
            })
        }
        let alipayOrderSetParam = {};
        alipayOrderSetParam.token = this.state.token;
        alipayOrderSetParam.useruuid = this.state.useruuid;
        alipayOrderSetParam.categorytype = this.props.navigation.state.params.categorytype;
        alipayOrderSetParam.alipayorderuserlist = alipayorderuserlist;
        let options = {
            url: UrlGetOrderSet,
            body: JSON.stringify(alipayOrderSetParam)
        };
        let response = fetchTool(options);
        response.then(resp => {
            console.log(resp)
            this.setState({
                modalVisible:false
            })
            if(typeof(resp)=="undefined"){
                //弹出框
                this.setState({
                    tipsModal:true,
                    failSucessTips:"对不起，充值失败",
                    failSucessImage:require('./img/joinFail.png'),
                    respMessage:"服务返回异常，十大打死阿萨德",
                    retcode:2003
                })
                return ;
            }

            if (resp.retcode===2000) {
                let oderStr=resp.oderStr; //这个是返回的加密的字符串

                Alipay.signedString(oderStr,(err,data)=>{

                    if (err.resultStatus=="9000"){
                        this.setState({
                            tipsModal:true,
                            failSucessTips:"恭喜你，充值成功",
                            failSucessImage:require('./img/joinSuccess.png'),
                            respMessage:null,
                            retcode:9000
                        })
                    }
                    else {
                        this.setState({
                            tipsModal:true,
                            failSucessTips:"对不起，充值失败",
                            failSucessImage:require('./img/joinFail.png'),
                            respMessage:null,
                            retcode:9001
                        })
                    }

                });

            }else{//弹出提示框
                this.setState({
                    tipsModal:true,
                    failSucessTips:"对不起，充值失败",
                    failSucessImage:require('./img/joinFail.png'),
                    respMessage:null,
                    retcode:9001
                })
            }

        }).catch(err => {
            this.setState({
                modalVisible: false,
                tipsModal:true,
                failSucessTips:"对不起，充值失败",
                failSucessImage:require('./img/joinFail.png'),
                respMessage:null,
                retcode:2003
            })
        });
    }

    uuid() {  //为keyExtractor产生一个uuid  用来标识id、
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    headerorfooterComponent() {
        return (
            <View style={styles.emptyView}>
            </View>
        )
    }
    hideTips(){
        this.setState({
            tipsModal:false
        })
    }
    goToParentPage(){
        //直接返回就行
        this.props.navigation.goBack(this.props.navigation.state.params.PageZhuYeKey)
    }
    _keyExtractor = (item, index) => item.number + this.uuid();

    _renderItem = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <PageJoinInItem
            key={item.number}
            row={item}
            length={this.state.dataSource.length}
            addEmployeeCallBack={this.addEmployee_callBack}
            deleteEmployeeCallBack={this.deleteEmployee_callBack}
            changeNickNameCallBack={this.changeUserName_callBack}
            changeIDCardCallBack={this.changeIDcard_callBack}
            changeMoneyNumberCallBack={this.changeMoneyNumber_callBack}
            {...this.props}
        />
    );
    render() {
        return (
            <View keyboardShouldPersistTaps={'always'} style={styles.PageJoinMaxView}>
                <FlatList
                    data={this.state.dataSource}
                    refreshing={true}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    initialNumToRender={7}
                    ListFooterComponent={() => this.headerorfooterComponent(2)}/>

                <TouchableOpacity style={[styles.DabingChongzhiButton,]} onPress={this.goChongZhi.bind(this)}>
                    <Text style={{color: 'white'}}>申请加入</Text>
                </TouchableOpacity>

                {this.state.tipsModal ?
                    <View style={styles.ModalView}>
                        <View style={styles.AlertView}>
                            <View style={{marginTop: 15}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.failSucessTips}</Text>
                            </View>
                            <Image source={this.state.failSucessImage} resizeMode={'contain'}   style={{width: 120, height: 90, marginTop: 10}}/>
                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 10}}>{this.state.respMessage}</Text>
                            </View>

                            <View style={styles.DownButtonView}>
                                <TouchableOpacity onPress={this.goToParentPage.bind(this)}
                                                  style={[styles.DownButton, {width: 115,}]}>
                                    <Text>返回浏览</Text>
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
                <LoadingInPage modalVisible={this.state.modalVisible}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    PageJoinMaxView:{
        width:width,
        height:height,
        flex:1
    },
    inputsWrap: {
        margin: 10,
        backgroundColor: '#fff',
        marginTop: 30
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 44,
        marginTop: 30
    },
    emailText: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },

    labelWrap: {
        height: 45,
        justifyContent: 'center',
        width: 60
    },

    chongzhiButton: {
        width: width * 0.9,
        height: 40,
        backgroundColor: '#1296db',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginwrap: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 46,
    },

    chongzhiButtonView: {
        justifyContent: 'center',
        marginTop: 50,
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    inputWrap: {
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        height: 45,
        justifyContent: 'center',
        borderBottomWidth: 1 / ratio,
    },
    passwordinput: {
        height: 45,
        width: width - 90,
        fontSize: 16,
        paddingLeft: 10,
    },
    selectPayMoneyWrapper: {
        position: 'absolute',

        left: 0,
        bottom: 0,
        height: 0.5 * height,
        backgroundColor: '#fff',
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 5
    },
    selectPayMoney: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1 / ratio,
    },
    tips: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    itemMoneyS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    itemMoney: {
        backgroundColor: '#EDEEEF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 60,
        flex: 1,
        marginTop: 3
    },
    moneySpecial: {
        marginLeft: 3,
        marginRight: 3
    },
    emptyView: {
        width: width,
        height: height / 10,
        backgroundColor: 'white'
    },
    DabingChongzhiButton: {
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
    DownButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:230,
        height:40,
        marginTop:10,
    },
    DownButton:{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ModalView: {
        position: 'absolute',
        width:width,
        height:height-50,
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
    },
});

















