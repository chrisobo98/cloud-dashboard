<template>
  <BaseCard :heightClass="'h-40'">
    <template #header>Saved Ports</template>
    <div v-if="ports.length" class="ports-container">
      <ul class="d-flex flex-row overflow-auto">
        <li
          v-for="port in ports"
          :key="port.id"
          class="port-item d-flex align-items-start border p-2 m-2 bg-white rounded"
        >
          <img
            :src="getProviderLogo(port.provider.name)"
            :alt="`${port.provider.name} Logo`"
            height="40"
            class="provider-logo me-3"
          />
          <div>
            <strong>{{ port.provider.name }} - {{ port.provider.location }}</strong
            ><br />
            Port Name: {{ port.portName }}<br />
            Port Speed: {{ port.portSpeed }}<br />
            Term: {{ port.term }}<br />
            <button @click="editPort(port)" class="btn btn-warning btn-sm mt-2">Edit</button>
            <button @click="confirmDelete(port)" class="btn btn-danger btn-sm mt-2">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No ports saved yet.</p>
    </div>
    <EditPortModal v-if="selectedPort" :port="selectedPort" @update="updatePort" />
    <DeletePortModal v-if="portToDelete" :port="portToDelete" @confirm-delete="deletePort" />
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import BaseCard from '@/components/Base/BaseCard.vue'
import EditPortModal from '@/components/EditPortModal.vue'
import DeletePortModal from '@/components/DeletePortModal.vue'
import { Port } from '@/types/types'
import { Modal } from 'bootstrap'

const props = defineProps<{ ports: Port[] }>()
const selectedPort = ref<Port | null>(null)
const portToDelete = ref<Port | null>(null)

watch(
  () => props.ports,
  (newPorts) => {
    ports.value = newPorts
  }
)

const ports = ref<Port[]>(props.ports)

const loadPorts = () => {
  ports.value = JSON.parse(localStorage.getItem('ports') || '[]')
}

const editPort = (port: Port) => {
  selectedPort.value = { ...port }
  nextTick(() => {
    const modalElement = document.getElementById('editPortModal')
    const modal = Modal.getOrCreateInstance(modalElement!)
    modal.show()
  })
}

const confirmDelete = (port: Port) => {
  portToDelete.value = { ...port }
  nextTick(() => {
    const modalElement = document.getElementById('deletePortModal')
    const modal = Modal.getOrCreateInstance(modalElement!)
    modal.show()
  })
}

const deletePort = (portName: string) => {
  ports.value = ports.value.filter((port) => port.portName !== portName)
  localStorage.setItem('ports', JSON.stringify(ports.value))
  portToDelete.value = null
  const modalElement = document.getElementById('deletePortModal')
  const modal = Modal.getInstance(modalElement!)
  modal?.hide()
}

const updatePort = (updatedPort: Port) => {
  const index = ports.value.findIndex((port) => port.id === updatedPort.id)
  if (index !== -1) {
    ports.value[index] = updatedPort
    localStorage.setItem('ports', JSON.stringify(ports.value))
  }
  const modalElement = document.getElementById('editPortModal')
  const modal = Modal.getInstance(modalElement!)
  modal?.hide()
}

const getProviderLogo = (providerName: string) => {
  const formattedName = providerName.split(' ')[0].toLowerCase() // Extract and lowercase the first word
  console.log(formattedName)
  return `/src/assets/logos/${formattedName}-logo.jpg`
}
onMounted(loadPorts)
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.horizontal-list {
  display: flex;
  overflow-x: auto;
  padding: 0;
  margin: 0;
}

.port-item {
  flex: 0 0 auto;
  margin-right: 1rem;
}

.ports-container {
  max-height: 300px; /* Set your desired max height */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 0.5rem;
}
</style>
