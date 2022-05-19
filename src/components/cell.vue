<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { defineProps } from 'vue';

const props = defineProps({
  status: {
    type: Boolean,
    default: false
  },
  mineTips: {
    type: Number,
    default: 0
  }
});

const cellText = computed(() => {
  const { status, mineTips } = props;
  if (!status || !mineTips) return '';
  if (status && mineTips === 9) return '雷';
  return mineTips;
});

const cellClass = computed(() => {
  const { status, mineTips } = props;
  if (!status) return '';
  if (!mineTips) return 'gray';
  if (mineTips === 9) return 'bomb';
  return 'flip';
});

</script>

<template>
<span class="cell" :class="cellClass">
  {{cellText}}
</span>
</template>

<style scoped lang="scss">
.cell {
  &:hover {
    cursor: pointer;
  }
  &.flip {
    background: yellowgreen;
  }
  &.gray {
    background: lightgray;
  }
  &.bomb {
    background: crimson;
  }
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border-radius: 2px;
  background: aquamarine;
  & + .cell {
    margin-left: 10px;
  }
}
</style>
