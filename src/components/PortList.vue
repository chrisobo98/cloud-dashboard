<template>
  <BaseCard>
    <template #header>Saved Ports</template>
    <div v-if="ports.length">
      <ul>
        <li v-for="port in ports" :key="port.id">
          <strong>{{ port.provider.name }} - {{ port.provider.location }}</strong
          ><br />
          Port Name: {{ port.portName }}<br />
          Port Speed: {{ port.portSpeed }}<br />
          Term: {{ port.term }}<br />
          <button @click="editPort(port)" class="btn btn-warning btn-sm mt-2">Edit</button>
          <button @click="confirmDelete(port)" class="btn btn-danger btn-sm mt-2">Delete</button>
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

onMounted(loadPorts)
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}
</style>
