//
//  RCTAlipay.m
//  helpQy
//
//  Created by wht on 2017/9/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTAlipay.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "Order.h"
#import "APAuthV2Info.h"
#import "RSADataSigner.h"


#define deappscheme @"alipayhelpQy"

//static RCTPromiseResolveBlock _resolve;
//static RCTPromiseRejectBlock _reject;


static RCTAlipay * instance = nil;


@implementation RCTAlipay{
//  RCTPromiseResolveBlock alipayResolve;
//  RCTPromiseRejectBlock alipayReject;
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(pay2, payInfo2:(NSString *)payInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  
  NSLog(@"1111122222222222  %@", payInfo);
  NSString *appID = @"2017081908269445";
  
  // 如下私钥，rsa2PrivateKey 或者 rsaPrivateKey 只需要填入一个
  // 如果商户两个都设置了，优先使用 rsa2PrivateKey
  // rsa2PrivateKey 可以保证商户交易在更加安全的环境下进行，建议使用 rsa2PrivateKey
  // 获取 rsa2PrivateKey，建议使用支付宝提供的公私钥生成工具生成，
  // 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1
  NSString *rsa2PrivateKey = @"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzPgWda/ablHUtPwRwpTYobWCLfbnR5NRlZMfG6YVZ0D1zIt6f4hgq2QA3iMfiUYvr1SIdyAWP1bMrjBElkY6z8sks0wPyrStcEcl5IXb9Xt6LonHGQ8oBafh9Nv2mtigEtdWzI/n1Xn6fWklyFJ4gcl1nlBHF1ZmyVF+Rv+hiR/rwyJaE4TqfHZcDL8PV4gfYEo1W0JiGhyPNYLglVgAXygJfYO/9un0Ob1fi79c+BamSQSwKFvXUBuvJPSlvkSIfhEeY3JWxrQlBlU9wuU+ZDFuBV6kPs04Wz1d0G1smKPK4sFVjmCb7g3AL0VrUNbdjXlSyUIWyCfKwU3v5SDrvAgMBAAECggEAB0tP2S8qkvxApH27BYaDpLOGyUZtiHAigJnQU3TvW09RIN1bZ/BAgYXhL2FemQQuiINc5w9bwpW0u+HwVLIOt536t9tCft6zNAT5SPemqvrwXYhXzvS1RMd2OEpDmkQxbrejoa2mH2kgCAYZlQ3nvXRJ/swUyRM/NPWgCgNgRpeLrI7FiUN7SnJ1yXNDi+njE60IWhosJsxUCncMNjZzvAHA88kh+rewrMrzTkDXJC7R/vNc3ztC+nlxiQO7FNLYm9/udvZ+g4sGdVXG+QPVU0scLs4r3U9PDfcQ045JoMgorDvv7C/cwqPQ4/XH0ycTEY1N2Jny2NVF/z4hKIozEQKBgQD3+5CkQ4MHvZyPAyaQ8hRA2rQHbS7eghJ2PH+XWTBIcAWZcrphCT6IlesvDqtey9b/qm7QknvnJdcpJYH5polmOxBBBadE2uYKzEGe8g1AaefCGMNoUOrwTg+1wyP7NPRLrcMahGduF+fWH2RfjSNeZafCVkxV0abnu6qLrzn2SQKBgQC5CYZ0mooDFe/4jf9P9QpAKyUendjMpFNitxL6Ftu3OjK0OSUX2SjKq20EVYydl1VUZvisbI3jB/2nVcNusz92IssmdAQfyRhkRFm1BrSqYnRqYewEg7vBxwJdAAyqnTyTbGRWBkcwP/0rjw+bGqOOZXDADw2+JtSc52bDr8THdwKBgG3CI7gAxasUaooF+/jlnL9DzbEHy1niumcoydRkPnGhW2kalZHDdLEhofG3DXSsxiFs/xVD8KFTZ1Mn7cpgwqnD9KLC7NEWDgGzfEvsmJ7tAQ4wxbSTNBleg6eQkolqW8JvS06eUeUxoYRtapC8OG5ckg77AVhurfAdaRPgX8g5AoGBAJjeDK3Ciqh39DP1I+trtpdCzbzYjSarz5PrSYtBXS2nsAICf+mO58tgCoWdI7mCL+W12FWirSnWDTG0geuvvIsdvZW8HTghS7xyV2Zd7t4gzqqg0Xr9Vh2GCybIBq7hjg0BbHdBYoizJLZaz3rFbEAVACw7g5AHxnkGF3ktejWLAoGALRe+trwKJ8BBUxCOnSOBgLBVKyuo8nSGE75cZcjnS+ld1alPThfejO33zr4uzYxc2QHM27bk5ayfoY3j/WeTkzTu2FvWg8n5Nv26PE0DpNfeqksc/weHQAlRU+U5BmGVlOvWSrUDyOPMuo+CwNFTaiBKsDtxCKd+0Z+KwY3g5tM=";
  NSString *rsaPrivateKey = @"";
  /*============================================================================*/
  /*============================================================================*/
  /*============================================================================*/
  
  //partner和seller获取失败,提示
  if ([appID length] == 0 ||
      ([rsa2PrivateKey length] == 0 && [rsaPrivateKey length] == 0))
  {
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示"
                                                    message:@"缺少appId或者私钥。"
                                                   delegate:self
                                          cancelButtonTitle:@"确定"
                                          otherButtonTitles:nil];
    [alert show];
    return;
  }
  
  /*
   *生成订单信息及签名
   */
  //将商品信息赋予AlixPayOrder的成员变量
  Order* order = [Order new];
  
  // NOTE: app_id设置
  order.app_id = appID;
  
  // NOTE: 支付接口名称
  order.method = @"alipay.trade.app.pay";
  
  // NOTE: 参数编码格式
  order.charset = @"utf-8";
  
  // NOTE: 当前时间点
  NSDateFormatter* formatter = [NSDateFormatter new];
  [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
  order.timestamp = [formatter stringFromDate:[NSDate date]];
  
  // NOTE: 支付版本
  order.version = @"1.0";
  
  // NOTE: sign_type 根据商户设置的私钥来决定
  order.sign_type = (rsa2PrivateKey.length > 1)?@"RSA2":@"RSA";
  
  // NOTE: 商品数据
  order.biz_content = [BizContent new];
  order.biz_content.body = @"我是测试数据";
  order.biz_content.subject = @"1";
  order.biz_content.out_trade_no = [self generateTradeNO]; //订单ID（由商家自行制定）
  order.biz_content.timeout_express = @"30m"; //超时时间设置
  order.biz_content.total_amount = [NSString stringWithFormat:@"%.2f", 0.01]; //商品价格
  
  //将商品信息拼接成字符串
  NSString *orderInfo = [order orderInfoEncoded:NO];
  NSString *orderInfoEncoded = [order orderInfoEncoded:YES];
  NSLog(@"orderSpec = %@",orderInfo);
  
  // NOTE: 获取私钥并将商户信息签名，外部商户的加签过程请务必放在服务端，防止公私钥数据泄露；
  //       需要遵循RSA签名规范，并将签名字符串base64编码和UrlEncode
  NSString *signedString = nil;
  RSADataSigner* signer = [[RSADataSigner alloc] initWithPrivateKey:((rsa2PrivateKey.length > 1)?rsa2PrivateKey:rsaPrivateKey)];
  if ((rsa2PrivateKey.length > 1)) {
    signedString = [signer signString:orderInfo withRSA2:YES];
  } else {
    signedString = [signer signString:orderInfo withRSA2:NO];
  }
  
  // NOTE: 如果加签成功，则继续执行支付
  if (signedString != nil) {
    //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
    //    NSString *appScheme = @"alisdkdemo";
    
  
    NSArray *urls = [[NSBundle mainBundle] infoDictionary][@"CFBundleURLTypes"];
    NSMutableString *appScheme = [NSMutableString string];
    BOOL multiUrls = [urls count] > 1;
    for (NSDictionary *url in urls) {
      NSArray *schemes = url[@"CFBundleURLSchemes"];
      if (!multiUrls ||
          (multiUrls && [@"alipay" isEqualToString:url[@"CFBundleURLName"]])) {
        [appScheme appendString:schemes[0]];
        break;
      }
    }
    
    if ([appScheme isEqualToString:@""]) {
      NSString *error = @"scheme cannot be empty";
      reject(@"10000", error, [NSError errorWithDomain:error code:10000 userInfo:NULL]);
      return;
    }
    
    
  
    // NOTE: 将签名成功字符串格式化为订单字符串,请严格按照该格式
    NSString *orderString = [NSString stringWithFormat:@"%@&sign=%@",
                             orderInfoEncoded, signedString];
    
    NSLog(@"orderString    %@", orderString);
    
    // NOTE: 调用支付结果开始支付
    [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
      NSLog(@"reslut = %@",resultDic);
    }];
  }
  

}

