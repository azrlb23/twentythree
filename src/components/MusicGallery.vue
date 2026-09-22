<script setup>
import { onMounted, watch, ref } from 'vue'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  MonitorSpeaker, 
  CheckCircle2,
  RotateCcw
} from 'lucide-vue-next'
import { useYouTube } from '../composables/useYouTube.js'

const emit = defineEmits(['replay'])

const {
  songs,
  activeIdx,
  currentSong,
  isPlaying,
  progress,
  togglePlay,
  nextSong,
  prevSong,
  selectSong,
  seekTo
} = useYouTube()

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
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}

const handleImageError = (e, fallback) => {
  if (e.target.src !== fallback) {
    e.target.src = fallback
  }
}

// 3D Cover-flow calculation
const getTransform = (idx) => {
  const diff = idx - activeIdx.value
  let transform = ''
  let zIndex = 30 - Math.abs(diff)
  let opacity = 1
  let filter = 'none'

  if (diff === 0) {
    transform = 'translateX(0) scale(1) perspective(800px) rotateY(0deg)'
  } else {
    const sign = Math.sign(diff)
    const offset = window.innerWidth < 768 ? 90 * sign : 160 * sign 
    const scale = 0.75
    const rotateY = -35 * sign 
    transform = `translateX(${offset}px) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`
    opacity = Math.abs(diff) <= 2 ? 1 - (Math.abs(diff) * 0.2) : 0
    filter = Math.abs(diff) > 0 ? 'brightness(0.3) blur(2px)' : 'none'
  }

  return {
    transform,
    zIndex,
    opacity,
    filter,
    pointerEvents: Math.abs(diff) <= 1 ? 'auto' : 'none',
    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
  }
}
</script>

