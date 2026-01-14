<script setup lang="ts">
import { useFishingMinigameStore } from '@/stores/minigameStore'
import { computed } from 'vue'

const store = useFishingMinigameStore()

const controlStyle = computed(() => ({
  width: `${store.controlWidthPercent}%`,
  left: `${store.controlLeftPercent}%`,
}))

const fishStyle = computed(() => ({
  left: `${store.fishLeftPercent}%`,
}))

const progressStyle = computed(() => ({
  width: `${store.progress}%`,
}))
</script>

<template>
  <div v-if="store.active" class="fishing-ui">
    <!-- <div class="fishing-ui"> -->
    <div class="title">Fishing</div>

    <div class="bar-container">
      <div class="fish-container">
        <div class="fish-icon" :style="fishStyle">🐟</div>
      </div>

      <div class="bar">
        <div class="control" :style="controlStyle" />

        <div class="fish-indicator" :style="fishStyle" />
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="progressStyle" />
        <div v-if="store.progressSpeed !== 0" class="progress-speed">
          {{ store.progressSpeed }}%
        </div>
      </div>
      <div class="progress-text">{{ Math.floor(store.progress) }}%</div>
    </div>

    <button
      :disabled="store.phase !== 'running'"
      class="reel-button"
      @mousedown="store.setReelHeld(true)"
      @mouseup="store.setReelHeld(false)"
      @mouseleave="store.setReelHeld(false)"
      @touchstart.prevent="store.setReelHeld(true)"
      @touchend.prevent="store.setReelHeld(false)"
    >
      HOLD TO REEL
    </button>
  </div>
</template>

<style>
.fishing-ui {
  width: 100%;
  padding: 16px;
  background: #0f172a;
  border-radius: 12px;
  color: #e5e7eb;
  font-family: system-ui, sans-serif;
  user-select: none;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.bar-container {
  margin: 32px 0 12px 0; /* Increased top margin to make room for floating fish */
  position: relative;
}

.bar {
  position: relative;
  height: 50px;
  background: #020617;
  border-radius: 10px;
  overflow: hidden; /* Keeps the green control bar inside */
  border: 2px solid #334155;
}
.control {
  position: absolute;
  height: 100%;
  background: rgba(34, 197, 94, 0.6); /* Slightly transparent to see indicator behind it */
  border-left: 2px solid #4ade80;
  border-right: 2px solid #4ade80;
  transition: left 0.05s linear;
}

.fish-indicator {
  position: absolute;
  top: 0;
  width: 4px; /* Thickness of the line */
  height: 100%;
  background: #fbbf24; /* Golden color for visibility */
  box-shadow: 0 0 8px #fbbf24; /* Glow effect */
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}

/* NEW: Container for the emoji to sit above the bar */
.fish-container {
  position: absolute;
  top: -28px; /* Pulls the fish icon above the bar */
  left: 0;
  right: 0;
  height: 0; /* Keeps the container from interfering with clicks */
}

/* NEW: The emoji styling */
.fish-icon {
  position: absolute;
  transform: translateX(-50%);
  font-size: 24px;
  pointer-events: none;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
}

.progress-container {
  margin-top: 8px;
  position: relative; /* Anchor for the speed text */
}

.progress-bar {
  position: relative; /* Allows absolute positioning inside */
  height: 25px;
  background: #020617;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
  transition: width 0.1s linear;
}

.progress-text {
  text-align: right;
  font-size: 12px;
  margin-top: 2px;
  opacity: 0.8;
}

.progress-speed {
  position: absolute;
  bottom: 2px; /* Anchors it to the bottom */
  left: 50%; /* Move to horizontal center */
  transform: translateX(-50%); /* Perfectly center it */
  font-size: 16px;
  font-weight: bold;
  color: #cacaca;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8); /* Ensures readability over the blue fill */
  pointer-events: none;
  z-index: 5;
}

.reel-button {
  width: 100%;
  margin-top: 12px;
  height: 250px;
  padding: 10px;
  background: #2563eb;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.reel-button:active {
  background: #1d4ed8;
}
</style>
