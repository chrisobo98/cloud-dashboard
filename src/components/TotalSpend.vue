<template>
  <BaseCard>
    <template #header>Payment made across all channels</template>
    <div class="row flex-between-center mb-4 g-3">
      <div class="col-auto">
        <h3>Total Spend</h3>
        <p class="text-body-tertiary lh-sm mb-0">Monthly billing information</p>
      </div>
      <div class="col-8 col-sm-4">
        <select
          v-model="selectedMonth"
          class="form-select form-select-sm"
          @change="updateMonthDetails"
        >
          <option v-for="month in months" :key="month.name">{{ month.name }}</option>
        </select>
      </div>
    </div>
    <div v-if="selectedMonthDetails" class="details">
      <p>Total Money Spent: {{ selectedMonthDetails.spent }}</p>
      <p>Ports Purchased: {{ selectedMonthDetails.ports }}</p>
      <p>Gigabytes Used: {{ selectedMonthDetails.gigabytes }}</p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/Base/BaseCard.vue'

interface MonthDetails {
  name: string
  spent: string
  ports: number
  gigabytes: number
}

const months: MonthDetails[] = [
  { name: 'Mar 1 - 31, 2022', spent: '$1200', ports: 15, gigabytes: 200 },
  { name: 'April 1 - 30, 2022', spent: '$1500', ports: 20, gigabytes: 250 },
  { name: 'May 1 - 31, 2022', spent: '$1000', ports: 10, gigabytes: 150 }
]

const selectedMonth = ref(months[0].name)
const selectedMonthDetails = ref<MonthDetails>(months[0])

const updateMonthDetails = () => {
  selectedMonthDetails.value =
    months.find((month) => month.name === selectedMonth.value) || months[0]
}
</script>
