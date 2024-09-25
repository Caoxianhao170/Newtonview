<template>
	<div class="title">数据源配置</div>
	<Form>
		<FormItem label="数据来源">
			<Select :options="sourceTypeEnums" v-model:value="sourceType"/>
		</FormItem>
    <VueJsonPretty v-if="sourceType === 'json'" class="json-preview-container" :data="jsonData"/>
		<div v-else-if="sourceType === 'api'">
      <FormItem label="请求地址">
				<Space>
          <Select :options="sourceTypeEnums" v-model:value="sourceType"/>
          <EditOutlined/>
				</Space>
      </FormItem>
      <FormItem label="数据处理">
        <Input/>
      </FormItem>
		</div>
		<div v-else>
      <FormItem label="动态变量">
        <Input/>
      </FormItem>
		</div>
  </Form>
</template>

<script setup>
import { shallowRef, ref } from 'vue';
import { Form, FormItem, Select, Input, Space } from "ant-design-vue";
import { EditOutlined } from '@ant-design/icons-vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const sourceTypeEnums = shallowRef([
  {
    label: '静态数据',
		value: 'json',
	},
  {
    label: '接口请求',
    value: 'api',
  },
  {
    label: '动态变量',
    value: 'variable',
  },
]);

const sourceType = ref('json');

const jsonData = ref('');
</script>

<style scoped>
.title {
	padding: 5px;
	background: #f0f2f5;
	margin-bottom: 10px;
}

.json-preview-container {
	background: #f0f2f5;
	height: 100%;
	width: 100%;
}
</style>