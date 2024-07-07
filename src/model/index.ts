import {
  FnService,
  BaseModelService,
  ObjectApiNames,
  SelectCond,
  FilterCond,
  ResultData,
  CreateRecordMap
} from "byted-apaas-utils";

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
    console.log('使用新的 Find 函数')
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

  /**
   * 批量创建记录
   * @param recordMapList 多条用于创建的记录数据组成的数组
   * @paramExample `[{_name: 'John', age: 19, gender: 'male'}, {_name: 'Alis', age: 16, gender: 'female'}]`
   */
  async batchCreate(recordMapList: CreateRecordMap<T>[]) {
    // if (!recordMapList.every(item => item._id)) throw Error('_id is required');

    let updateList = [];
    const result = [];
    for (let i = 0; i < recordMapList.length; ) {
      updateList = recordMapList.slice(i, i + 500);
      const res = await this.model.batchCreate(updateList);
      result.push(res);
      i += 500;
    }
    return result;
  }

  
  /**
   * 删除符合条件的所有记录
   * @param filter 筛选条件
   */
  async deleteMany(filter: FilterCond<T>) {
    const targetList = await this.find({
      filter, 
      select: ["_id"],
    });

    return this.batchDelete(targetList.map((item) => (item as any)._id));
  }

    /**
   * 根据筛选条件更新多条记录
   * @param filter 筛选条件
   * @param updateData 用于更新的新数据
   */
  async updateMany(filter: FilterCond<T>, updateData: UpdateRecordMap<T>) {
    // @ts-ignore
    const recordList = await this.find({
      filter, 
      select: ["_id"],
    });

    return this.batchUpdate(
      recordList.map((item) => ({
        ...updateData,
        // @ts-ignore
        _id: item._id,
      }))
    );
  }

}

const createModelService = <T extends ObjectApiNames>(
  model: ObjectApiNames
): ModelService<T> => new ModelService<T>(model);

export default createModelService;
