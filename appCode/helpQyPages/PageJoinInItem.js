import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    TextInput,
    Modal,
    Image,
} from 'react-native';
import React, {Component} from 'react';

let {width, height} = Dimensions.get('window');
let ratio = PixelRatio.get();
export default class PageJoinInItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'fade',
            modalVisible: false,
            transparent: true,
            moneyNumber: 0,
            nickName: '',
            IDCard: '',
            userUUID: "",
            testValue: ''
        }

    }

    componentDidMount() {
        this.setState({
            nickName: this.props.row.nickName,
            IDCard: this.props.row.IDCard,
            moneyNumber: this.props.row.moneyNumber
        })
    }


    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    checkMoney(moneyNumber) {

        this.setModalVisible(!this.state.modalVisible);
        let {changeMoneyNumberCallBack} = this.props;
        changeMoneyNumberCallBack(this.props.row.number, moneyNumber)
    }

    handleIDCardChange(event) {

        let {changeIDCardCallBack} = this.props;
        changeIDCardCallBack(this.props.row.number, event.nativeEvent.text);
    }

    handleNickNameChange(event) {

        let {changeNickNameCallBack} = this.props;
        changeNickNameCallBack(this.props.row.number, event.nativeEvent.text)

    }

    _addEmployee(param) {
        let {addEmployeeCallBack} = this.props;
        addEmployeeCallBack(param);
    }

    _deleteEmployee(deleteEmployeeNumber) {
        let {deleteEmployeeCallBack} = this.props;
        deleteEmployeeCallBack(deleteEmployeeNumber)
    }

    render() {

        return (
            <View>
                <View style={{backgroundColor: 'white'}}>
                    <View style={styles.addButton}>
                        <View></View>
                        <View></View>
                        {
                            this.props.row.number == 0 ?
                                <View></View> :
                                <TouchableOpacity onPress={this._deleteEmployee.bind(this, this.props.row.number)}>
                                    <Text style={styles.deleteButton}>删除</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.inputsWrap}>
                    <View style={styles.InputView}>
                        <View style={styles.email}>
                            <View style={styles.labelWrap}>
                                <Text style={styles.emailText}>姓 名</Text>
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.passwordinput}
                                    placeholder='请输入被保障人的真实姓名'
                                    keyboardType='default'
                                    maxLength={30}
                                    ref='refemail'
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    clearTextOnFocus={false}
                                    keyboardAppearance='dark'
                                    autoCorrect={false}
                                    defaultValue={this.state.nickName}
                                    onBlur={this.handleNickNameChange.bind(this)}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputView}>
                        <View style={styles.email}>
                            <View style={styles.labelWrap}>
                                <Text style={styles.emailText}>身份证</Text>
                            </View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.passwordinput}
                                    placeholder='被保障人的身份证号'
                                    keyboardType='email-address'
                                    maxLength={30}
                                    ref='refemail2'
                                    autoCapitalize='none'
                                    clearButtonMode='always'
                                    clearTextOnFocus={false}
                                    keyboardAppearance='dark'
                                    autoCorrect={false}
                                    defaultValue={this.state.IDCard}
                                    onBlur={this.handleIDCardChange.bind(this)}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputView}>
                        <View style={[styles.email, {width: width - 30}]}>
                            <View style={[styles.labelWrap, {borderBottomColor: '#FFFFFF'}]}>
                                <Text style={styles.emailText}>充 值</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <View style={[styles.inputWrap, {borderBottomColor: '#FFFFFF', width: width - 106}]}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'black'
                                    }}>{this.state.moneyNumber}(元)</Text>
                                    <Image source={require('./img/turnDown.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.addButtonView}>
                    <View></View>
                    {
                        this.props.row.number + 1 == this.props.length ?
                            <View>
                                {this.props.row.number == 4 ?
                                    <View style={styles.addButtonViewOfPageJoin}>
                                        <Text style={{marginTop: 15, fontSize: 14, color: '#008BE6', marginLeft: 10}}>一次最多添加5位家人</Text>
                                    </View> :
                                    <View style={styles.addButtonViewOfPageJoin}>
                                        <TouchableOpacity style={styles.ImageAndTextButton}
                                                          onPress={this._addEmployee.bind(this, this.props.row.number + 1)}>
                                            <Image source={require('./img/AddSomeOne.png')}/>
                                            <Text style={{fontSize: 14, color: '#008BE6', marginLeft: 10}}>添加一个</Text>
                                        </TouchableOpacity>
                                    </View>}
                            </View> :
                            <View/>
                    }
                    <View></View>
                </View>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}>
                    <View style={styles.modalMaxView}>
                        <View style={styles.selectPayMoneyWrapper}>
                            <View style={styles.selectPayMoney}>
                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(false)
                                }}>
                                    <Text style={{width: 40,color:'#0086Eb'}}>取消</Text>
                                </TouchableOpacity>
                                <Text>选择充值金额</Text>
                                <Text style={{width: 40}}></Text>
                            </View>
                            {/*温馨提示*/}
                            <View style={styles.tips}>
                                <Text style={{fontWeight: 'bold', fontSize: 12}}>温馨提示:</Text>
                                <Text style={{fontSize: 12, color: '#949697'}}>建议充值30以上，避免余额不足失去保障</Text>
                            </View>
                            {/*充值金额*/}
                            <View style={styles.itemMoneyS}>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(0.01)
                                }} style={styles.itemMoney}>
                                    <View>
                                        <Text>0.01元</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(30)
                                }} style={[styles.itemMoney, styles.moneySpecial]}>
                                    <View>
                                        <Text>30元</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(50)
                                }} style={styles.itemMoney}>
                                    <View>
                                        <Text>50元</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemMoneyS}>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(100)
                                }} style={styles.itemMoney}>
                                    <View>
                                        <Text>100元</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(150)
                                }} style={[styles.itemMoney, styles.moneySpecial]}>
                                    <View>
                                        <Text>150元</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney(300)
                                }} style={styles.itemMoney}>
                                    <View>
                                        <Text>300元</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    ButtonView: {
        width: width,
        height: 15,
        backgroundColor: 'white'
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 45,
    },
    emailText: {
        fontSize: 13,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    InputView: {
        width: width,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    labelWrap: {
        height: 44,
        justifyContent: 'center',
        width: 60,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1 / ratio,
    },

    chongzhiButton: {
        width: width * 0.9,
        height: 40,
        backgroundColor: '#1296db',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginwrap: {
        flexDirection: 'row',
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: 46,
    },

    chongzhiButtonView: {
        justifyContent: 'center',
        marginTop: 50,
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    inputWrap: {
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        height: 44,
        width: width - 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1 / ratio
    },
    passwordinput: {
        height: 45,
        width: width - 90,
        fontSize: 14,
        paddingLeft: 10,
    },
    modalMaxView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width,
        height: height,
        backgroundColor:'rgba(0,0,0,0.4)',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    selectPayMoneyWrapper: {
        height: 0.35 * height,
        backgroundColor: '#fff',
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderRadius:15,
        zIndex: 5
    },
    selectPayMoney: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1 / ratio,
    },
    tips: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    itemMoneyS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    itemMoney: {
        backgroundColor: '#EDEEEF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 60,
        flex: 1,
        marginTop: 3
    },
    moneySpecial: {
        marginLeft: 3,
        marginRight: 3
    },
    addButton: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
    },
    addButtonView: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,


    },
    deleteButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#008BE6'
    },
    addButtonViewOfPageJoin: {
        width: width,
        height: 400,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    ImageAndTextButton: {
        marginTop: 15,
        width: width,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
