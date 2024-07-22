<template>
  <BaseCard>
    <template #header>Port Speed Distribution</template>
    <canvas id="speedChart"></canvas>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Chart, ArcElement, PieController, Title, Tooltip, Legend } from 'chart.js'
import BaseCard from '@/components/Base/BaseCard.vue'

Chart.register(ArcElement, PieController, Title, Tooltip, Legend)

onMounted(() => {
  const ctx = document.getElementById('speedChart') as HTMLCanvasElement
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['1 Gbps', '10 Gbps', '100 Gbps'],
      datasets: [
        {
          label: 'Port Speed Distribution',
          data: [10, 30, 60],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 10000
      }
    }
  })
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
