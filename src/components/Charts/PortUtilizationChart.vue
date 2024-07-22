<template>
  <BaseCard :heightClass="'h-40'">
    <template #header>Port Utilization</template>
    <canvas id="utilizationChart"></canvas>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import BaseCard from '@/components/Base/BaseCard.vue'

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend)

onMounted(() => {
  const ctx = document.getElementById('utilizationChart') as HTMLCanvasElement
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Port 1', 'Port 2', 'Port 3', 'Port 4'],
      datasets: [
        {
          label: 'Utilization (%)',
          data: [65, 59, 80, 81],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
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
            text: 'Ports'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Utilization (%)'
          },
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped></style>