<template>
  <div class="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col font-sans select-none text-white/90">
    
    <!-- Background Blur Layer -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <img 
        :src="currentSong.localCover" 
        @error="(e) => handleImageError(e, currentSong.fallbackCover)"
        class="w-full h-full object-cover blur-[80px] opacity-40 scale-110 transition-all duration-1000"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-lg mx-auto py-8 sm:py-12 px-4">
      
      <!-- Top Logo / Title -->
      <div class="flex flex-col items-center gap-1 sm:gap-2 shrink-0">
        <div class="flex items-center gap-2 text-white/70">
          <!-- Spotify Icon Mock -->
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.38 9.72-.6 13.44 1.62.42.3.6.84.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.2-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/>
          </svg>
          <span class="font-bold text-sm tracking-wide">Spotify</span>
        </div>
        <p class="text-[10px] uppercase tracking-widest text-white/40 mt-1">Our Mixtape</p>
      </div>

      <!-- 3D Cover-Flow Carousel -->
      <div class="relative w-full flex-1 min-h-[220px] sm:min-h-[300px] flex items-center justify-center perspective-[1000px] my-6 sm:my-8 shrink-0">
        <div 
          v-for="(song, idx) in songs"
          :key="song.id"
          @click="selectSong(idx)"
          class="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer bg-black/20"
          :style="getTransform(idx)"
        >
          <!-- Album Cover -->
          <img 
            :src="song.localCover" 
            @error="(e) => handleImageError(e, song.fallbackCover)"
            class="absolute inset-0 w-full h-full object-cover"
          />
          
          <!-- Inner Shadow / Glow -->
          <div class="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none"></div>
        </div>
      </div>

      <!-- Glassmorphism Controls Section -->
      <div class="w-full flex flex-col gap-4 sm:gap-6 shrink-0">
        
        <!-- Secondary Control Bar (Glass Pill) -->
        <div class="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 sm:py-3 flex items-center justify-between shadow-lg">
          <!-- Shuffle -->
          <button class="p-1 sm:p-2 text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
            <Shuffle class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <!-- Middle Info & Progress -->
          <div class="flex-1 flex items-center gap-3 px-2 sm:px-4 min-w-0">
            <!-- Tiny thumbnail -->
            <img 
              :src="currentSong.localCover" 
              @error="(e) => handleImageError(e, currentSong.fallbackCover)"
              class="w-8 h-8 rounded-md object-cover hidden sm:block shrink-0" 
            />
            
            <div class="flex-1 flex flex-col gap-1 sm:gap-1.5 min-w-0">
              <div class="flex flex-col w-full min-w-0">
                <div class="flex items-center justify-between text-xs w-full min-w-0">
                  <span class="font-medium sm:font-bold truncate flex-1 min-w-0 mr-2 text-left text-sm">{{ currentSong.title }}</span>
                  <!-- Soundwave Animation -->
                  <div class="flex items-center gap-0.5 h-3 opacity-60 shrink-0">
                    <div class="w-0.5 bg-white transition-all duration-200" :class="isPlaying ? 'h-full animate-pulse' : 'h-0.5'"></div>
                    <div class="w-0.5 bg-white transition-all duration-200" :class="isPlaying ? 'h-1/2 animate-pulse delay-75' : 'h-0.5'"></div>
                    <div class="w-0.5 bg-white transition-all duration-200" :class="isPlaying ? 'h-3/4 animate-pulse delay-150' : 'h-0.5'"></div>
                    <div class="w-0.5 bg-white transition-all duration-200" :class="isPlaying ? 'h-1/4 animate-pulse delay-200' : 'h-0.5'"></div>
                  </div>
                </div>
                <!-- Artist Name -->
                <span class="text-[10px] sm:text-xs text-white/50 truncate text-left">{{ currentSong.artist }}</span>
              </div>
              
              <!-- Progress Bar -->
              <div class="mt-0.5 w-full flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  :value="localProgress"
                  @mousedown="onSeekStart"
                  @touchstart="onSeekStart"
                  @input="onSeekInput"
                  @change="onSeekEnd"
                  class="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                  :style="{
                    background: `linear-gradient(to right, white ${localProgress}%, rgba(255,255,255,0.2) ${localProgress}%)`
                  }"
                />
              </div>
            </div>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-1 sm:gap-2 shrink-0">
            <button class="p-1 sm:p-2 text-green-400 hover:scale-110 transition-transform cursor-pointer">
              <CheckCircle2 class="w-4 h-4 sm:w-5 sm:h-5 fill-current text-black" />
            </button>
            <button class="p-1 sm:p-2 text-white/50 hover:text-white transition-colors cursor-pointer">
              <MonitorSpeaker class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <!-- Primary Play Controls -->
        <div class="w-full flex items-center justify-between px-2 sm:px-6">
          <Volume2 class="w-5 h-5 text-white/40 hidden sm:block" />
          
          <div class="flex items-center justify-center gap-6 sm:gap-8 flex-1">
            <button @click="prevSong" class="text-white/70 hover:text-white transition-colors hover:scale-110 cursor-pointer">
              <SkipBack class="w-8 h-8 fill-current" />
            </button>
            
            <button 
              @click="togglePlay"
              class="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer shrink-0"
            >
              <component :is="isPlaying ? Pause : Play" class="w-6 h-6 sm:w-10 sm:h-10 fill-current" :class="isPlaying ? '' : 'translate-x-0.5'" />
            </button>
            
            <button @click="nextSong" class="text-white/70 hover:text-white transition-colors hover:scale-110 cursor-pointer">
              <SkipForward class="w-8 h-8 fill-current" />
            </button>
          </div>

          <Repeat class="w-5 h-5 text-white/40 hidden sm:block" />
        </div>

      </div>
      
      <!-- Ending Text & Replay -->
      <div class="w-full flex flex-col items-center gap-3 sm:gap-4 text-white/50 font-sans shrink-0 mt-6 sm:mt-8">
        <p class="text-[9px] uppercase tracking-[0.3em]">Archive of Our Love</p>
        
        <button
          @click="emit('replay')"
          class="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          title="Replay"
        >
          <RotateCcw class="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
        </button>
      </div>

    </div>
  </div>
</template>
