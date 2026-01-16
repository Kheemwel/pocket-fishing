<script setup lang="ts">
import { PersistenceService } from '@/services/PersistenceService'

function exportSave() {
  const state = PersistenceService.getGameState()
  const dataStr = JSON.stringify(state, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = 'pocket-fishing-save.json'

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

function importSave() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const state = JSON.parse(e.target?.result as string)
        PersistenceService.applyGameState(state)
      } catch (e) {
        console.error('Failed to parse save data:', e)
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
</script>

<template>
  <div class="settings-screen">
    <h1>Settings</h1>
    <div class="setting">
      <h2>Import/Export Save</h2>
      <button @click="exportSave">Export</button>
      <button @click="importSave">Import</button>
    </div>
  </div>
</template>

<style scoped></style>
