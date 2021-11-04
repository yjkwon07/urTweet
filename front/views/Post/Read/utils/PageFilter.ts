import { ParsedUrlQuery } from 'querystring';

import { cloneDeep } from 'lodash';
import Router from 'next/router';

import { Page } from '@typings/type';
import urlParamReplace from '@utils/urlParamReplace';

const PATH_NAME = '/post/:id';

export interface Param {
  id: number;
}

export default class PageFilter implements Page {
  pathname: string;

  param: Param;

  static parseParam(param?: ParsedUrlQuery | Param) {
    const id = Number(param?.id) || -1;

    return {
      id,
    };
  }

  constructor(param?: ParsedUrlQuery | Param) {
    this.pathname = urlParamReplace(PATH_NAME, PageFilter.parseParam(param));
    this.param = PageFilter.parseParam(param);
  }

  replaceParam({ id }: Partial<Param>) {
    const param = cloneDeep(this.param);
    if (id) param.id = id;
    return param;
  }

  url() {
    return `${this.pathname}`;
  }

  search(param?: Partial<Param>) {
    const searchParam = param ? this.replaceParam(param) : this.param;

    Router.push({
      pathname: urlParamReplace(PATH_NAME, searchParam),
    });
  }
}
