import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
    PixelRatio
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
import {UrlDelAStaff} from '../utils/url';
import UploadFile from '../utils/uploadFile';
export default class MyStaffJoinedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingTime:180-this.getLagTime(this.props.row.joindate),
            tipsModal:false,
            failSucessTips:'' , //对不起，充值失败 或恭喜你，充值成功
            failSucessImage:require('./img/joinFail.png'),
            respMessage:null,
            retcode:2001,
        }

    }


    getLagTime(joindate) {
        let dateNow = new Date();
        let joinDate=new Date(joindate);
        let lagTime=dateNow.getTime()-joinDate.getTime();
        let lagTimeInt=Math.floor(lagTime/(24*3600*1000));
        return lagTimeInt;
    } //获取时间差


    deleteJoinedItem() {

        let {deleteJoinedItemCallBack, changeLoading_calBack} =this.props;

        changeLoading_calBack(true)

        let formDataTemp=new FormData();
        //发送删除某一特定员工的请求
        formDataTemp.append("token", this.props.userToken);
        formDataTemp.append("uuid", this.props.row.useruuid);
        formDataTemp.append("helptype", this.props.row.helptype);
        formDataTemp.append("account", this.props.row.account);
        let option = {
            url: UrlDelAStaff,
            body: formDataTemp
        };

        let responseR = UploadFile(option);
        responseR.then(resp => {
            changeLoading_calBack(false)

            if(typeof(resp)=="undefined"){
                return
            }
            if (resp.retcode==2000){
                deleteJoinedItemCallBack(this.props.row.staffid);
                let payMoneyCallBack=this.props.payMoneyCallBack; //删除员工之后的  重新拉去 两个计划数据的回调函数
                payMoneyCallBack();
            }
        }).catch(err => {
            changeLoading_calBack(false)
            this.setState({
                tipsModal:true,
                failSucessTips:"",
                failSucessImage:require('./img/joinFail.png'),
                respMessage:"删除失败",
            })
        });
    }

    render() {
        return (
            <View>
                <View style={styles.WaitingItemView}>
                    <View style={styles.PageMyStaffPeopleMessage}>
                        <Text>{this.props.row.staffname}</Text>
                    </View>
                    <View style={[styles.PageMyStaffPeopleMessage,{width:width*0.5}]}>
                        <Text>{this.props.row.account}</Text>
                    </View>
                    <View style={styles.PageMyStaffPeopleMessage}>
                        <Text>{this.state.waitingTime}</Text>
                    </View>
                    <TouchableOpacity onPress={this.deleteJoinedItem.bind(this)}>
                        <Image source={require('./img/deleteIcon.png')} style={{width: 15, height: 20}}/>
                    </TouchableOpacity>
                </View>
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
const styles = StyleSheet.create({
    WaitingItemView: {
        width: width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    PageMyStaffTitle: {},
    PageMyStaffPeopleMessage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.2,
        height: 40
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
})
