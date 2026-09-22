<script setup>
import { ref } from 'vue'
import { Sparkles, Heart, RotateCcw, ChevronRight } from 'lucide-vue-next'

const emit = defineEmits(['next'])

const eras = [
  { 
    id: 1, 
    number: '1',
    title: 'Awal Segalanya', 
    date: 'Tessa Coffee',
    description: 'Awal dikenalin tuh di Tessa Coffee. Asli agak canggung sih wkwk, tapi siapa sangka malah jadi awal cerita kita.',
    photo: '/foto/first-chapters/1.jpg',
    fallback: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'right',
    waveY: 30
  },
  { 
    id: 2, 
    number: '2',
    title: 'Kencan Pertama', 
    date: 'CR Coffee',
    description: 'First date yang seru banget! Jujur aku deg-degan parah sih waktu itu, tapi asik banget bisa ngobrol panjang.',
    photo: '/foto/roadtrips/1.jpg',
    fallback: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'left',
    waveY: 70 
  },
  { 
    id: 3, 
    number: '3',
    title: 'Semakin Dekat', 
    date: 'Notre',
    description: 'Second date kita! Di sini kerasa banget kita makin klop, dan kamu juga udah mulai berani deket-deket cieee.',
    photo: '/foto/cozy-moments/1.jpg',
    fallback: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'right',
    waveY: 25 
  },
  { 
    id: 4, 
    number: '4',
    title: 'Resmi Milikku', 
    date: '23 Mei 2026',
    description: 'Akhirnya jadian! Tepat di pinggir pantai sambil kena angin laut, hari itu bakal terus jadi hari terindah buat aku.',
    photo: '/foto/first-chapters/4.jpg',
    fallback: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'left',
    waveY: 85
  },
  { 
    id: 5, 
    number: '5',
    title: 'Mengukir Kenangan', 
    date: 'Banyak Date Lainnya',
    description: 'Habis itu kita makin sering jalan. Ke sana kemari berdua, banyak tawa, pokoknya tiap date tuh selalu ngangenin.',
    photo: '/foto/roadtrips/3.jpg',
    fallback: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'right',
    waveY: 20
  },
  { 
    id: 6, 
    number: '6',
    title: 'Jeda Sejenak', 
    date: '21 September 2026',
    description: 'Sempet break bentar. Tapi nggak apa-apa, dari situ kita jadi belajar saling ngerti dan balikan jadi lebih kuat.',
    photo: '/foto/cozy-moments/4.jpg',
    fallback: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'left',
    waveY: 75
  },
  { 
    id: 7, 
    number: '7',
    title: 'Lima Bulan Bersama', 
    date: '23 September 2026',
    description: 'Happy 5-Monthversary, sayang! Makasih udah bertahan ngelewatin semuanya. I love us, always.',
    photo: '/foto/first-chapters/1.jpg',
    fallback: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    mobileAlign: 'right',
    waveY: 45
  }
]

const handleImageError = (e, fallback) => {
  if (e.target.src !== fallback) {
    e.target.src = fallback
  }
}

// Mobile Popup State
const selectedEra = ref(null)
const openEra = (era) => {
  selectedEra.value = era
}
const closeEra = () => {
  selectedEra.value = null
}
</script>

