<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Heart, Clock, ChevronRight, Sparkles } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const emit = defineEmits(['next'])

// Hardcoded target date for 5th Monthversary (May 23 -> Sept 23)
const targetDate = new Date(2026, 8, 23, 0, 0, 0) // Month 8 is September
const isReached = ref(false)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer = null

const updateCounter = () => {
  const now = new Date()
  let diff = targetDate - now
  
  if (diff <= 0) {
    isReached.value = true
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
  minutes.value = Math.floor((diff / 1000 / 60) % 60)
  seconds.value = Math.floor((diff / 1000) % 60)
}

watch(isReached, (val) => {
  if (val) {
    // Fire confetti when reached
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6B313C', '#EB899F', '#ffffff', '#ffccd5']
      })
    }, 100)
  }
})

onMounted(() => {
  updateCounter()
  if (!isReached.value) {
    timer = setInterval(updateCounter, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto min-h-[75vh] flex flex-col items-center justify-center px-4 text-center select-none">
    
    <div v-if="!isReached" class="w-full flex flex-col items-center">
      <!-- Title in serif-romantic in Deep Maroon -->
      <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl md:text-5xl text-[#EEC1AD] mb-2 tracking-tight">
        Menghitung Waktu
      </h2>
      <p class="font-sans text-xs sm:text-sm md:text-base text-[#EB899F] mb-8 font-medium">
        Sebentar lagi kita akan merayakan bulan ke-5 kita...
      </p>

      <!-- Time Counter Boxes in Soft Cream & Orchid (Responsive) -->
      <div class="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-md md:max-w-3xl mx-auto mb-8">
        <div class="bg-[#180a0d]/95 border border-[#6B313C]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
          <span class="block font-sans text-2xl sm:text-4xl md:text-5xl font-black text-[#EEC1AD]">{{ days }}</span>
          <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#EB899F] font-semibold">Hari</span>
        </div>
        <div class="bg-[#180a0d]/95 border border-[#6B313C]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
          <span class="block font-sans text-2xl sm:text-4xl md:text-5xl font-black text-[#EEC1AD]">{{ hours }}</span>
          <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#EB899F] font-semibold">Jam</span>
        </div>
        <div class="bg-[#180a0d]/95 border border-[#6B313C]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
          <span class="block font-sans text-2xl sm:text-4xl md:text-5xl font-black text-[#EEC1AD]">{{ minutes }}</span>
          <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#EB899F] font-semibold">Menit</span>
        </div>
        <div class="bg-[#180a0d]/95 border border-[#6B313C]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
          <span class="block font-sans text-2xl sm:text-4xl md:text-5xl font-black text-[#EB899F]">{{ seconds }}</span>
          <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#EB899F] font-semibold">Detik</span>
        </div>
      </div>

      <!-- Quote -->
      <p class="font-sans text-sm sm:text-base text-[#EEC1AD] mb-10 flex flex-col sm:flex-row items-center justify-center gap-2 font-medium">
        <span>into 6-Monthversarry, 1-Yearversarry, 1-Decadeversarry, and more.</span>
        <Heart class="w-4 h-4 text-[#EB899F] fill-[#EB899F] animate-heartbeat" />
      </p>
    </div>

    <!-- Reached State Animation -->
    <div v-else class="w-full flex flex-col items-center animate-[fadeIn_1s_ease-out_forwards]">
      <div class="relative w-24 h-24 mb-6">
        <div class="absolute inset-0 bg-[#EB899F]/20 rounded-full animate-ping"></div>
        <div class="relative flex items-center justify-center w-full h-full bg-[#6B313C] rounded-full shadow-[0_0_30px_rgba(235,137,159,0.3)]">
          <Heart class="w-10 h-10 text-white fill-current animate-pulse" />
        </div>
      </div>
      <h2 class="font-script font-bold text-5xl sm:text-6xl md:text-7xl text-[#EB899F] mb-4 drop-shadow-md tracking-wide">
        Happy 5th Monthversary!
      </h2>
      <p class="font-sans text-sm sm:text-base md:text-lg text-[#EEC1AD] max-w-lg mb-8 font-medium leading-relaxed">
        Waktu yang ditunggu akhirnya tiba. Terima kasih sudah terus bersama sampai titik ini. 
      </p>
    </div>

    <!-- Next Section Button -->
    <button
      @click="emit('next')"
      class="group flex items-center justify-center w-12 h-12 rounded-full bg-[#6B313C] hover:bg-[#A45F6F] text-white border border-[#EB899F]/20 shadow-aesthetic hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer mt-4"
    >
      <ChevronRight class="w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</template>
