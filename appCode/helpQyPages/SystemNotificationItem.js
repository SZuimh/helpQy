/**
 * 这个是奖励的列表项
 */

import {
    StyleSheet,
    Text,
    Image,
    Navigator,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
export default class SystemNotificationItem extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            notifytime:this.getTime(this.props.row.notifytime)
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {

    }
    getTime(publictime){
        let date = new Date(publictime);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate()+' ';
        if (D>=0 && D<=9) {
            D="0"+D;
            let finalDate=Y+M+D;
            return finalDate;
        }
    }
    render() {
        return (
            <View style={styles.NotificationMaxView}>
                <View style={styles.NotificationView}>
                    <View style={styles.NotificationContentView}>
                        <View style={styles.NotificationImageView}>
                            <Image source={require('./img/laba.png')}/>
                        </View>
                        <View style={styles.NotificationTypeAndDate}>
                            <Text style={{fontSize:14,color:'#3a3a3a',fontWeight:'bold'}}>{this.props.row.msgtype}系统消息</Text>
                            <Text style={{fontSize:12,color:'#4a4a4a'}}>{this.state.notifytime}</Text>
                        </View>
                    </View>
                    <View style={styles.NotificationContent}>
                        <View style={{width:width*0.15}}></View>
                        <Text style={{fontSize:12,color:'#4a4a4a'}}>{this.props.row.message}</Text>
                    </View>
                </View>
                <View style={{width:width*0.9,borderBottomWidth:1/ratio,borderColor: '#ccc',}}></View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    NotificationMaxView: {
        width: width*0.9,
        flexDirection: 'column',
        alignItems: 'center',

    },
    NotificationView: {
        width: width * 0.9,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom:10,
    },
    NotificationImageView: {
        width: width * 0.15,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    NotificationContentView: {
        width: width * 0.9,
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    NotificationTypeAndDate: {
        width: width * 0.75,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    NotificationContent: {
        width: width * 0.75,
        // height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },


});















