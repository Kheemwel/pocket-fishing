<script setup lang="ts">
import { LOCATION_DB } from '@/data/locationDatabase'
import { useDevStore } from '@/stores/devStore'
import type { AreaId } from '@/types/location'

const devStore = useDevStore()

function travelTo(areaId: AreaId) {
  devStore.dispatcher?.dispatch({ type: 'travel', payload: { to: areaId } })
}
</script>

<template>
  <div class="map-screen">
    <h1>Map</h1>
    <div v-for="(location, locationId) in LOCATION_DB" :key="locationId">
      <h2>{{ location.name }}</h2>
      <ul>
        <li v-for="(area, areaId) in location.areas" :key="areaId">
          <button @click="travelTo(areaId)">
            {{ area.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
