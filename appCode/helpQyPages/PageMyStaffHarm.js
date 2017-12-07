import {
    View,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import React, {Component,} from 'react';
import MyStaffWaitingItem from './MyStaffWaitingItem';
import MyStaffJoinedItem from './MyStaffJoinedItem';
import fetchTool from '../utils/fetchTool';
import {UrlGetAllStaff,Urlsubmitstaffs,UrlGetPayMessage} from '../utils/url';
import UploadFile from '../utils/uploadFile';
import LoadingInPage from "../loading/LoadingInPage";
import {NativeModules} from 'react-native';
var WeChat = NativeModules.WeChat;  //iOS平台微信，王后涛封装
export default class PageMyStaffHarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 1, //待确认
            pageYes: 1,
            refreshingNo: false,
            refreshingYes: false,
            dataSourceNo: [],
            dataSourceYes: [],
            hasLoad: false,
            animating: false,  //loading动画的显示与否
            haveDataOrNoData: false,
            joinState: 1,     //1表示现在显示的是待加入的  2 表示现在显示的是已经加入的
            haveDataOrNoData1: false,
            haveDataOrNoData2: false,
            changeToyesTag: true,
            isRefreshing:false,
        };
    }
    static navigationOptions = {
        title: '员工综合意外',
    };
    componentDidMount() {

        this.makeRemoteRequestNo();

    }

    // 获取数据，适用于已加入员工
    makeRemoteRequestYes = () => {

        this.setState({
            loading: true
        })

        const {pageYes} = this.state;

        let formData = new FormData();
        formData.append("token", this.props.navigation.state.params.token);
        formData.append("uuid", this.props.navigation.state.params.useruuid);
        formData.append("affirm", "yes");
        formData.append("helptype", "employee");
        formData.append("page", pageYes);

        let option = {
            url: UrlGetAllStaff,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {

            //服务不可用，
            if (typeof(resp) == "undefined") {
                this.setState({
                    refreshingYes: false,
                    loading: false
                });
                return
            }

            if (resp.retcode==2000){
                this.setState({
                    dataSourceYes: pageYes == 1 ? resp.result : [...this.state.dataSourceYes, ...resp.result],//后台必须保证UUID不同，否则报错
                    haveDataOrNoData2: true,
                    refreshingYes: false,
                    loading: false,
                })
            }else{
                this.setState({
                    refreshingYes: false,
                    loading: false,
                })
            }

        }).catch(err => {
            this.setState({
                refreshingYes: false,
                loading: false
            });

        });
    }
    // 适用于未加入员工
    makeRemoteRequestNo = () => {
        this.setState({
            loading: true
        })
        const {page} = this.state;
        let formData = new FormData();
        formData.append("token", this.props.navigation.state.params.token);
        formData.append("uuid", this.props.navigation.state.params.useruuid);
        formData.append("affirm", "no");
        formData.append("helptype", "employee");
        formData.append("page", page);

        let option = {
            url: UrlGetAllStaff,
            body: formData
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {

            //服务不可用，
            if (typeof(resp) == "undefined") {
                this.setState({
                    refreshingNo: false,
                    loading: false
                });
                return
            }
            if (resp.retcode==2000){
                this.setState({
                    dataSourceNo: page == 1 ? resp.result : [...this.state.dataSourceNo, ...resp.result],//后台必须保证UUID不同，否则报错
                    haveDataOrNoData1: true,
                    refreshingNo: false,
                    loading: false,
                })
            }else{
                this.setState({
                    refreshingNo: false,
                    loading: false,
                })
            }


        }).catch(err => {
            this.setState({
                refreshingNo: false,
                loading: false
            });

        });
    }

    //确认一批员工
    _submitStaffs(){
        if (this.state.dataSourceNo.length==0){
            return
        }
        this.setState({
            loading: true
        })
        // 取得所有员工的UUID
        let tempData = this.state.dataSourceNo;

        let temp = new Array();
        for (let i = 0; i < tempData.length; i++) {
            temp.push({"useruuid":tempData[i].useruuid, "account":tempData[i].account});
        }

        let params={
            "token":this.props.navigation.state.params.token,
            "useruuid":this.props.navigation.state.params.useruuid,
            "helptype":"employee",
            "stuffsUserUUIDList":temp,
        }
        let options = {
            url: Urlsubmitstaffs,
            body: JSON.stringify(params)
        };

        let response = fetchTool(options);
        response.then(resp => {

            if(typeof(resp)=="undefined"){
                this.setState({
                    loading: false
                });
                return
            }
            this.setState({
                loading: false,
                dataSourceNo:[]
            })
            const {payMoneyCallBack} = this.props.navigation.state.params;   //确认员工之后  我的员工两个计划 页面重新加载数据的回调方法
            payMoneyCallBack();
        }).catch(err => {
            this.setState({
                loading: false
            })
        });
    }


    _onRefreshNo = () => {


        if (this.state.dataSourceNo.length<200){
            this.setState(
                {
                    page:  1, refreshingNo: true
                },
                () => {
                    this.makeRemoteRequestNo();
                })
        }else {
            this.setState(
                {
                    page: this.state.page + 1,
                    refreshingNo: true
                },
                () => {
                    this.makeRemoteRequestNo();
                })
        }
    };

    _onRefreshYes = () => {     //
        if (this.state.dataSourceYes.length<200){
            this.setState(
                {
                    pageYes:  1,
                    refreshingYes: true
                },
                () => {
                    this.makeRemoteRequestYes();
                })
        }else {
            this.setState(
                {
                    pageYes: this.state.pageYes + 1,
                    refreshingYes: true
                },
                () => {
                    this.makeRemoteRequestYes();
                })
        }
    };

    _onRefreshLoadingNo(){
        this.makeRemoteRequestNo();
    }

    _onRefreshLoadingYes(){
        this.makeRemoteRequestYes();
    }

    goPayForStaff(){
        let formDataTemp = new FormData();
        formDataTemp.append("useruuid", this.props.navigation.state.params.useruuid);
        formDataTemp.append("helptype", this.props.navigation.state.params.HelpTypeMessage.helptype);
        let option = {
            url: UrlGetPayMessage,
            body: formDataTemp
        };
        let responseR = UploadFile(option);
        responseR.then(resp => {
            console.log(this.props)
            setTimeout(()=>{
                this.props.navigation.navigate('PagePayForStaff',{HelpTypeMessage:this.props.navigation.state.params.HelpTypeMessage,
                    payMoneyCallBack:this.props.navigation.state.params.payMoneyCallBack,PageMyEmployeeKey:this.props.navigation.state.key,
                    FirstPay:resp.result,//是否是首次充值
                })

            },500)
        })
    }

    deleteWaitItem_callBack = (staffid) => {

        let tempData = this.state.dataSourceNo;

        let temp = [];
        for (let i = 0; i < tempData.length; i++) {
            if (staffid == tempData[i].staffid) {
                continue;
            }
            temp.push({
                staffid: i,
                staffname: tempData[i].staffname,
                account: tempData[i].account,
                joindate: tempData[i].joindate
            });
        }
        this.setState({
            dataSourceNo: temp
        })

    }

    changeLoading_calBack = (loadingState) => {

        this.setState({
            loading: loadingState
        })
    }

    deleteJoinedItem_callBack = (staffid) => {

        let tempData = this.state.dataSourceYes;

        let temp = [];
        for (let i = 0; i < tempData.length; i++) {
            if (staffid == tempData[i].staffid) {
                continue;
            }
            temp.push({
                staffid: i,
                staffname: tempData[i].staffname,
                account: tempData[i].account,
                joindate: tempData[i].joindate
            });
        }
        this.setState({
            dataSourceYes: temp
        })

    }

    shareToWeChat(){
        WeChat.webShareWeXinWithScene(0, '葡萄互助', '员工点击加入公司', 'http://oztdsemro.bkt.clouddn.com/putaohuzhu/grapelogo.png',
            'http://www.putaohuzhu.cn/glove/grape/staffjoin.do?useruuid='+this.props.navigation.state.params.useruuid+'&helptype=staff', (err, sendOK) => {

            })
    }
    changeWaitingItem() { //点击切换到未加入
        this.setState({
            joinState: 1,
        })
    }

    changeJoinedItem() {//点击切换到加入员工
        let changeTag = this.state.changeToyesTag;
        this.setState({
            joinState: 2,
            changeToyesTag: false
        })
        // 将 我的员工界面显示的列表变为 已经加入的员工
        if (changeTag) {
            this.makeRemoteRequestYes();
        }

    }



    uuid() {  //为keyExtractor产生一个uuid  用来标识id、

        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }


    _keyExtractorNo = (item, index) => item.staffuuid + this.uuid(); //用于为item对象生成一个唯一的标识id  用来区分
    _keyExtractorYes = (item, index) => item.staffuuid + this.uuid(); //用于为item对象生成一个唯一的标识id  用来区分

    _renderItemNo = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <MyStaffWaitingItem
            key={item.staffuuid + this.uuid()}
            row={item}
            userToken={this.props.navigation.state.params.token}
            deleteWaitItem_callBack={this.deleteWaitItem_callBack}  //公司的某一个计划传入的回调函数
            changeLoading_calBack={this.changeLoading_calBack}
            {...this.props}
        />
    );
    _renderItemYes = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <MyStaffJoinedItem
            key={item.staffuuid + this.uuid()}
            row={item}
            userToken={this.props.navigation.state.params.token}
            deleteJoinedItemCallBack={this.deleteJoinedItem_callBack}  //公司的某一个计划传入的回调函数
            changeLoading_calBack={this.changeLoading_calBack}
            payMoneyCallBack={this.props.navigation.state.params.payMoneyCallBack}
            {...this.props}
        />
    );

    renderSeparator = () => {
        return (
            <View/>
        );
    };
    renderHeader = () => {
        return <View/>;
    };
    renderFooter = () => {
        // if (!this.state.loading) return null;
        return (
            <View />
        );
    };


    render() {
        let backGroundColorLeft = this.state.joinState == 1 ? '#D8D8D8' : 'white';
        let backGroundColorRight = this.state.joinState == 2 ? '#D8D8D8' : 'white';

        return (
            <View style={styles.PageMyStaffMaxView}>
                <View style={styles.PageMyStaffHeaderView}>
                    <TouchableOpacity style={styles.PageMyStaffTwoStateView} onPress={this.changeWaitingItem.bind(this)}>
                        <View></View>
                        <Text>未加入</Text>
                        <View style={[styles.PageMyStaffLine, {backgroundColor: backGroundColorLeft}]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.PageMyStaffTwoStateView} onPress={this.changeJoinedItem.bind(this)}>
                        <View></View>
                        <Text>已加入</Text>
                        <View style={[styles.PageMyStaffLine, {backgroundColor: backGroundColorRight}]}></View>
                    </TouchableOpacity>
                </View>
                {this.state.joinState == 1 ?
                    <View>
                        {!!this.state.haveDataOrNoData1 ?
                            <View style={{height:height-115}}>
                                <View style={styles.PageMyStaffTitleViewMax}>
                                    <View style={styles.PageMyStaffTitleViewName}>
                                        <Text>姓名</Text></View>
                                    <View style={styles.PageMyStaffTitleViewID}>
                                        <Text>身份证号</Text>
                                    </View>
                                </View>

                                <View style={{height:200 ,flex:1}}>
                                    <FlatList
                                        ref="listview"
                                        data={this.state.dataSourceNo}
                                        refreshing={this.state.refreshingNo}
                                        renderItem={this._renderItemNo}
                                        keyExtractor={this._keyExtractorNo}
                                        onRefresh={this._onRefreshNo}
                                        ListFooterComponent={this.renderFooter}
                                    />
                                </View>
                                <View  style={styles.ButtonView}>
                                    <View style={styles.ButtonOne}>
                                        <Text style={{color: '#4A4A4A'}}>共{this.state.dataSourceNo.length}人</Text>
                                    </View>
                                    <TouchableOpacity onPress={this._submitStaffs.bind(this)}  style={styles.ButtonTwo}>
                                        <Text style={{color:'#fff'}}>确认</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._onRefreshLoadingNo.bind(this)}
                                        tintColor="#000000"      //loading 转圈圈的颜色
                                        title="Loading..."       //标题
                                        titleColor="#000000"     //Loading 颜色
                                        colors={['#000000']}
                                        progressBackgroundColor="#1296db"
                                    />
                                }>
                                <View style={styles.noredmoney}>
                                    <Image source={require('./img/NotHappy.png')} resizeMode={'contain'}
                                           style={{width: 80, height: 80}}/>
                                    <Text style={{color: '#a4a4a4', marginTop: 10}}>无已加入员工!</Text>
                                </View>
                            </ScrollView>
                        }
                    </View>
                    :
                    <View>
                        {!!this.state.haveDataOrNoData2 ?
                            <View style={{height: height - 115}}>
                            <View style={styles.PageMyStaffTitleViewMax}>
                                    <View style={styles.PageMyStaffTitleView}>
                                        <Text>姓名</Text></View>
                                    <View style={[styles.PageMyStaffTitleView, {width: width * 0.5}]}>
                                        <Text>身份证号</Text>
                                    </View>
                                    <View style={styles.PageMyStaffTitleView}>
                                        <Text>等待期</Text>
                                    </View>
                                </View>
                                <View style={{height: 200, flex: 1}}>
                                <FlatList  //第二级运算符  用于判断是否存在红包数据
                                    ref="listview"
                                    data={this.state.dataSourceYes}
                                    refreshing={this.state.refreshingYes}
                                    renderItem={this._renderItemYes}
                                    keyExtractor={this._keyExtractorYes}
                                    onRefresh={this._onRefreshYes}
                                />
                                </View>
                                <View style={styles.ButtonView}>
                                    <View style={styles.ButtonOne}>
                                        <Text style={{color: '#4A4A4A'}}>共{this.state.dataSourceYes.length}人</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.goPayForStaff.bind(this)} style={styles.ButtonTwo}>
                                        <Text style={{color: '#fff'}}>充值</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._onRefreshLoadingYes.bind(this)}
                                        tintColor="#000000"      //loading 转圈圈的颜色
                                        title="Loading..."       //标题
                                        titleColor="#000000"     //Loading 颜色
                                        colors={['#000000']}
                                        progressBackgroundColor="#1296db"
                                    />
                                }>
                                <View style={styles.noredmoney}>
                                    <Image source={require('./img/NotHappy.png')} resizeMode={'contain'}
                                           style={{width: 80, height: 80}}/>
                                    <Text style={{color: '#a4a4a4', marginTop: 10}}>无已加入员工!</Text>
                                </View>
                            </ScrollView>
                        }
                    </View>
                }

                <LoadingInPage modalVisible={this.state.loading}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    PageMyStaffMaxView: {
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    noredmoney:{
        width:width,
        height:height-140,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PageMyStaffHeaderView: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PageMyStaffTwoStateView: {
        width: width / 2,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PageMyStaffLine: {
        width: width * 0.4,
        height: 2,
    },
    PageMyStaffTitleViewMax: {
        width: width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    PageMyStaffTitleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.2,
        height: 40,
    },
    PageMyStaffTitleViewName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.35,
        height: 40,
    },
    PageMyStaffTitleViewID: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.45,
        height: 40,
    },
    PageMyStaffTitleViewMoneyNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.25,
        height: 40,
    },
    ButtonView: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonOne: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        width: width * 0.4,
        height: 50
    },
    ButtonTwo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008BE6',
        width: width * 0.6,
        height: 50

    }
});




