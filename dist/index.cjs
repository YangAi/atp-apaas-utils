"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var src_exports = {};
__export(src_exports, {
  FnService: () => import_byted_apaas_utils2.FnService,
  _: () => extendedLodash,
  createEntry: () => import_byted_apaas_utils2.createEntry,
  createModel: () => model_default,
  exceptions: () => import_exceptions.default,
  lark: () => lark_default,
  oql: () => oql_default
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash"), 1);

// src/model/index.ts
var import_byted_apaas_utils = require("byted-apaas-utils");
var ModelService = class extends import_byted_apaas_utils.BaseModelService {
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
  /**
   * 批量创建记录
   * @param recordMapList 多条用于创建的记录数据组成的数组
   * @paramExample `[{_name: 'John', age: 19, gender: 'male'}, {_name: 'Alis', age: 16, gender: 'female'}]`
   */
  batchCreate(recordMapList) {
    return __async(this, null, function* () {
      let updateList = [];
      const result = [];
      for (let i = 0; i < recordMapList.length; ) {
        updateList = recordMapList.slice(i, i + 500);
        const res = yield this.model.batchCreate(updateList);
        result.push(res);
        i += 500;
      }
      return result;
    });
  }
};
var createModelService = (model) => new ModelService(model);
var model_default = createModelService;

// src/index.ts
var import_byted_apaas_utils2 = require("byted-apaas-utils");
var import_exceptions = __toESM(require("@byted-apaas/server-common-node/utils/exceptions"), 1);

// src/lark/index.ts
var lark = __toESM(require("@larksuiteoapi/node-sdk"), 1);
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
var import_server_common_node = require("@byted-apaas/server-common-node");
var logger = new import_server_common_node.Logger();
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
var extendedLodash = __spreadProps(__spreadValues({}, import_lodash.default), {
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FnService,
  _,
  createEntry,
  createModel,
  exceptions,
  lark,
  oql
});
//# sourceMappingURL=index.cjs.map