import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    PixelRatio,
    StatusBar,
    Dimensions,
    RefreshControl,
    Platform
} from 'react-native';
import React, {Component} from 'react';
import LoadingInPage from '../loading/LoadingInPage';
import FocusImage from './FocusImage'
import {UrlGetMainSumInfo} from '../utils/url';
import fetchToolget from '../utils/fetchToolget';

import  PageZhuYeAndroid from  './AndroidStyle/PageZhuYeAndroid';
import  PageZhuYeiOS  from  './iOSStyle/PageZhuYeiOS';
let styles=null;
if (Platform.OS==='android') {
    styles=PageZhuYeAndroid;

}else{
    styles=PageZhuYeiOS;
}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
export default class PageZhuYe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'slide',
            modalVisible: false, //先不用这种方式
            transparent: false,
            visible: true, //loading动画
            sumQiye: 0,  //
            sumStaff: 0,  //
            sumMan: 0,  //
            isRefreshing:false

        };
    }

    componentDidMount() {
        this.getMainSumInfo();
    }
    _onRefresh(){
        //页面刷新方法
        this.setState({
            modalVisible:true
        })
        let response = fetchToolget(UrlGetMainSumInfo);
        response.then(resp => {
            this.setState({
                modalVisible:false
            })
            if (typeof(resp) == "undefined") {
                return
            }
            if (resp.retcode === 2000) {
                this.setState({
                    sumQiye: resp.result.sumQiye,
                    sumStaff: resp.result.sumStaff,
                    sumMan: resp.result.sumMan,

                });
            }
        }).catch(err => {

        });

}
    getMainSumInfo = () => {
        let response = fetchToolget(UrlGetMainSumInfo);
        response.then(resp => {
            if (typeof(resp) == "undefined") {
                return
            }
            if (resp.retcode === 2000) {
                this.setState({
                    sumQiye: resp.result.sumQiye,
                    sumStaff: resp.result.sumStaff,
                    sumMan: resp.result.sumMan
                });
            }
        }).catch(err => {

        });
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    goPageQiyeDabing() {
        this.props.navigation.navigate('PageQiyeDabing', {
            categorytype: "staff",
        })
    }

    goPageQiyeZonghe() {
        this.props.navigation.navigate('PageQiyeZonghe', {
            categorytype: "employee",
        })

    }

    goPageLittle() {
        this.props.navigation.navigate('PageLittle', {
            categorytype: "little",
        })

    }

    goPageOld() {
        this.props.navigation.navigate('PageOld', {
            categorytype: "old",
        })

    }

    goPageYoung() {
        this.props.navigation.navigate('PageYoung', {
            categorytype: "young",
        })

    }

    goPageZonghe() {
        this.props.navigation.navigate('PageZonghe', {
            categorytype: "zonghe",
        })

    }

    render() {
        return (
            <View>
                {/*<View style={styles.LunBoView}>*/}
                    {/*<FocusImage/>*/}
                {/*</View>*/}
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'black'}
                    translucent={false}
                    barStyle={'default'}
                    networkActivityIndicatorVisible={false}
                    showHideTransition={'fade'}/>
                <View style={{backgroundColor: '#fff',}}>
                </View>

                <ScrollView
                    refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }>
                  
                    {/*加入互助，200万人已经加入*/}
                    <View style={styles.joinHuzhu}>
                        <Text style={{color: '#414141'}}>加入企业互助</Text>
                        <Text style={{
                            color: '#4A4A4A',
                            fontSize: 11
                        }}>{this.state.sumQiye}公司/{this.state.sumStaff}员工已加入</Text>
                    </View>
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageQiyeDabing.bind(this)}>
                            <Image source={require('./img/yuangongdabing.png')} style={styles.bigImg}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageQiyeDabing.bind(this)} style={styles.planItemMiddle}>
                            <Text style={styles.planItemText}>企业员工大病互助</Text>
                            <Text style={styles.planItemtxt}>18-65周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>胃癌、肝癌等各种大病</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageQiyeDabing.bind(this, 'employee')}
                                          style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageQiyeZonghe.bind(this)}>
                            <Image source={require('./img/zongheyiwai.png')} style={styles.bigImg}
                                   />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageQiyeZonghe.bind(this)} style={styles.planItemMiddle}>
                            <Text style={styles.planItemText}>企业员工综合意外互助</Text>
                            <Text style={styles.planItemtxt}>18-65周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>意外身故、身外伤残</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageQiyeZonghe.bind(this, 'staff')}
                                          style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.joinHuzhu}>
                        <Text style={{color: '#414141'}}>加入个人互助</Text>
                        <Text style={{color: '#4A4A4A', fontSize: 11}}>{this.state.sumMan}人已加入</Text>
                    </View>
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageLittle.bind(this)}>
                            <Image source={require('./img/children.png')} style={styles.bigImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageLittle.bind(this)} style={styles.planItemMiddle}>
                            <Text style={styles.planItemText}>少儿大病互助</Text>
                            <Text style={styles.planItemtxt}>出生后30天-17周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>全面覆盖癌症等30种大病</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageLittle.bind(this, 'children')}
                                          style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*企业互助*/}
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageYoung.bind(this)}>
                            <Image source={require('./img/zhongqingnian.png')} style={styles.bigImg}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageYoung.bind(this)} style={styles.planItemMiddle}>
                            <Text style={styles.planItemText}>中青年抗癌互助</Text>
                            <Text style={styles.planItemtxt}>18-50周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>全面覆盖癌症等30种大病</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageYoung.bind(this, 'young')} style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageOld.bind(this)}>
                            <Image source={require('./img/old.png')} style={styles.bigImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageOld.bind(this)} style={styles.planItemMiddle}>
                            <Text style={[styles.planItemText, {fontWeight: 'bold'}]}>中老年抗癌互助</Text>
                            <Text style={styles.planItemtxt}>50-65周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>全面覆盖癌症等30种大病</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageOld.bind(this, 'old')} style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.planItem}>
                        <TouchableOpacity onPress={this.goPageZonghe.bind(this)}>
                            <Image source={require('./img/zonghe.png')} style={styles.bigImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageZonghe.bind(this)} style={styles.planItemMiddle}>
                            <Text style={styles.planItemText}>综合意外互助</Text>
                            <Text style={styles.planItemtxt}>1-66周岁</Text>
                            <Text style={styles.planItemtxt}>最高获赔30万元互助金</Text>
                            <Text style={styles.planItemtxt}>意外身故、意外伤残</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goPageZonghe.bind(this, 'zonghe')} style={styles.joinContainer}>
                            <View style={styles.joinWrapper}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>加入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <LoadingInPage modalVisible={this.state.modalVisible}/>
            </View>
        );
    }
}





























