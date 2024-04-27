import * as lark from '@larksuiteoapi/node-sdk';

let appId: string | null = null;
let appSecret: string | null = null;

try {
  // @ts-ignore
  appId = application.globalVar.getVar('feishuAppId');
} catch (error) {
  console.error('Error when getting appId from global variables:', error);
  // You can also set a default value for appId here.
  // appId = 'default_appId';
}

try {
  // @ts-ignore
  appSecret = application.globalVar.getVar('feishuAppSecret');
} catch (error) {
  console.error('Error when getting appSecret from global variables:', error);
  // You can also set a default value for appSecret here.
  // appSecret = 'default_appSecret';
}

let client: any = {};

if (appId && appSecret) {
  client = new lark.Client({
    // @ts-ignore
    appId: appId,
    // @ts-ignore
    appSecret: appSecret
  })
}


export default client
