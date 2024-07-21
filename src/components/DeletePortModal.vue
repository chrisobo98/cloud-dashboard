<template>
  <div
    class="modal fade"
    id="deletePortModal"
    tabindex="-1"
    aria-labelledby="deletePortModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deletePortModalLabel">Delete Port</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete the port <strong>{{ port?.portName }}</strong
            >?
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Port } from '@/types/types'
import { Modal } from 'bootstrap'

const props = defineProps<{ port: Port | null }>()
const emit = defineEmits(['confirm-delete'])

const showModal = () => {
  nextTick(() => {
    const modalElement = document.getElementById('deletePortModal')
    const modal = Modal.getOrCreateInstance(modalElement!)
    modal.show()
  })
}

watch(
  () => props.port,
  (newPort) => {
    if (newPort) {
      showModal()
    }
  }
)

const confirmDelete = () => {
  if (props.port) {
    emit('confirm-delete', props.port.portName)
    hideModal()
  }
}

const hideModal = () => {
  const modalElement = document.getElementById('deletePortModal')
  const modal = Modal.getInstance(modalElement!)
  modal?.hide()
}
</script>

<style scoped></style>
