<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
    <div class="container-fluid">
      <img src="@/assets/logo.png" alt="Logo" height="200" width="200" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link text-white"
              target="_blank"
              href="https://www.linkedin.com/in/christopher-bermudez-ortiz/"
              >LinkedIn</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-white"
              target="_blank"
              href="https://christopherbermudez.com/resume"
              >Resume</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" target="_blank" href="https://github.com/chrisobo98"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  width: 100%;
}
</style>
