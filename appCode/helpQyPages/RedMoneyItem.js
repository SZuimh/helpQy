import{
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import React,{ Component } from 'react';

let {width,height}=Dimensions.get('window');
import PageUseRedMoney from './PageUseRedMoney'
let ratio = PixelRatio.get();
export default class RedMoneyItem extends Component{
    constructor(props){
        super(props);
        this.state={
            MoneyStatus:"active",
            losefuncdate:"a",
            endTime:"",
            isPressed:true,
            disabled:false,
        }

    }

    componentDidMount(){

        //格式化时间
        let timeNeedHandle=this.props.row.losefuncdate;
        let redmoneyState=this.props.row.redmoneystate;

        let date = new Date(timeNeedHandle);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        // let itemEndTime=Y+M+D;

        let itemEndTime=Y+M+D

        this.setState({
            losefuncdate:itemEndTime,
            MoneyStatus:redmoneyState,
            isPressed:false,
        });
        if(redmoneyState=="used"){
            this.setState({
                isPressed:true,
                disabled:true
            })
        }
    }

    _onPressButton(){
        this.props.navigation.navigate('PageUseRedMoney',{RedMoney:this.props.row,changeMoneyStatusCallBack:this.changeMoneyStatus_callBack})
    }
    changeMoneyStatus_callBack=()=>{
        this.setState({
            MoneyStatus: "used",
            isPressed:true,
            disabled:true,
        });
    }


    render(){
        return(
            <View style={styles.ZongView}>
                <View style={styles.MoneyAndStatusView}>
                    <View style={styles.MoneyView}>
                        <Text style={{textAlign:'center',color:'#f44e38'}}>￥<Text style={{textAlign:'center',color:'#f44e38',fontSize:45,fontWeight:'bold'}}>5</Text></Text>
                    </View>
                    <View  style={styles.StatusView}>
                        <Text style={styles.StatusFont}>{this.state.losefuncdate}过期</Text>
                    </View>
                </View>
                <View style={styles.BashedLine}></View>

                <View  style={styles.ButtonView}>
                    <TouchableOpacity disabled={this.state.disabled} style={{width:80,
                        height:30,
                        // backgroundColor:'#fa543c',
                        backgroundColor:this.state.isPressed?'#d3d3d3':'#fa543c',
                        borderRadius:30,
                        flexDirection:'row',
                        justifyContent:'center',
                        alignSelf:'center',}} onPress={this._onPressButton.bind(this)}>

                        <Text style={{textAlign:'center', height:30, lineHeight:30, borderRadius:30,
                            color:this.state.isPressed?'darkgray':'#f5d6af'
                        }}>{this.state.isPressed?'已使用':'立即使用'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
}
}
const styles=StyleSheet.create({
    ZongView: {
        flex:1,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        height:100,
        marginTop:15,
        width:width,
        paddingLeft:10,
        paddingRight:10
    },
    MoneyView: {
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#fdfdfd',
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        width:width*0.2,
        height:100
    },
    StatusView:{
        alignContent:'center',
        justifyContent:'center',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:'#fdfdfd',
        flex:1
    },
    MoneyAndStatusView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:4
    },
    ButtonView:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        backgroundColor:'#fdfdfd',
        width:width*0.35,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
        height:100
    },
    BashedLine:{
        borderColor:'black',
        marginTop:10,
        marginBottom:10,
        width:1/ratio,
        height:90
    },
    Button:{
        width:80,
        height:30,
        backgroundColor:'#fa543c',
        borderRadius:30,
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
    },
    ButtonFont:{
        textAlign:'center',
        height:30,
        lineHeight:30,
        borderRadius:30,
        color:'#f5d6af'
    },
    StatusFont:{
    textAlign:'center',
    fontSize:10
    }

})
