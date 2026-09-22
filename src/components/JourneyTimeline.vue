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
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef3e8] border border-[#8da871]/40 text-xs font-semibold text-[#556b2f] mb-3 shadow-2xs">
        <Sparkles class="w-3.5 h-3.5 text-[#8da871]" />
        <span>OUR LOVE ROADMAP</span>
      </div>
      <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl text-[#283618] mb-2 tracking-tight">
        The Journey
      </h2>
      <p class="font-sans text-xs sm:text-sm text-[#657e4e] font-medium">
        Every step, every turn, and every memory that brought us here
      </p>
    </div>

    <!-- Interactive Roadmap Winding Path in Sage Green -->
    <div class="relative pl-6 sm:pl-8 border-l-2 border-dashed border-[#8da871]/50 ml-4 sm:ml-8 space-y-6 mb-10">
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
              ? 'bg-[#8da871] text-white ring-4 ring-[#eef3e8] scale-110' 
              : 'bg-white border-2 border-[#8da871] text-[#8da871] group-hover:scale-105'
          ]"
        >
          <span class="text-xs">{{ item.icon }}</span>
        </div>

        <!-- Milestone Card in Modern Matcha Aesthetics -->
        <div 
          :class="[
            'bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 shadow-aesthetic paper-grid',
            activeIndex === idx 
              ? 'border-[#8da871] ring-1 ring-[#8da871]/40 shadow-polaroid' 
              : 'border-[#d5e0cb] hover:border-[#8da871]/60'
          ]"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#eef3e8] text-[#3b4c20] font-bold">
              {{ item.tag }}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-[#657e4e] font-medium">
              <Calendar class="w-3.5 h-3.5 text-[#8da871]" />
              <span>{{ item.date }}</span>
            </div>
          </div>

          <h3 class="font-serif-romantic text-lg sm:text-xl font-bold text-[#283618] group-hover:text-[#556b2f] transition-colors">
            {{ item.title }}
          </h3>
          <p class="font-sans text-xs font-semibold text-[#8da871] mb-2">
            {{ item.subtitle }}
          </p>
          <p class="font-sans text-xs sm:text-sm text-[#475b36] leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Navigation / Forward Button -->
    <div class="flex items-center justify-center mb-10">
      <button
        @click="nextMilestone"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eef3e8] text-[#283618] hover:bg-[#dfe9d7] text-xs font-sans font-bold uppercase tracking-wider transition-all active:scale-95 shadow-2xs cursor-pointer"
      >
        <span>Next Milestone ({{ activeIndex + 1 }}/{{ milestones.length }})</span>
        <ChevronRight class="w-3.5 h-3.5 text-[#8da871]" />
      </button>
    </div>

    <!-- Final Celebration Section & Replay Button -->
    <div class="text-center pt-8 border-t border-[#d5e0cb]">
      <div class="inline-flex items-center gap-2 text-sm text-[#556b2f] font-medium mb-1">
        <span>To infinity and beyond, together</span>
        <Heart class="w-4 h-4 text-[#8da871] fill-current animate-heartbeat" />
      </div>
      <p class="font-sans text-xs text-[#8c9f7c] mb-6">
        twentythree &middot; Vol. 01
      </p>

      <!-- Replay Button in Sage Green -->
      <button
        @click="emit('replay')"
        class="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#8da871] hover:bg-[#728d58] text-white font-sans font-bold text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <RotateCcw class="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
        <span>Replay Our Story</span>
      </button>
    </div>
  </div>
</template>
