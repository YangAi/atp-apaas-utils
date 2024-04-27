import {FnService, BaseModelService, ObjectApiNames, SelectCond, FilterCond, ResultData} from "byted-apaas-utils";

class ModelService<T extends ObjectApiNames> extends BaseModelService<T> {
  constructor(model: T) {
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
  async find<U extends SelectCond<T>>(
    {
      filter = {},
      select = [],
      sort = [],
      desc = false,
    }: {
      filter?: FilterCond<T>,
      select: U[],
      sort?: U[],
      desc?: boolean,
    }
  ) {
    const returnData: ResultData<T, U>[] = [];

    return this.findStream({
      filter,
      select,
      sort,
      desc,
      handler(records) {
        returnData.push(...(records as ResultData<T, U>[]));
      },
    }).then(() => returnData);
  }
}

const createModelService = <T extends ObjectApiNames>(
  model: ObjectApiNames
): ModelService<T> => new ModelService<T>(model);

export default createModelService;
