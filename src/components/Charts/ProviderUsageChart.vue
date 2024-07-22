<template>
  <BaseCard>
    <template #header>Provider Usage Distribution</template>
    <canvas id="providerChart"></canvas>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Chart, ArcElement, DoughnutController, Title, Tooltip, Legend } from 'chart.js'
import BaseCard from '@/components/Base/BaseCard.vue'

Chart.register(ArcElement, DoughnutController, Title, Tooltip, Legend)

onMounted(() => {
  const ctx = document.getElementById('providerChart') as HTMLCanvasElement
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['AWS', 'Google Cloud', 'Oracle', 'Azure'],
      datasets: [
        {
          label: 'Provider Usage Distribution',
          data: [35, 25, 20, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
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

<style scoped></style>
