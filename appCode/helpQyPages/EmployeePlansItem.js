/**
 * 这个是奖励的列表项
 */

import{
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import React,{ Component } from 'react';
let {width,height}=Dimensions.get('window');

export default class EmployeePlansItem extends Component{
    constructor(props){
        super(props);
        this.state={
            plansName:"",
            staffall:this.props.row.staffall,
            average:this.props.row.average

        }

    }
    componentDidMount(){
        this.setState({
            plansName:this.getPlansName(this.props.row.helptype)
        })
    }
    getPlansName(type){
        if(type=='employee')
            return '企业员工意外互助'
        else if(type=='staff')
            return '企业员工大病互助'
        else
            return '类型错误'
    }
    goPageMyStaff(type){
        if (type=='employee'){
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaffHarm',
                {
                    helpType:this.props.row.helptype,
                    useruuid:this.props.navigation.state.params.useruuid,
                    token:this.props.navigation.state.params.token,
                    payMoneyCallBack:this.props.payMoneyCallBack
                })
        }else {
            //跳转到我的员工对应计划的界面
            this.props.navigation.navigate('PageMyStaff',
                {
                    helpType:this.props.row.helptype,
                    useruuid:this.props.navigation.state.params.useruuid,
                    token:this.props.navigation.state.params.token,
                    payMoneyCallBack:this.props.payMoneyCallBack
                })
        }

    }
    goPageShare(){
        //分享页面 员工点击加入

        this.props.navigation.navigate('PageShare',{useruuid:this.props.row.useruuid,
            helptype:this.props.row.helptype})
    }

    goPagePayForStaff(){
        //充值
        this.props.navigation.navigate('PagePayForStaff',{HelpTypeMessage:this.props.row,payMoneyCallBack:this.props.payMoneyCallBack})
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

let styles=StyleSheet.create({
    PageWoMyEmployeeView:{
        width:width,
        height:150,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:15,
        marginBottom:5
    },
    PageWoMyEmployeeViewContent:{
        width:width-30,
        height:150,
        flexDirection:'column',
        alignItems:'center'
    },
    PlansFontView:{
        width:width-30,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    PlansNumberAndMoney:{
        width:width-50,
        height:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15,
    },
    PageWoMyEmployeeButton:{
        width:45,
        height:25,
        backgroundColor:'#1296db',
        borderRadius:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
});















