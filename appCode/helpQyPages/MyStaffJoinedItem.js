import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
import {UrlDelAStaff} from '../utils/url';
import UploadFile from '../utils/uploadFile';
export default class MyStaffJoinedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingTime:180-this.getLagTime(this.props.row.joindate),
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
            Alert.alert(
                    '删除失败',
                    '',
                    [
                        {
                            text: '好的'
                        }
                    ]
            );
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
})
