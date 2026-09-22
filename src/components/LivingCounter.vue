<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Heart, Clock, ChevronRight, Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['next'])

// Official Anniversary start date: 23 Mei 2026
const startDate = new Date('2026-05-23T00:00:00')

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer = null

const updateCounter = () => {
  const now = new Date()
  const diff = Math.max(0, now - startDate)

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
  minutes.value = Math.floor((diff / 1000 / 60) % 60)
  seconds.value = Math.floor((diff / 1000) % 60)
}

onMounted(() => {
  updateCounter()
  timer = setInterval(updateCounter, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto min-h-[75vh] flex flex-col items-center justify-center px-4 text-center select-none">
    <!-- Badge for 4-Monthversary -->
    <div class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F8ECE6] border border-[#EEC1AD] text-xs font-semibold text-[#6B313C] mb-4 shadow-2xs">
      <Sparkles class="w-3.5 h-3.5 text-[#EB899F]" />
      <span>HAPPY 4-MONTHVERSARY &middot; 23 MEI 2026</span>
    </div>

    <!-- Title in serif-romantic in Deep Maroon -->
    <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl md:text-5xl text-[#6B313C] mb-2 tracking-tight">
      Every Second Since We Began
    </h2>
    <p class="font-sans text-xs sm:text-sm md:text-base text-[#A45F6F] mb-8 font-medium">
      4 bulan yang penuh arti &mdash; setiap detik bersamamu selalu istimewa
    </p>

    <!-- Time Counter Boxes in Soft Cream & Orchid (Responsive) -->
    <div class="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-md md:max-w-3xl mx-auto mb-8">
      <div class="bg-white/95 border border-[#EEC1AD]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#6B313C]">{{ days }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A45F6F] font-semibold">Hari</span>
      </div>
      <div class="bg-white/95 border border-[#EEC1AD]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#6B313C]">{{ hours }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A45F6F] font-semibold">Jam</span>
      </div>
      <div class="bg-white/95 border border-[#EEC1AD]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#6B313C]">{{ minutes }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A45F6F] font-semibold">Menit</span>
      </div>
      <div class="bg-white/95 border border-[#EEC1AD]/80 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#EB899F]">{{ seconds }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A45F6F] font-semibold">Detik</span>
      </div>
    </div>

    <!-- Quote -->
    <p class="font-sans text-sm sm:text-base text-[#6B313C] mb-10 flex items-center justify-center gap-2 font-medium">
      <span>And I'd still choose you in every lifetime.</span>
      <Heart class="w-4 h-4 text-[#EB899F] fill-[#EB899F] animate-heartbeat" />
    </p>

    <!-- Next Section Button -->
    <button
      @click="emit('next')"
      class="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#6B313C] hover:bg-[#53242D] text-white font-sans font-bold text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
    >
      <span>Open Our Story Board</span>
      <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</template>
