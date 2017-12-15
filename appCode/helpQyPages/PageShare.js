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

import WeChat from 'react-native-wechat-android';  //android 平台微信
let appId = 'wxbdcf30c9232401a4';   // 微信的appid，
export default class PageShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useruuid:null,
            token:null,
            companyname:null,
        }
    }
    static navigationOptions = {
        title: '分享',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };
    componentDidMount() {
        AsyncStorage.multiGet(["token", "useruuid","companyname"], (errros, result) => {
            if (result[0][1] == null) {
                return
            }
            this.setState({
                token: result[0][1],
                useruuid: result[1][1],
                companyname:result[2][1],
            })
        })
    }
    getPlansName(helptype){
        if(helptype=='employee'){
            return '企业员工综合意外互助'
        }
        else if(helptype=='staff'){
            return '企业员工大病互助'
        }
    }
    _shareToWechatSession() { // 分享到微信会话

        WeChat.webShareWeXinWithScene(0, '葡萄互助', '【'+this.state.companyname+'】邀请您加入葡萄互助【'+this.getPlansName(this.props.navigation.state.params.helptype)+'】', 'http://oztdsemro.bkt.clouddn.com/putaohuzhu/grapelogo.png',
            'http://www.putaohuzhu.cn/glove/grape/staffjoin.do?useruuid='+this.state.useruuid+'&helptype='+this.props.navigation.state.params.helptype, (err, sendOK) => {
            this.props.navigation.navigate("PageWoMyEmployeeFromZhuye",{
                useruuid:this.state.useruuid,
                token:this.state.token,
                PageZhuYeKey:this.props.navigation.state.params.PageZhuYeKey,
            })
        })
    }

    render() {
        return (
            <View style={styles.PageShareMaxView}>
                <Text style={[styles.PageShareText,{marginTop:50}]}>点击下面的链接，分享给指定的员工微信或员工微信群</Text>
                <Text style={styles.PageShareText}>员工点击链接，并填写个人信息，即可加入计划</Text>
                <Text style={[styles.PageShareText,{marginTop:230}]}>分享到</Text>
                <View style={styles.PggeShareEmptyView}></View>

                <TouchableOpacity  onPress={this._shareToWechatSession.bind(this)}          style={styles.PageShareChoices}>
                    <Image style={styles.PageShareImage} source={require('./img/weixin.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}


let styles = StyleSheet.create({
    PageShareMaxView: {
        width: width,
        height: height,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    PageShareText:{
        fontSize:13,
        marginTop:15,
        color:'#4c4c4c',
    },
    PggeShareEmptyView:{
        width:width*0.9,
        height:1/ratio,
        backgroundColor:'#4c4c4c',
        marginTop:20
    },
    PageShareChoices:{
        marginTop:35,
        width:width,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    PageShareImage:{
        width:50,
        height:50
    },
});