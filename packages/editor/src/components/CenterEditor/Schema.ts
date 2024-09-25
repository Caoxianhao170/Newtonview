export const Schema = {
  attrs: [
    {
      type: 'Title',
      label: '页面配置',
      key: 'pageConfig',
    },
    {
      type: 'Input',
      label: '页面背景色',
      name: ['pageConfig', 'color'],
    }
  ],
  config: {
    props: {
      pageConfig: {
        color: 'red',
      }
    }
  }
};