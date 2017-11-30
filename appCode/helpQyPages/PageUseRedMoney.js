
//使用红包，
import{
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    AsyncStorage,
    Image,
    TextInput,
    Alert
} from 'react-native';
import React,{Component} from 'react';
import { NativeModules } from 'react-native';
var Alipay=NativeModules.Alipay;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ratio = PixelRatio.get();
import fetchTool from '../utils/fetchTool';
import {UrluseMyRedMoney,UrlalipayOrder} from '../utils/url';
import UploadFile from '../utils/uploadFile'
import LoadingInPage from "../loading/LoadingInPage";
export default class PageUseRedMoney extends  Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            amount:0,
            useruuid:'',
            userName:'', //对应useruuid
            helptype:'',
            accountUUID:'',
            name:'', //被充值用户
            checked:0,     //选中
            aveNumber:0,
            loading:false,
            tipsModal:false, //控制弹出框
            failSucessTips:null , //对不起，充值失败 或恭喜你，充值成功
            failSucessImage:require('./img/joinFail.png'),
            respMessage:null,
            retcode:2001, //只有支付宝充值返回成功后，才执行回调
        };
    }

    componentDidMount(){
        const {changeMoneyStatusCallBack}= this.props.navigation.state.params;
        this.setState({
            redmoneyuuid:this.props.navigation.state.params.RedMoney.redmoneyuuid
        })

        AsyncStorage.multiGet(["token","useruuid","usernickname"],(erros,result)=>{
            this.setState({
                token:result[0][1],
                useruuid:result[1][1],
                userName:result[2][1]
            })
        });

    }
    changeMoney(moneyNumber){
        this.setState({
            checked:moneyNumber,
            amount:moneyNumber-5,
        })
    }
    changePlans(plan){
        this.setState({
            helptype:plan
        })  //根据state中计划的不同 对应计划的选择框背景颜色会发生变化
    }

    handleIDChange(event){
        this.setState({
            accountUUID:event.nativeEvent.text
        });
    }
    handleNickNameChange(event){
        this.setState({
            name:event.nativeEvent.text
        });
    }
    goToParentPage(){
        //直接返回就行
        const {changeMoneyStatusCallBack}= this.props.navigation.state.params;
        changeMoneyStatusCallBack();
        this.props.navigation.goBack();

    }
    hideTips(){
        this.setState({
            tipsModal:false
        })
    }

    goPay(){
        if(this.state.accountUUID==null||this.state.accountUUID==''||this.state.accountUUID.length!=18){
            return Alert.alert(
                '格式错误',
                '请检查身份证格式',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if(this.state.name==null||this.state.name==''){
            return Alert.alert(
                '格式错误',
                '请检查姓名格式',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }
        if(this.state.helptype==null||this.state.helptype==''){
            return Alert.alert(
                '格式错误',
                '请检查您选择的计划',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }

        if(this.state.checked==null||this.state.checked==''){
            return Alert.alert(
                '格式错误',
                '请检查您选择的金额',
                [
                    {
                        text: '好的'
                    }
                ]
            );
        }

        if(this.state.checked==5){
            // 调用使用红包的接口
            let formData=new FormData();
            formData.append("token", this.state.token);
            formData.append("useruuid", this.state.useruuid);
            formData.append("userName", this.state.userName);
            formData.append("redmoneyuuid", this.state.redmoneyuuid);
            formData.append("account", this.state.accountUUID);
            formData.append("name", this.state.name);
            formData.append("categorytype", this.state.helptype);
            let option = {
                url: UrluseMyRedMoney,
                body: formData
            };
            let responseR = UploadFile(option);
            responseR.then(resp => {
                this.setState({
                    modalVisible:false
                })
                if(typeof(resp)=="undefined"){
                    //弹出框
                    this.setState({
                        tipsModal:true,
                        failSucessTips:"对不起，使用失败",
                        failSucessImage:require('./img/joinFail.png'),
                        respMessage:"服务返回异常，你联网了吗",
                        retcode:2003
                    })
                    return ;
                }
                if (resp.retcode === 2000) {
                    this.setState({
                        tipsModal:true,
                        failSucessTips:"恭喜你，使用成功",
                        failSucessImage:require('./img/joinSuccess.png'),
                        respMessage:null,
                        retcode:9000
                    })

                    const {changeMoneyStatusCallBack}= this.props.navigation.state.params;
                    changeMoneyStatusCallBack();
                } else {
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
                    modalVisible:false
                });
            });
        }else if(this.state.checked >5) {
            let params={
                "token":this.state.token,
                "amount":0.01,
                // "amount":this.state.amount,   //PayTest
                "userUUID":this.state.useruuid, //对于公司充值来说是固定值company
                "categoryType":this.state.helptype,
                "userName":this.state.userName, //公司充值用不到此字段，
                "accountUUID":this.state.accountUUID,
                "payType":"red",
                "accountName":this.state.name,

        }
            if(this.state.amount==0 ||this.state.amount=='0'){
                return ;
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

                if(typeof(resp)=="undefined"){
                    //弹出框
                    this.setState({
                        tipsModal:true,
                        failSucessTips:"对不起，充值失败",
                        failSucessImage:require('./img/joinFail.png'),
                        respMessage:"服务返回异常，你联网了吗",
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
                    loading: false,
                    tipsModal:true,
                    failSucessTips:"对不起，充值失败",
                    failSucessImage:require('./img/joinFail.png'),
                    respMessage:null,
                    retcode:2003
                })
            });

            //使用红包
            let formData=new FormData();
            formData.append("token", this.state.token);
            formData.append("useruuid", this.state.useruuid);
            formData.append("userName", this.state.userName);
            formData.append("redmoneyuuid", this.state.redmoneyuuid);
            formData.append("account", this.state.accountUUID);
            formData.append("name", this.state.name);
            formData.append("categorytype", this.state.helptype);
            let option = {
                url: UrluseMyRedMoney,
                body: formData
            };
            let responseR = UploadFile(option);
            responseR.then(resp => {
                this.setState({
                    modalVisible:false
                })
                if (resp.retcode === 2000) {


                } else {

                }
            }).catch(err => {
                this.setState({
                    modalVisible:false
                });
            });
        }

    }

    render(){
        let backgroundColor1=this.state.checked==5?'#5EB5ED':'white';
        let backgroundColor2=this.state.checked==30?'#5EB5ED':'white';
        let backgroundColor3=this.state.checked==50?'#5EB5ED':'white';
        let backgroundColor4=this.state.checked==100?'#5EB5ED':'white';
        let backgroundColor5=this.state.checked==300?'#5EB5ED':'white';
        let backgroundColor6=this.state.checked==500?'#5EB5ED':'white';
        let backgroundColor7=this.state.helptype=='little'?'#5EB5ED':'white';
        let backgroundColor8=this.state.helptype=='young'?'#5EB5ED':'white';
        let backgroundColor9=this.state.helptype=='old'?'#5EB5ED':'white';
        let backgroundColor10=this.state.helptype=='zonghe'?'#5EB5ED':'white';
        let color1=this.state.checked==5?'#ffffff':'#5EB5ED';
        let color2=this.state.checked==30?'#ffffff':'#5EB5ED';
        let color3=this.state.checked==50?'#ffffff':'#5EB5ED';
        let color4=this.state.checked==100?'#ffffff':'#5EB5ED';
        let color5=this.state.checked==300?'#ffffff':'#5EB5ED';
        let color6=this.state.checked==500?'#ffffff':'#5EB5ED';
        return(
            <View style={styles.PagePayForStaffMaxView}>
                <View style={styles.PagePayForStaffView}>
                    <View style={styles.inputWrap}>
                        {/*<Text>身份证</Text>*/}
                        <TextInput
                            style={styles.passwordinput}
                            placeholder='输入被保障人的姓名'
                            keyboardType='email-address'
                            maxLength={30}
                            ref='default'
                            autoCapitalize='none'
                            clearButtonMode='always'
                            clearTextOnFocus={false}
                            autoCorrect={false}
                            onChange={this.handleNickNameChange.bind(this)}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        {/*<Text>身份证</Text>*/}
                        <TextInput
                            style={styles.passwordinput}
                            placeholder='输入被保障人的身份证号'
                            keyboardType='default'
                            maxLength={30}
                            ref='refemail'
                            autoCapitalize='none'
                            clearButtonMode='always'
                            clearTextOnFocus={false}
                            autoCorrect={false}
                            onChange={this.handleIDChange.bind(this)}
                        />
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>选择互助计划</Text>
                    </View>
                    <View style={styles.PageUseRedMoneyPlansView}>
                        <TouchableOpacity style={styles.PageUseRedMoneyChoice} onPress={this.changePlans.bind(this,'little')}>
                            <View style={[styles.PageUseRedMoneyChoiceView,{backgroundColor:backgroundColor7}]}></View>
                            <Text style={{fontSize:15,color:'#4a4a4a',marginLeft:5}}>少儿互助计划</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.PageUseRedMoneyChoice} onPress={()=>{this.changePlans('young',this)}}>
                            <View style={[styles.PageUseRedMoneyChoiceView,{backgroundColor:backgroundColor8}]}></View>
                            <Text style={{fontSize:15,color:'#4a4a4a',marginLeft:5}}>中青年互助计划</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.PageUseRedMoneyChoice} onPress={()=>{this.changePlans('old',this)}}>
                            <View style={[styles.PageUseRedMoneyChoiceView,{backgroundColor:backgroundColor9}]}></View>
                            <Text style={{fontSize:15,color:'#4a4a4a',marginLeft:5}}>中老年互助计划</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.PageUseRedMoneyChoice}  onPress={()=>{this.changePlans('zonghe',this)}}>
                            <View style={[styles.PageUseRedMoneyChoiceView,{backgroundColor:backgroundColor10}]}></View>
                            <Text style={{fontSize:15,color:'#4a4a4a',marginLeft:5}}>综合意外互助</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.PagePayForStaffEmptyView}></View>
                    <View style={styles.PagePayForStaffContentView}>
                        <Text style={{fontSize:15,color:'#4a4a4a',fontWeight:'bold'}}>选择人均充值金额</Text>
                    </View>
                    <View style={styles.PagePayForStaffEmptyLine}></View>
                    <View style={styles.PagePayForStaffChongzhiView}>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor1}]}
                                          onPress={()=>{this.changeMoney(5,this)}}>
                            <Text style={{color:color1}}>5元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor2}]}
                                          onPress={()=>{this.changeMoney(30,this)}}>
                            <Text style={{color:color2}}>30元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor3}]}
                                          onPress={()=>{this.changeMoney(50,this)}}>
                            <Text style={{color:color3}}>50元</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PagePayForStaffChongzhiView}>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor4}]}
                                          onPress={()=>{this.changeMoney(100,this)}}>
                            <Text style={{color:color4}}>100元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor5}]}
                                          onPress={()=>{this.changeMoney(300,this)}}>
                            <Text style={{color:color5}}>300元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.PagePayForStaffChongzhi,{backgroundColor:backgroundColor6}]}
                                          onPress={()=>{this.changeMoney(500,this)}}>
                            <Text style={{color:color6}}>500元</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.PagePayForStaffButtonView}>
                    <TouchableOpacity style={styles.DabingChongzhiButtonOne}>
                        <Text style={{color: '#4A4A4A'}}>共计{this.state.amount}元</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DabingChongzhiButtonTwo} onPress={()=>{this.goPay(this)}}>
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
                            <Image source={this.state.failSucessImage} resizeMode={'contain'}   style={{width: 120, height: 90, marginTop: 10}}/>
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
        );
    }
}

