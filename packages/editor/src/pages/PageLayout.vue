<template>
	<div class="page-container">
    <div class="top">
      <div class="top-title">NEWTONVIEWS</div>
    </div>
    <div class="main">
      <div class="left">
        <LeftBlocks />
      </div>
      <div class="center">
        <CenterEditor/>
      </div>
      <div class="right">
        <RightConfigPanel/>
      </div>
    </div>
	</div>
	
</template>

<script setup>
import LeftBlocks from '@/components/LeftBlocks/index.vue';
import CenterEditor from '@/components/CenterEditor/index.vue';
import RightConfigPanel from '@/components/RightConfigPanel/index.vue';
</script>

<style scoped lang="less">
.page-container {
	height: 100%;
  .top {
    height: 65px;
		border-bottom: 1px solid #ccc;
    .top-title {
			padding: 20px;
			font-size: 18px;
			font-weight: 700;
      text-align: left;
    }
  }
  .main {
    display: flex;
    height: calc(100vh - 90px);
    .left {
			height: 100%;
      width: 300px;
    }
    .center {
      height: 100%;
      flex: 1;
      background: beige;
    }
    .right {
      height: 100%;
      width: 300px;
    }
  }
}

</style>