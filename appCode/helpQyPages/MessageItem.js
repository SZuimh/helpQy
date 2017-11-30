/**
 * 这个是奖励的列表项
 */

import{
    StyleSheet,
    Text,
    Image,
    Navigator,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import React,{ Component } from 'react';
let {width,height}=Dimensions.get('window');

export default class MessageItem extends Component{
    constructor(props){
        super(props);
        // console.log(this.props);
        this.state={

        }
    }
    componentWillMount(){
    }
    componentWillReceiveProps(nextProps) {

    }

    render(){
        return(
            <View>
                <Text>{this.props.row.messageNumber}</Text>
            </View>
        );
    }
}

let styles=StyleSheet.create({



});