let styles=StyleSheet.create({
    PagePayForStaffMaxView:{
        width:width,
        height:height,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#ffffff'
    },
    PagePayForStaffView:{
        width:width*0.85,
        flexDirection:'column',
        alignItems:'center',
    },
    PagePayForStaffTitleView:{
        width:width*0.9,
        height:70,
        flexDirection:'row',
        alignItems:'center'
    },
    PagePayForStaffContentView:{
        width:width*0.9,
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    PagePayForStaffEmptyView:{
        width:width,
        height:10,
        backgroundColor:'#faf9f9'
    },
    PagePayForStaffEmptyLine:{
        width:width,
        height:1/ratio,
        backgroundColor:'grey'
    },
    PagePayForStaffChongzhi:{
        width:width*0.25,
        height:58,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1/ratio,
        borderColor:'#D8D8D8',
        borderRadius:3
    },
    PagePayForStaffChongzhiView:{
        width:width*0.85,
        height:58,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    },
    PagePayForStaffChongzhiView2:{
        width:width*0.6,
        height:58,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
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
    inputWrap: {
        flexDirection:'row',
        borderBottomColor:'#CCCCCC',
        backgroundColor:'#FFFFFF',
        height: 40,
        justifyContent: 'center',
        borderBottomWidth:1/ratio,
        alignItems:'center',
        marginTop:15
    },
    passwordinput:{
        height: 40,
        width: width*0.8,
        fontSize: 12,
        paddingLeft: 10,
        textAlign:'center'
    },
    PageUseRedMoneyPlansView:{
        width:width*0.5,
        flexDirection:'column',
        alignItems:'center'
    },
    PageUseRedMoneyChoiceView:{
        width:10,
        height:10,
        borderRadius:5,
        borderWidth:1/ratio,
    },
    PageUseRedMoneyChoice:{
        width:width*0.4,
        height:30,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:width*0.05
    },
    DownButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:230,
        height:40,
        marginTop:10
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
        backgroundColor: 'white'
    },
});


















