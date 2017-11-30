import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    Image,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
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
const styles = StyleSheet.create({
    newsZongView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    newsTypeone: {
        width: width - 30,
        marginLeft: 15,
        marginRight: 15,
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    newsTypeoneImg: {},
    newsTypeoneTitleAndTypeView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 227,
        height: 120,
        flex: 1
    },
    newsTypeoneImgView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 130,
        height: 120,
    },
    newsTypeoneImg: {
        width: 90,
        height: 90,
    },
    newsTypeoneTitleAndType: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4B4B4B'
    },
    newsTypeoneAuthorAndDate: {
        alignSelf: 'flex-start',
        marginTop: 12,
        color: '#a3a7b1',
        fontSize: 12
    },
    bottomLine: {
        width: width - 30,
        height: 1 / ratio,
        backgroundColor: '#d2d4d9'
    },
    newsTypeTwo:{
        flexDirection:'column',
        width:width-30,
    },
    newsTypeTwoImg:{
        width:width-30,
        height:180
    },
    newsTypeTwoTitleAndType:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4B4B4B',
        marginTop:15
    },
    newsTypeTwoAuthorAndDate:{
        marginTop: 12,
        color: '#a3a7b1',
        fontSize: 12
    },
})
