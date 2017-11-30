/**
 * 这个是PagegongShi的渲染想
 */
import{
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import React,{ Component } from 'react';
let {width,height}=Dimensions.get('window');

export default class PublicItem extends Component{
    constructor(props){
        super(props);
        this.state={
            times:"",
            username:"",
            categorytype:"",
            needmoney:0,
            description:""

        }
    }
    componentDidMount(){

        let joinDate=this.props.row.joindate;
        let date = new Date(joinDate);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        let pubTime=Y+M+D

        var categoryType=this.getCategoryType(this.props.row.categorytype);

           this.setState({
               times:pubTime,
               username:this.props.row.username,
               categorytype:categoryType,
               needMoney:this.props.row.needmoney,
               description:this.props.row.description,
           })
    }

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

    _onPressContent(){
        this.props.navigation.navigate('PageDescriptionOfGongshi',{publicMes:this.props.row});
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.publicdate}>
                    <Text>{this.state.times}</Text>
                </View>

                <View style={styles.userProfile}>
                    <Image source={{uri:this.props.row.img1}} style={{width:50,height:50}} resizeMode={'contain'}/>
                    <View style={{marginLeft:10}}>
                        <Text>互助会员：<Text>{this.state.username}</Text></Text>
                        <Text>互助计划：<Text>{this.state.categorytype}</Text></Text>
                        <Text>所需金额：<Text>{this.state.needmoney}</Text></Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{margin:10}}>事件概述：</Text>
                    <Text style={{marginLeft:10,marginRight:10,marginBottom:3}} onPress={this._onPressContent.bind(this)}>
                        {this.state.description}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

let styles=StyleSheet.create({

    publicdate:{
        flexDirection:'row',
        height:40,
        alignItems:'center',
        justifyContent:'flex-start',
        paddingLeft:10,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopColor:'#B8B8B8',
        borderBottomColor:'#B8B8B8'
    },
    userProfile:{
        flexDirection:'row',
        width:width,
        height:50,
        justifyContent:'flex-start',
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:20
    },
});







