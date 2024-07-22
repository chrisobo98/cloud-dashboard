<template>
  <!-- Header -->
  <h2>Your Cloud Dashboard</h2>
  <h5 class="text-body-tertiary fw-semibold">Here’s what’s going on at your business right now</h5>
  <div class="row my-4">
    <PortList :ports="ports" />
  </div>

  <div class="row g-4">
    <!-- Column for AddPort and PortMap -->
    <div class="col-12 col-xxl-4">
      <div class="row g-4">
        <div class="col-12">
          <AddPort @port-added="handlePortAdded" />
        </div>
        <div class="col-12">
          <PortMap />
        </div>
      </div>
    </div>
    <!-- Column for PortList -->
    <div class="col-12 col-xxl-4 my-4">
      <div class="row g-4">
        <PortUtilizationChart />
        <PortDataTransfer />
      </div>
    </div>
    <!-- Column for charts -->
    <div class="col-12 col-xxl-4 my-4">
      <div class="row g-4">
        <div class="col-12 col-md-6">
          <ProviderUsageChart />
        </div>
        <div class="col-12 col-md-6">
          <PortSpeedDistributionChart />
        </div>
        <div class="col-12 col-md-12">
          <TotalSpend />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddPort from '@/components/AddPort.vue'
import PortList from '@/components/PortList.vue'
import PortDataTransfer from '@/components/Charts/PortDataTransfer.vue'
import PortUtilizationChart from '@/components/Charts/PortUtilizationChart.vue'
import PortSpeedDistributionChart from '@/components/Charts/PortSpeedDistributionChart.vue'
import ProviderUsageChart from '@/components/Charts/ProviderUsageChart.vue'
import PortMap from '@/components/PortMap.vue'
import TotalSpend from '@/components/TotalSpend.vue'

const ports = ref([])

const handlePortAdded = (newPorts) => {
  ports.value = newPorts
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
