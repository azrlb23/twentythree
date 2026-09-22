<script setup>
import { ref, watch } from 'vue'
import { Music, Play, Pause, SkipBack, SkipForward, ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useYouTube } from '../composables/useYouTube.js'

const { isPlaying, togglePlay, currentSong, nextSong, prevSong, progress, seekTo } = useYouTube()
const isExpanded = ref(false)

const isDragging = ref(false)
const localProgress = ref(0)

watch(progress, (newVal) => {
  if (!isDragging.value) {
    localProgress.value = newVal
  }
})

const onSeekStart = () => {
  isDragging.value = true
}

const onSeekInput = (e) => {
  localProgress.value = parseFloat(e.target.value)
}

const onSeekEnd = (e) => {
  seekTo(localProgress.value)
  // Slight delay before releasing dragging state to avoid rubber-banding from old interval progress
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}
</script>

<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
    <div 
      :class="[
        'bg-white/95 backdrop-blur-md border border-r-0 border-[#6B313C]/20 rounded-l-2xl shadow-aesthetic flex items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden',
        isExpanded ? 'w-[300px] h-[110px] p-3 cursor-default' : 'w-10 h-16 p-0 cursor-pointer hover:bg-white'
      ]"
      @click="!isExpanded ? isExpanded = true : null"
    >
      <!-- Collapsed State -->
      <div 
        v-if="!isExpanded"
        class="w-full h-full flex flex-col items-center justify-center gap-1.5 opacity-100 group"
      >
        <div :class="['w-5 h-5 rounded-full border-[2px] border-[#6B313C] flex items-center justify-center group-hover:scale-110 transition-transform', isPlaying ? 'animate-[spin_3s_linear_infinite]' : '']">
          <div class="w-1.5 h-1.5 bg-[#6B313C] rounded-full"></div>
        </div>
        <ChevronLeft class="w-3 h-3 text-[#6B313C] group-hover:-translate-x-0.5 transition-transform" />
      </div>

      <!-- Expanded State Content -->
      <div v-show="isExpanded" class="relative flex items-center w-full h-full gap-3 transition-opacity duration-300 delay-150" :class="isExpanded ? 'opacity-100' : 'opacity-0'">
        <!-- Close button inside -->
        <button @click.stop="isExpanded = false" class="absolute top-0 right-1 p-1 text-[#6B313C]/50 hover:text-[#6B313C] cursor-pointer rounded-full hover:bg-[#6B313C]/5 transition-colors">
          <ChevronRight class="w-4 h-4" />
        </button>

        <!-- Vinyl Cover -->
        <div :class="['w-16 h-16 rounded-full border border-[#6B313C]/20 overflow-hidden shrink-0 shadow-sm', isPlaying ? 'animate-[spin_4s_linear_infinite]' : '']">
          <img :src="currentSong.localCover" @error="(e) => e.target.src = currentSong.fallbackCover" class="w-full h-full object-cover" />
        </div>

        <!-- Info & Controls -->
        <div class="flex flex-col flex-1 min-w-0 pr-6">
          <span class="text-[9px] uppercase font-mono tracking-widest text-[#EB899F] font-bold">Now Playing</span>
          <span class="text-xs font-bold text-[#2A1116] truncate leading-tight mt-0.5">{{ currentSong.title }}</span>
          <span class="text-[10px] text-[#A45F6F] truncate">{{ currentSong.artist }}</span>
          
          <!-- Progress Bar -->
          <div class="mt-2 flex items-center w-full gap-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              :value="localProgress"
              @mousedown="onSeekStart"
              @touchstart="onSeekStart"
              @input="onSeekInput"
              @change="onSeekEnd"
              class="w-full h-1 bg-[#6B313C]/20 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-[#6B313C] [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
            />
          </div>

          <div class="flex items-center gap-4 mt-2 justify-center mr-3">
            <button @click.stop="prevSong" class="text-[#6B313C] hover:text-[#A45F6F] hover:scale-110 transition-all cursor-pointer">
              <SkipBack class="w-3.5 h-3.5 fill-current" />
            </button>
            <button @click.stop="togglePlay" class="w-7 h-7 rounded-full bg-[#6B313C] text-white flex items-center justify-center hover:bg-[#A45F6F] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm">
              <component :is="isPlaying ? Pause : Play" class="w-3.5 h-3.5 fill-current" />
            </button>
            <button @click.stop="nextSong" class="text-[#6B313C] hover:text-[#A45F6F] hover:scale-110 transition-all cursor-pointer">
              <SkipForward class="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

