/**
 * 这个是奖励的列表
 */
import{
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PixelRatio,
    Text
} from 'react-native';

import  React,{Component,} from 'react';
let ratio = PixelRatio.get();
let { width,height}=Dimensions.get('window');

export  default  class MoneyChoices extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            backgroundColor:'#1296db',
            money:0
        };
    }

    componentWillMount(){
        let {id,onCheck}=this.props;
        this.setState({
            money:id
        })
    }
    onPress(){
        let {id,onCheck}=this.props;
        this.setState({
            money:id
        })
        onCheck(id);
    }

    render(){
        let backGrounpColor=this.props.checked ? this.state.backgroundColor:'#FFFFFF';
        let fontColor=this.props.checked?'#FFFFFF':this.state.backgroundColor;

        return(
            <View style={{margin:5}}>
                <TouchableOpacity onPress={this.onPress.bind(this)}
                                  style={[styles.TonchStyle,{backgroundColor:backGrounpColor,}]}>
                    <Text style={{color:fontColor,fontSize:15}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.money}</Text>元
                    </Text>
                </TouchableOpacity>
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
    TonchStyle:{
        borderWidth:1/ratio,
        borderColor:'#1296db',
        width:width*0.35,
        height:60,
        borderRadius:4,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
});



















