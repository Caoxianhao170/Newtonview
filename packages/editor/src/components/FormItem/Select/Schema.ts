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
        placeholder: '请输入标题',
      }
    },
    {
      type: 'Input',
      label: '字段',
      name: ['formItem', 'name'],
      props: {
        placeholder: '请输入提交字段',
      }
    },
    {
      type: 'Title',
      label: '表单配置',
      key: 'title2',
    },
    {
      type: 'Select',
      label: '大小',
      name: ['formWrap', 'size'],
      props: {
        placeholder: '请输入提交字段',
        options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'middle' },
          { label: '小', value: 'small' },
        ],
      },
    },
  ],
  config: {
    props: {
      formItem: {
        label: '选择框',
        name: 'select',
      },
      formWrap: {
        placeholder: '请选择',
        size: 'middle',
        options: [
          { label: '选项1', value: '1' },
          { label: '想想2', value: '2' },
        ],
      }
    },
    style: {},
  },
  events: [
    {
      name: 'change事件',
      value: 'change'
    },
  ],
  methods: [
    {
      name: 'update',
      title: '更新数据',
    }
  ]
}