import _ from 'lodash';
import createModelService from './model';
import { createEntry, FnService } from "byted-apaas-utils";
import exceptions from '@byted-apaas/server-common-node/utils/exceptions';
import client from './lark';
import oql from './oql';

const extendedLodash = {
  ..._,
  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export {
  extendedLodash as _,
  createModelService as createModel,
  createEntry,
  FnService,
  client as lark,
  exceptions,
  oql
}


