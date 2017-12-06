import {
    View,
    Dimensions,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    RefreshControl
} from 'react-native';

import React, {Component,} from 'react';
import RedMoneyItem from './RedMoneyItem';

let {width, height} = Dimensions.get('window');
import {UrlgetMyRedMoney} from '../utils/url';
import UploadFile from '../utils/uploadFile';
import LoadingInPage from "../loading/LoadingInPage";

export default class RedMoneyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 1,
            refreshing: false,
            dataSource: [],
            hasLoad: false,
            animating: false,  //loading动画的显示与否
            haveDataOrNoData: true,
            isRefreshing:false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();

    }
    _onRefreshLoading(){
        this.makeRemoteRequest();
    }
    // 获取数据
    makeRemoteRequest = () => {

        this.setState({
            loading: true
        })

        const {page} = this.state;

        let formData = new FormData();
        formData.append("useruuid", this.props.navigation.state.params.useruuid);
        formData.append("page", page);
        let option = {
            url: UrlgetMyRedMoney,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {


            //服务不可用，
            if (typeof(resp) == "undefined") {
                this.setState({
                    refreshing: false,
                    loading: false,
                    haveDataOrNoData: false,
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
                    haveDataOrNoData: false,
                })
            }

        }).catch(err => {
            this.setState({
                refreshing: false,
                loading: false,
                haveDataOrNoData: false,
            });

        });
    }

    _onRefresh = () => {
        if (this.state.dataSource.length < 60) {
            this.setState(
                {
                    page: 1,
                    refreshing: true
                },
                () => {
                    this.makeRemoteRequest();
                })
        }
        else {
            this.setState(
                {
                    page: this.state.page + 1,
                    refreshing: true
                },
                () => {
                    this.makeRemoteRequest();
                })
        }

    }

    _keyExtractor = (item, index) => item.redmoneyuuid + Math.floor(Math.random() * 10); //用于为item对象生成一个唯一的标识id  用来区分

    _renderItem = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <RedMoneyItem
            key={item.redmoneyid}
            row={item}
            {...this.props}
        />
    );

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
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
        let backgroundColor = this.state.haveDataOrNoData ? '#ffffff' : '#ffffff'
        return (
            <View style={{flex: 1, backgroundColor: backgroundColor}}>
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
                            <View style={styles.noredmoney}>
                                <Image source={require('./img/NotHappy.png')} resizeMode={'contain'}
                                       style={{width: 80, height: 80}}/>
                                <Text style={{color: '#a4a4a4', marginTop: 10}}>您还没有红包哦!</Text>
                            </View>
                        </ScrollView>
                }
                <LoadingInPage modalVisible={this.state.loading}/>

            </View>
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
    noredmoney: {
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noredmoneytxt: {
        paddingTop: 15,
        color: '#bfbfbf',
        fontSize: 18
    },
    gray: {
        backgroundColor: '#cccccc',
        width: 70
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        zIndex: 10
    },
});




