/**
 * 这个是发现页面适用于android
 */

import{
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    PixelRatio,
    Modal,
} from 'react-native';
import React,{Component} from 'react';
import RedMoneyList from './RedMoneyList'

import resolveAssetSource from 'resolveAssetSource';
import WeChat from 'react-native-wechat-android';  //android 平台微信
import * as QQ from 'react-native-qqsdk';   // android 平台QQ 分享
let appId = 'wx1909173dd86c99b2';   // 微信的appid，
var webpageOptions = {
    title: '分享这个网页给你',
    desc: '我发现这个网页很有趣，特意分享给你',
    thumbSize: 150,
    scene: 1,
    type: 3,
    webpageUrl: 'https://github.com/beefe/react-native-wechat-android',
    thumbImage: 'http://img1.imgtn.bdimg.com/it/u=3924416677,403957246&fm=21&gp=0.jpg',
};
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ratio = PixelRatio.get();

export default class PageFind extends  React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            transparent: false,
            animationType: 'slide',
            modalVisible: false,
        };
    }
    componentDidMount(){
        this._registerApp();
    }
    setModalVisible() {
        this.setState({
            modalVisible: true
        });
    }
    setModalHidden() {
        this.setState({
            modalVisible: false
        });
    }

    goPublicList(){
        this.props.navigation.navigate('PublicList');
    }
    goAwardList(){
        this.props.navigation.navigate('RedMoneyList');
    }
    goRedMoneyList(){
        this.props.navigation.navigate('RedMoneyList');
    }

    _shareToWechatSession(){ // 分享到微信会话
        WeChat.sendReq(webpageOptions,(err,sendOK) => {
            console.log(sendOK)
        });
    }
    _shareToWechatPengyouQuan(){ //分享到朋友圈
        webpageOptions.scene=0;
        WeChat.sendReq(webpageOptions,(err,sendOK) => {
            console.log(sendOK)
        });
    }
    _shareToqqSession(){ //分享到qq会话
        QQ.shareNews('https://facebook.github.io/react-native/',resolveAssetSource(require('./img/aboutus.png')).uri,'分享新闻标题','分享新闻描述',QQ.shareScene.QQ)
            .then((result)=>{console.log('result is', result)})
            .catch((error)=>{console.log('error is', error)});
    }
    _shareToqqzone(){ //分享到qqzone
        QQ.shareNews('https://facebook.github.io/react-native/',resolveAssetSource(require('./img/aboutus.png')).uri,'分享新闻标题','分享新闻描述',QQ.shareScene.QQZone)
            .then((result)=>{console.log('result is', result)})
            .catch((error)=>{console.log('error is', error)});
    }

    _registerApp(){
        WeChat.registerApp(appId,(err,registerOK) => {

        });
    }


    render(){
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };
        return(
            <View style={styles.container}>
                {/*公示*/}
                <View style={styles.publicContain}>
                    <View style={styles.publicLeft}>
                        <Image source={require('./img/faxianPublic.png')} resizeMode={'contain'} style={{height:30,width:30,}} />
                        <Text style={{marginLeft:8}}>互助人员公示</Text>
                    </View>
                    <View style={styles.publicRight}>
                        <Text onPress={this.goPublicList.bind(this)} style={{color:'#0093EC'}}>名单公示</Text>
                    </View>
                </View>
                {/*喊亲朋好友加入 <br/>*/}
                <View style={styles.inviteFriendContain}>
                    <View style={styles.inviteLeft}>
                        <Text style={{color:'#4c4c4b',marginBottom:10,fontSize:16}}>喊亲友来加入方舟互助</Text>
                        <Text style={styles.inviteTxt}>每邀请一人</Text>
                        <Text style={styles.inviteTxt}>即有5元奖励</Text>
                        <Text  onPress={this.goRedMoneyList.bind(this)} style={styles.myaward}>我的奖励>></Text>
                    </View>
                    <View style={styles.inviteRight}>
                        <Image source={require('./img/feiren.png')}  resizeMode={'contain'} style={{height:130,width:140}}/>
                    </View>
                </View>
                {/*邀请亲友加入方舟互助*/}
                <View style={styles.yaoqingContain}>
                    <View style={styles.yaoqingWrapper}>
                        <View style={styles.yaoqingView}>
                            <Text style={{color:'#fff'}}>邀请亲友加入</Text>
                        </View>
                    </View>
                    <View style={styles.pageBottom}>
                        <TouchableOpacity onPress={this._shareToWechatSession.bind(this)}>
                            <Image source={require('./img/weixin@2x.png')}resizeMode={'cover'} style={styles.weixin} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._shareToWechatPengyouQuan.bind(this)}>
                            <Image source={require('./img/pengyouquan@2x.png')}resizeMode={'contain'} style={styles.weixin} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._shareToqqSession.bind(this)}>
                            <Image source={require('./img/qq@2x.png')}resizeMode={'contain'} style={styles.weixin} />
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={this._shareToqqzone.bind(this)}>
                            <Image source={require('./img/kongjian@2x.png')}resizeMode={'contain'} style={styles.weixin} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ruleWrapper}>
                    <Text onPress={this.setModalVisible.bind(this)} style={{color:'#008DF0'}}>规则说明></Text>
                </View>

                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={styles.ModalWrapper}>

                        <View style={styles.huoDongRule}>
                            <Text>活动规则</Text>
                        </View>
                        <View style={{marginLeft:20}}>
                            <View style={styles.txtWrapper}>
                                <Text style={styles.txt}>1、每邀请一名新用户加入，可获得5元奖励；</Text>
                            </View>
                            <View style={styles.txtWrapper}>
                                <Text style={styles.txt}>2、邀请的奖励金额可用于充值，不得提现；</Text>
                            </View>
                            <View style={styles.txtWrapper}>
                                <Text style={styles.txt}>3、被邀请人加入时的邮箱、手机号、或支付账号、或微信号若与任一曾经加入过计划的会员相同，平台不视为首次加入，不给予邀请人奖励；</Text>
                            </View>
                            <View style={styles.txtWrapper}>
                                <Text style={styles.txt}>4、若发现骗取奖励行为，方舟共济有权取消；</Text>
                            </View>
                            <View style={styles.txtWrapper}>
                                <Text style={styles.txt}>5、方舟共济保留对此活动的最终解释权；</Text>
                            </View>
                        </View>
                        <View style={styles.closeWrapper}>
                            <View style={styles.close}>
                                <Text   onPress={this.setModalHidden.bind(this)} style={{width:40}}>关闭</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

let styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F0F0F0',
    },
    publicContain:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#F0F0F0',
        height:80
    },
    publicLeft:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:0.4*width,
        paddingLeft:12,
        height:44
    },
    publicRight:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:0.4*width,
        marginRight:12,
        height:30,
        width:80,
        borderRadius:15,
        borderColor:'#0093EC',
        borderWidth:1
    },
    inviteFriendContain:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:210,
        backgroundColor:'#fff'
    },
    inviteLeft:{
        width:0.6*width,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:12
    },
    inviteRight:{
        width:0.38*width
    },
    inviteTxt:{
        fontSize:28,
        color:'#FF6D00',
        fontWeight:'bold'
    },
    myaward:{
        fontSize:12,
        color:'#0093EC',
        marginTop:12
    },
    pageBottom:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:80,
    },
    yaoqingContain:{
        flex:1,
        marginTop:1,
        backgroundColor:'#fff',
        height:150,
        flexDirection:'column',
        justifyContent:'center'
    },
    yaoqingWrapper:{
        flexDirection:'row',
        width:width,
        justifyContent:'center',
        marginBottom:10
    },
    yaoqingView:{
        width:0.8*width,
        backgroundColor:'#0093EC',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginBottom:5
    },
    weixin:{
        width:50, height:50, borderRadius:25
    },
    ruleWrapper:{
        backgroundColor:'#fff',
        position:'absolute',
        width:width,
        bottom:10,
        left:0,
        flexDirection:'row',
        height:30,
        justifyContent:'center',
        alignItems:'center'
    },
    ModalWrapper:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        marginTop:20
    },
    ModalDisplay:{
        width:width,
        height:height-20,
        backgroundColor:'#fff',
    },
    huoDongRuleWrapper:{
        flexDirection:'row',
        width:width,
        justifyContent:'center'
    },
    huoDongRule:{
        width:width,
        height:40,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    closeWrapper:{
        flexDirection:'row',
        width:width,
        justifyContent:'center',
        marginTop:30
    },
    close:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#008DF0',
        borderRadius:15
    },
    txtWrapper:{
        marginTop:20
    },
    txt:{
        margin:5,
        flexWrap:'wrap'
    }
});



















