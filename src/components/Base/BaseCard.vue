<template>
  <div :class="['card p-0', heightClass]">
    <!-- Conditional rendering for card header -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <!-- Conditional rendering for card footer -->
    <div v-if="$slots.footer" class="card-footer text-muted">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  heightClass: {
    type: String,
    default: 'h-full'
  }
})
</script>

<style scoped></style>
