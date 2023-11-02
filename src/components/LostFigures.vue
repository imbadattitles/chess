<template>
  <div class="wrap">
    <h3>{{ title }}</h3>
    <div class="lostfigures">
      <div class="name" v-for="figure in figures" :key="figure.id">
        <img v-if="figure.logo" :src="figure.logo" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Figure } from '@/models/figures/figure'

interface Props {
  title: string
  figures: Figure[]
}
const props = defineProps<Props>()
</script>
<style scoped>
img {
  width: 30;
  height: 40px;
  background: grey;
  padding: 4px;
  border-radius: 5px;
}

.name {
  font-size: 18px;
}

h3 {
  margin-bottom: 10px;
  text-align: center;
}

.wrap {
  background: whitesmoke;
  width: 300px;
  padding: 15px;
}

.lostfigures {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
