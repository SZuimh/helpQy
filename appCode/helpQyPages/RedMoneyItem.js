import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
import PageUseRedMoney from './PageUseRedMoney'

let ratio = PixelRatio.get();
export default class RedMoneyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MoneyStatus: "active",
            losefuncdate: "",
            startTime:'',
            endTime: "",
            isPressed: true,
            disabled: false,
        }

    }

    componentDidMount() {

        //格式化时间
        let redmoneyState = this.props.row.redmoneystate;
        let losefuncdate=this.getTime(this.props.row.losefuncdate);//失效时间
        let startTime=this.getTime(this.props.row.redmoneydate)
        this.setState({
            losefuncdate: losefuncdate,
            startTime:startTime,
            MoneyStatus: redmoneyState,
            isPressed: false,
        });
        if (redmoneyState == "used") {
            this.setState({
                isPressed: true,
                disabled: true
            })
        }
    }
    getTime=(timeNeedHandle)=>{
        let date = new Date(timeNeedHandle);
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        // let itemEndTime=Y+M+D;

        let itemEndTime = Y + M + D
        return itemEndTime;
    }
    _onPressButton() {
        this.props.navigation.navigate('PageUseRedMoney', {
            RedMoney: this.props.row,
            changeMoneyStatusCallBack: this.changeMoneyStatus_callBack
        })
    }

    changeMoneyStatus_callBack = () => {
        this.setState({
            MoneyStatus: "used",
            isPressed: true,
            disabled: true,
        });
    }


    render() {
        return (
            <View style={styles.RedMoneyItemMaxView}>
                <View style={styles.RedMoneyItemView}>
                    <Image source={require('./img/redMoneyNew@2x.png')}
                           style={styles.RedMoneyItemImage}>
                        <View></View>
                        <TouchableOpacity disabled={this.state.disabled} style={[
                            styles.RedMoneyItemButton, {backgroundColor: this.state.isPressed ? '#d3d3d3' : '#f5a623',}]}
                                          onPress={this._onPressButton.bind(this)}>
                            <Text style={{
                                color: this.state.isPressed ? 'darkgray' : '#f5d6af'
                            }}>
                                {this.state.isPressed ? '已使用' : '立即使用'}
                            </Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 10, height: 30}}>
                            <Text style={{backgroundColor: '#dd3934', color: '#ffffff'}}>有效期
                                {this.state.startTime}-{this.state.losefuncdate}</Text>
                        </View>
                    </Image>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    RedMoneyItemMaxView: {
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
    },
    RedMoneyItemView: {
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    RedMoneyItemImage: {
        width: width * 0.8,
        borderRadius: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    RedMoneyItemButton: {
        width: width * 0.2,
        height: 30,
        borderRadius: 10,
        alignSelf: 'flex-end',
        marginTop: 40,
        marginRight: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },


})
