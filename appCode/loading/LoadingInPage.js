/**
 * 提供加入计划页面，要请求网络展现共有多少人加入，显示loading
 *
 */
import {
    StyleSheet,
    Dimensions,
    View,
    PixelRatio,
    Modal,
    Image,
} from 'react-native';
import React, {Component} from 'react';
import {NativeModules} from 'react-native';
import loadingImg from './img/loading.gif';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
export default class LoadingInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

            modalVisible: this.props.modalVisible,

        };
    }

    render() {
        if(!this.props.modalVisible) {
            return <View />;
        }
        return (

            <View style={styles.PageMessageMaxView}>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.props.modalVisible}
                        onRequestClose={() => {
                            alert("Modal has been closed.")
                        }}>
                        <View style={styles.ModalView}>
                            <View style={styles.AlertView}>
                                <View style={styles.wrapper}>
                                    <View style={styles.main}>
                                        <Image resizeMode={'contain'} source={loadingImg}    style={{width: 32, height: 32}}/>

                                    </View>
                                </View>
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
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 60,
        height: 40
    },
    DownButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        paddingTop: 18,
        paddingRight: 18,
        paddingBottom: 18,
        paddingLeft: 18,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        opacity: 0.65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalView: {
        width: width,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    AlertView: {
        position: 'absolute',
        top: height * 0.5 - 30,
        left: width * 0.5 - 30,
        width: 60,
        height: 60,
        zIndex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
});

















