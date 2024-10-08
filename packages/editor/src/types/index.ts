export type BasicBlockType = 'Input';

export type SceneBlockType = 'SearchForm'
// 物料类型
export type BlockType = BasicBlockType | SceneBlockType;



/**
 * 组件方法类型
 */
export interface ComponentMethodType {
  name: string;
  title: string;
}

/**
 * 组件API简化类型
 */
export interface ApiConfig {
  sourceType: 'json' | 'api' | 'variable' | 'download';
  id: string;
  source: any;
  sourceField:
    | string
    | {
    type: 'static' | 'variable';
    value: string;
  };
  name?: {
    type: 'variable' | 'static';
    value: string;
  };
}

/**
 * 接口类型定义
 */
export interface ApiType {
  id: string;
  name: string; //接口名称
  url: string;
  stgApi: string;
  preApi: string;
  prdApi: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  sourceType?: string; //数据源类型，枚举值
  // 静态数据源映射
  source: any;
  // 数据源映射，比如：{ code: { list: [] } }，这里sourceField: 'list'
  sourceField: string;
  contentType: string;
  baseApi?: string;
  sendOn?: string;
  replaceData: 'merge' | 'cover' | 'reserve';
  params?: {
    [key: string]: any;
  };
  isCors: boolean;
  // 字段映射
  result: {
    code: string; //状态码字段
    codeValue: number; //成功对应的值
    data: string; //结果字段
    msg: string; //报错字段
  };
  tips?: {
    success: string;
    fail: string;
    isError: boolean; // 是否开启系统错误提示
  };
}

/**
 * 事件类型
 */
export interface EventType<T = any> {
  nickName: string; // 中文名称
  eventName: string; // 英文标识
  actions: T[]; // 事件行为
}

/**
 * 组件配置类型
 */
export interface ConfigType<T = any> {
  props: T; // 组件自身属性
  scopeCss: string; // 自定义css
  events: EventType[]; //事件配置
  style: object,
  // 接口配置
  api: ApiConfig;
  source: any; // 数据源
}

/**
 * 组件最小颗粒度类型定义
 */
export interface ComItemType<T = any> {
  id: string;
  type: string;
  name: string | number;
  parentId?: string;
  elements: ComItemType[];
  remoteUrl?: string;
  remoteConfigUrl?: string;
  remoteCssUrl?: string;
}

/**
 * store中状态对应的组件类型，这是原始的组件类型
 * @param {string} id 组件ID(算法生成)
 * @param {string} type 组件类型，枚举值
 * @param {string} parentId 父组件ID
 * @param {config} config 组件配置
 * @param {events} api 组件自带的事件
 * @param {elements} elements 子组件
 */
export interface ComponentType<T = any> {
  id: string;
  type: string;
  name?: string;
  remoteUrl?: string;
  remoteConfigUrl?: string;
  remoteCssUrl?: string;
  parentId?: string;
  config: ConfigType<T>;
  // 属性中用于展示的事件，跟配置中的事件不同
  events?: Array<{ name: string; value: string }>;
  // 属性中用于展示的方法，跟配置中的方法不同
  methods?: ComponentMethodType[];
  apis?: { [key: string]: ApiType };
  elements?: ComponentType<T>[];
  [key: string]: any; // 自定义属性，比如事件函数挂载
}