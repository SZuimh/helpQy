/**
 * 这个是奖励的列表项
 */

import{
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import React,{ Component } from 'react';
import UploadFile from '../utils/uploadFile';
import {UrlGetPayMessage} from '../utils/url';
let {width,height}=Dimensions.get('window');

import  EmployeePlansFromZhuyeItemAndroid from  './AndroidStyle/EmployeePlansFromZhuyeItemAndroid';
import  EmployeePlansFromZhuyeItemiOS  from  './iOSStyle/EmployeePlansFromZhuyeItemiOS';
let styles=null;
if (Platform.OS==='android') {
    styles=EmployeePlansFromZhuyeItemAndroid;

}else{
    styles=EmployeePlansFromZhuyeItemiOS;
}

export default class EmployeePlansFromZhuyeItem extends Component{
    constructor(props){
        super(props);
        this.state={
            plansName:"",
            staffall:this.props.row.staffall,
            average:this.props.row.average,
            FirstPay:true

        }

    }
    componentDidMount(){
        this.setState({
            plansName:this.getPlansName(this.props.row.helptype)
        })
    }
    getPlansName(type){
        if(type=='employee')
            return '企业员工综合意外互助'
        else if(type=='staff')
            return '企业员工大病互助'
        else
            return '类型错误'
    }
    goPageMyStaff(type){

        if (type=='employee'){
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaffHarmFromZhuye',
                {
                    helpType:this.props.row.helptype,
                    useruuid:this.props.navigation.state.params.useruuid,
                    token:this.props.navigation.state.params.token,
                    payMoneyCallBack:this.props.payMoneyCallBack,
                    PageZhuYeKey:this.props.PageZhuYeKey,
                    HelpTypeMessage:this.props.row
                })
        }else {
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaffFromZhuye',
                {
                    helpType:this.props.row.helptype,
                    useruuid:this.props.navigation.state.params.useruuid,
                    token:this.props.navigation.state.params.token,
                    payMoneyCallBack:this.props.payMoneyCallBack,
                    PageZhuYeKey:this.props.PageZhuYeKey,
                    HelpTypeMessage:this.props.row
                })
        }
    }
    getPayMessage=()=>{

    }
    goPageShare(){
        //分享页面 员工点击加入

        this.props.navigation.navigate('PageShare',{useruuid:this.props.row.useruuid,
            helptype:this.props.row.helptype})
    }

    goPagePayForStaff(){
        let formDataTemp = new FormData();
        formDataTemp.append("useruuid", this.props.navigation.state.params.useruuid);
        formDataTemp.append("helptype", this.props.row.helptype);
        let option = {
            url: UrlGetPayMessage,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {
            setTimeout(()=>{
                let FirstPay= resp.retcode==2000?true:false;

                this.props.navigation.navigate('PagePayForStaffFromZhuye',{HelpTypeMessage:this.props.row,
                    payMoneyCallBack:this.props.payMoneyCallBack,
                    FirstPay:FirstPay,//是否是首次充值
                    PageZhuYeKey:this.props.PageZhuYeKey,
                })

            },500)
        })
    }

    render(){
        return(
            <View style={styles.PageWoMyEmployeeView}>
                <View style={styles.PageWoMyEmployeeViewContent}>
                    <TouchableOpacity style={styles.PlansFontView} onPress={this.goPageMyStaff.bind(this,this.props.row.helptype)}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'#008BE6'}}>{this.state.plansName}</Text>
                    </TouchableOpacity>
                    <View style={styles.PlansNumberAndMoney}>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>参与人数(人)</Text>
                        <Text style={{fontSize:14,}}>{this.state.staffall}</Text>
                        <TouchableOpacity style={styles.PageWoMyEmployeeButton} onPress={this.goPageShare.bind(this)}>
                            <Text style={{fontSize:11,color:'#ffffff'}}>邀请</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PlansNumberAndMoney}>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>人均余额(元)</Text>
                        <Text style={{fontSize:14,}}>{this.state.average}</Text>
                        <TouchableOpacity style={styles.PageWoMyEmployeeButton} onPress={this.goPagePayForStaff.bind(this)}>
                            <Text style={{fontSize:11,color:'#ffffff'}}>充值</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.row.needtips=='yes'?<Text style={{fontSize:8,color:'red'}}>小提示，人均余额不足，为保证正常运行请及时充值</Text>:<Text/>}

                </View>
            </View>
        );
    }
}
















