<template>
	<Modal
		v-bind="{...props?.config?.props}"
    :data-id="props.id"
		:open="visible"
    :data-type="props.type"
    :footer="props?.config?.props.footer ? undefined : null"
    :maskClosable="true"
    :getContainer="containerRef"
		:maskStyle="{ display: 'none'}"
    :style="props?.config.props?.style || {}"
    :confirmLoading="confirmLoading"
    :width="props?.config.props.width || 520"
    @Ok="handleOk"
    @cancel="handleCancel"
	>
    <NewtonRender
      :id="props.id"
      :elements="props.elements"
    />
	</Modal>
	<Button @click="open">{{props?.config?.props?.title || '打开弹窗'}}</Button>
</template>

<script setup lang="ts">
import {ref, defineExpose, watch, onMounted} from 'vue';
import { Modal, Button } from 'ant-design-vue';
import { ComponentType } from '@/types/index';
import NewtonRender from '@/components/NewtonRender/index.vue';

const containerRef = ref(null);

// 属性
const props = defineProps<ComponentType>();
// 事件
const emits = defineEmits(['onLoad', 'onOk', 'onCancel']);

const visible = ref(false);

onMounted(() => {
  containerRef.value = document.querySelector('#page');
  console.log(containerRef.value);

})

watch(visible, (value) => {
  if (value) {
    emits('onLoad');
	}
});

// 打开弹框
const open = () => {
  visible.value = true;
}
// 关闭弹窗
const close = () => {
  console.log('close')
  visible.value = false;
}

// 确认加载状态
const confirmLoading = ref(false);
const showConfirmLoading = () => {
  confirmLoading.value = true;
}
const hideConfirmLoading = () => {
  confirmLoading.value = false;
}

// 加载状态
const loading = ref(false);
const showLoading = () => {
  loading.value = true;
};
const hideLoading = () => {
  loading.value = false;
};

// 确定
const handleOk = () => {
  emits('onOk');
};

const handleCancel = () => {
  // emits('onCancel');
  close();
};

defineExpose({
  open,
  close,
  showConfirmLoading,
  hideConfirmLoading,
  showLoading,
  hideLoading,
});

</script>

<style >
.ant-modal-wrap {
	z-index: 1000 !important;
  position: absolute !important;
}
</style>