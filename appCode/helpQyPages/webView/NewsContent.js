import{
    StyleSheet,
    View,
    WebView
} from 'react-native';
import React,{ Component } from 'react';
export  default  class NewsContent extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        return(
            <View style={styles.container}>
                <WebView source={{uri:this.props.navigation.state.params.newsUrl}}/>
                {/*<WebView source={{uri:}this.props.navigation.state.params.newsUrl}/>*/}
            </View>
        );
    }
}

let styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F9FFFC',
    }
});