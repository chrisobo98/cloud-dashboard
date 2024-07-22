<template>
  <BaseCard :heightClass="'h-40'">
    <template #header>Data Transferred Over Time</template>
    <canvas id="dataChart"></canvas>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import BaseCard from '@/components/Base/BaseCard.vue'

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

onMounted(() => {
  const ctx = document.getElementById('dataChart') as HTMLCanvasElement
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'Data Transferred (GB)',
          data: [10, 20, 30, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 10000
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Data Transferred (GB)'
          },
          beginAtZero: true
        }
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
