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

import React, {Component,} from 'react';
import NewsItem from "./NewsItem";

let {width, height} = Dimensions.get('window');
import {UrlGetNewList} from '../utils/url';
import UploadFile from '../utils/uploadFile';
import Loading from "../loading/loading";

export default class PageZixun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page:1,
            refreshing: false,
            dataSource: [],
            hasLoad: false,
            animating: false,  //loading动画的显示与否
            haveDataOrNoData: false,
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

        const { page} = this.state;

        let formData = new FormData();

        formData.append("page", page);
        let option = {
            url: UrlGetNewList,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {
            //服务不可用，
            if(typeof(resp)=="undefined"){
                this.setState({
                    refreshing:false,
                    loading: false
                });
                return
            }
            this.setState({
                dataSource: page==1? resp.result :[ ...this.state.dataSource,...resp.result],//后台必须保证UUID不同，否则报错
                haveDataOrNoData: true,
                refreshing:false,
                loading: false,
            })

        }).catch(err => {
            this.setState({
                refreshing:false,
                loading: false
            });

        });
    }

    _onRefreshLoading=()=> {
        if(this.state.dataSource<200){
            this.setState(
                {
                    page: 1,
                    refreshing: true
                },
                () => {
                    this.makeRemoteRequest();
                })
        }
        else{
            this.setState(
                {
                    page: this.state.page+1,
                    refreshing: true
                },
                () => {
                    this.makeRemoteRequest();
                })
        }
    }
    static navigationOptions = {
        title: '发现',
    };

    _keyExtractor = (item, index) => item.newsuuid+Math.floor(Math.random()*10) ; //用于为item对象生成一个唯一的标识id  用来区分

    _renderItem = ({item}) => (      //页面list的一个对象的生成 和属性定义
        <NewsItem
            key={item.newsuuid}
            row={item}
            {...this.props}
        />
    );
    renderSeparator = () => {
        return (
            <View />
        );
    };
    renderHeader = () => {
        return <View />;
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
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefreshLoading.bind(this)}
                        tintColor="#000000"      //loading 转圈圈的颜色
                        title="Loading..."       //标题
                        titleColor="#000000"     //Loading 颜色
                        colors={['#000000']}
                        progressBackgroundColor="#1296db"
                    />
                }style={{flex: 1, backgroundColor: '#fff'}}>
                {
                    !!this.state.haveDataOrNoData ?
                        <FlatList
                            ref="listview"
                            data={this.state.dataSource}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                            ItemSeparatorComponent={this.renderSeparator}
                            removeClippedSubviews={false}
                        /> :
                        <View style={styles.noredmoney}>
                            <Image source={require('./img/NotHappy.png')} style={{width: 80, height: 80}}/>
                            <Text >暂时还没有咨讯!</Text>
                        </View>
                }
                <Loading visible={this.state.loading}/>

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
    noredmoney:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noredmoneytxt:{
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




