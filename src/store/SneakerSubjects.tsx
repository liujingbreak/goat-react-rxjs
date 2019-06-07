import * as utils from '../common/utils';
import {BehaviorSubject} from 'rxjs';

const apiUrl = process.env.REACT_APP_API_URL || '//localhost:5000';

export interface SneakerItem {
  id: number;
  name: string;
  nickname: string;
  retail_price_cents: number;
  grid_picture_url: string;
  release_date: string;
  slug: string;
}

export interface SneakerItemDetail extends SneakerItem {
  main_picture_url: string;
  story_html: string;
}
export class SneakerList {
  list: SneakerItem[] = [];
  page = 0;
  noMorePage = false;
}
export class SneakerStore {
  listData: SneakerList = new SneakerList();
  itemData?: SneakerItemDetail | null = null;
  loading = false;
  error?: Error;
}

export class SneakerStoreSubjects {
  title = new BehaviorSubject('GOAT');
  route = new BehaviorSubject('/sneakers'); // For SSR static route
  listData = new BehaviorSubject(new SneakerList());
  itemData = new BehaviorSubject<SneakerItemDetail|null>(null);
  loading = new BehaviorSubject(false);
  error = new BehaviorSubject<Error|null>(null);

  constructor(public trackError: typeof utils.trackError = require('../common/utils').trackError) {
  }

  async getList(page = 1, limit = 20) {
    try {
      this.loading.next(true);
      const res = await fetch(`${apiUrl}/sneakers?_page=${page}&_limit=${limit}`);

      const linkHeader = res.headers.get('link');
      const data = await res.json() as SneakerItem[];
      this.loading.next(false);
      const origList = this.listData.getValue().list;

      this.listData.next({
        list: origList.concat(data),
        page,
        noMorePage: !linkHeader || linkHeader.indexOf('rel="next"') < 0
      });
      return data;
    } catch (ex) {
      this.loading.next(false);
      this.error.next(ex);
      this.trackError(ex);
      throw ex;
    }
  }

  async getDetailBySlug(slug: string) {
    try {
      this.loading.next(true);
      const res = await fetch(`${apiUrl}/sneakers?slug=${slug}`);
      const data = await res.json() as SneakerItemDetail[];
      this.loading.next(false);
      if (data == null || data.length === 0) {
        this.itemData.next(null);
      } else {
        this.itemData.next(data[0]);
        this.title.next(data[0].nickname);
      }
    } catch (ex) {
      this.loading.next(false);
      this.error.next(ex);
      this.trackError(ex);
      throw ex;
    }
  }
}

export const sneakerStoreSubjects = new SneakerStoreSubjects();