//RCT_REMAP_METHOD(pay, payInfo:(NSString *)payInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
//{
//  
//  NSArray *urls = [[NSBundle mainBundle] infoDictionary][@"CFBundleURLTypes"];
//  NSMutableString *appScheme = [NSMutableString string];
//  BOOL multiUrls = [urls count] > 1;
//  for (NSDictionary *url in urls) {
//    NSArray *schemes = url[@"CFBundleURLSchemes"];
//    if (!multiUrls ||
//        (multiUrls && [@"alipay" isEqualToString:url[@"CFBundleURLName"]])) {
//      [appScheme appendString:schemes[0]];
//      break;
//    }
//  }
//  
//  if ([appScheme isEqualToString:@""]) {
//    NSString *error = @"scheme cannot be empty";
//    reject(@"10000", error, [NSError errorWithDomain:error code:10000 userInfo:NULL]);
//    return;
//  }
//  _resolve = resolve;
//  _reject = reject;
//  
//  [[AlipaySDK defaultService] payOrder:payInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
//    [RCTAlipay handleResult:resultDic];
//    NSLog(@"resultDic   %@", resultDic);
//  }];
//}


- (NSString *)generateTradeNO
{
  static int kNumber = 15;
  
  NSString *sourceStr = @"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  NSMutableString *resultStr = [[NSMutableString alloc] init];
  srand((unsigned)time(0));
  for (int i = 0; i < kNumber; i++)
  {
    unsigned index = rand() % [sourceStr length];
    NSString *oneStr = [sourceStr substringWithRange:NSMakeRange(index, 1)];
    [resultStr appendString:oneStr];
  }
  return resultStr;
}

