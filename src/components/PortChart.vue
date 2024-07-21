<template>
  <BaseCard>
    <template #header>Selected Port: </template>
    <h2>Port Information Over Time</h2>
    <canvas id="portChart"></canvas>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Chart } from 'chart.js/auto'
import BaseCard from '@/components/Base/BaseCard.vue'

onMounted(() => {
  const ctx = (document.getElementById('portChart') as HTMLCanvasElement).getContext('2d')
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Port Data',
            data: [10, 20, 30, 40],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})
</script>
