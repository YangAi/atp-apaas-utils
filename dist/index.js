var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import _ from "lodash";

// src/model/index.ts
import { BaseModelService } from "byted-apaas-utils";
var ModelService = class extends BaseModelService {
  constructor(model) {
    super({ model });
  }
  /**
   * 查找所有符合条件的记录
   * @param filter 筛选条件
   * @param select 需返回的字段
   * @param sort 排序字段
   * @param desc 是否降序 默认`false`：升序;`true`：降序
   * @returns 返回所有符合条件的记录
   */
  find(_0) {
    return __async(this, arguments, function* ({
      filter = {},
      select = [],
      sort = [],
      desc = false
    }) {
      const returnData = [];
      return this.findStream({
        filter,
        select,
        sort,
        desc,
        handler(records) {
          returnData.push(...records);
        }
      }).then(() => returnData);
    });
  }
};
var createModelService = (model) => new ModelService(model);
var model_default = createModelService;

// src/index.ts
import { createEntry, FnService as FnService2 } from "byted-apaas-utils";
import exceptions from "@byted-apaas/server-common-node/utils/exceptions";

// src/lark/index.ts
import * as lark from "@larksuiteoapi/node-sdk";
var appId = null;
var appSecret = null;
try {
  appId = application.globalVar.getVar("feishuAppId");
} catch (error) {
  console.error("Error when getting appId from global variables:", error);
}
try {
  appSecret = application.globalVar.getVar("feishuAppSecret");
} catch (error) {
  console.error("Error when getting appSecret from global variables:", error);
}
var client = {};
if (appId && appSecret) {
  client = new lark.Client({
    // @ts-ignore
    appId,
    // @ts-ignore
    appSecret
  });
}
var lark_default = client;

// src/oql/index.ts
import { Logger } from "@byted-apaas/server-common-node";
var logger = new Logger();
var oql_default = {
  selectAll: (query) => __async(void 0, null, function* () {
    if (!query.toUpperCase().includes("ORDER")) {
      logger.warn("\u8FD9\u4E2A SQL \u6CA1\u6709\u5305\u542B ORDER BY\uFF0C\u6570\u636E\u91CF\u5927\u7684\u65F6\u5019\u53EF\u80FD\u6709\u95EE\u9898");
    }
    logger.log(query);
    const pageSize = 200;
    let page = 1;
    let result = [];
    while (true) {
      const offset = (page - 1) * pageSize;
      const finalQuery = `
        ${query} 
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      const data = yield application.data.oql(finalQuery).execute();
      if (data.length === 0) {
        break;
      }
      result = result.concat(data);
      page++;
    }
    return result;
  })
};

// src/index.ts
module.exports = {
  _: __spreadProps(__spreadValues({}, _), {
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  }),
  createModel: model_default,
  createEntry,
  FnService: FnService2,
  lark: lark_default,
  exceptions,
  oql: oql_default
};
//# sourceMappingURL=index.js.map