<template>
  <!-- Header -->
  <div class="my-4">
    <h2>Your Cloud Dashboard</h2>
    <h5 class="text-body-tertiary fw-semibold">
      Here’s what’s going on at your business right now
    </h5>
  </div>
  <div class="row g-4">
    <!-- Row -->
    <div class="col-12 col-xxl-6">
      <div class="row align-items-center g-4">
        <AddPort @port-added="handlePortAdded" />
        <PortChart />
      </div>
    </div>
    <!-- Row -->
    <div class="col-12 col-xxl-6">
      <div class="row align-items-center g-4">
        <PortList :ports="ports" />
        <PortMap />
        <TotalSpend />
      </div>
    </div>
    <!-- Chart Component or Chart Placeholder -->
    <SessionsTable />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddPort from '@/components/AddPort.vue'
import PortList from '@/components/PortList.vue'
import PortChart from '@/components/PortChart.vue'
import PortMap from '@/components/PortMap.vue'
import SessionsTable from '@/components/SessionsTable.vue'
import TotalSpend from '@/components/TotalSpend.vue'

const ports = ref([])

const handlePortAdded = (newPorts) => {
  ports.value = newPorts
}
</script>

<style scoped></style>
