<template>
  <BaseCard>
    <template #header>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: step === 1, disabled: step < 1 }"
            @click="setStep(1)"
            href="#"
          >
            Step 1: Select Location
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: step === 2, disabled: step < 2 }"
            @click="setStep(2)"
            href="#"
          >
            Step 2: Enter Details
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: step === 3, disabled: step < 3 }"
            @click="setStep(3)"
            href="#"
          >
            Step 3: Review
          </a>
        </li>
      </ul>
    </template>

    <div v-if="step === 1">
      <form @submit.prevent="nextStep">
        <div class="form-group mb-2">
          <label for="provider">Cloud Provider</label>
          <select v-model="selectedProvider" class="form-control" required>
            <option v-for="provider in providers" :key="provider.id" :value="provider">
              {{ provider.name }} - {{ provider.location }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mb-2">Next</button>
      </form>
    </div>

    <div v-if="step === 2">
      <form @submit.prevent="nextStep">
        <div class="form-group mb-2">
          <label for="portName">Port Name</label>
          <input v-model="portName" class="form-control" placeholder="Port Name" required />
        </div>
        <div class="form-group mb-2">
          <label for="portSpeed">Port Speed</label>
          <select v-model="portSpeed" class="form-control" required>
            <option>1 Gbps</option>
            <option>10 Gbps</option>
            <option>100 Gbps</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <label for="term">Minimum Term</label>
          <select v-model="term" class="form-control" required>
            <option>1 Month</option>
            <option>12 Months</option>
            <option>24 Months</option>
            <option>36 Months</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mb-2">Next</button>
        <button @click="prevStep" class="btn btn-secondary mb-2">Back</button>
      </form>
    </div>

    <div v-if="step === 3">
      <h3>Review your selection</h3>
      <p>Provider: {{ selectedProvider?.name }} - {{ selectedProvider?.location }}</p>
      <p>Port Name: {{ portName }}</p>
      <p>Port Speed: {{ portSpeed }}</p>
      <p>Term: {{ term }}</p>
      <button @click="savePort" class="btn btn-success mb-2">Confirm</button>
      <button @click="prevStep" class="btn btn-secondary mb-2">Back</button>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import BaseCard from '@/components/Base/BaseCard.vue'

const step = ref(1)
const selectedProvider = ref<{ id: number; name: string; location: string } | null>(null)
const portName = ref('')
const portSpeed = ref('')
const term = ref('')
const providers = [
  { id: 1, name: 'AWS Data Center', location: 'Virginia, USA' },
  { id: 2, name: 'Google Cloud', location: 'Los Angeles, USA' },
  { id: 3, name: 'Oracle Data Center', location: 'New York, USA' },
  { id: 4, name: 'Azure Data Center', location: 'Chicago, USA' }
]

const emits = defineEmits(['port-added'])

const setStep = (newStep: number) => {
  if (newStep <= step.value) step.value = newStep
}

const nextStep = () => {
  step.value++
}

const prevStep = () => {
  step.value--
}

const savePort = () => {
  if (!selectedProvider.value) return

  const portDetails = {
    id: Date.now(),
    provider: selectedProvider.value,
    portName: portName.value,
    portSpeed: portSpeed.value,
    term: term.value
  }
  const ports = JSON.parse(localStorage.getItem('ports') || '[]')
  ports.push(portDetails)
  localStorage.setItem('ports', JSON.stringify(ports))
  emits('port-added', ports)
  resetForm()
}

const resetForm = () => {
  step.value = 1
  selectedProvider.value = null
  portName.value = ''
  portSpeed.value = ''
  term.value = ''
}
</script>

<style scoped>
.nav-tabs {
  display: flex;
  justify-content: space-around;
}

.nav-link.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
