/**
 * 提供加入计划页面，要请求网络展现共有多少人加入，显示loading
 *
 */
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Modal,
    Image,
    StatusBar,
    TouchableOpacity,
    Button,
} from 'react-native';
import React, {Component} from 'react';
import loadingImg from '../loading/img/loading.gif';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class PageMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            dataSource: [],
            modalVisible: false,
            animated: true,
            hidden: false,
            backgroundColor:'white',
            translucent:false,
            barStyle:'default',
            networkActivityIndicatorVisible:false,
            showHideTransition:'fade',
        };
    }

    render() {

        return (
            <View style={styles.PageMessageMaxView}>
                <StatusBar
                    animated={this.state.animated}
                    hidden={this.state.hidden}
                    backgroundColor={this.state.backgroundColor}
                    translucent={this.state.translucent}
                    barStyle={this.state.barStyle}
                    networkActivityIndicatorVisible={true}
                    showHideTransition={this.state.showHideTransition}/>
                <Button title={this.state.animated?'禁用动画':'使用动画'} onPress={()=>{this.setState({animated:!this.state.animated})}}/>
                <Button title={this.state.hidden?'显示':'隐藏'} onPress={()=>{this.setState({hidden:!this.state.hidden})}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>设置背景色：</Text>
                    <Button title='红色' onPress={()=>{this.setState({backgroundColor:'red'})}}/>
                    <Button title='蓝色' onPress={()=>{this.setState({backgroundColor:'blue'})}}/>
                    <Button title='半透明' onPress={()=>{this.setState({backgroundColor:'#80000000'})}}/>
                </View>
                <Button title={this.state.translucent?'不透明':'透明'} onPress={()=>{this.setState({translucent:!this.state.translucent})}}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>设置样式：</Text>
                    <Button title='default' onPress={()=>{this.setState({barStyle:'default'})}}/>
                    <Button title='light-content' onPress={()=>{this.setState({barStyle:'light-content'})}}/>
                    <Button title='dark-content' onPress={()=>{this.setState({barStyle:'dark-content'})}}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>显示或隐藏动画效果：</Text>
                    <Button title='fade' onPress={()=>{this.setState({showHideTransition:'fade'})}}/>
                    <Button title='slide' onPress={()=>{this.setState({showHideTransition:'slide'})}}/>
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}>
                    <View style={styles.ModalView}>
                        <View style={styles.AlertView}>
                            <View style={{width: width - 80, marginTop: 10}}>
                                <Image source={require('./img/cancel.png')} style={{width: 30, height: 30, alignSelf: 'flex-start'}}/>
                            </View>
                            <View style={{marginTop:25}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>恭喜你，加入成功</Text>
                            </View>
                            <Image source={require('./img/joinSuccess.png')} style={{width: 120, height: 90,marginTop:10}}/>
                            <View style={{marginTop:10}}>
                                <Text>可能是服务器请求失败，请刷新重试</Text>
                            </View>
                            <View style={styles.DownButtonView}>
                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }} style={[styles.DownButton,{width:(width - 60)*0.45,}]}>
                                    <Text>左边按钮</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }} style={[styles.DownButton,{width:(width - 60)*0.55,backgroundColor:'#1296db',}]}>
                                    <Text style={{color:'white'}}>右边按钮</Text>
                                </TouchableOpacity>
                            </View>
                            <Image resizeMode={'contain'} source={loadingImg} style={{width: 32, height: 32}} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    PageMessageMaxView: {
        width: width,
        flex: 1
    },
    DownButtonView: {
        position:'absolute',
        bottom:0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:width - 60,
        height:40
    },
    DownButton:{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ModalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    AlertView: {
        position: 'absolute',
        top: height * 0.3,
        left: 30,
        width: width - 60,
        height: width - 60,
        zIndex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});

















