import {
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    Text,
    View
} from 'react-native';
import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import ChatScreen from './chatScreen';
import PublicList from '../helpQyPages/PublicList';
import PageApplyHelp from '../helpQyPages/PageApplyHelp';
import MyEmployee from '../helpQyPages/MyHomerItem';
import PageSetting from '../helpQyPages/PageSetting';
import PageFindPasswd from '../helpQyPages/PageFindPasswd';
import PageLogin from '../helpQyPages/PageLogin';
import PageRegister from '../helpQyPages/PageRegister';
import PageJoin from '../helpQyPages/PageJoin';
import PageZhuYe from '../helpQyPages/PageZhuYe'; //主页
import PageRulesLittle from '../helpQyPages/webView/PageRulesLittle';
import PageLittle from '../helpQyPages/webView/PageLittle';
import PageRulesYoung from '../helpQyPages/webView/PageRulesYoung';
import PageYoung from '../helpQyPages/webView/PageYoung';
import PageRulesOld from '../helpQyPages/webView/PageRulesOld';
import PageOld from '../helpQyPages/webView/PageOld';
import PageRulesZonghe from '../helpQyPages/webView/PageRulesZonghe';
import PageZonghe from '../helpQyPages/webView/PageZonghe';
import PageRulesQiyeDabing from '../helpQyPages/webView/PageRulesQiyeDabing';
import PageQiyeDabing from '../helpQyPages/webView/PageQiyeDabing';
import PageRulesQiyeZonghe from '../helpQyPages/webView/PageRulesQiyeZonghe';
import PageQiyeZonghe from '../helpQyPages/webView/PageQiyeZonghe';
import MyHomerList from '../helpQyPages/MyHomerList';
import QiyeRenZheng from '../helpQyPages/QiyeRenZheng';
import PageFind from '../helpQyPages/PageFind';
import PageZixun from '../helpQyPages/PageZixun';
import PageMyStaff from '../helpQyPages/PageMyStaff';
import PageMyStaffHarm from '../helpQyPages/PageMyStaffHarm';
import PageMessage from '../helpQyPages/PageMessage'
import PageWoMyEmployee from '../helpQyPages/PageWoMyEmployee'
import PageSystemNotificationList from '../helpQyPages/PageSystemNotificationList'
import PagePayForStaff from '../helpQyPages/PagePayForStaff'
import PageWechatBindPhone from '../helpQyPages/PageWechatBindPhone'
import PageShare from '../helpQyPages/PageShare'
import PageShareFromWo from '../helpQyPages/PageShareFromWo'
import PageRulesofPlans from '../helpQyPages/PageRulesofPlans'
import PageQiyeShimingShowData from '../helpQyPages/PageQiyeShimingShowData'
import PageQiyeShimingFromZhuye from '../helpQyPages/PageQiyeShimingFromZhuye'
import PageWoMyEmployeeFromZhuye from '../helpQyPages/PageWoMyEmployeeFromZhuye'
import PageMyStaffFromZhuye from '../helpQyPages/PageMyStaffFromZhuye'
import PageMyStaffHarmFromZhuye from '../helpQyPages/PageMyStaffHarmFromZhuye'
import PagePayForStaffFromZhuye from '../helpQyPages/PagePayForStaffFromZhuye'
import PagePayForStaffInZhuye from '../helpQyPages/PagePayForStaffInZhuye'
//import  PageFind from '../helpQyPages/PageFindAndroid'; //
import RedMoneyList from "../helpQyPages/RedMoneyList";
import PageDescriptionOfGongshi from '../helpQyPages/PageDescriptionOfGongshi';
import PageUseRedMoney from "../helpQyPages/PageUseRedMoney";
import PagePlansQiyeDabing from "../helpQyPages/PagePlansQiyeDabing";
import PageQiyeShiming from "../helpQyPages/PageQiyeShiming";
import PageWoNew from '../helpQyPages/PageWoNew'
import PagePayForHomer from '../helpQyPages/PagePayForHomer'
import NewsContent from "../helpQyPages/webView/NewsContent";
import PageFindPasswordFromSetting from "../helpQyPages/PageFindPasswordFromSetting";
import EmployeePlansFromZhuyeItem from "../helpQyPages/EmployeePlansFromZhuyeItem";
//import  TestiOS from  '../helpQyPages/TestiOS'
var height = Dimensions.get('window').height - 70;
const TabNav = TabNavigator(
    {
        PageZhuye: {
            screen: PageZhuYe,  //PageZhuYe
            path: '/',
            tabBarVisible: true,
            navigationOptions: {
                title: Platform.OS === 'ios' ? '主页' : '',
                 tabBarLabel: '',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('./img/main@3x.png')}
                        style={[styles.icon, ]}
                        resizeMode={'contain'}
                    >
                        <View style={{width:10,height:10,backgroundColor:tintColor,marginTop:5}}></View>
                    </Image>
                ),
                headerStyle: {//StackNavigator下面的Screen Navigation Options找到的文档
                    backgroundColor: '#fff',
                    height: 10,
                }
            },
        },
        PageGongshi: {
            screen: PageFind,  //PageFind
            path: '/public',
            tabBarVisible: true,
            navigationOptions: {
                title: Platform.OS === 'ios' ? '邀请' : '邀请',
                tabBarLabel: '邀请',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('./img/faxian.png')}
                        style={[styles.icon, ]}
                        resizeMode={'contain'}
                    >
                        <View style={{width:10,height:10,borderRadius:5,backgroundColor:tintColor}}></View>
                    </Image>
                ),
                // headerStyle: {//StackNavigator下面的Screen Navigation Options找到的文档
                //     backgroundColor: '#fff',
                //     height: 10
                // }
            },
        },

        PageZixun: {
            screen: PageZixun, //PageWo
            path: '/PageZixun',
            navigationOptions: {
                title: Platform.OS === 'ios' ? '发现' : '',

                tabBarLabel: '发现',
                tabBarVisible: true,
                style: {
                    backgroundColor: '#000'
                },
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('./img/zixunButton.png')}
                        style={[styles.icon,]}
                        resizeMode={'contain'}
                    >
                        <View style={{width:10,height:10,borderRadius:5,backgroundColor:tintColor,}}></View>
                    </Image>
                ),
                // headerRight: (
                //     <Button
                //         title='设置'
                //         onPress={() =>{console.log(this,props)}}
                //     />
                // ),
                // headerStyle: {//StackNavigator下面的Screen Navigation Options找到的文档
                //     backgroundColor: '#fff',
                //     height: 10
                // }

            },
        },
        PageWo: {
            screen: PageWoNew, //PageWo
            path: '/PageWoNew',
            navigationOptions: {
                title: Platform.OS === 'ios' ? '我' : '',
                tabBarLabel: '我',
                tabBarVisible: true,
                headerTintColor: '#fff', //管头部颜色的
                style: {
                    backgroundColor: '#000'
                },
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('./img/wo.png')}
                        style={[styles.icon, ]}
                        resizeMode={'contain'}
                    >
                       <View style={{width:10,height:10,borderRadius:5,backgroundColor:tintColor,marginTop:16}}></View>
                    </Image>
                ),

                headerStyle: {//StackNavigator下面的Screen Navigation Options找到的文档
                    backgroundColor: '#fff',
                    height: 10,
                }

            },
        },
    },//RouteConfigs
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: { //控制底部激活时的颜色
            activeTintColor: '#0089e9',
            //activeBackgroundColor:'#000',
            showIcon: true,
            upperCaseLabel: false,
            // inactiveTintColor: '#929292',   // f4f4f4 就是底部  tabbar所在的颜色
            inactiveTintColor: '#f4f4f4',   // f4f4f4 就是底部  tabbar所在的颜色
            indicatorStyle: {
                display: 'none',
            },
            labelStyle: {
                // fontSize: 12,
                // margin: 0,
                display:'none'    //文字是否显示
            },
            style: {
                backgroundColor: '#f4f4f4',

            },
            tabStyle: {
                justifyContent: 'flex-end'
            }
        },
    }//TabNavigatorConfig
);

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
});

