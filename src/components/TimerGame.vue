<script setup lang="ts">
import { Colors } from '@/models/Colors'
import type { Player } from '@/models/Player'
import { ref, watch } from 'vue'

interface Props {
  currentPlayer: Player | null
}

const emit = defineEmits(['restart', 'timerWin'])
const props = defineProps<Props>()

const blackTime = ref(300)
const whiteTime = ref(300)
const timer = ref<null | ReturnType<typeof setInterval>>(null)
const startTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  const callback =
    props.currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime
  timer.value = setInterval(callback, 1000)
}

const decrementBlackTime = () => {
  blackTime.value = blackTime.value - 1
}
const decrementWhiteTime = () => {
  whiteTime.value = whiteTime.value - 1
}
const restart = () => {
  blackTime.value = 300
  whiteTime.value = 300
  emit('restart')
}

watch(() => props.currentPlayer, startTimer)
watch(blackTime, () => {
  if (blackTime.value === 0) {
    emit('timerWin')
    blackTime.value = 300
    whiteTime.value = 300
  }
})
watch(whiteTime, () => {
  if (whiteTime.value === 0) {
    emit('timerWin')
    blackTime.value = 300
    whiteTime.value = 300
  }
})
</script>

<template>
  <div class="timer">
    <div>
      <button class="restart" @click="restart">Перезапуск игры</button>
    </div>
    <p>Черные - {{ blackTime }}</p>
    <p>Белые - {{ whiteTime }}</p>
  </div>
</template>

<style>
.timer {
  padding: 20px;
  border: 1px solid silver;
  margin-bottom: 20px;
}

.restart {
  background: white;
  border: 1px solid grey;
  padding: 4px;
  margin-bottom: 10px;
}
</style>
