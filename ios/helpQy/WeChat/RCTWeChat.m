//
//  RCTWeChat.m
//  RCTWeChat
//
//  Created by Yorkie Liu on 10/16/15.
//  Copyright © 2015 WeFlex. All rights reserved.
//

#import "RCTWeChat.h"
#import "WXApiObject.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridge.h>
#import <React/RCTLog.h>
#import <React/RCTImageLoader.h>

// Define error messages
#define NOT_REGISTERED (@"registerApp required.")
#define INVOKE_FAILED (@"WeChat API invoke returns false.")
static NSString * const TestEventName = @"TestEventName";
@implementation RCTWeChat

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:@"RCTOpenURLNotification" object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (BOOL)handleOpenURL:(NSNotification *)aNotification
{
  NSString * aURLString =  [aNotification userInfo][@"url"];
  NSURL * aURL = [NSURL URLWithString:aURLString];
  
  if ([WXApi handleOpenURL:aURL delegate:self])
  {
    return YES;
  } else {
    return NO;
  }
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(registerApp:(NSString *)appid
                  :(RCTResponseSenderBlock)callback)
{
  self.appId = appid;
  callback(@[[WXApi registerApp:appid] ? [NSNull null] : INVOKE_FAILED]);
}

RCT_EXPORT_METHOD(registerAppWithDescription:(NSString *)appid
                  :(NSString *)appdesc
                  :(RCTResponseSenderBlock)callback)
{
  callback(@[[WXApi registerApp:appid withDescription:appdesc] ? [NSNull null] : INVOKE_FAILED]);
}

RCT_EXPORT_METHOD(isWXAppInstalled:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], @([WXApi isWXAppInstalled])]);
}

RCT_EXPORT_METHOD(isWXAppSupportApi:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], @([WXApi isWXAppSupportApi])]);
}

RCT_EXPORT_METHOD(getWXAppInstallUrl:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], [WXApi getWXAppInstallUrl]]);
}

RCT_EXPORT_METHOD(getApiVersion:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], [WXApi getApiVersion]]);
}

RCT_EXPORT_METHOD(openWXApp:(RCTResponseSenderBlock)callback)
{
  callback(@[([WXApi openWXApp] ? [NSNull null] : INVOKE_FAILED)]);
}

RCT_EXPORT_METHOD(sendRequest:(NSString *)openid
                  :(RCTResponseSenderBlock)callback)
{
  BaseReq* req = [[BaseReq alloc] init];
  req.openID = openid;
  callback(@[[WXApi sendReq:req] ? [NSNull null] : INVOKE_FAILED]);
}

//微信登录
RCT_EXPORT_METHOD(sendAuthRequest:(NSString *)scope
                  :(NSString *)state
                  :(RCTResponseSenderBlock)callback)
{
  SendAuthReq* req = [[SendAuthReq alloc] init];
  req.scope = scope;
  req.state = state;
  BOOL success = [WXApi sendReq:req];
  callback(@[success ? [NSNull null] : INVOKE_FAILED]);
}

RCT_EXPORT_METHOD(sendSuccessResponse:(RCTResponseSenderBlock)callback)
{
  BaseResp* resp = [[BaseResp alloc] init];
  resp.errCode = WXSuccess;
  callback(@[[WXApi sendResp:resp] ? [NSNull null] : INVOKE_FAILED]);
}

RCT_EXPORT_METHOD(sendErrorCommonResponse:(NSString *)message
                  :(RCTResponseSenderBlock)callback)
{
  BaseResp* resp = [[BaseResp alloc] init];
  resp.errCode = WXErrCodeCommon;
  resp.errStr = message;
  callback(@[[WXApi sendResp:resp] ? [NSNull null] : INVOKE_FAILED]);
}

RCT_EXPORT_METHOD(sendErrorUserCancelResponse:(NSString *)message
                  :(RCTResponseSenderBlock)callback)
{
  BaseResp* resp = [[BaseResp alloc] init];
  resp.errCode = WXErrCodeUserCancel;
  resp.errStr = message;
  callback(@[[WXApi sendResp:resp] ? [NSNull null] : INVOKE_FAILED]);
}

