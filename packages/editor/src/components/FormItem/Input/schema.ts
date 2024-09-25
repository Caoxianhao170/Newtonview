export default {
  attrs: [
    {
      type: 'Title',
      label: '标签配置',
      key: 'formItem',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['formItem', 'label'],
      props: {
        placeholder: '请输入文本标题',
      },
    },
    {
      type: 'Input',
      label: '字段',
      name: ['formItem', 'name'],
      props: {
        placeholder: '请输入提交字段',
      },
    },
    {
      type: 'Select',
      label: '大小',
      name: ['formItem', 'size'],
      props: {
        placeholder: '请选择大小',
        options: [
          {
            label: '大',
            value: 'large',
          }, {
            label: '中',
            value: 'middle',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    }
  ],
  config: {
    props: {
      formItem: {
        label: '输入框',
        name: 'input',
        style: 'margin-bottom: 0px',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请输入文本',
        allowClear: true,
      },
      defaultValue: '',
    },
    // 组件样式
    style: {},
  },
  events: [],
}