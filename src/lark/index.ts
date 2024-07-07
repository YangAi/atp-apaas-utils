import * as lark from '@larksuiteoapi/node-sdk';

let appId: string | null = null;
let appSecret: string | null = null;

try {
  
  // @ts-ignore
  appId = application.globalVar.getVar('feishuAppId') || undefined;
  // @ts-ignore
  appSecret = application.globalVar.getVar('feishuAppSecret') || undefined;
  
} catch (e) {
  
  if (!appId) console.error('Error when getting appId from global variables:', error);
  if (!appSecret) console.error('Error when getting appSecret from global variables:', error);
  
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
