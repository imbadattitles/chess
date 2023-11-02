<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue'
import { ref, onMounted, type Ref } from 'vue'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigures from './components/LostFigures.vue'
import TimerGame from './components/TimerGame.vue'
import WinGame from './components/WinGame.vue'
const board = ref(new Board()) as Ref<Board>
const winGame = ref<Player | null>(null)

const restart = () => {
  const newBoard = new Board()
  newBoard.initCells()
  newBoard.AddFigures()
  winGame.value = null
  board.value = newBoard
  currentPlayer.value = whitePlayer.value
}

onMounted(() => {
  restart()
})

const updateBoard = (value: Board) => {
  board.value = value
}
const whitePlayer = ref(new Player(Colors.WHITE))
const blackPlayer = ref(new Player(Colors.BLACK))
const currentPlayer = ref<Player | null>(null)

const swapPlayer = () => {
  currentPlayer.value?.color === Colors.WHITE
    ? (currentPlayer.value = blackPlayer.value)
    : (currentPlayer.value = whitePlayer.value)

  if (board.value.Mat(currentPlayer.value.color)) {
    winGame.value = currentPlayer.value
  }
}
const timerWin = () => {
  currentPlayer.value?.color === Colors.WHITE
    ? (winGame.value = blackPlayer.value)
    : (winGame.value = whitePlayer.value)
}
</script>

<template>
  <main class="app">
    <WinGame v-if="winGame" @restart="restart" :who-win="winGame" />
    <TimerGame :current-player="currentPlayer" @timer-win="timerWin" @restart="restart" />
    <BoardComponent
      @swap-player="swapPlayer"
      :board="board"
      :current-player="currentPlayer"
      @update-board="updateBoard"
    />
    <div class="lost">
      <LostFigures
        :title="`Потеряно черных фигур ${board.lostBlackFigures.length}`"
        :figures="board.lostBlackFigures"
      />
      <LostFigures
        :title="`Потеряно белых фигур ${board.lostWhiteFigures.length}`"
        :figures="board.lostWhiteFigures"
      />
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.lost {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.board {
  width: calc(64px * 8);
  height: calc(64px * 8);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.cell {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black {
  background-color: deepskyblue;
}

.white {
  background: rgb(255, 228, 177);
}
</style>
