<template>
  <BaseCard>
    <h2>Port Sessions</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Session ID</th>
          <th>Status</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions" :key="session.id">
          <td>{{ session.id }}</td>
          <td>{{ session.status }}</td>
          <td>{{ session.updated }}</td>
        </tr>
      </tbody>
    </table>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BaseCard from '@/components/Base/BaseCard.vue'

interface Session {
  id: string
  status: string
  updated: string
}

export default defineComponent({
  name: 'SessionsTable',
  components: {
    BaseCard
  },
  setup() {
    const state = reactive({
      sessions: [
        { id: '1', status: 'Active', updated: '2024-07-20' },
        { id: '2', status: 'Idle', updated: '2024-07-19' }
      ] as Session[]
    })

    return {
      ...state
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
