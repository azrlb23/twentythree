<script setup>
import { ref, computed } from 'vue'
import { 
  Heart, Camera, Search, Bell, Repeat, ThumbsUp, ThumbsDown, 
  ChevronRight, ChevronLeft, Play, Pause, Sparkles, Volume2, 
  FolderHeart, Images, BookOpen, Grid, Maximize2, X, ArrowLeft,
  Eye, Layers
} from 'lucide-vue-next'

const emit = defineEmits(['toggle-music', 'next'])

const props = defineProps({
  isPlayingMusic: {
    type: Boolean,
    default: false
  }
})

// Interactive slider value
const sliderValue = ref(85)

// Interactive toggle switch
const isToggleActive = ref(true)

// Interactive likes
const likeCount = ref(2340)
const hasLiked = ref(false)

const toggleLike = () => {
  if (hasLiked.value) {
    likeCount.value--
    hasLiked.value = false
  } else {
    likeCount.value++
    hasLiked.value = true
  }
}

// Curated Photo Albums data
const albums = [
  {
    id: 'first-chapters',
    name: 'First Chapters',
    tagline: 'Awal mula kisah manis kita',
    icon: '🌿',
    dateRange: 'Aug - Nov 2023',
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        caption: 'The very first day we hung out without checking the clock',
        date: '18 Aug 2023'
      },
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        caption: 'Spilling iced coffee and laughing until our stomachs hurt',
        date: '02 Sep 2023'
      },
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        caption: 'Walking along the river under the soft afternoon glow',
        date: '14 Oct 2023'
      },
      {
        url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
        caption: 'When holding hands finally felt like coming home',
        date: '23 Nov 2023'
      }
    ]
  },
  {
    id: 'roadtrips',
    name: 'Roadtrips & Escapes',
    tagline: 'Petualangan & senja bersama',
    icon: '🚗',
    dateRange: 'Jan - Aug 2024',
    cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        caption: 'Windows down, blasting our favorite roadtrip songs',
        date: '12 Jan 2024'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Chasing the golden sunset along the beach coast',
        date: '24 Apr 2024'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Scenic mountain views and taking silly candids',
        date: '15 Jun 2024'
      },
      {
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
        caption: 'Sunset picnic blanket with warm tea and smiles',
        date: '29 Aug 2024'
      }
    ]
  },
  {
    id: 'cozy-moments',
    name: 'Cozy Daily Life',
    tagline: 'Hal kecil yang bermakna',
    icon: '☕',
    dateRange: 'Oct 2024 - Present',
    cover: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        caption: 'Late night convenience store snacks at 1 AM',
        date: '10 Oct 2024'
      },
      {
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        caption: 'Sharing earphones on rainy quiet afternoons',
        date: '05 Dec 2024'
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Cooking together and making funny kitchen mistakes',
        date: '18 Jan 2025'
      },
      {
        url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        caption: 'Still my favorite notification and blessing every day',
        date: 'Today'
      }
    ]
  }
]

// Album state
const viewMode = ref('inside') // 'shelf' (see 3 albums) or 'inside' (view photos inside selected album)
const activeAlbumIdx = ref(0)
const activePhotoIdx = ref(0)
const displayStyle = ref('carousel') // 'carousel' or 'duo' (matching reference image)
const lightboxPhoto = ref(null)

const currentAlbum = computed(() => albums[activeAlbumIdx.value])
const currentPhoto = computed(() => currentAlbum.value.photos[activePhotoIdx.value])

// Duo photos computed for reference layout
const duoLeftPhoto = computed(() => {
  const idx = activePhotoIdx.value
  return currentAlbum.value.photos[idx]
})
const duoRightPhoto = computed(() => {
  const nextIdx = (activePhotoIdx.value + 1) % currentAlbum.value.photos.length
  return currentAlbum.value.photos[nextIdx]
})

