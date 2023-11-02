<script setup lang="ts">
import { Board } from '@/models/Board'
import { ref, watch } from 'vue'
import CellComponent from './CellComponent.vue'
import FragComponent from './FragComponent.vue'
import { Cell } from '@/models/Cell'
import type { Ref } from 'vue'
import type { Player } from '@/models/Player'

interface Props {
  board: Board
  currentPlayer: Player | null
}
const props = defineProps<Props>()
const emit = defineEmits(['updateBoard', 'swapPlayer'])
const selectedCell = ref(null) as Ref<Cell | null>

const click = (cell: Cell) => {
  if (
    selectedCell.value &&
    selectedCell.value !== cell &&
    selectedCell.value.figure?.canMove(cell)
  ) {
    selectedCell.value.moveFigure(cell)
    selectedCell.value = null
    emit('swapPlayer')
  } else {
    if (cell.figure?.color === props.currentPlayer?.color) {
      selectedCell.value = cell
    }
  }
}

const hightLightCells = () => {
  props.board.hightLightCells(selectedCell.value)
  updateBoard()
}

const updateBoard = () => {
  const newBoard = props.board.getCopyBoard()
  emit('updateBoard', newBoard)
}

watch(selectedCell, () => {
  hightLightCells()
})
</script>

<template>
  <div>
    <h3 class="currentPlayer">Ход {{ currentPlayer?.color === 'white' ? 'Белых' : 'Чёрных' }}</h3>
  </div>
  <div class="board">
    <ul class="lcoordintates">
      <li>8</li>
      <li>7</li>
      <li>6</li>
      <li>5</li>
      <li>4</li>
      <li>3</li>
      <li>2</li>
      <li>1</li>
    </ul>
    <FragComponent v-for="(row, index) in board.cells" :key="index">
      <CellComponent
        :click="click"
        :selected="cell.x === selectedCell?.x && cell.y === selectedCell?.y"
        :cell="cell"
        v-for="cell in row"
        :key="cell.id"
      />
    </FragComponent>
    <ul class="bcoordintates">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
    </ul>
  </div>
</template>

<style>
.currentPlayer {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
}
.bcoordintates {
  font-size: 16px;
  display: flex;
  list-style: none;
  gap: 55px;
  margin-left: 25px;
  margin-top: 5px;
  color: silver;
}
.lcoordintates {
  font-size: 16px;
  position: absolute;
  translate: -50px 13px;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 38px;
  margin-left: 25px;
  margin-top: 5px;
  color: silver;
}
</style>
