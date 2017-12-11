import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import React, {Component} from 'react';
let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();


import  NewsItemAndroid from  './AndroidStyle/NewsItemAndroid';
import  NewsItemiOS  from  './iOSStyle/NewsItemiOS';
let styles=null;
if (Platform.OS==='android') {
    styles=NewsItemAndroid;

}else{
    styles=NewsItemiOS;
}

export default class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageOne: '',
            publishdate:''
        }
    }
    componentDidMount() {


        //格式化时间
        let publishdate=this.props.row.publishdate;

        let date = new Date(publishdate);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        let pubTime=Y+M+D


        this.setState({
            imageOne: this.props.row.imageone,
            publishdate:pubTime
        })
    }
    goNewsContent(){
        this.props.navigation.navigate('NewsContent',{newsUrl:this.props.row.newsurl})
    }
    render() {
        return (
            <TouchableOpacity onPress={this.goNewsContent.bind(this)} style={styles.newsZongView}>
                {this.props.row.newstype == 1 ?
                    <View style={styles.newsTypeone}>
                        <View style={styles.newsTypeoneTitleAndTypeView}>
                            <Text
                                style={styles.newsTypeoneTitleAndType}>{this.props.row.title}|{this.props.row.lable}</Text>
                            <Text
                                style={styles.newsTypeoneAuthorAndDate}>{this.props.row.author}·{this.state.publishdate}</Text>
                        </View>
                        <View style={styles.newsTypeoneImgView}>
                            <Image style={styles.newsTypeoneImg} source={{uri: this.props.row.imageone}}/>
                        </View>

                    </View>
                    :
                    <View style={styles.newsTypeTwo}>
                        <Image style={styles.newsTypeTwoImg} source={{uri: this.props.row.imageone}}/>
                        <Text style={styles.newsTypeTwoTitleAndType}>{this.props.row.title}|{this.props.row.lable}</Text>
                        <Text style={styles.newsTypeTwoAuthorAndDate}>{this.props.row.author}·{this.state.publishdate}</Text>
                    </View>
                }
                <View style={styles.bottomLine}></View>
            </TouchableOpacity>

        );
    }
}

