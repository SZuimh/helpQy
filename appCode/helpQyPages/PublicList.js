/**
 * 这个是我的员工列表
 *
 */
import{
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    FlatList,
} from 'react-native';

import  React,{Component,} from 'react';
import { UrlgetPublicList } from '../utils/url';
import fetchToolget  from '../utils/fetchToolget';
import  PublicItem from './PublicItem';
let { width,height}=Dimensions.get('window');
import LoadingInPage from "../loading/LoadingInPage";

export  default  class PublicList extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            page:1,
            refreshing: false,
            dataSource: [],
            hasLoad: false,
            animating: false,  //loading动画的显示与否
            haveDataOrNoData: false,

        };

    }

    shouldComponentUpdate(){
        return true
    }
    static navigationOptions = {
        title: '公示名单',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };
    componentDidMount(){

        let  response=fetchToolget(UrlgetPublicList);
        response.then(resp=>{

            if(typeof(resp)=="undefined"){
                this.setState({
                    visible:false
                });
                return
            }
            if (resp.retcode===2000) {
                //这里获取数组
                this.setState({
                    dataSource: resp.lp
                });
            }
            //停止转圈圈
            this.setState({
                visible:false
            });
        }).catch(err=>{
            //停止转圈圈
            this.setState({
                visible:false
            });

        });

    }

    componentDidMount() {
        this.makeRemoteRequest();

    }
     uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    // 获取数据
    makeRemoteRequest = () => {

        this.setState({
            loading: true
        })

        const { page} = this.state;

        let  responseR=fetchToolget(UrlgetPublicList);
        responseR.then(resp=>{
            this.setState({
                loading: false,
            })
            if(typeof(resp)=="undefined"){
                this.setState({
                    refreshing:false,
                    loading: false
                });
                return
            }
            if (resp.retcode===2000) {
                //这里获取数
                this.setState({
                    dataSource: page==1? resp.lp :[ ...this.state.dataSource,...resp.lp],//后台必须保证UUID不同，否则报错
                    haveDataOrNoData: true,
                    refreshing:false,

                })
            }
        }).catch(err=>{
            this.setState({
                refreshing:false,
                loading: false
            });
        });
    }

    _onRefresh=()=> { //只公示前39位
        // this.setState(
        //     {
        //         page: this.state.page+1,
        //         refreshing: true
        //     },
        //     () => {
        //         this.makeRemoteRequest();
        //     })
    }

    _keyExtractor = (item, index) => item.publicuuid+this.uuid() ; //用于为item对象生成一个唯一的标识id  用来区分

    _renderItem = ({item}) => (
        <PublicItem
            key={item.publicuuid+this.uuid()}
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


    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#fffff2'}}>
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
                        />
                        :
                        <View style={styles.noredmoney}>
                            <Image source={require('./img/NotHappy.png')} resizeMode={'contain'}
                                   style={{width: width*0.3, height:width*0.3,marginTop:-height*0.40}}/>
                            <Text style={{color: '#a4a4a4', marginTop: 10}}>暂无公示人员!</Text>
                        </View>
                }
            <LoadingInPage modalVisible={this.state.loading}/>
            </View>
        );
    }
}
let styles=StyleSheet.create({
    container: {
        flex:1,
        margin:5,
        justifyContent:'center',
    },
    noredmoney:{
        width:width,
        height:height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});



