const openAlbum = (idx) => {
  activeAlbumIdx.value = idx
  activePhotoIdx.value = 0
  viewMode.value = 'inside'
}

const switchAlbum = (idx) => {
  activeAlbumIdx.value = idx
  activePhotoIdx.value = 0
}

const nextPhoto = () => {
  activePhotoIdx.value = (activePhotoIdx.value + 1) % currentAlbum.value.photos.length
}

const prevPhoto = () => {
  activePhotoIdx.value = (activePhotoIdx.value - 1 + currentAlbum.value.photos.length) % currentAlbum.value.photos.length
}

const openLightbox = (photo) => {
  lightboxPhoto.value = photo
}

const closeLightbox = () => {
  lightboxPhoto.value = null
}
</script>

<template>
  <!-- Responsive Container: max-w-md on Mobile, max-w-5xl on Desktop -->
  <div class="relative w-full max-w-md md:max-w-5xl mx-auto py-6 md:py-8 px-4 sm:px-6 flex flex-col items-center space-y-6 md:space-y-8 select-none">
    
    <!-- 1. TOP PILL HEADER -->
    <header class="w-full bg-[#8da871] text-white rounded-full py-2.5 md:py-3 px-4 md:px-6 flex items-center justify-between shadow-aesthetic">
      <!-- Profile Avatar & Text -->
      <div class="flex items-center gap-2.5 md:gap-3">
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
            alt="Avatar" 
            class="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-white/70"
          />
          <!-- Red notification dot -->
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#e11d48] border-2 border-white rounded-full"></span>
        </div>
        <div class="text-[10px] md:text-xs leading-tight font-sans text-white/95">
          <p class="font-semibold">more on profile page</p>
          <p class="text-white/80">and highlights</p>
        </div>
      </div>

      <!-- Mini Search Pill -->
      <div class="flex items-center gap-1.5 md:gap-2 bg-white/95 text-[#657e4e] px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-2xs">
        <Camera class="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8da871]" />
        <span class="w-12 md:w-28 text-[10px] md:text-[11px] text-[#8c9f7c] truncate">Search memories...</span>
        <Search class="w-3.5 h-3.5 md:w-4 md:h-4 text-[#657e4e]" />
      </div>
    </header>

    <!-- 2. MAIN CONTENT GRID: 1-Column on Mobile, 2-Column Split on Desktop -->
    <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
      
      <!-- LEFT COLUMN: HERO PHOTO CARD (Span 12 on mobile, Span 6 on desktop) -->
      <div class="w-full md:col-span-6 flex flex-col space-y-4">
        <!-- Photo Container with Asymmetric Cutout -->
        <div class="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-[32px] md:rounded-[36px] overflow-hidden shadow-aesthetic bg-[#eaf0e4] border border-[#edf1e8]">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80" 
            alt="Couple Portrait" 
            class="w-full h-full object-cover"
          />

          <!-- Asymmetric White Curve Overlay Bottom Right -->
          <div class="absolute bottom-0 right-0 w-32 md:w-36 h-16 md:h-20 bg-[#f5f6ef] rounded-tl-[36px] md:rounded-tl-[40px] pointer-events-none"></div>

          <!-- Floating Chat Bubble Top Right: "aiii" -->
          <div class="absolute top-6 md:top-8 right-6 md:right-8 bg-white/95 backdrop-blur-xs text-[#283618] px-5 md:px-6 py-2 md:py-2.5 rounded-2xl shadow-sm text-sm md:text-base font-sans font-semibold border border-white/80 animate-float">
            <span>aiii</span>
            <div class="absolute -bottom-1 left-4 w-2.5 h-2.5 bg-white transform rotate-45"></div>
          </div>

          <!-- Floating Chat Bubble Middle Right: Sweet Message -->
          <div class="absolute top-22 md:top-28 right-4 md:right-6 bg-white/95 backdrop-blur-xs text-[#354724] px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-sm text-xs sm:text-sm font-sans font-medium max-w-[210px] md:max-w-[240px] border border-white/80">
            <span>Happy anniversary my favorite person</span>
            <div class="absolute -bottom-1 right-6 md:right-8 w-2.5 h-2.5 bg-white transform rotate-45"></div>
          </div>

          <!-- Emoji Slider Pill (Interactive!) -->
          <div class="absolute top-20 md:top-24 left-4 md:left-6 bg-white/90 backdrop-blur-xs px-3.5 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm flex items-center gap-2 border border-white/80">
            <span class="text-base md:text-lg">😍</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              v-model="sliderValue" 
              class="w-20 md:w-28 h-1.5 bg-[#d5e0cb] rounded-full appearance-none accent-[#8da871] cursor-pointer"
            />
          </div>

          <!-- Repost Pill Badge -->
          <button class="absolute top-34 md:top-40 left-4 md:left-6 bg-[#283618]/90 hover:bg-[#283618] text-white px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer">
            <Repeat class="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>Repost</span>
          </button>
        </div>

        <!-- Indicator Row Below Hero Photo -->
        <div class="flex items-center justify-between px-6 pt-1 text-[#8da871]">
          <!-- Signal / Plus -->
          <div class="flex items-center gap-1 text-xs">
            <span class="font-mono text-sm font-bold">📶</span>
            <span class="w-4 h-4 rounded-full border border-[#8da871] flex items-center justify-center text-[10px] font-bold">+</span>
          </div>

          <!-- Pagination Dots -->
          <div class="flex items-center gap-1.5 bg-[#eaf0e4] px-3 md:px-3.5 py-1 rounded-full">
            <span class="w-2 h-2 rounded-full bg-[#8da871]"></span>
            <span class="w-2 h-2 rounded-full bg-[#8da871]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#8da871]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#8da871]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#8da871]/40"></span>
          </div>

          <!-- Hand-drawn Doodle Arrow SVG -->
          <div class="w-6 h-6 md:w-7 md:h-7 text-[#8da871]/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12a8 8 0 0 1 14-5.3L21 9" />
              <path d="M21 4v5h-5" />
            </svg>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: SOCIAL POST & INTERACTIVE PHOTO ALBUMS (Span 12 on mobile, Span 6 on desktop) -->
      <div class="w-full md:col-span-6 flex flex-col space-y-6">
        
        <!-- CARD 1: MESSAGE & REACTION POST CARD -->
        <div class="relative w-full">
          <!-- Soft Floating Green Hearts on Left Side -->
          <div class="absolute -left-4 top-8 flex flex-col gap-2 pointer-events-none z-10 opacity-70">
            <Heart class="w-6 h-6 text-[#8da871] fill-[#8da871] animate-float" />
            <Heart class="w-5 h-5 text-[#a3be87] fill-[#a3be87] transform -rotate-12" />
            <Heart class="w-7 h-7 text-[#8da871] fill-[#8da871] animate-pulse" />
          </div>

          <!-- Main White Asymmetric Card -->
          <div class="relative bg-white rounded-[32px] p-6 md:p-7 shadow-aesthetic border border-[#edf1e8] card-asymmetric-tr">
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-xs font-sans text-[#788a6d] font-semibold">caslenied acc</p>
                <h3 class="text-sm md:text-base font-sans font-bold text-[#283618]">our anniversary !</h3>
              </div>
              <span class="text-xs font-sans text-[#8da871] font-semibold tracking-tight bg-[#eef3e8] px-3 py-1 rounded-full">
                decorate
              </span>
            </div>

            <!-- Sweet Highlighted Text -->
            <p class="font-sans text-xs sm:text-sm text-[#3b4c2e] leading-relaxed mb-6 font-normal">
              I feel lucky to have you in my life. your 
              <span class="text-[#556b2f] font-bold">kindness makes</span> every day brighter, 
              let's keep creating <span class="text-[#556b2f] font-bold">amazing</span> moments together !
            </p>

            <!-- Interaction Buttons Row -->
            <div class="flex items-center justify-between pt-2 border-t border-[#f2f5ee]">
              <!-- Like / Dislike Reaction Pill -->
              <button 
                @click="toggleLike"
                class="flex items-center gap-2 bg-[#dbe7cf] hover:bg-[#cfddc1] text-[#283618] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-sans font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
              >
                <ThumbsUp :class="['w-3.5 h-3.5', hasLiked ? 'fill-[#283618]' : '']" />
                <span>{{ (likeCount / 1000).toFixed(1) }}k</span>
                <span class="text-black/20">|</span>
                <ThumbsDown class="w-3.5 h-3.5" />
              </button>

              <!-- Notification Bell Pill -->
              <button class="flex items-center gap-1.5 bg-[#dbe7cf] hover:bg-[#cfddc1] text-[#283618] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-2xs">
                <Bell class="w-3.5 h-3.5 fill-[#283618]" />
                <span class="text-[10px]">∨</span>
              </button>

              <!-- Forward Arrow Button -->
              <button 
                @click="emit('next')"
                class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#8da871] hover:bg-[#657e4e] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-2xs"
                title="Next section"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- CARD 2: INTERACTIVE MEMORY ALBUMS (Album Structure with Inside Photo Browsing) -->
        <div class="relative w-full bg-white rounded-[32px] p-5 md:p-6 shadow-aesthetic border border-[#edf1e8] flex flex-col space-y-4">
          
          <!-- VIEW MODE 1: ALBUMS SHELF (See all 3 albums as scrapbook book covers) -->
          <div v-if="viewMode === 'shelf'" class="flex flex-col space-y-4">
            <!-- Shelf Header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-[#283618]">
                <FolderHeart class="w-4 h-4 text-[#8da871]" />
                <h4 class="font-sans font-bold text-xs sm:text-sm tracking-tight uppercase">Koleksi Album Foto</h4>
              </div>
              <span class="font-mono text-[11px] text-[#657e4e] bg-[#eef3e8] px-2.5 py-0.5 rounded-full font-semibold">
                {{ albums.length }} Album
              </span>
            </div>
            
            <p class="font-sans text-xs text-[#526444] leading-relaxed">
              Pilih album di bawah untuk membuka dan melihat foto-foto kenangan di dalamnya:
            </p>

            <!-- 3 Album Covers Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div
                v-for="(album, aIdx) in albums"
                :key="album.id"
                @click="openAlbum(aIdx)"
                class="group relative bg-[#f7f9f4] hover:bg-[#eef4e8] border border-[#dce6d3] hover:border-[#8da871] rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <!-- Washi Tape Accent on Album Cover -->
                <div class="w-10 h-2 bg-[#d7e5cb] rounded-xs -mt-4 mb-2 shadow-2xs transform -rotate-2"></div>

                <!-- Album Cover Photo with Stacked Polaroid Effect -->
                <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-[#e0ebd7] shadow-inner mb-3 border border-[#cfddc4]">
                  <!-- Background stacked layer to feel like physical photo album -->
                  <div class="absolute inset-0 bg-[#c4d7b8] transform rotate-3 scale-95 opacity-50 rounded-xl pointer-events-none"></div>
                  <img 
                    :src="album.cover" 
                    :alt="album.name" 
                    class="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <!-- Photo Count Pill Overlay -->
                  <div class="absolute bottom-1.5 right-1.5 z-20 bg-black/55 backdrop-blur-xs text-white text-[10px] font-sans px-2 py-0.5 rounded-full font-medium">
                    {{ album.photos.length }} Foto
                  </div>
                </div>

                <!-- Album Details -->
                <div class="w-full flex flex-col items-center">
                  <span class="text-base mb-0.5">{{ album.icon }}</span>
                  <h5 class="font-sans font-bold text-xs text-[#283618] line-clamp-1 group-hover:text-[#556b2f] transition-colors">
                    {{ album.name }}
                  </h5>
                  <p class="font-sans text-[10px] text-[#6d805f] mt-0.5 mb-2 line-clamp-1">
                    {{ album.tagline }}
                  </p>

                  <!-- Open Album Button Pill -->
                  <button class="w-full py-1 px-2.5 rounded-full bg-[#8da871] group-hover:bg-[#657e4e] text-white text-[11px] font-sans font-semibold flex items-center justify-center gap-1 shadow-2xs transition-colors">
                    <BookOpen class="w-3 h-3" />
                    <span>Buka Album</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- VIEW MODE 2: INSIDE SELECTED ALBUM (Browse Photos, Thumbnails & Lightbox) -->
          <div v-else class="flex flex-col space-y-3.5">
            
            <!-- Top Controls: Back to Shelf + Album Switcher Pills -->
            <div class="flex flex-col space-y-2">
              <div class="flex items-center justify-between">
                <!-- Back to Albums Shelf Button -->
                <button 
                  @click="viewMode = 'shelf'"
                  class="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#556b2f] hover:text-[#283618] bg-[#edf3e6] hover:bg-[#dbe7cf] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <ArrowLeft class="w-3.5 h-3.5" />
                  <span>Semua Album</span>
                </button>

                <!-- Display Mode Toggle (Carousel vs Story Duo) -->
                <div class="flex items-center gap-1 bg-[#edf3e6] p-0.5 rounded-full">
                  <button
                    @click="displayStyle = 'carousel'"
                    :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold transition-all cursor-pointer',
                      displayStyle === 'carousel' ? 'bg-[#8da871] text-white shadow-2xs' : 'text-[#4a5c39] hover:text-[#283618]'
                    ]"
                  >
                    Fokus
                  </button>
                  <button
                    @click="displayStyle = 'duo'"
                    :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold transition-all cursor-pointer',
                      displayStyle === 'duo' ? 'bg-[#8da871] text-white shadow-2xs' : 'text-[#4a5c39] hover:text-[#283618]'
                    ]"
                  >
                    Duo
                  </button>
                </div>
              </div>

              <!-- Quick Switch Album Pills -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  v-for="(album, aIdx) in albums"
                  :key="album.id"
                  @click="switchAlbum(aIdx)"
                  :class="[
                    'px-3 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1',
                    activeAlbumIdx === aIdx 
                      ? 'bg-[#8da871] text-white shadow-xs font-semibold' 
                      : 'bg-[#f0f4ec] text-[#4a5c39] hover:bg-[#e4ebd9]'
                  ]"
                >
                  <span>{{ album.icon }}</span>
                  <span>{{ album.name }}</span>
                </button>
              </div>
            </div>

            <!-- OPTION A: FOCUSED CAROUSEL INSIDE ALBUM -->
            <div v-if="displayStyle === 'carousel'" class="flex flex-col space-y-3">
              <!-- Active Photo Viewer Frame -->
              <div class="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-[#eaf0e4] group shadow-inner border border-[#d5e0cb]">
                <img 
                  :src="currentPhoto.url" 
                  :alt="currentPhoto.caption" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  @click="openLightbox(currentPhoto)"
                />

                <!-- Photo Gradient Overlay for Caption readability -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none"></div>

                <!-- Album Tag Overlay (Top Left) -->
                <div class="absolute top-3 left-3 bg-[#657e4e]/90 backdrop-blur-xs text-white text-[10px] md:text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <span>{{ currentAlbum.icon }}</span>
                  <span>{{ currentAlbum.name }}</span>
                </div>

                <!-- Photo Counter & Lightbox Hint (Top Right) -->
                <div class="absolute top-3 right-3 flex items-center gap-1.5">
                  <button 
                    @click.stop="openLightbox(currentPhoto)"
                    class="bg-black/40 hover:bg-black/60 backdrop-blur-xs text-white p-1 rounded-full cursor-pointer transition-colors"
                    title="Perbesar foto"
                  >
                    <Maximize2 class="w-3 h-3" />
                  </button>
                  <div class="bg-black/40 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                    {{ activePhotoIdx + 1 }} / {{ currentAlbum.photos.length }}
                  </div>
                </div>

                <!-- Carousel Navigation Arrows -->
                <button 
                  @click.stop="prevPhoto"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/85 hover:bg-white text-[#283618] flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
                  title="Foto sebelumnya"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>

                <button 
                  @click.stop="nextPhoto"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/85 hover:bg-white text-[#283618] flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
                  title="Foto berikutnya"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>

                <!-- Bottom Caption Inside Photo -->
                <div class="absolute bottom-2.5 inset-x-3 text-center px-4 pointer-events-none">
                  <p class="font-sans text-xs md:text-sm text-white font-medium drop-shadow-sm line-clamp-1">
                    "{{ currentPhoto.caption }}"
                  </p>
                  <span class="font-mono text-[10px] text-white/70">{{ currentPhoto.date }}</span>
                </div>
              </div>

              <!-- Thumbnail Strip to preview & jump to any photo in album -->
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="(photo, pIdx) in currentAlbum.photos"
                  :key="pIdx"
                  @click="activePhotoIdx = pIdx"
                  :class="[
                    'relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer',
                    activePhotoIdx === pIdx 
                      ? 'border-[#8da871] ring-2 ring-[#8da871]/40 scale-105 shadow-xs' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  ]"
                >
                  <img :src="photo.url" :alt="photo.caption" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <!-- OPTION B: DUO STORY PAIR (Exact Layout Matching Reference Image) -->
            <div v-else class="flex flex-col space-y-3">
              <!-- Side-by-Side Dual Photos with Heart Connector Badge -->
              <div class="relative w-full bg-[#f4f7f0] rounded-[24px] p-2 border border-[#dce6d3]">
                
                <div class="grid grid-cols-2 gap-2 relative">
                  <!-- Left Photo with Tag -->
                  <div 
                    class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e0ebd7] shadow-xs cursor-pointer group"
                    @click="openLightbox(duoLeftPhoto)"
                  >
                    <img :src="duoLeftPhoto.url" :alt="duoLeftPhoto.caption" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <!-- Speech bubble tag on left (as seen in user reference) -->
                    <div class="absolute top-2 left-2 bg-[#657e4e]/95 text-white text-[9px] font-sans font-medium px-2 py-0.5 rounded-full shadow-xs">
                      {{ currentAlbum.name }}
                    </div>
                  </div>

                  <!-- Middle Heart Connector Badge (from reference image) -->
                  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#8da871] text-white flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
                    <Heart class="w-3.5 h-3.5 fill-white" />
                  </div>

                  <!-- Right Photo -->
                  <div 
                    class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e0ebd7] shadow-xs cursor-pointer group"
                    @click="openLightbox(duoRightPhoto)"
                  >
                    <img :src="duoRightPhoto.url" :alt="duoRightPhoto.caption" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div class="absolute bottom-1 right-2 text-white text-[9px] font-mono drop-shadow-md">
                      {{ duoRightPhoto.date }}
                    </div>
                  </div>
                </div>

                <!-- Duo Navigation Controls -->
                <div class="flex items-center justify-between px-2 pt-2 text-[11px] text-[#4a5c39]">
                  <button 
                    @click="prevPhoto"
                    class="flex items-center gap-1 font-sans font-semibold text-[#657e4e] hover:text-[#283618] cursor-pointer"
                  >
                    <ChevronLeft class="w-3.5 h-3.5" /> Pasang Sebelumnya
                  </button>
                  <span class="font-mono text-[10px] text-[#7d906e]">
                    {{ activePhotoIdx + 1 }}-{{ ((activePhotoIdx + 1) % currentAlbum.photos.length) + 1 }} dari {{ currentAlbum.photos.length }}
                  </span>
                  <button 
                    @click="nextPhoto"
                    class="flex items-center gap-1 font-sans font-semibold text-[#657e4e] hover:text-[#283618] cursor-pointer"
                  >
                    Pasang Berikutnya <ChevronRight class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom Quote with Toggle Switch (Preserved from Reference Design) -->
          <div class="flex items-center justify-between gap-4 mt-2 pt-3 border-t border-[#edf1e8] px-1">
            <!-- Interactive Toggle Switch -->
            <button 
              @click="isToggleActive = !isToggleActive"
              :class="[
                'w-12 md:w-13 h-6 md:h-7 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0',
                isToggleActive ? 'bg-[#556b2f]' : 'bg-gray-300'
              ]"
            >
              <div 
                :class="[
                  'w-5 md:w-6 h-5 md:h-6 rounded-full bg-white shadow-sm transition-transform duration-200',
                  isToggleActive ? 'translate-x-6' : 'translate-x-0'
                ]"
              ></div>
            </button>

            <!-- Quote Text -->
            <p class="font-sans text-[11px] md:text-xs text-[#526444] leading-relaxed text-right">
              sharing joy and sorrow is a beautiful moment that we 
              <span class="text-[#283618] font-bold">will go through</span> together
            </p>
          </div>
        </div>

        <!-- LIGHTBOX MODAL: SCRAPBOOK POLAROID ENLARGED PHOTO -->
        <Teleport to="body">
          <div 
            v-if="lightboxPhoto"
            class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
            @click.self="closeLightbox"
          >
            <div class="relative bg-white rounded-3xl p-4 sm:p-5 max-w-lg w-full shadow-2xl border-4 border-[#f5f6ef] flex flex-col items-center animate-fade-in">
              <!-- Close Button -->
              <button 
                @click="closeLightbox"
                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#283618] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
              >
                <X class="w-4 h-4" />
              </button>

              <!-- Scrapbook Washi Tape on top -->
              <div class="w-16 h-3 bg-[#8da871]/40 rounded-xs -mt-6 mb-3 shadow-2xs transform -rotate-1"></div>

              <!-- Polaroid Image Frame -->
              <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0f4ec] border border-[#e4ebd9] shadow-inner">
                <img :src="lightboxPhoto.url" :alt="lightboxPhoto.caption" class="w-full h-full object-cover" />
              </div>

              <!-- Caption & Date -->
              <div class="w-full text-center mt-4 px-2">
                <p class="font-handwriting text-base sm:text-lg text-[#283618] leading-relaxed">
                  "{{ lightboxPhoto.caption }}"
                </p>
                <div class="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-[#657e4e] bg-[#eef3e8] px-3 py-1 rounded-full">
                  <Sparkles class="w-3 h-3 text-[#8da871]" />
                  <span>{{ lightboxPhoto.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </Teleport>

        <!-- ACTION BUTTONS: MUSIC CONTROLLER & NEXT BUTTON -->
        <div class="w-full pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <!-- Music toggle pill -->
          <button
            @click="emit('toggle-music')"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dbe7cf] hover:bg-[#cfddc1] text-[#283618] px-4 py-2.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-2xs"
          >
            <component :is="isPlayingMusic ? Pause : Play" class="w-3.5 h-3.5 fill-[#283618]" />
            <span>{{ isPlayingMusic ? 'Pause Melody' : 'Play Melody' }}</span>
            <Volume2 class="w-3.5 h-3.5 text-[#657e4e]" />
          </button>

          <!-- Next to Journey Roadmap Button -->
          <button
            @click="emit('next')"
            class="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8da871] hover:bg-[#728d58] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Explore Our Journey</span>
            <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