const HomeScreen = StackNavigator({
    Root: {
        screen: TabNav,

    },
    Profile: {
        screen: ChatScreen,
        path: '/people/:name',
        navigationOptions: {
            title: 'Profile',
        }
    },
    QiyeRenzheng: {
        screen: QiyeRenZheng
    },

    PublicList: {
        screen: PublicList,
    },
    PageApplyHelp: {
        screen: PageApplyHelp
    },
    MyEmployee: {
        screen: MyEmployee
    },
    MyHomerList: {
        screen: MyHomerList
    },

    PageFindPasswd: {
        screen: PageFindPasswd
    },
    PageSetting: {
        screen: PageSetting
    },
    PageLogin: {
        screen: PageLogin
    },
    PageRegister: {
        screen: PageRegister
    },
    PageJoin: {
        screen: PageJoin
    },
    PageRulesLittle: {
        screen: PageRulesLittle
    },
    PageLittle: {
        screen: PageLittle
    },
    PageRulesYoung: {
        screen: PageRulesYoung
    },
    PageYoung: {
        screen: PageYoung
    },
    PageRulesOld: {
        screen: PageRulesOld
    },
    PageOld: {
        screen: PageOld
    },
    PageRulesZonghe: {
        screen: PageRulesZonghe
    },
    PageZonghe: {
        screen: PageZonghe
    },
    PageRulesQiyeDabing: {
        screen: PageRulesQiyeDabing
    },
    PageQiyeDabing: {
        screen: PageQiyeDabing
    },
    PageRulesQiyeZonghe: {
        screen: PageRulesQiyeZonghe
    },
    PageQiyeZonghe: {
        screen: PageQiyeZonghe
    },
    RedMoneyList: {
        screen: RedMoneyList
    },
    PageDescriptionOfGongshi: {
        screen: PageDescriptionOfGongshi
    },
    PageZixun: {
        screen: PageZixun,
    },
    PageUseRedMoney: {
        screen: PageUseRedMoney
    },
    PagePlansQiyeDabing: {
        screen: PagePlansQiyeDabing
    },

    PageQiyeShiming:{
        screen:PageQiyeShiming
    },
    PageWoNew:{
        screen:PageWoNew,
    },
    PageMyStaff:{
        screen:PageMyStaff
    },
    PageMyStaffHarm:{
        screen:PageMyStaffHarm
    },
    PageMessage:{
        screen:PageMessage,
    },
    PageWoMyEmployee:{
        screen:PageWoMyEmployee,
    },
    PageSystemNotificationList:{
        screen:PageSystemNotificationList,
    },
    PagePayForStaff:{
        screen:PagePayForStaff,
    },
    PagePayForHomer:{
        screen:PagePayForHomer,
    },
    PageWechatBindPhone:{
        screen:PageWechatBindPhone,
    },
    PageShare:{
        screen:PageShare,
    },
    PageShareFromWo:{
        screen:PageShareFromWo,
    },
    NewsContent:{
        screen:NewsContent
    },
    PageFindPasswordFromSetting:{
        screen:PageFindPasswordFromSetting
    },
    PageRulesofPlans:{
        screen:PageRulesofPlans
    },
    PageQiyeShimingShowData:{
        screen:PageQiyeShimingShowData
    },
    PageQiyeShimingFromZhuye:{
        screen:PageQiyeShimingFromZhuye
    },
    PageWoMyEmployeeFromZhuye:{
        screen:PageWoMyEmployeeFromZhuye
    },
    PageMyStaffFromZhuye:{
        screen:PageMyStaffFromZhuye
    },
    PageMyStaffHarmFromZhuye:{
        screen:PageMyStaffHarmFromZhuye
    },
    PagePayForStaffFromZhuye:{
        screen:PagePayForStaffFromZhuye
    },
    EmployeePlansFromZhuyeItem:{
        screen:EmployeePlansFromZhuyeItem
    },
    PagePayForStaffInZhuye:{
        screen:PagePayForStaffInZhuye
    },
}, {
    headerMode: 'screen',
    mode: 'modal'
});


export default HomeScreen;