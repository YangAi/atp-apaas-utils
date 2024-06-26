import {Logger} from "@byted-apaas/server-common-node";

const logger = new Logger();

export default {
  selectAll: async (query: string) => {
    if (!query.toUpperCase().includes('ORDER')) {
      logger.warn('这个 SQL 没有包含 ORDER BY，数据量大的时候可能有问题')
    }
    logger.log(query)
    const pageSize = 200;
    let page = 1;
    let result: any[] = []

    while (true) {
      const offset = (page - 1) * pageSize;
      const finalQuery = `
        ${query} 
        LIMIT ${pageSize} OFFSET ${offset}
      `;

      // @ts-ignore
      const data = await application.data.oql(finalQuery).execute()
      if (data.length === 0) {
        break;
      }
      result = result.concat(data);
      page++;
    }

    return result
  }
}