////网页类型分享
RCT_EXPORT_METHOD(webShareWeXinWithScene:(int)scene
                  title:(NSString *)title
                  description:(NSString *)description
                  thumbImage:(NSString *)thumbImage
                  webPageUrl:(NSString *)webPageUrl
                  :(RCTResponseSenderBlock)callback)
{
  WXMediaMessage *message = [WXMediaMessage message];
  message.title = title;
  message.description = description;
  UIImage *image =  [UIImage imageWithData: [NSData dataWithContentsOfURL:[NSURL URLWithString:thumbImage]]];
  message.thumbData = UIImagePNGRepresentation(image);
  WXWebpageObject *webPageObject = [WXWebpageObject object];
  webPageObject.webpageUrl = webPageUrl;
  message.mediaObject = webPageObject;
  SendMessageToWXReq* req = [[SendMessageToWXReq alloc] init];
  req.bText = NO;
  req.message = message;
  req.scene = scene;
  NSLog(@"++++++++++++ %@  %@", thumbImage, webPageUrl);
  BOOL res = [WXApi sendReq:req];
  callback(@[@(res)]);
}


RCT_EXPORT_METHOD(pay:(NSDictionary *)data:(RCTResponseSenderBlock)callback)
{
  PayReq* req             = [PayReq new];
  req.partnerId           = data[@"partnerId"];
  req.prepayId            = data[@"prepayId"];
  req.nonceStr            = data[@"nonceStr"];
  req.timeStamp           = [data[@"timeStamp"] unsignedIntValue];
  req.package             = data[@"package"];
  req.sign                = data[@"sign"];
  BOOL success = [WXApi sendReq:req];
  callback(@[success ? [NSNull null] : INVOKE_FAILED]);
}

#pragma mark - wx callback

-(void) onReq:(BaseReq*)req
{
  // TODO(Yorkie)
}

-(void) onResp:(BaseResp*)resp
{
  if([resp isKindOfClass:[SendMessageToWXResp class]])
  {
    SendMessageToWXResp *r = (SendMessageToWXResp *)resp;
    
    NSMutableDictionary *body = @{@"errCode":@(r.errCode)}.mutableCopy;
    body[@"errStr"] = r.errStr;
    body[@"lang"] = r.lang;
    body[@"country"] =r.country;
    body[@"type"] = @"SendMessageToWX.Resp";
    //以下会导致分享也发送同类事件
    //[self.bridge.eventDispatcher sendDeviceEventWithName:RCTWXEventName body:body];
  }
  else if ([resp isKindOfClass:[SendAuthResp class]]) {
    SendAuthResp *r = (SendAuthResp *)resp;
    NSMutableDictionary *body = @{@"errCode":@(r.errCode)}.mutableCopy;
    body[@"errStr"] = r.errStr;
    body[@"state"] = r.state;
    body[@"lang"] = r.lang;
    body[@"country"] =r.country;
    body[@"type"] = @"SendAuth.Resp";
    
    if (resp.errCode == WXSuccess)
    {
      [body addEntriesFromDictionary:@{@"appid":self.appId, @"code" :r.code}];
      [self.bridge.eventDispatcher sendDeviceEventWithName:RCTWXEventName body:body];
    }
    else {
      [self.bridge.eventDispatcher sendDeviceEventWithName:RCTWXEventName body:body];
    }
  }
  else if ([resp isKindOfClass:[PayResp class]]) {
    PayResp *r = (PayResp *)resp;
    NSMutableDictionary *body = @{@"errCode":@(r.errCode)}.mutableCopy;
    body[@"errStr"] = r.errStr;
    body[@"type"] = @(r.type);
    body[@"returnKey"] =r.returnKey;
    body[@"type"] = @"PayReq.Resp";
    [self.bridge.eventDispatcher sendDeviceEventWithName:RCTWXEventName body:body];
    
  }
}

@end
