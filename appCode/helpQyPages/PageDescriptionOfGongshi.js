import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
export default class PageDescriptionOfGongshi extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: '公示详情',
        headerRight:(
            <View></View>
        ),
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center'
        }
    };
    getPublicTime(publictime){
        let date = new Date(publictime);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate()+' ';
        if (D>=0 && D<=9) {
            D="0"+D;
            let finalDate=Y+M+D;
            return finalDate;
        }
    };

    getCategoryType(type){//通过后台的数据获得具体的类型
        if(type=="little")
            return "少儿健康互助";
        if(type=="young")
            return "中青年抗癌计划";
        if(type=="old")
            return "中老年抗癌计划";
        if(type=="yiwai")
            return "综合意外互助";
        if(type=="staff")
            return "员工大病互助";
        if(type=="employee")
            return "员工意外伤害互助";
    }

    render() {
        const{ params } =this.props.navigation.state;
        return (
            <ScrollView>
                <View style={styles.SecondView}>
                    <Text style={styles.TopFont}>本事件公示期已结束，为保护受助者隐私，已将个人信息隐藏</Text>
                    <View style={styles.PersonPhotoView}>
                        <View style={styles.PersonImgView}>
                            <Image  source={{uri:params.publicMes.img1}} style={styles.PersonImg}/></View>
                        <View style={styles.PersonImgRightView}>
                            <View style={styles.NameAndQuestion}>
                                <Text>{params.publicMes.username}</Text>
                                <Text style={styles.SecondViewBlueFont}>对事件有疑问?</Text>
                            </View>
                            <View style={styles.SexAndAgeView}>
                                <Text style={styles.SexAndAge}>男</Text>
                                <Text style={styles.SexAndAge}>40岁</Text>
                                <Text style={styles.SexAndAge}></Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.SecondView}>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>互助计划</Text>
                        <Text>{this.getCategoryType(params.publicMes.categorytype)}</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>加入日期</Text>
                        <Text>{this.getPublicTime(params.publicMes.joindate)}</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>生效日期</Text>
                        <Text>{this.getPublicTime(params.publicMes.effectdate)}</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>参与人数</Text>
                        <Text>{params.publicMes.length}12355546</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>所需互助金</Text>
                        <Text>{params.publicMes.needmoney}+50000</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>公示日期</Text>
                        <Text>{this.getPublicTime(params.publicMes.joindate)}</Text>
                    </View>
                    <View style={styles.DataView}>
                        <Text style={styles.DataViewFont}>划款日期</Text>
                        <Text>{this.getPublicTime(new Date())}</Text>
                    </View>
                </View>


                <View  style={styles.SecondView}>
                    <View style={styles.ContentView}>
                        <Text style={styles.DescriptionTitle}>
                            事件情况
                        </Text>
                        <View style={styles.solidLine}></View>
                        <Text style={styles.DescriptionContentNoPoint}>
                            {params.publicMes.description}
                        </Text>
                    </View>
                </View>

                <View  style={styles.SecondView}>
                    <View style={styles.ContentView}>
                        <Text style={styles.DescriptionTitle}>
                            调查过程
                        </Text>
                        <View style={styles.solidLine}></View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.diaochaprocess1}

                            </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.diaochaprocess2}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.diaochaprocess3}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.diaochaprocess4}

                            </Text>
                        </View>
                    </View>
                </View>
                <View  style={styles.SecondView}>
                    <View style={styles.ContentView}>
                        <Text  style={styles.DescriptionTitle}>
                            互助详情
                        </Text>
                        <View style={styles.solidLine}></View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.helpdetailone}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.pointStyle}></View>
                            <Text  style={styles.DescriptionContentWithPoint}>
                                {params.publicMes.helpdetailtwo}
                            </Text>
                        </View>
                    </View>
                </View>
                <View  style={styles.SecondView}>
                    <View style={styles.ContentView}>
                        <Text style={styles.DescriptionTitle}>
                            相关材料
                        </Text>
                        <View style={styles.solidLine}></View>
                        <View style={styles.ImageView}>
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                            <Image source={{uri:params.publicMes.img1}} style={styles.Image} />
                        </View>
                    </View>
                </View>
            </ScrollView>


        );
    }
}
const styles = StyleSheet.create({
    SecondView:{
        width:width,
        marginTop:8,
        borderRadius:20
    },
    DataView:{
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:1,
        backgroundColor:'#FFFFFF',
        height:40,
        alignItems:'center'
    },
    ContentView:{
        flexDirection:'column',
        alignItems:'flex-start',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFFFFF'
    },
    pointStyle:{
        width:5,
        height:5,
        borderRadius:2.5,
        backgroundColor:'#BDBDBD',
        margin:6,
        marginTop:11
    },
    DescriptionTitle:{
        marginTop:8,
        color:'#2b2b2b',
        marginBottom:8
    },
    solidLine:{
        borderColor:'#e9e9ef',
        borderWidth:1/ratio,
        width:width
    },
    DescriptionContentNoPoint:{
        marginTop:5,
        marginBottom:5,
        color:'#2b2b2b',
        fontSize:13
    },
    DescriptionContentWithPoint:{
        marginTop:5,
        marginBottom:5,
        paddingRight:15,
        fontSize:13,
        color:'#2b2b2b',
    },
    ImageView:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    Image:{
        width:width*0.26,
        height:width*0.26,
        margin:8,
    },
    TopFont:{
        fontSize: 11,
        textAlign:'center',
        paddingLeft: 10,
        height:20,
        paddingTop:3,
        color:'#a5a5a5'
    },
    SexAndAge:{
        color:'#a5a5a5',
        flex:1
    },
    SexAndAgeView:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 12
    },
    SecondViewBlueFont:{
        color:'#62afe8',
        fontSize:12
    },
    NameAndQuestion:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    PersonPhotoView:{  //第二个View
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingRight: 10
    },
    PersonImgView:{  //放置头像的View
        marginTop: 15,
        marginBottom: 15,
        flex: 1
    },
    PersonImgRightView:{
        flexDirection: 'column',
        flex: 4,
        marginRight: 1
    },
    PersonImg:{
        width: 50,
        height: 50
    },
    DataViewFont:{
        color:'#2B2B2B'
    }


})
