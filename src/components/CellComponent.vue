<template>
  <div
    @click="() => click(cell)"
    v-bind:class="[{ selected: selected }, cell.color, { green: cell.available && cell.figure }]"
    class="cell"
  >
    <div v-if="cell.available && !cell.figure" class="available" />
    <img v-if="cell.figure?.logo" :src="cell.figure.logo" />
  </div>
</template>
<script setup lang="ts">
import type { Cell } from '@/models/Cell'

interface Props {
  cell: Cell
  selected: boolean
  click: (cell: Cell) => void
}
const props = defineProps<Props>()
</script>
<style scoped>
img {
  width: 48px;
  height: 48px;
  position: relative;
}
.selected {
  background-color: brown;
}

.available {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #24bd16;
}

.green {
  background-color: green;
}
</style>
