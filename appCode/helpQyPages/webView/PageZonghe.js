import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    PixelRatio,
    ScrollView,
    Image
} from 'react-native';
import React, {Component} from 'react';
let width = Dimensions.get('window').width;
let ratio = PixelRatio.get();
import UploadFile from '../../utils/uploadFile';
import {UrlGetSumInfo} from '../../utils/url';
import LoadingInPage from "../../loading/LoadingInPage";
export default class PageZonghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            display2: 'none',
            display3: 'none',
            sumMan:0,
            sumMoney:0,
            average:0,
            loading:false,
        };
    }
    static navigationOptions = {
        title: '综合意外互助',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };

    componentDidMount(){
        this.timergo = setTimeout(() => {
            this.getSumInfo();
        }, 500)
    }
    componentWillUnmount(){
        this.timergo && clearTimeout(this.timergo);
    }
    getSumInfo(){
        this.setState({
            loading:true
        })
        let formData = new FormData();
        formData.append('helptype','zonghe');
        let option = {
            url: UrlGetSumInfo,
            body: formData
        };
        let responseR = UploadFile(option);

        responseR.then(resp => {
            this.setState({
                loading:false,
            })
            if(typeof(resp)=="undefined"){
                return
            }
            if(resp.retcode==2000){
                this.setState({
                    sumMan:resp.result.sumMan,
                    sumMoney:resp.result.sumMoney,
                    average:resp.result.average,
                })
            }

        }).catch(err=>{
            this.setState({
                loading:false,
            })
        });
    }

    goHuzhuGongyue(){
        this.props.navigation.navigate("PageRulesZonghe",{

            categorytype:this.props.navigation.state.params.categorytype,
            PageZhuYeKey:this.props.navigation.state.key,
        })
    }
    changeDisplay() {
        if (this.state.display == 'none') {
            this.setState({
                display: 'flex'
            })
        }
        else {
            this.setState({
                display: 'none'
            })
        }
    }
    changeDisplay2() {
        if (this.state.display2 == 'none') {
            this.setState({
                display2: 'flex'
            })
        }
        else {
            this.setState({
                display2: 'none'
            })
        }
    }
    changeDisplay3() {
        if (this.state.display3 == 'none') {
            this.setState({
                display3: 'flex'
            })
        }
        else {
            this.setState({
                display3: 'none'
            })
        }
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>
                    <View style={styles.QiyeDabingMaxView}>
                        <View style={styles.HeaderView}>
                            <View style={styles.PlansAndImage}>
                                <View style={styles.HeaderPlans}>
                                    <Text style={styles.PlansTitle}>综合意外互助</Text>
                                    <Text style={styles.PlansHeaderFont}>最高获配30万元互助金</Text>
                                    <Text style={styles.PlansHeaderFont}>互助事件：173</Text>
                                </View>
                                <View>
                                    <Image source={require('../img/zonghe.png')} style={styles.HeaderImage}/>
                                </View>
                            </View>
                            <View style={styles.PlansMoneyAndPeopleNumberView}>
                                <View style={styles.PlansMoneyAndPeopleNumber}>
                                    <Text style={styles.PlansMoneyNumber}>总金额(元)</Text>
                                    <Text style={[styles.PlansMoneyNumber, {color: '#e0b876'}]}>{this.state.sumMoney}</Text>
                                </View>
                                <View style={styles.PlansMoneyAndPeopleNumber}>
                                    <Text style={styles.PlansMoneyNumber}>加入人数(人)</Text>
                                    <Text style={[styles.PlansMoneyNumber, {color: '#e0b876'}]}>{this.state.sumMan}</Text>
                                </View>
                                <View style={styles.PlansMoneyAndPeopleNumber}>
                                    <Text style={styles.PlansMoneyNumber}>救助均摊金额(元)</Text>
                                    <Text style={[styles.PlansMoneyNumber, {color: '#e0b876'}]}>{this.state.average}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.emptyForLine}></View>


                        <View style={styles.huzhuJianjie}>
                            <View style={styles.huzhuJianjieTitle}>
                                <Text style={{fontWeight: 'bold', fontSize: 17}}>互助简介</Text>
                            </View>
                            <View style={styles.huzhujianjieView}>
                                <View>
                                    <View style={styles.huzhueduImageView}>
                                        <Image source={require('../img/huzhuedu.png')}/>
                                        <Text style={{fontSize: 13, marginLeft: 3}}>互助额度</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>最高可获赔<Text
                                            style={{color: '#1296db'}}>30</Text>万</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.huzhueduImageView}>
                                        <Image source={require('../img/huzhufanwei.png')}/>
                                        <Text style={{fontSize: 13, marginLeft: 3}}>互助范围</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>胃癌等<Text
                                            style={{color: '#1296db'}}>30</Text>种大病</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.huzhujianjieView}>
                                <View>
                                    <View style={styles.huzhueduImageView}>
                                        <Image source={require('../img/huzhuAge.png')}/>
                                        <Text style={{fontSize: 13, marginLeft: 3}}>互助年龄</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}><Text
                                            style={{color: '#1296db'}}>18-65</Text>周岁</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.huzhueduImageView}>
                                        <Image source={require('../img/dengdaiqi.png')}/>
                                        <Text style={{fontSize: 13, marginLeft: 3}}>等待时间</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 10, marginTop: 5, color: '#9B9B9B'}}><Text
                                            style={{color: '#1296db'}}>180</Text>天(防带病加入)</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.emptyForLine}></View>
                        {/*灰色隔断*/}

                        <View style={styles.huzhuJianjie}>
                            <View style={styles.huzhuJianjieTitle}>
                                <Text style={{fontWeight: 'bold', fontSize: 17}}>互助规则</Text>
                            </View>
                        </View>
                        <View style={styles.PlansRulesView}>
                            <View style={styles.PlansRulesZiView}>
                                <View style={styles.PlansRulesTitlteView}><Text
                                    style={styles.PlansRulesTitlte}>加入条件</Text></View>
                                <View style={styles.PlansRulesContentView}><Text style={styles.PlansRulesContent}>向账户余额充值150元即可加入</Text></View>
                            </View>
                            <View style={styles.emptyForLineForRules}></View>
                            <View style={styles.PlansRulesZiView}>
                                <View style={styles.PlansRulesTitlteView}><Text
                                    style={styles.PlansRulesTitlte}>分摊规则</Text></View>
                                <View style={styles.PlansRulesContentView}><Text style={styles.PlansRulesContent}>发生互助时，全体分摊，单次上限3元</Text></View>
                            </View>
                            <View style={styles.emptyForLineForRules}></View>
                            <View style={styles.PlansRulesZiView}>
                                <View style={styles.PlansRulesTitlteView}><Text
                                    style={styles.PlansRulesTitlte}>健康要求</Text></View>
                                <View style={styles.PlansRulesContentView}><Text style={styles.PlansRulesContent}>加入本互助计划时，需无重大疾病病史以及相关症状就诊记录，无慢性病史</Text></View>
                            </View>
                            <View style={styles.emptyForLineForRules}></View>
                            <View style={styles.PlansRulesZiView}>
                                <View style={styles.PlansRulesTitlteView}><Text
                                    style={styles.PlansRulesTitlte}>会员延续条件</Text></View>
                                <View style={styles.PlansRulesContentView}><Text style={styles.PlansRulesContent}>账户余额大约等于150元</Text></View>
                            </View>
                        </View>

                        <View style={styles.emptyForLine}></View>

                        <View style={styles.huzhuJianjie}>
                            <View style={styles.huzhuJianjieTitle}>
                                <Text style={{fontWeight: 'bold', fontSize: 17}}>互助申请流程</Text>
                            </View>
                        </View>
                        <View style={styles.plansBuzhouAllView}>
                            <View style={styles.PlansBuzhouImgView}>
                                <Image source={require('../img/buzhouyuandian.png')}/>
                                <View style={styles.emptyViewForSolidLine}></View>
                                <Image source={require('../img/buzhouyuandian.png')}/>
                                <View style={styles.emptyViewForSolidLine}></View>
                                <Image source={require('../img/buzhouyuandian.png')}/>
                                <View style={styles.emptyViewForSolidLine}></View>
                                <Image source={require('../img/buzhouyuandian.png')}/>
                            </View>
                            <View style={styles.PlansBuzhouContentView}>
                                <View style={styles.PlansLiuChengContentView}>
                                    <Text style={styles.PlansLiuChengContentBigFont}>准备材料</Text>
                                    <Text style={styles.PlansLiuChengContentSmallFont}>申请材料具体详见《常见问题》</Text>
                                </View>
                                <View style={styles.PlansLiuChengContentView}>
                                    <Text style={styles.PlansLiuChengContentBigFont}>申请互助</Text>
                                    <Text style={styles.PlansLiuChengContentSmallFont}>拨打客服热线1010-1019，提交相关材料</Text>
                                </View>
                                <View style={styles.PlansLiuChengContentView}>
                                    <Text style={styles.PlansLiuChengContentBigFont}>事件调查</Text>
                                    <Text style={styles.PlansLiuChengContentSmallFont}>平台初审并交付第三方权威调查机构调查</Text>
                                </View>
                                <View style={styles.PlansLiuChengContentView}>
                                    <Text style={styles.PlansLiuChengContentBigFont}>资金划款</Text>
                                    <Text style={styles.PlansLiuChengContentSmallFont}>公式无异议后，建设银行直接划款</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.emptyForLine}></View>
                        <View style={styles.huzhuJianjie}>
                            <View style={styles.huzhuJianjieTitle}>
                                <Text style={{fontWeight: 'bold', fontSize: 17}}>运营支持</Text>
                            </View>
                        </View>
                        <View style={styles.huzhujianjieView}>
                            <View style={styles.huzhujianjieImage}>
                                <View style={[styles.huzhueduImageView, {justifyContent: 'center'}]}>
                                    <Image source={require('../img/bank.png')}/>
                                </View>
                                <View>
                                    <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>建设银行设立专户</Text>
                                </View>
                            </View>
                            <View style={styles.huzhujianjieImage}>
                                <View style={[styles.huzhueduImageView, {justifyContent: 'center'}]}>
                                    <Image source={require('../img/gongyi.png')}/>
                                </View>
                                <View>
                                    <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>公益基金会专业监督</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.huzhujianjieView}>
                            <View style={styles.huzhujianjieImage}>
                                <View style={[styles.huzhueduImageView, {justifyContent: 'center'}]}>
                                    <Image source={require('../img/kuaiji.png')}/>
                                </View>
                                <View>
                                    <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>会计事务所精准审计</Text>
                                </View>
                            </View>
                            <View style={styles.huzhujianjieImage}>
                                <View style={[styles.huzhueduImageView, {justifyContent: 'center'}]}>
                                    <Image source={require('../img/xinxigongbu.png')}/>
                                </View>
                                <View>
                                    <Text style={{fontSize: 11, marginTop: 5, color: '#9B9B9B'}}>信息实时公布接受监督</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.emptyForLine}></View>
                        <View style={styles.huzhuJianjie}>
                            <View style={styles.huzhuJianjieTitle}>
                                <Text style={{fontWeight: 'bold', fontSize: 17}}>常见问题</Text>
                            </View>
                        </View>

                        {/*第一个常见问题View*/}
                        <View style={{width: width - 50}}>
                            <TouchableOpacity style={styles.PagePlansQiyeDabingQuestions}
                                              onPress={this.changeDisplay.bind(this)}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4a4a4a'}}>1.什么是互助行动</Text>
                                {this.state.display == 'none' ?
                                    <Image source={require('../img/turnDown.png')}/> :   //显示方式为none的时候 箭头向下
                                    <Image source={require('../img/turnUp.png')}/>    //显示方式为flex的时候 箭头向上
                                }
                            </TouchableOpacity>
                            <View display={this.state.display} style={styles.PagePlansQiyeDabingAnswer}>
                                <Text style={styles.PagePlansQiyeDabingAnswerContent}>
                                    这里面用来介绍什么是互助行动，同事要进行显隐的控制显示
                                </Text>
                            </View>
                        </View>
                        {/*第二个常见问题*/}
                        <View style={{width: width - 50}}>
                            <TouchableOpacity style={styles.PagePlansQiyeDabingQuestions}
                                              onPress={this.changeDisplay2.bind(this)}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4a4a4a'}}>2.什么是互助行动</Text>
                                {this.state.display2 == 'none' ?
                                    <Image source={require('../img/turnDown.png')}/> :   //显示方式为none的时候 箭头向下
                                    <Image source={require('../img/turnUp.png')}/>    //显示方式为flex的时候 箭头向上
                                }
                            </TouchableOpacity>
                            <View display={this.state.display2} style={styles.PagePlansQiyeDabingAnswer}>
                                <Text style={styles.PagePlansQiyeDabingAnswerContent}>
                                    这里面用来介绍什么是互助行动，同事要进行显隐的控制显示
                                </Text>
                            </View>
                        </View>
                        {/*第三个常见问题*/}
                        <View style={{width: width - 50}}>
                            <TouchableOpacity style={styles.PagePlansQiyeDabingQuestions}
                                              onPress={this.changeDisplay3.bind(this)}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4a4a4a'}}>3.什么是互助行动</Text>
                                {this.state.display3 == 'none' ?
                                    <Image source={require('../img/turnDown.png')}/> :   //显示方式为none的时候 箭头向下
                                    <Image source={require('../img/turnUp.png')}/>    //显示方式为flex的时候 箭头向上
                                }
                            </TouchableOpacity>
                            <View display={this.state.display3} style={styles.PagePlansQiyeDabingAnswer}>
                                <Text style={styles.PagePlansQiyeDabingAnswerContent}>
                                    这里面用来介绍什么是互助行动，同事要进行显隐的控制显示
                                </Text>
                            </View>
                        </View>


                        <View style={{width: width, height: 200}}></View>

                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.DabingChongzhiButton} onPress={this.goHuzhuGongyue.bind(this)}>
                    <Text style={{color: 'white'}}>申请加入</Text>
                </TouchableOpacity>
                <LoadingInPage modalVisible={this.state.loading}/>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    QiyeDabingMaxView: {
        backgroundColor: '#fcfcfc',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    PagePlansQiyeDabingAnswerContent: {
        margin: 15,
        fontSize: 12,
        color: '#4a4a4a'

    },
    PagePlansQiyeDabingAnswer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    PagePlansQiyeDabingQuestions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    emptyForLine: {
        width: width,
        height: 5,
        backgroundColor: '#f7f7f7'
    },
    HeaderView: {
        flexDirection: 'column',
        width: width - 30,
    },
    PlansAndImage: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    HeaderPlans: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    HeaderImage: {
        width: width * 0.5,
        height: 130
    },
    PlansTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    PlansHeaderFont: {
        fontSize: 11,
        marginTop: 13,
        marginLeft: 10
    },
    PlansMoneyAndPeopleNumberView: {
        flexDirection: 'row',
        width: width - 30,
        justifyContent: 'space-between',
        height: 75,
    },
    PlansMoneyAndPeopleNumber: {
        width: width * 0.3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PlansMoneyNumber: {
        fontSize: 11
    },
    huzhuJianjie: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 30,
    },
    huzhuJianjieTitle: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50
    },
    huzhueduImageView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    huzhujianjieView: {
        width: width * 0.75,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    PlansRulesView: {
        width: width - 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlansRulesZiView: {
        width: width - 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    PlansRulesTitlteView: {
        width: 110,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    PlansRulesContentView: {
        width: 100,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    PlansRulesTitlte: {
        fontSize: 13,
    },
    PlansRulesContent: {
        fontSize: 11,
        color:'#4A4A4A',
        lineHeight:14
    },
    emptyForLineForRules: {
        width: width - 40,
        height: 1 / ratio,
        backgroundColor: '#d1d1d1'
    },
    emptyViewForSolidLine: {
        width: 1 / ratio,
        height: 30,
        backgroundColor: '#D8D8D8'
    },
    PlansBuzhouView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plansBuzhouAllView: {
        flexDirection: 'row',
        width: width - 40,
    },
    PlansBuzhouImgView: {
        width: 50,
        flexDirection: 'column',
        alignItems: 'center',
    },
    PlansBuzhouContentView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    PlansLiuChengContentView: {
        height: 46,
        width: width - 90,
    },
    PlansLiuChengContentBigFont: {
        fontSize: 15,
    },
    PlansLiuChengContentSmallFont: {
        fontSize: 11,
        color: '#9B9B9B',
        marginTop: 5
    },
    DabingChongzhiButton: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 50,
        backgroundColor: '#008BE6'
    },

});



















