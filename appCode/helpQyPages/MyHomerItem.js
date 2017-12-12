/**
 * 这个是我的员工列表
 */
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';
import React, {Component} from 'react';

let width = Dimensions.get('window').width;
export default class MyHomerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            transparent: true,
            theNameOfCategoryType: "",
            lagTime: 0, //距离加入时间的天数
            paytotalmoney: 0,

        };
    }

    componentDidMount() {
        let lagTime = this.getLagTime(this.props.row.joindate); //获取距离加入的天数  int

        if (this.props) {
            this.setState({
                theNameOfCategoryType: this.getCategoryType(this.props.row.categorytype),//互助类型
                lagTime: lagTime, //加入天数
                paytotalmoney: this.props.row.paytotalmoney
            })
        }
    }

    changePayTotalMoneyCallBack = (payNumber) => {
        this.setState({
            paytotalmoney: this.state.paytotalmoney + payNumber
        })
    }


    getLagTime(joindate) {
        let dateNow = new Date();
        let joinDate = new Date(joindate);
        let lagTime = dateNow.getTime() - joinDate.getTime();
        let lagTimeInt = 180 - Math.floor(lagTime / (24 * 3600 * 1000));
        return lagTimeInt;
    }

    getCategoryType(type) {//通过后台的数据获得具体的类型
        if (type == "little")
            return "少儿健康互助";
        if (type == "young")
            return "中青年抗癌计划";
        if (type == "old")
            return "中老年抗癌计划";
        if (type == "zonghe")
            return "综合意外互助";
        if (type == "staff")
            return "员工大病互助";
        if (type == "employee")
            return "员工意外伤害互助";
    }


    goPayForHomer() {
        this.props.navigation.navigate('PagePayForHomer', {
            HelpTypeMessage: this.props.row,
            getNewHomerListCallBack: this.props.getNewHomerListCallBack
        });
    }

    render() {
        return (
            <View style={styles.PageMyHomersMaxView}>
                <View style={styles.PageMyHomersPlansView}>
                    <Text style={styles.plansName}>{this.getCategoryType(this.props.row.categorytype)}</Text>
                </View>
                <View style={styles.PageMyHomersContent}>
                    <Text style={styles.userName}>{this.props.row.username}</Text>
                    <Text style={styles.waitingDate}>等待期{this.getLagTime(this.props.row.joindate)}天</Text>
                    <Text style={styles.waitingDate}>余额￥{this.state.paytotalmoney}</Text>

                    <TouchableOpacity style={styles.PageMyHomersButton} onPress={this.goPayForHomer.bind(this)}>
                        <Text style={{fontSize: 13, color: '#ffffff'}}>充值</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    PageMyHomersMaxView: {
        width: width,
        height: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    PageMyHomersPlansView: {
        width: width - 40,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    plansName:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    waitingDate:{
        fontSize: 13,
        color: '#4a4a4a',
        fontWeight: 'bold'
    },
    userName: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
    },
    PageMyHomersContent: {
        width: width - 40,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PageMyHomersButton: {
        width: 60,
        height: 28,
        borderRadius:5,
        backgroundColor: '#008BE6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});



















