/**
 * 这个是奖励的列表项
 */

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import React, {Component} from 'react';
import UploadFile from '../utils/uploadFile';
import {UrlGetPayMessage} from '../utils/url';

import  EmployeePlansItemAndroid from  './AndroidStyle/EmployeePlansItemAndroid';
import  EmployeePlansItemiOS  from  './iOSStyle/EmployeePlansItemiOS';
let styles=null;
if (Platform.OS==='android') {
    styles=EmployeePlansItemAndroid;

}else{
    styles=EmployeePlansItemiOS;
}

let {width, height} = Dimensions.get('window');

export default class EmployeePlansItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plansName: "",
            staffall: this.props.row.staffall,
            average: this.props.row.average,
            FirstPay: true

        }

    }

    componentDidMount() {
        this.setState({
            plansName: this.getPlansName(this.props.row.helptype)
        })
    }

    getPlansName(type) {
        if (type == 'employee')
            return '企业员工综合意外互助'
        else if (type == 'staff')
            return '企业员工大病互助'
        else
            return '类型错误'
    }

    goPageMyStaff(type) {

        if (type == 'employee') {
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaffHarm',
                {
                    helpType: this.props.row.helptype,
                    useruuid: this.props.navigation.state.params.useruuid,
                    token: this.props.navigation.state.params.token,
                    payMoneyCallBack: this.props.payMoneyCallBack,
                    HelpTypeMessage: this.props.row,
                    PageMyEmployeeKey: this.props.navigation.state.key
                })
        } else {
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaff',
                {
                    helpType: this.props.row.helptype,
                    useruuid: this.props.navigation.state.params.useruuid,
                    token: this.props.navigation.state.params.token,
                    payMoneyCallBack: this.props.payMoneyCallBack,
                    HelpTypeMessage: this.props.row,
                    PageMyEmployeeKey: this.props.navigation.state.key
                })
        }
    }

    getPayMessage = () => {

    }

    goPageShare() {
        //分享页面 员工点击加入

        this.props.navigation.navigate('PageShareFromWo', {
            useruuid: this.props.row.useruuid,
            helptype: this.props.row.helptype
        })
    }

    goPagePayForStaff() {
        //充值
        let formDataTemp = new FormData();
        formDataTemp.append("useruuid", this.props.navigation.state.params.useruuid);
        formDataTemp.append("helptype", this.props.row.helptype);
        let option = {
            url: UrlGetPayMessage,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {
                let FirstPay = resp.retcode == 2000 ? true : false;
                this.props.navigation.navigate('PagePayForStaff', {
                    HelpTypeMessage: this.props.row,
                    payMoneyCallBack: this.props.payMoneyCallBack,
                    FirstPay: FirstPay,//是否是首次充值
                })

        })


    }

    render() {
        return (
            <View style={styles.PageWoMyEmployeeView}>
                <View style={styles.PageWoMyEmployeeViewContent}>
                    <TouchableOpacity style={styles.PlansFontView}
                                      onPress={this.goPageMyStaff.bind(this, this.props.row.helptype)}>
                        <Text style={styles.PlansName}>{this.state.plansName}</Text>
                    </TouchableOpacity>
                    <View style={styles.PlansNumberAndMoney}>
                        <Text style={styles.JoinNumber}>参与人数(人)</Text>
                        <Text style={{fontSize: 14,}}>{this.state.staffall}</Text>
                        <TouchableOpacity style={styles.PageWoMyEmployeeButton} onPress={this.goPageShare.bind(this)}>
                            <Text style={{fontSize: 11, color: '#ffffff'}}>邀请</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PlansNumberAndMoney}>
                        <Text style={styles.JoinNumber}>人均余额(元)</Text>
                        <Text style={{fontSize: 14,}}>{this.state.average}</Text>
                        <TouchableOpacity style={styles.PageWoMyEmployeeButton}
                                          onPress={this.goPagePayForStaff.bind(this)}>
                            <Text style={{fontSize: 11, color: '#ffffff'}}>充值</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.row.needtips == 'yes' ?
                        <Text style={{fontSize: 8, color: 'red'}}>小提示，人均余额不足，为保证正常运行请及时充值</Text> : <Text/>}

                </View>
            </View>
        );
    }
}

















