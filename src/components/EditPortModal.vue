<template>
  <div
    class="modal fade"
    id="editPortModal"
    tabindex="-1"
    aria-labelledby="editPortModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPortModalLabel">Edit Port</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="form-group mb-2">
              <label for="portName">Port Name</label>
              <input v-model="editPortName" class="form-control" id="portName" required />
            </div>
            <div class="form-group mb-2">
              <label for="portSpeed">Port Speed</label>
              <select v-model="editPortSpeed" class="form-control" id="portSpeed" required>
                <option>1 Gbps</option>
                <option>10 Gbps</option>
                <option>100 Gbps</option>
              </select>
            </div>
            <div class="form-group mb-2">
              <label for="term">Minimum Term</label>
              <select v-model="editTerm" class="form-control" id="term" required>
                <option>1 Month</option>
                <option>12 Months</option>
                <option>24 Months</option>
                <option>36 Months</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
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
const emit = defineEmits(['update'])

const editPortName = ref('')
const editPortSpeed = ref('')
const editTerm = ref('')

const showModal = () => {
  nextTick(() => {
    const modalElement = document.getElementById('editPortModal')
    const modal = Modal.getOrCreateInstance(modalElement!)
    modal.show()
  })
}

watch(
  () => props.port,
  (newPort) => {
    if (newPort) {
      editPortName.value = newPort.portName
      editPortSpeed.value = newPort.portSpeed
      editTerm.value = newPort.term
      showModal()
    }
  },
  { immediate: true }
)

const saveChanges = () => {
  if (props.port) {
    emit('update', {
      ...props.port,
      portName: editPortName.value,
      portSpeed: editPortSpeed.value,
      term: editTerm.value
    })
    hideModal()
  }
}

const hideModal = () => {
  const modalElement = document.getElementById('editPortModal')
  const modal = Modal.getInstance(modalElement!)
  modal?.hide()
}
</script>

<style scoped></style>
