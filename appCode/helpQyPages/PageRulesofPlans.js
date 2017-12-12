/**
 * 暂时为修改密码、清除缓存、上传公司log等
 *
 */
import {
    StyleSheet,
    Text,
    Image,
    View,
    PixelRatio,
    Platform,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import React, {Component} from 'react';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default class PageRulesofPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View>
                <View style={styles.ModalWrapper}>

                    <View style={styles.huoDongRule}>
                        <Text style={{fontSize:18,color:'#4a4a4a',fontWeight:'bold'}}>活动规则</Text>
                    </View>
                    <View style={styles.contentView}>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.txt}>1、每邀请一名新用户加入，可获得5元奖励；</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.txt}>2、邀请的奖励金额可用于充值，不得提现；</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text
                                style={styles.txt}>3、被邀请人加入时的邮箱、手机号、或支付账号、或微信号若与任一曾经加入过计划的会员相同，平台不视为首次加入，不给予邀请人奖励；</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.txt}>4、若发现骗取奖励行为，葡萄互助有权取消；</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.txt}>5、葡萄互助保留对此活动的最终解释权；</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    huoDongRule:{
        width:width,
        height:30,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    },
    txtWrapper:{
        width:width*0.8,
        marginTop:20,
    },
    contentView:{
        width:width,
        flexDirection:'column',
        alignItems:'center',
        marginTop:30
    },
    txt:{
        color:'#4a4a4a',
        fontSize:14,
        lineHeight:20
    },
});