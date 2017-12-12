/**
 * @Author: songshifeng
 * @Description: 轮播图组件
 */


import {
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    View,
    PixelRatio,
    Image,
} from 'react-native';

import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import UploadFile from '../utils/uploadFile';
import {UrlGetPayMessage} from '../utils/url';
// 屏幕宽度
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();


class FocusImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            items: []
        };
    }

    componentDidMount() {
        var item;
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0: {
                    item = require('./img/LunboFri.png');
                    break;
                }
                case 1: {
                    item = require('./img/LunboSec.png');
                    break;
                }
                default: {
                    item = require('./img/LunboThr.png');
                    break;
                }
            }
            this.state.items.push(item);

        }
        this.setState({
            isShow: true,
            items: this.state.items
        })
    }


    render() {
        let H = 200;
        if (this.state.isShow) {
            return (
                <View style={{height: H, alignItems: 'center', backgroundColor: 'white'}}>

                        <Swiper autoplay={true} height={H}  showsPagination={true} dotColor="white"
                                activeDotColor='#0086eb' horizontal={true} >
                            {
                                this.state.items.map((item, index) => {
                                    //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                                    return (<Image style={{height: H, width: width}} key={index} resizeMode='cover'
                                                   source={this.state.items[index]}/>)

                                })
                            }

                        </Swiper>
                </View>
            );
        } else {
            return (
                <View style={{height: H, width: width, backgroundColor: 'green'}}/>
            );
        }
    }

}

const styles = {
    buttonText: {

    }
};


module.exports = FocusImage;