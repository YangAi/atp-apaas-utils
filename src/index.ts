import _ from 'lodash';
import createModelService from './model';
import { createEntry, FnService } from "byted-apaas-utils";
import exceptions from '@byted-apaas/server-common-node/utils/exceptions';
import client from './lark';
import oql from './oql';



module.exports = {
  _: {
    ..._,
    sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
  },
  createModel: createModelService,
  createEntry,
  FnService,
  lark: client,
  exceptions,
  oql
}


