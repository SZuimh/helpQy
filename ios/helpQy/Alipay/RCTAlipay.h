//
//  RCTAlipay.h
//  helpQy
//
//  Created by wht on 2017/9/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AlipaySDK/AlipaySDK.h>
#import <React/RCTBridgeModule.h>
//#import <React/RCTEventEmitter.h>
//#import "RCTEventEmitter.h"


@interface RCTAlipay : NSObject<RCTBridgeModule>

+ (instancetype) shareInstance;

- (BOOL) handleOpenURL:(NSURL *)url;

+(void) handleCallback:(NSURL *)url;

@end
