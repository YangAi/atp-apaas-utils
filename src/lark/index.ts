import lark from '@larksuiteoapi/node-sdk';

// @ts-ignore
const client = new lark.Client({
  // @ts-ignore
  appId:application.globalVar.getVar('appId'),
  // @ts-ignore
  appSecret:application.globalVar.getVar('appSecret')
})

export default client
