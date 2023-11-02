<template>
  <div class="bg">
    <div class="modal">
      <p class="win">Победили {{ props.whoWin.color === 'white' ? 'Белые' : 'Чёрные' }}</p>
      <button class="btn" @click="$emit('restart')">Перезапустить игру</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '@/models/Player'

interface Props {
  whoWin: Player
}
const props = defineProps<Props>()
const emit = defineEmits(['restart'])
</script>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal {
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.win {
  font-size: 24px;
}

.btn {
  padding: 10px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  &:hover {
    background: whitesmoke;
  }
}
</style>
