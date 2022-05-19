<script setup lang="ts">
import { reactive } from 'vue';
import { generateLayout } from './utils';
import Cell from './components/cell.vue';

const colLen = 8;
const rowLen = 10;
const mineCount = 16;
let gameover = false;

let layout = reactive(generateLayout(colLen, rowLen, mineCount));

const checkMine = (colIndex: number, rowIndex: number) => {
  if (!layout[rowIndex] || !layout[rowIndex][colIndex] || layout[rowIndex][colIndex].isFlip) return;
  layout[rowIndex][colIndex].isFlip = true;
  if (!layout[rowIndex][colIndex].tips) {
    const offsetMap = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    offsetMap.forEach((offset) => {
      checkMine(colIndex + offset[1], rowIndex + offset[0]);
    });
  }
}

const onCellClick = (colIndex: number, rowIndex: number) => {
  if (gameover) {
    gameover = false;
    layout.splice(0, layout.length, ...generateLayout(colLen, rowLen, mineCount));
  } else if (layout[rowIndex][colIndex].tips === 9) {
    layout.forEach((row) => {
      row.forEach((col) => {
        col.isFlip = true;
      })
    });
    gameover = true;
  } else {
    checkMine(colIndex, rowIndex);
  }
}

</script>

<template>
<div class="mine-sweeper-layout">
  <div class="row" v-for="(row, rowIndex) in layout" :key="rowIndex">
    <Cell
      class="col"
      v-for="(cell, colIndex) in row"
      :key="colIndex"
      :mine-tips="cell.tips"
      :status="cell.isFlip"
      @click="onCellClick(colIndex, rowIndex)"
    />
  </div>
</div>
</template>

<style scoped lang="scss">
.mine-sweeper-layout {
  width: fit-content;
  margin: 60px auto auto;
}
.row {
  & + .row {
    margin-top: 10px;
  }
}
</style>
