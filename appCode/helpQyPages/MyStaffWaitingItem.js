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
let {width} = Dimensions.get('window');
import {UrlDelAStaff} from '../utils/url';
import UploadFile from '../utils/uploadFile';
export default class MyStaffWaitingItem extends Component {
    constructor(props) {
        super(props);

    }

    deleteWaitingItem() {
        let {deleteWaitItem_callBack, changeLoading_calBack} =this.props;

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
            if (resp.retcode==2000){
                deleteWaitItem_callBack(this.props.row.staffid)
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
                    <View style={[styles.PageMyStaffPeopleMessage,{width:width*0.35}]}>
                        <Text style={{fontSize:13}}>{this.props.row.staffname}</Text>
                    </View>
                    <View style={[styles.PageMyStaffPeopleMessage,{width:width*0.4}]}>
                        <Text style={{fontSize:11}}>{this.props.row.account}</Text>
                    </View>
                    <TouchableOpacity onPress={this.deleteWaitingItem.bind(this)} style={{width:width*0.25,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('./img/deleteIcon.png')} style={{width: 15, height: 20}}
                        />
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
    PageMyStaffTitle: {
    },
    PageMyStaffPeopleMessage:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:width*0.3,
        height:40
    },
})
