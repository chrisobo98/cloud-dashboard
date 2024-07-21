<template>
  <BaseCard>
    <template #header>Select Port Location</template>

    <form @submit.prevent="addPort" class="form-inline">
      <div class="form-group mb-2">
        <input v-model="portName" class="form-control" placeholder="Port Name" required />
      </div>
      <button type="submit" class="btn btn-primary mb-2">Add Port</button>
    </form>

    <template #footer> Footer Content (if any) </template>
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/Base/BaseCard.vue'

const portName = ref('')

const addPort = () => {
  // Dispatch action or handle the form submission
  portName.value = ''
}
</script>

<style scoped>
/* Add your styles here */
</style>