//+(void) handleResult:(NSDictionary *)resultDic
//{
//  NSString *status = resultDic[@"resultStatus"];
//  if ([status integerValue] >= 8000) {
//    _resolve(@[resultDic]);
//  } else {
//    _reject(status, resultDic[@"memo"], [NSError errorWithDomain:resultDic[@"memo"] code:[status integerValue] userInfo:NULL]);
//  }
//}

//+(void) handleCallback:(NSURL *)url
//{
//  //如果极简开发包不可用，会跳转支付宝钱包进行支付，需要将支付宝钱包的支付结果回传给开发包
//  if ([url.host isEqualToString:@"safepay"]) {
//    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
//      //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
//      [self handleResult:resultDic];
//    }];
//  }
//  if ([url.host isEqualToString:@"platformapi"]){//支付宝钱包快登授权返回authCode
//    
//    [[AlipaySDK defaultService] processAuthResult:url standbyCallback:^(NSDictionary *resultDic) {
//      //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
//      [self handleResult:resultDic];
//    }];
//  }
//}




@synthesize bridge = _bridge;

+ (instancetype)shareInstance {
  @synchronized(self) {
    if (!instance) {
      instance = [[self alloc] init];
    }
  }
  return instance;
}

- (BOOL)handleOpenURL:(NSURL *)url{
  [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
    NSLog(@"result = %@",resultDic);
    [instance.bridge.eventDispatcher sendAppEventWithName:@"finishedPay"  body:resultDic];
  }];
  return YES;
}

RCT_EXPORT_METHOD(signedString:(NSString *)signString
                  :(RCTResponseSenderBlock)callback){
  
  NSLog(@"11111  %@", signString);

  [[AlipaySDK defaultService] payOrder:signString fromScheme:deappscheme callback:^(NSDictionary *resultDic) {
    NSLog(@"reslut = %@",resultDic);
    [instance.bridge.eventDispatcher sendAppEventWithName:@"finishedPay"  body:resultDic];
    
    
    
    
//    NSDictionary *dic = [[resultDic objectForKey:@"result"] objectForKey:@"alipay_trade_app_pay_response"];
//
//    NSString *msg = [dic objectForKey:@"msg"];
//    
//    NSDictionary *resu = [resultDic objectForKey:@"result"];
//    NSString *sign_type = [resu objectForKey:@"sign_type"];
//    
//    NSString *resultStatus = [resultDic objectForKey:@"resultStatus"];
//    
//    NSArray *arr = @[resultStatus, msg, sign_type];
//    callback(arr);
    
    
    
    callback(@[resultDic]);

    
  }];
  
  
}

@end
