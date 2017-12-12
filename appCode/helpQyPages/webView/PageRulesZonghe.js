import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    AsyncStorage,
    NativeAppEventEmitter
} from 'react-native';
import React, {Component} from 'react';
let width = Dimensions.get('window').width;
var loginEmitterEvent;
export default class PageRulesZonghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }
    goJoin() {
        if (this.state.isLogin) {
            this.props.navigation.navigate('PageJoin', {
                categorytype: this.props.navigation.state.params.categorytype,
                PageZhuYeKey:this.props.navigation.state.params.PageZhuYeKey
            })
        }
        else {
            this.props.navigation.navigate('PageLogin')
        }
    }

    componentWillUnmount() {
        loginEmitterEvent.remove();
    }

    componentDidMount() {
        //这里获取token只是为了判断忘哪里跳
        AsyncStorage.multiGet(["token" ], (errros, result) => {
            if(result[0][1]==null){
                return
            }
            this.setState({
                isLogin:true
            })
        })
        loginEmitterEvent = NativeAppEventEmitter.addListener('loginEmitter', (data) => {
            AsyncStorage.multiGet(["token",], (errros, result) => {
                if (result[0][1] == null) {
                    return
                }
                this.setState({
                    isLogin: true
                })
            })

        });
    }
    goBackToZhuye=()=>{
        this.props.navigation.goBack(this.props.navigation.state.params.PageZhuYeKey)
    }
    render() {
        return (
            <View style={styles.HuzhuGongyueMaxView}>
                <View style={styles.HuzhuGongyueTitleView}>
                    <Text style={{fontSize: 16, color: '#4A4A4A'}}>综合意外互助</Text>
                </View>
                <View style={styles.HuzhuTishi}>
                    <Text style={styles.HuzhuTishiFont}>加入本次互助计划，您需要仔细阅读并如实承诺一下事项，若您存在一下任何一红情况，
                        将不能参加本计划；若您未如实告知其中任何一项情况，将来申请互助申请时，运营方将按照规定拒绝您的申请
                    </Text>
                </View>
                <View style={{width:width,height:10,backgroundColor:'#f8f8f8'}}></View>
                <View style={styles.HuzhuTishi}>
                    <Text style={styles.HuzhuTishiContentFont}>1.您在过去三年内是否曾经因疾病（非意外事故）连续住院
                        治疗七天或七天以上或因其他慢性疾病需要长期（三个月以上）服药控制或手术治疗
                    </Text>
                </View>
                <View style={styles.HuzhuTishi}>
                    <Text style={styles.HuzhuTishiContentFont}>2.您在过去三年内是否曾经因疾病（非意外事故）连续住院
                        治疗七天或七天以上或因其他慢性疾病需要长期（三个月以上）服药控制或手术治疗
                    </Text>
                </View>
                <View style={styles.HuzhuTishi}>
                    <Text style={styles.HuzhuTishiContentFont}>3.您在过去三年内是否曾经因疾病（非意外事故）连续住院
                        治疗七天或七天以上或因其他慢性疾病需要长期（三个月以上）服药控制或手术治疗
                    </Text>
                </View>
                <View style={styles.HuzhuTishi}>
                    <Text style={styles.HuzhuTishiContentFont}>4.您在过去三年内是否曾经因疾病（非意外事故）连续住院
                        治疗七天或七天以上或因其他慢性疾病需要长期（三个月以上）服药控制或手术治疗
                    </Text>
                </View>
                <View style={styles.DabingChongzhiButtonView}>
                    <TouchableOpacity style={styles.DabingChongzhiButtonOne} onPress={this.goBackToZhuye.bind(this)}>
                        <Text style={{color: '#4A4A4A'}}>不符合 返回</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DabingChongzhiButtonTwo} onPress={this.goJoin.bind(this)}>
                        <Text style={{color: 'white'}}>符合条件，加入</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
let styles = StyleSheet.create({
    HuzhuGongyueMaxView: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    HuzhuGongyueTitleView: {
        width: width - 30,
        height: 50,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    HuzhuTishi: {
        width: width - 60,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    HuzhuTishiFont: {
        fontSize: 12,
        color: '#9B9B9B',
        lineHeight:16
    },
    HuzhuTishiContentFont: {
        fontSize: 12,
        color: '#4A4A4A',
        lineHeight:15,
    },
    DabingChongzhiButtonView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DabingChongzhiButtonOne: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        width: width * 0.4,
        height: 50
    },
    DabingChongzhiButtonTwo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008BE6',
        width: width * 0.6,
        height: 50

    }

});



















