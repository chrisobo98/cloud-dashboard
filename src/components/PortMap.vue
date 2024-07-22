<template>
  <BaseCard>
    <template #header> Map View </template>
    <div class="map-container">
      <div id="map"></div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import BaseCard from '@/components/Base/BaseCard.vue'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Port {
  id: number
  name: string
  coordinates: [number, number]
}

const ports: Port[] = [
  { id: 1, name: 'Los Angeles', coordinates: [-118.2437, 34.0522] },
  { id: 2, name: 'New York', coordinates: [-74.006, 40.7128] },
  { id: 3, name: 'Chicago', coordinates: [-87.6298, 41.8781] }
]

const map = ref<mapboxgl.Map | null>(null)

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJvc2lyaXM5OCIsImEiOiJjbHl1YjFneDMwN21oMmlweXdyMmc0eXRzIn0.lRt0q3baCcyEdzZMnC6IMw'

  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-98.5795, 39.8283], // Center of the map (USA)
    zoom: 4
  })

  map.value.on('load', () => {
    ports.forEach((port) => {
      new mapboxgl.Marker()
        .setLngLat(port.coordinates)
        .setPopup(new mapboxgl.Popup().setText(port.name))
        .addTo(map.value!)
    })
  })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
