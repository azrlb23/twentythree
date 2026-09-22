<script setup>
import { ref } from 'vue'
import { Heart, Play, Pause, ChevronRight } from 'lucide-vue-next'

const emit = defineEmits(['toggle-music', 'next'])

const props = defineProps({
  isPlayingMusic: {
    type: Boolean,
    default: false
  }
})

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    caption: 'Sunset by the beach',
    date: 'Oct 14, 2024',
    rotate: '-rotate-3'
  },
  {
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
    caption: 'Our impromptu picnic date',
    date: 'Dec 22, 2024',
    rotate: 'rotate-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80',
    caption: 'Endless laughs under city lights',
    date: 'Jan 05, 2025',
    rotate: '-rotate-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    caption: 'Just us against the world',
    date: 'Mar 18, 2025',
    rotate: 'rotate-4'
  }
]

const activePhoto = ref(null)

const selectPhoto = (p) => {
  activePhoto.value = activePhoto.value === p ? null : p
}
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
    <!-- Outer Scrapbook Paper Board -->
    <div class="relative w-full bg-[#fffdfa] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#eedad3] paper-grid">
      <!-- Top Decorative Elements -->
      <!-- Red Ribbon Bow SVG at Top Center/Left -->
      <div class="absolute -top-5 left-10 w-12 h-10 pointer-events-none drop-shadow-md z-20">
        <svg viewBox="0 0 100 80" fill="none" class="w-full h-full text-[#db3c8a]">
          <path d="M50 40 C30 10, 0 20, 20 45 C35 55, 50 45, 50 40 Z" fill="#db3c8a" />
          <path d="M50 40 C70 10, 100 20, 80 45 C65 55, 50 45, 50 40 Z" fill="#db3c8a" />
          <circle cx="50" cy="42" r="8" fill="#9f1239" />
          <path d="M46 48 C40 65, 30 75, 20 80" stroke="#9f1239" stroke-width="6" stroke-linecap="round" />
          <path d="M54 48 C60 65, 70 75, 80 80" stroke="#9f1239" stroke-width="6" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Air Mail Stamp Badge Top Right -->
      <div class="absolute top-5 right-5 sm:top-6 sm:right-6 border border-[#db3c8a]/50 bg-[#fff5f7] px-3 py-1.5 rounded-lg transform rotate-3 flex items-center gap-2 shadow-xs">
        <div class="w-2 h-2 rounded-full bg-[#db3c8a] animate-ping"></div>
        <span class="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#9f1239]">
          MEMORIES // VOL. 01
        </span>
      </div>

      <!-- Header Section -->
      <div class="text-center mt-4 mb-8">
        <h2 class="font-serif-romantic font-bold text-3xl sm:text-4xl text-[#9f1239] mb-1 tracking-tight">
          Us & You
        </h2>
        <p class="font-sans text-xs sm:text-sm text-[#78350f] font-medium">
          How our story keeps unfolding, day after day
        </p>
      </div>

      <!-- Polaroid Photo Collage Grid -->
      <div class="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div 
          v-for="(photo, index) in photos" 
          :key="index"
          @click="selectPhoto(photo)"
          :class="[
            'relative bg-white p-2.5 sm:p-3.5 pb-8 sm:pb-10 rounded-sm shadow-polaroid border border-gray-100 transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer group',
            photo.rotate,
            activePhoto === photo ? 'scale-110 z-30 ring-2 ring-[#db3c8a]' : ''
          ]"
        >
          <!-- Masking Tape Effect on Polaroid Top -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#fce5df]/80 border-t border-b border-[#eedad3] transform -rotate-1 pointer-events-none opacity-90 shadow-2xs"></div>

          <!-- Photo Image -->
          <div class="relative aspect-square w-full overflow-hidden bg-rose-50 rounded-xs">
            <img 
              :src="photo.url" 
              :alt="photo.caption" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <!-- Polaroid Caption -->
          <div class="absolute bottom-2 inset-x-3 text-center">
            <p class="font-sans text-xs sm:text-sm text-[#4a1d24] font-semibold truncate">
              {{ photo.caption }}
            </p>
            <p class="font-mono text-[9px] text-[#9ca3af]">
              {{ photo.date }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stickers & Accents -->
      <div class="flex items-center justify-between px-2 mb-6">
        <div class="flex items-center gap-2 bg-[#fdf5f2] px-3 py-1.5 rounded-2xl border border-[#eedad3] shadow-2xs transform -rotate-3">
          <span class="text-2xl">🧸</span>
          <span class="font-sans text-xs font-semibold text-[#8c4a55]">My Safe Place</span>
        </div>

        <div class="flex items-center gap-1.5 bg-[#fff0f4] px-3 py-1.5 rounded-2xl border border-[#f29ebd]/40 shadow-2xs transform rotate-2">
          <span class="text-xl">💋</span>
          <span class="font-sans text-xs font-semibold text-[#db3c8a]">Kiss You Always</span>
        </div>
      </div>

      <!-- Handwritten Letter Card -->
      <div class="relative bg-[#fffbf9] border border-[#f29ebd]/40 rounded-2xl p-6 sm:p-8 shadow-inner mb-6">
        <div class="flex items-center gap-2 mb-3 text-[#db3c8a]">
          <Heart class="w-4 h-4 fill-current" />
          <span class="font-mono text-xs uppercase tracking-widest font-bold">A Letter From The Heart</span>
        </div>

        <p class="font-sans text-sm sm:text-base text-[#3b1d22] leading-relaxed mb-6 font-normal">
          "I'm grateful for every laugh, every late night drive, and every quiet moment with you. 
          Through every high and low, you are my favorite sanctuary. Life hasn't just been easier with you, 
          it has been infinitely more beautiful. I choose you, today and forever."
        </p>

        <div class="flex items-center justify-between pt-4 border-t border-[#f29ebd]/30">
          <div>
            <p class="font-serif-romantic font-bold text-lg text-[#9f1239]">With all my love,</p>
            <p class="font-sans text-xs text-[#6b353e]">Forever Yours</p>
          </div>

          <!-- Integrated Music Play Button -->
          <div class="flex flex-col items-end">
            <button
              @click="emit('toggle-music')"
              class="group flex items-center gap-2 bg-[#9f1239] hover:bg-[#881337] text-white px-4 py-2 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <component :is="isPlayingMusic ? Pause : Play" class="w-3.5 h-3.5 fill-current" />
              <span class="text-xs font-bold tracking-wider uppercase font-sans">
                {{ isPlayingMusic ? 'Pause Music' : 'Play Music' }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Next to Journey Button -->
      <div class="text-center pt-2">
        <button
          @click="emit('next')"
          class="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#9f1239] hover:bg-[#881337] text-white font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span>Explore Our Journey Roadmap</span>
          <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
</template>
