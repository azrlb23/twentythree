<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Heart, Clock, ChevronRight } from 'lucide-vue-next'

const emit = defineEmits(['next'])

// Default anniversary date: e.g. Oct 23, 2023
const startDate = new Date('2023-10-23T00:00:00')

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
    <!-- Badge -->
    <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eef3e8] border border-[#8da871]/40 text-xs font-semibold text-[#556b2f] mb-4 shadow-2xs">
      <Clock class="w-3.5 h-3.5 text-[#8da871]" />
      <span>TOGETHER IN LOVE</span>
    </div>

    <!-- Title in serif-romantic matching landing page -->
    <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl md:text-5xl text-[#283618] mb-2 tracking-tight">
      Every Second Since We Began
    </h2>
    <p class="font-sans text-xs sm:text-sm md:text-base text-[#657e4e] mb-8 font-medium">
      A living record of our time spent together
    </p>

    <!-- Time Counter Boxes in Soft Matcha & White (Responsive: compact on mobile, expansive on desktop) -->
    <div class="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-md md:max-w-3xl mx-auto mb-8">
      <div class="bg-white/95 border border-[#d5e0cb] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#283618]">{{ days }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#657e4e] font-semibold">Days</span>
      </div>
      <div class="bg-white/95 border border-[#d5e0cb] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#283618]">{{ hours }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#657e4e] font-semibold">Hours</span>
      </div>
      <div class="bg-white/95 border border-[#d5e0cb] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#283618]">{{ minutes }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#657e4e] font-semibold">Mins</span>
      </div>
      <div class="bg-white/95 border border-[#d5e0cb] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-aesthetic text-center">
        <span class="block font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#8da871]">{{ seconds }}</span>
        <span class="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#657e4e] font-semibold">Secs</span>
      </div>
    </div>

    <!-- Quote -->
    <p class="font-sans text-sm sm:text-base text-[#475b36] mb-10 flex items-center justify-center gap-1.5 font-medium">
      <span>And I'd still choose you in every lifetime.</span>
      <Heart class="w-4 h-4 text-[#8da871] fill-current animate-heartbeat" />
    </p>

    <!-- Next Section Button -->
    <button
      @click="emit('next')"
      class="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8da871] hover:bg-[#728d58] text-white font-sans font-bold text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
    >
      <span>Open Our Story Board</span>
      <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</template>
