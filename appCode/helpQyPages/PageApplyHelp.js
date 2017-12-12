/**
 * 这个是申请救助页面
 */
import {
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View,
    PixelRatio,
} from 'react-native';
import React, {Component} from 'react';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
export default class PageApplyHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: true,
        };
    }

    componentDidMount() {
        //这里要获取已经加入的人数
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={styles.progressWrapper}>
                        <Text style={{color: '#4a4a4a', fontSize: 20, fontWeight: 'bold'}}>救助流程</Text>
                    </View>
                </View>
                {/**/}
                <View style={styles.commonWrapper}>
                    <View style={styles.common}>
                        {/*<Image source={require('./img/1@2x.png')} resizeMode={'contain'} style={{height: 20}}/>*/}
                        <Text style={styles.jiuzhuNumber}>1.</Text>
                        <View>
                            <Text style={styles.jiuzhu}>电话申请互助 400-0539-588；</Text>
                        </View>
                    </View>

                    <View style={styles.common}>
                        {/*<Image source={require('./img/2@2x.png')} resizeMode={'contain'} style={{height: 20}}/>*/}
                        <Text  style={styles.jiuzhuNumber}>2.</Text>

                        <View>
                            <Text style={styles.jiuzhu}>准备申请材料，齐全后在线提交；</Text>
                        </View>
                    </View>
                    <View style={styles.common}>
                        {/*<Image source={require('./img/3@2x.png')} resizeMode={'contain'} style={{height: 20}}/>*/}
                        <Text style={styles.jiuzhuNumber}>3.</Text>

                        <View>
                            <Text style={styles.jiuzhu}>第三方机构调查核实，调查费用由互助申请方承担，葡萄互助会及时与互助申请方沟通具体费用及打款方式，以实际费用为准；
                            </Text>
                        </View>
                    </View>
                    <View style={styles.common}>
                        {/*<Image source={require('./img/4@2x.png')} resizeMode={'contain'} style={{height: 20}}/>*/}
                        <Text style={styles.jiuzhuNumber}>4.</Text>
                        <View>
                            <Text style={styles.jiuzhu}>向全体会员公示，通过后打款。</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomer}>
                    <Text style={styles.jiuzhu}>如已度过等待期，且需申请互助金
                        请拨打400-0539-588</Text>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    jiuzhuNumber:{
        fontSize: 14,
        lineHeight: 20,
    },
    jiuzhu: {
        fontSize: 14,
        lineHeight: 20,
        width: width * 0.7
    },
    commonWrapper: {
        marginLeft: 20,

    },
    common: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 30
    },

    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    progressWrapper: {
        width: 140,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40
    }

});





















