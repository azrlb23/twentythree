<script setup>
import { ref } from 'vue'
import { Heart, Calendar, Sparkles, ChevronRight, RotateCcw } from 'lucide-vue-next'

const emit = defineEmits(['replay'])

const milestones = [
  {
    id: 1,
    title: 'Where It All Began',
    subtitle: 'The First Hello',
    date: 'August 12, 2023',
    description: 'A simple glance that turned into a conversation we never wanted to end. The universe definitely had a plan.',
    tag: 'Chapter 01',
    icon: '✨'
  },
  {
    id: 2,
    title: 'First Awkward Date',
    subtitle: 'Coffee & Endless Giggles',
    date: 'September 03, 2023',
    description: 'Spilling coffee, nervous laughs, and walking until the café closed. That was the moment everything felt right.',
    tag: 'Chapter 02',
    icon: '☕'
  },
  {
    id: 3,
    title: 'Officially Ours',
    subtitle: 'Holding Hands for Real',
    date: 'October 23, 2023',
    description: 'Under the night sky, we decided to make this promise: to stand by each other through every chapter.',
    tag: 'Chapter 03',
    icon: '💍'
  },
  {
    id: 4,
    title: 'The First Big Adventure',
    subtitle: 'Sunsets & Roadtrips',
    date: 'June 15, 2024',
    description: 'Getting lost on scenic roads, singing terribly to 2000s love songs, and discovering that home is wherever you are.',
    tag: 'Chapter 04',
    icon: '🚗'
  },
  {
    id: 5,
    title: 'Today, Tomorrow, & Always',
    subtitle: 'Growing Together',
    date: 'Present & Forever',
    description: 'Still my favorite notification, my easiest laugh, and my greatest blessing. The best is yet to come.',
    tag: 'Forever',
    icon: '💚'
  }
]

const activeIndex = ref(0)
const nextMilestone = () => {
  activeIndex.value = (activeIndex.value + 1) % milestones.length
}
</script>

<template>
  <div class="relative w-full max-w-md sm:max-w-xl mx-auto min-h-[85vh] flex flex-col justify-center py-12 px-4 select-none">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8ECE6] border border-[#EEC1AD] text-xs font-semibold text-[#6B313C] mb-3 shadow-2xs">
        <Sparkles class="w-3.5 h-3.5 text-[#EB899F]" />
        <span>OUR LOVE ROADMAP</span>
      </div>
      <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl text-[#6B313C] mb-2 tracking-tight">
        The Journey
      </h2>
      <p class="font-sans text-xs sm:text-sm text-[#A45F6F] font-medium">
        Setiap langkah, senyuman, dan detik berharga di 4 bulan kisah kita
      </p>
    </div>

    <!-- Interactive Roadmap Winding Path in Orchid Rose Wine -->
    <div class="relative pl-6 sm:pl-8 border-l-2 border-dashed border-[#A45F6F]/50 ml-4 sm:ml-8 space-y-6 mb-10">
      <div 
        v-for="(item, idx) in milestones" 
        :key="item.id"
        @click="activeIndex = idx"
        :class="[
          'relative transition-all duration-300 cursor-pointer group',
          activeIndex === idx ? 'scale-[1.01]' : 'opacity-80 hover:opacity-100'
        ]"
      >
        <!-- Milestone Pin Dot on the timeline -->
        <div 
          :class="[
            'absolute -left-[31px] sm:-left-[39px] top-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md',
            activeIndex === idx 
              ? 'bg-[#6B313C] text-white ring-4 ring-[#F8ECE6] scale-110' 
              : 'bg-white border-2 border-[#A45F6F] text-[#6B313C] group-hover:scale-105'
          ]"
        >
          <span class="text-xs">{{ item.icon }}</span>
        </div>

        <!-- Milestone Card in Orchid Love Aesthetics -->
        <div 
          :class="[
            'bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 shadow-aesthetic paper-grid',
            activeIndex === idx 
              ? 'border-[#6B313C] ring-1 ring-[#EB899F]/40 shadow-polaroid' 
              : 'border-[#EEC1AD] hover:border-[#A45F6F]'
          ]"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F8ECE6] text-[#6B313C] font-bold border border-[#EEC1AD]/50">
              {{ item.tag }}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-[#A45F6F] font-medium">
              <Calendar class="w-3.5 h-3.5 text-[#EB899F]" />
              <span>{{ item.date }}</span>
            </div>
          </div>

          <h3 class="font-serif-romantic text-lg sm:text-xl font-bold text-[#6B313C] group-hover:text-[#A45F6F] transition-colors">
            {{ item.title }}
          </h3>
          <p class="font-sans text-xs font-semibold text-[#EB899F] mb-2">
            {{ item.subtitle }}
          </p>
          <p class="font-sans text-xs sm:text-sm text-[#4A1E26] leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Navigation / Forward Button -->
    <div class="flex items-center justify-center mb-10">
      <button
        @click="nextMilestone"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8ECE6] text-[#6B313C] hover:bg-[#F3DDD3] text-xs font-sans font-bold uppercase tracking-wider transition-all active:scale-95 shadow-2xs cursor-pointer border border-[#EEC1AD]/60"
      >
        <span>Next Milestone ({{ activeIndex + 1 }}/{{ milestones.length }})</span>
        <ChevronRight class="w-3.5 h-3.5 text-[#A45F6F]" />
      </button>
    </div>

    <!-- Final Celebration Section & Replay Button -->
    <div class="text-center pt-8 border-t border-[#EEC1AD]">
      <div class="inline-flex items-center gap-2 text-sm text-[#6B313C] font-medium mb-1">
        <span>To infinity and beyond, together</span>
        <Heart class="w-4 h-4 text-[#EB899F] fill-[#EB899F] animate-heartbeat" />
      </div>
      <p class="font-sans text-xs text-[#A45F6F] mb-6">
        twentythree &middot; Vol. 01
      </p>

      <!-- Replay Button in Deep Maroon -->
      <button
        @click="emit('replay')"
        class="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#6B313C] hover:bg-[#53242D] text-white font-sans font-bold text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <RotateCcw class="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
        <span>Replay Our Story</span>
      </button>
    </div>
  </div>
</template>
