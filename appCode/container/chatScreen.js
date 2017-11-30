import {
	Text,
	View,
	Button
} from 'react-native';
import React,{Component} from 'react';
import { StackNavigator} from 'react-navigation';
export default class ChatScreen extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
    }
    static navigationOptions = {
        title: 'ChatScreen',
    };
    render() {

        return (
            <View>
                <Text>Hello, 这个是chatScreen!</Text>
            </View>
        );
    }
}