<template>
  <div class="relative w-full min-h-[90vh] bg-[#0a0a0a] flex flex-col justify-between select-none overflow-hidden">
    
    <!-- DESKTOP LAYOUT (Horizontal Wave) - Hidden on Mobile -->
    <div class="hidden md:flex flex-col w-full h-full pt-10 flex-1 z-10">
      
      <!-- Top Title Area -->
      <div class="text-center px-8 mb-6">
        <h2 class="font-sans text-xs uppercase tracking-[0.2em] text-[#EB899F] font-bold mb-2">
          SEVEN CHAPTERS OF US
        </h2>
        <h1 class="font-serif-romantic text-3xl font-bold text-[#EEC1AD]">
          Our Journey
        </h1>
        <p class="font-sans text-xs text-[#EEC1AD]/70 mt-2 max-w-lg mx-auto">
          The timeline is arranged into six beautiful milestones marking our path.
        </p>
      </div>

      <!-- Horizontal Scrolling Timeline Area -->
      <div class="relative w-full h-[600px] overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory">
        <!-- Inner Container that is very wide (e.g., 200vw) to hold the eras -->
        <div class="relative h-full flex" :style="{ width: `${eras.length * 40}vw`, minWidth: '1400px' }">
          
          <!-- Base Background Images -->
          <div class="absolute inset-0 flex">
            <div 
              v-for="era in eras" 
              :key="'img-'+era.id"
              class="h-full flex-1 relative border-r border-[#180a0d] snap-start"
            >
              <img 
                :src="era.photo" 
                @error="(e) => handleImageError(e, era.fallback)"
                class="w-full h-full object-cover brightness-75"
              />
              <div class="absolute inset-0 bg-[#6B313C]/20 mix-blend-multiply"></div>
            </div>
          </div>

          <!-- The Wave Mask Overlay (Solid Top, Transparent Bottom) -->
          <!-- We draw a path that covers the TOP of the container -->
          <svg class="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <!-- Smooth sine wave path for desktop. The path forms a solid block at the top -->
            <path d="M0,0 L1000,0 L1000,30 
                     C 900,10 800,80 650,40
                     C 500,0 400,70 300,50
                     C 200,30 100,60 0,20 Z" 
                  fill="#0a0a0a" />
          </svg>

          <!-- Timeline Badges & Text -->
          <!-- We position these over the wave. The Y coordinates match the curves in the SVG -->
          <div class="absolute inset-0 z-20 flex pointer-events-none">
            <div 
              v-for="era in eras" 
              :key="'badge-'+era.id"
              class="flex-1 relative h-full flex flex-col pointer-events-auto"
            >
              <!-- The badge container positioned relatively along the Y axis -->
              <div 
                class="absolute w-full flex items-center gap-4 px-8"
                :style="{ top: `${era.waveY}%`, transform: 'translateY(-50%)' }"
              >
                <!-- Number Badge -->
                <div class="w-14 h-14 rounded-full bg-[#180a0d] border-4 border-[#0a0a0a] flex items-center justify-center shadow-aesthetic shrink-0">
                  <div class="w-full h-full rounded-full bg-gradient-to-br from-[#A45F6F] to-[#6B313C] flex items-center justify-center">
                    <span class="font-serif-romantic text-2xl font-bold text-[#F8ECE6]">{{ era.number }}</span>
                  </div>
                </div>

                <!-- Text Info -->
                <!-- Alternate text position (above or below badge) based on wave Y -->
                <div 
                  class="flex flex-col bg-[#0a0a0a]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#6B313C]/50 max-w-xs"
                  :class="era.waveY > 50 ? '-translate-y-full mb-16' : 'translate-y-full mt-16'"
                  style="position: absolute; left: 100px;"
                >
                  <span class="font-sans text-[10px] uppercase tracking-widest text-[#EB899F] font-bold mb-1">{{ era.date }}</span>
                  <h3 class="font-serif-romantic text-xl font-bold text-[#EEC1AD]">{{ era.title }}</h3>
                  <p class="font-sans text-xs text-[#EEC1AD]/80 mt-1 leading-relaxed">{{ era.description }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


    <!-- MOBILE LAYOUT (Winding Minimalist Thread) - Hidden on Desktop -->
    <div class="md:hidden relative w-full h-[85vh] flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none z-10 pt-10">
      
      <!-- Top Title Area -->
      <div class="text-center px-4 mb-8 z-20">
        <h2 class="font-sans text-[10px] uppercase tracking-widest text-[#A45F6F] font-bold mb-2">
          SEVEN CHAPTERS OF LOVE
        </h2>
        <h1 class="font-serif-romantic text-3xl font-bold text-[#EEC1AD]">
          Our Timeline
        </h1>
      </div>

      <!-- Winding Path Container -->
      <div class="relative w-full h-[1200px] flex-shrink-0">
        <!-- SVG Background Line -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 1000">
          <!-- A continuous path winding back and forth -->
          <!-- Coordinates are percentages (0-100 X, 0-1000 Y) -->
          <path 
            d="M 50,0 
               C 80,50 90,100 50,150 
               C 10,200 20,250 50,300 
               C 80,350 90,400 50,450 
               C 10,500 20,550 50,600 
               C 80,650 90,700 50,750 
               C 10,800 20,850 50,900
               C 80,950 50,1000 50,1000" 
            fill="none" 
            stroke="#6B313C" 
            stroke-width="0.8" 
            class="opacity-60"
          />
        </svg>

        <!-- The actual text nodes positioned over the SVG -->
        <!-- We map the 6 eras to specific Y percentages (e.g. 10%, 25%, 40%, etc) -->
        <div 
          v-for="(era, index) in eras" 
          :key="'mob-'+era.id"
          @click="openEra(era)"
          class="absolute w-full flex items-center px-6 cursor-pointer group"
          :style="{ 
            top: `${5 + (index * 15)}%`, 
            justifyContent: era.mobileAlign === 'left' ? 'flex-start' : 'flex-end'
          }"
        >
          <div class="relative w-[70%] max-w-[240px] group-hover:scale-105 transition-transform duration-300">
            <!-- Red dot mapping to the line (approximate positioning) -->
            <div 
              class="absolute top-4 w-3 h-3 rounded-full bg-[#EB899F] shadow-[0_0_10px_rgba(235,137,159,0.8)] group-hover:ring-4 ring-[#EB899F]/30 transition-all"
              :class="era.mobileAlign === 'left' ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'"
            ></div>

            <!-- Text Content mimicking the hand-drawn logomaker sketch -->
            <div :class="era.mobileAlign === 'left' ? 'text-right' : 'text-left'">
              <h2 class="font-sans text-3xl font-light text-[#A45F6F] mb-1">
                {{ String(era.id).padStart(2, '0') }}
              </h2>
              <p class="font-sans text-[10px] uppercase tracking-wider text-[#EB899F] font-bold mb-2">
                {{ era.date }}
              </p>
              <h3 class="font-serif-romantic text-lg font-bold text-[#EEC1AD] mb-1">
                {{ era.title }}
              </h3>
              <p class="font-sans text-xs text-[#EEC1AD]/70 leading-relaxed font-handwriting">
                {{ era.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Final Celebration Section & Replay Button (Shared at bottom) -->
    <div class="relative z-30 w-full text-center py-6 border-t border-[#2A1116] bg-[#0a0a0a]/90 backdrop-blur-sm mt-auto">
      <div class="inline-flex items-center gap-2 text-xs sm:text-sm text-[#EEC1AD] font-medium mb-4">
        <span>To infinity and beyond, together</span>
        <Heart class="w-3.5 h-3.5 text-[#EB899F] fill-[#EB899F] animate-heartbeat" />
      </div>

      <div class="flex items-center justify-center mt-6">
        <!-- Next to Playlist Button -->
        <button
          @click="emit('next')"
          class="group flex items-center justify-center w-12 h-12 rounded-full bg-[#6B313C] hover:bg-[#A45F6F] text-white border border-[#EB899F]/20 shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>

    <!-- MOBILE POPUP MODAL -->
    <Teleport to="body">
      <div 
        v-if="selectedEra"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 md:hidden"
        @click.self="closeEra"
      >
        <div class="relative w-full max-w-sm flex flex-col items-center animate-scale-in">
          <!-- Close Button -->
          <button 
            @click="closeEra"
            class="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#2A1116] text-[#EEC1AD] border border-[#6B313C] flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <span class="text-xl leading-none">&times;</span>
          </button>

          <!-- Card Content -->
          <div class="w-full bg-[#180a0d] border border-[#6B313C] rounded-3xl overflow-hidden shadow-aesthetic">
            <!-- Image -->
            <div class="w-full aspect-square relative">
              <img 
                :src="selectedEra.photo" 
                @error="(e) => handleImageError(e, selectedEra.fallback)"
                class="w-full h-full object-cover" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#180a0d] to-transparent"></div>
            </div>

            <!-- Details -->
            <div class="p-6 text-center -mt-8 relative z-10">
              <span class="inline-block px-3 py-1 rounded-full bg-[#2A1116] border border-[#6B313C]/50 font-mono text-[10px] uppercase tracking-widest text-[#EB899F] font-bold mb-3">
                {{ selectedEra.date }}
              </span>
              <h3 class="font-serif-romantic text-2xl font-bold text-[#EEC1AD] mb-2">
                {{ selectedEra.title }}
              </h3>
              <p class="font-sans text-xs text-[#EEC1AD]/80 leading-relaxed">
                {{ selectedEra.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
/* Optional hand-drawn font mimic for mobile descriptions */
.font-handwriting {
  font-family: 'Caveat', 'Comic Sans MS', cursive, sans-serif;
  letter-spacing: 0.5px;
}
</style>
