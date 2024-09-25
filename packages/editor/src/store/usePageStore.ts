import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { traverseTree } from '@/utils/helper';

/**
 * 页面信息存储
 */
export interface UserInfoStore {
  user_id: number;
  user_name: string;
  identifier: string;
}
export const usePageStore = defineStore('page', {
  state: () => {
    return {
      userInfo: {
        user_id: 0,
        user_name: '',
      },
      selectedElement: '',
      page: {
        pageId: 0,
        pageName: '',
        remark: '',
        stg_state: 1,
        pre_state: 1,
        prd_state: 1,
        stg_publish_id: 0,
        pre_publish_id: 0,
        prd_publish_id: 0,
        config: {
          props: {},
          style: {},
          scopeCss: '',
          scopeStyle: {},
          events: [],
          api: {
            sourceType: 'json',
            id: '',
            source: {},
            sourceField: '',
          },
        },
        events: [],
        // 页面全局接口
        apis: {},
        elements: [],
        elementsMap: {},
        // 页面变量定义列表
        variables: [],
        variableData: {},
        // 表单数据
        formData: {} as any,
        // 全局拦截器
        interceptor: {
          headers: [{ key: '', value: '' }],
          timeout: 8,
          timeoutErrorMessage: '请求超时，请稍后再试',
        },
      }
    };
  },
  actions: {
    // 新增元素
    addElement(element: any, addedIndex: number) {
      const { parentId }  = element;
      if (parentId === 'root') {
        this.page.elements.splice(addedIndex, 0, element);
      } else {
        this.page.elements.forEach((item:any) => {
          if (item.id === parentId) {
            item.elements.splice(addedIndex, 0, element);
          }
        });
      }
      const childElement = cloneDeep(element);
      this.page.elementsMap[element.id] = childElement;
    },
    // 移动元素
    moveElement({ addedIndex, removedIndex}: {addedIndex:number, removedIndex: number} ) {
      const temp = this.page.elements[removedIndex];
      this.page.elements[removedIndex] = this.page.elements[addedIndex]
      this.page.elements[addedIndex] = temp;
    },
    // 保存页面信息
    savePage(payload: any) {
      this.page = {
        ...this.page,
        ...payload,
      };
    },
    setFormData({ name, value }: any) {
      this.page.formData[name] = value;
    },
    selectCurrentElement(id: string) {
      this.selectedElement = id;
    },
    removeElement(id: string) {
      console.log(traverseTree(cloneDeep(this.page.elements), id));
    },
    // 编辑元素
    editElement(payload: any) {
      const item = this.page.elementsMap[payload.id];
      // 属性
      if (payload.type === 'props') {
        item.config.props = payload.props;
      } else if (payload.type === 'events') {
        item.config.events = payload.events;
      }
    },
    editEvents(payload: any) {
      const { id, events }  = payload;
      const item = this.page?.elementsMap[id];
      item.events = events;
    },
  },
});