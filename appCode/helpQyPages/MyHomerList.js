import {
    View,
    Dimensions,
    FlatList,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    RefreshControl
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import React, {Component,} from 'react';
import MyHomerItem from './MyHomerItem';
import {UrlgetMyemployee} from '../utils/url';

import UploadFile from '../utils/uploadFile';
import LoadingInPage from "../loading/LoadingInPage";

export default class MyHomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 1,
            refreshing: false,
            dataSource: [],
            hasLoad: false,
            animating: false,  //loading动画的显示与否
            haveDataOrNoData: false,
            isRefreshing:false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();

    }

    // 获取数据
    makeRemoteRequest = () => {

        this.setState({
            loading: true
        })

        const {page} = this.state;

        let formData = new FormData();
        formData.append("token", this.props.navigation.state.params.token);
        formData.append("uuid", this.props.navigation.state.params.useruuid);

        let option = {
            url: UrlgetMyemployee,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {
            //服务不可用，
            if (typeof(resp) == "undefined") {
                this.setState({
                    refreshing: false,
                    loading: false
                });
                return
            }
            if (resp.retcode == 2000) {
                this.setState({
                    dataSource: page == 1 ? resp.result : [...this.state.dataSource, ...resp.result],//后台必须保证UUID不同，否则报错
                    haveDataOrNoData: true,
                    refreshing: false,
                    loading: false,
                })
            } else {
                this.setState({
                    refreshing: false,
                    loading: false,
                })
            }

        }).catch(err => {
            this.setState({
                refreshing: false,
                loading: false
            });

        });
    }

    getNewHomerListCallBack = () => {
        this.makeRemoteRequestNoLoading();
    }

    makeRemoteRequestNoLoading = () => {   //用于无loading动画的页面数据拉取  用于回调调用
        const {page} = this.state;

        let formData = new FormData();
        formData.append("token", this.props.navigation.state.params.token);
        formData.append("uuid", this.props.navigation.state.params.useruuid);

        let option = {
            url: UrlgetMyemployee,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {
            //服务不可用，
            // console.log(resp)
            if (typeof(resp) == "undefined") {
                this.setState({
                    refreshing: false,
                });
                return
            }
            if (resp.retcode == 2000) {
                this.setState({
                    dataSource: page == 1 ? resp.result : [...this.state.dataSource, ...resp.result],//后台必须保证UUID不同，否则报错
                    haveDataOrNoData: true,
                    refreshing: false,
                    loading: false,
                })
            } else {
                this.setState({
                    refreshing: false,
                })
            }

        }).catch(err => {
            this.setState({
                refreshing: false,
                loading: fals
            });

        });
    }

    _onRefreshLoading = () => {
       this.makeRemoteRequest();

    }
    static navigationOptions = {
        title: '我的家人',
    };

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

    _keyExtractor = (item, index) => item.useraccountuuid + this.uuid(); //用于为item对象生成一个唯一的标识id  用来区分

    _renderItem = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <MyHomerItem
            key={item.useraccountuuid + this.uuid()}
            row={item}
            getNewHomerListCallBack={this.getNewHomerListCallBack}
            {...this.props}
        />
    );

    _onRefresh() {
        // console.log("我的家人界面刷新")
    }

    renderSeparator = () => {
        return (
            <View/>
        );
    };
    renderHeader = () => {
        return <View/>;
    };
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>

            </View>
        );
    };


    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefreshLoading.bind(this)}
                        tintColor="#000000"      //loading 转圈圈的颜色
                        title="Loading..."       //标题
                        titleColor="#000000"     //Loading 颜色
                        colors={['#000000']}
                        progressBackgroundColor="#1296db"
                    />
                }>
                <View style={styles.PageWoMyEmployeeMaxView}>
                    {
                        !!this.state.haveDataOrNoData ?
                            <FlatList
                                ref="listview"
                                data={this.state.dataSource}
                                refreshing={this.state.refreshing}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                onRefresh={this._onRefresh}
                                ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.renderFooter}
                                ItemSeparatorComponent={this.renderSeparator}

                            /> :
                            <View style={styles.noredmoney}>
                                <Image source={require('./img/NotHappy.png')} resizeMode={'contain'}
                                       style={{width: 80, height: 80}}/>
                                <Text style={{color: '#a4a4a4'}}>您还没有家人加入葡萄互助!</Text>
                            </View>
                    }
                </View>
                <LoadingInPage modalVisible={this.state.loading}/>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    centering: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    PageWoMyEmployeeMaxView: {
        width: width,
        height: height,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9e9ef'
    },
    noredmoney: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});




