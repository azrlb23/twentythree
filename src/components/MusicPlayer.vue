<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-vue-next'

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isPlaying'])

let audioCtx = null
let melodyInterval = null

// Gentle romantic music box notes (frequencies in Hz: C4, E4, G4, B4, C5, D5, E5, G5)
const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33, 659.25, 783.99]
const melodyPattern = [0, 2, 4, 6, 5, 4, 2, 1, 0, 4, 3, 2, 4, 6, 7, 6]
let step = 0

const playTone = (freq) => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

  // Music box decay curve
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2)

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start()
  osc.stop(audioCtx.currentTime + 1.2)
}

const startMelody = () => {
  if (melodyInterval) clearInterval(melodyInterval)
  melodyInterval = setInterval(() => {
    const noteIdx = melodyPattern[step % melodyPattern.length]
    playTone(notes[noteIdx])
    step++
  }, 450)
}

const stopMelody = () => {
  if (melodyInterval) {
    clearInterval(melodyInterval)
    melodyInterval = null
  }
}

const togglePlay = () => {
  const nextState = !props.isPlaying
  emit('update:isPlaying', nextState)

  if (nextState) {
    startMelody()
  } else {
    stopMelody()
  }
}

onUnmounted(() => {
  stopMelody()
  if (audioCtx) {
    audioCtx.close()
  }
})
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50">
    <button
      @click="togglePlay"
      class="group flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-[#8da871]/40 px-3.5 py-2 rounded-full shadow-aesthetic hover:shadow-lg hover:border-[#8da871] transition-all duration-300 cursor-pointer text-[#283618] active:scale-95 select-none"
      title="Toggle romantic music box"
    >
      <!-- Vinyl / Music Icon Spinning -->
      <div 
        :class="[
          'w-7 h-7 rounded-full bg-[#8da871] text-white flex items-center justify-center transition-transform duration-700',
          isPlaying ? 'animate-spin' : ''
        ]"
      >
        <Music class="w-3.5 h-3.5" />
      </div>

      <div class="flex flex-col text-left">
        <span class="text-[10px] uppercase font-mono tracking-wider text-[#657e4e] font-bold">
          {{ isPlaying ? 'Now Playing' : 'Soundtrack' }}
        </span>
        <span class="text-xs font-semibold font-sans text-[#283618]">
          Our Music Box
        </span>
      </div>

      <!-- Play/Pause Indicator in soft matcha -->
      <div class="w-6 h-6 rounded-full bg-[#eef3e8] flex items-center justify-center ml-1">
        <component :is="isPlaying ? Pause : Play" class="w-3 h-3 text-[#556b2f] fill-current" />
      </div>
    </button>
  </div>
</template>
