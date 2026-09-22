<script setup>
import { ref, computed } from 'vue'
import { 
  Heart, Camera, Search, Bell, Repeat, ThumbsUp, ThumbsDown, 
  ChevronRight, ChevronLeft, Play, Pause, Sparkles, Volume2, 
  FolderHeart, Maximize2, X
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

// Curated Photo Albums data supporting local path: /foto/(nama galeri)/(nama fotonya).jpg
// with automatic fallback to romantic aesthetic photos if local file isn't added yet!
const albums = [
  {
    id: 'first-chapters',
    name: 'First Chapters',
    tagline: 'Awal mula kisah manis kita',
    icon: '🌿',
    photos: [
      {
        localUrl: '/foto/first-chapters/1.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        caption: 'The very first day we hung out without checking the clock',
        date: '18 Aug 2023'
      },
      {
        localUrl: '/foto/first-chapters/2.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        caption: 'Spilling iced coffee and laughing until our stomachs hurt',
        date: '02 Sep 2023'
      },
      {
        localUrl: '/foto/first-chapters/3.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        caption: 'Walking along the river under the soft afternoon glow',
        date: '14 Oct 2023'
      },
      {
        localUrl: '/foto/first-chapters/4.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
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
    photos: [
      {
        localUrl: '/foto/roadtrips/1.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        caption: 'Windows down, blasting our favorite roadtrip songs',
        date: '12 Jan 2024'
      },
      {
        localUrl: '/foto/roadtrips/2.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Chasing the golden sunset along the beach coast',
        date: '24 Apr 2024'
      },
      {
        localUrl: '/foto/roadtrips/3.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Scenic mountain views and taking silly candids',
        date: '15 Jun 2024'
      },
      {
        localUrl: '/foto/roadtrips/4.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
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
    photos: [
      {
        localUrl: '/foto/cozy-moments/1.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        caption: 'Late night convenience store snacks at 1 AM',
        date: '10 Oct 2024'
      },
      {
        localUrl: '/foto/cozy-moments/2.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        caption: 'Sharing earphones on rainy quiet afternoons',
        date: '05 Dec 2024'
      },
      {
        localUrl: '/foto/cozy-moments/3.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        caption: 'Cooking together and making funny kitchen mistakes',
        date: '18 Jan 2025'
      },
      {
        localUrl: '/foto/cozy-moments/4.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        caption: 'Still my favorite notification and blessing every day',
        date: 'Today'
      }
    ]
  }
]

// Gallery selection and active photo index
const activeAlbumIdx = ref(0)
const activePhotoIdx = ref(0)
const lightboxPhoto = ref(null)

const currentAlbum = computed(() => albums[activeAlbumIdx.value])
const currentPhoto = computed(() => currentAlbum.value.photos[activePhotoIdx.value])

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

const handleImageError = (e, fallback) => {
  if (e.target.src !== fallback) {
    e.target.src = fallback
  }
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
    
    <!-- 1. TOP PILL HEADER (Deep Maroon with Soft Cream Accents) -->
    <header class="w-full bg-[#6B313C] text-white rounded-full py-2.5 md:py-3 px-4 md:px-6 flex items-center justify-between shadow-aesthetic">
      <!-- Profile Avatar & Text -->
      <div class="flex items-center gap-2.5 md:gap-3">
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
            alt="Avatar" 
            class="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-[#EEC1AD]/80"
          />
          <!-- Red notification dot -->
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#EB899F] border-2 border-white rounded-full"></span>
        </div>
        <div class="text-[10px] md:text-xs leading-tight font-sans text-white/95">
          <p class="font-semibold">our 4-monthversary</p>
          <p class="text-[#EEC1AD]">and forever moments</p>
        </div>
      </div>

      <!-- Mini Search Pill -->
      <div class="flex items-center gap-1.5 md:gap-2 bg-white/95 text-[#6B313C] px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-2xs">
        <Camera class="w-3.5 h-3.5 md:w-4 md:h-4 text-[#A45F6F]" />
        <span class="w-12 md:w-28 text-[10px] md:text-[11px] text-[#A45F6F] truncate">Search memories...</span>
        <Search class="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B313C]" />
      </div>
    </header>

    <!-- 2. MAIN CONTENT GRID: 1-Column on Mobile, 2-Column Split on Desktop -->
    <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
      
      <!-- LEFT COLUMN: HERO PHOTO CARD (Span 12 on mobile, Span 6 on desktop) -->
      <div class="w-full md:col-span-6 flex flex-col space-y-4">
        <!-- Photo Container with Asymmetric Cutout -->
        <div class="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-[32px] md:rounded-[36px] overflow-hidden shadow-aesthetic bg-[#F8ECE6] border border-[#EEC1AD]">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80" 
            alt="Couple Portrait" 
            class="w-full h-full object-cover"
          />

          <!-- Asymmetric Soft Cream Curve Overlay Bottom Right -->
          <div class="absolute bottom-0 right-0 w-32 md:w-36 h-16 md:h-20 bg-[#FDF8F5] rounded-tl-[36px] md:rounded-tl-[40px] pointer-events-none"></div>

          <!-- Floating Chat Bubble Top Right: "aiii" -->
          <div class="absolute top-6 md:top-8 right-6 md:right-8 bg-white/95 backdrop-blur-xs text-[#6B313C] px-5 md:px-6 py-2 md:py-2.5 rounded-2xl shadow-sm text-sm md:text-base font-sans font-semibold border border-[#EEC1AD]/60 animate-float">
            <span>aiii</span>
            <div class="absolute -bottom-1 left-4 w-2.5 h-2.5 bg-white transform rotate-45 border-b border-r border-[#EEC1AD]/60"></div>
          </div>

          <!-- Floating Chat Bubble Middle Right: Sweet Message -->
          <div class="absolute top-22 md:top-28 right-4 md:right-6 bg-white/95 backdrop-blur-xs text-[#6B313C] px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-sm text-xs sm:text-sm font-sans font-medium max-w-[210px] md:max-w-[240px] border border-[#EEC1AD]/60">
            <span>Happy 4-monthversary my favorite person</span>
            <div class="absolute -bottom-1 right-6 md:right-8 w-2.5 h-2.5 bg-white transform rotate-45 border-b border-r border-[#EEC1AD]/60"></div>
          </div>

          <!-- Emoji Slider Pill (Interactive!) -->
          <div class="absolute top-20 md:top-24 left-4 md:left-6 bg-white/90 backdrop-blur-xs px-3.5 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm flex items-center gap-2 border border-[#EEC1AD]/60">
            <span class="text-base md:text-lg">😍</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              v-model="sliderValue" 
              class="w-20 md:w-28 h-1.5 bg-[#F3DDD3] rounded-full appearance-none accent-[#6B313C] cursor-pointer"
            />
          </div>

          <!-- Repost Pill Badge -->
          <button class="absolute top-34 md:top-40 left-4 md:left-6 bg-[#6B313C]/90 hover:bg-[#6B313C] text-white px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer">
            <Repeat class="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>Repost</span>
          </button>
        </div>

        <!-- Indicator Row Below Hero Photo -->
        <div class="flex items-center justify-between px-6 pt-1 text-[#A45F6F]">
          <!-- Signal / Plus -->
          <div class="flex items-center gap-1 text-xs">
            <span class="font-mono text-sm font-bold">📶</span>
            <span class="w-4 h-4 rounded-full border border-[#A45F6F] flex items-center justify-center text-[10px] font-bold">+</span>
          </div>

          <!-- Pagination Dots -->
          <div class="flex items-center gap-1.5 bg-[#F8ECE6] px-3 md:px-3.5 py-1 rounded-full">
            <span class="w-2 h-2 rounded-full bg-[#6B313C]"></span>
            <span class="w-2 h-2 rounded-full bg-[#A45F6F]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#A45F6F]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#A45F6F]/40"></span>
            <span class="w-2 h-2 rounded-full bg-[#A45F6F]/40"></span>
          </div>

          <!-- Hand-drawn Doodle Arrow SVG in Rose Wine -->
          <div class="w-6 h-6 md:w-7 md:h-7 text-[#A45F6F]/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12a8 8 0 0 1 14-5.3L21 9" />
              <path d="M21 4v5h-5" />
            </svg>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: SOCIAL POST & PHOTO CAROUSEL WITH SECTION TABS -->
      <div class="w-full md:col-span-6 flex flex-col space-y-6">
        
        <!-- CARD 1: MESSAGE & REACTION POST CARD -->
        <div class="relative w-full">
          <!-- Soft Floating Orchid Pink Hearts on Left Side -->
          <div class="absolute -left-4 top-8 flex flex-col gap-2 pointer-events-none z-10 opacity-75">
            <Heart class="w-6 h-6 text-[#EB899F] fill-[#EB899F] animate-float" />
            <Heart class="w-5 h-5 text-[#A45F6F] fill-[#A45F6F] transform -rotate-12" />
            <Heart class="w-7 h-7 text-[#6B313C] fill-[#6B313C] animate-pulse" />
          </div>

          <!-- Main White Asymmetric Card -->
          <div class="relative bg-white rounded-[32px] p-6 md:p-7 shadow-aesthetic border border-[#EEC1AD]/70 card-asymmetric-tr">
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-xs font-sans text-[#A45F6F] font-semibold">caslenied acc</p>
                <h3 class="text-sm md:text-base font-sans font-bold text-[#6B313C]">our 4-monthversary !</h3>
              </div>
              <span class="text-xs font-sans text-[#6B313C] font-semibold tracking-tight bg-[#F8ECE6] px-3 py-1 rounded-full border border-[#EEC1AD]/50">
                decorate
              </span>
            </div>

            <!-- Sweet Highlighted Text -->
            <p class="font-sans text-xs sm:text-sm text-[#4A1E26] leading-relaxed mb-6 font-normal">
              I feel lucky to have you in my life. your 
              <span class="text-[#6B313C] font-bold">kindness makes</span> every day brighter, 
              let's keep creating <span class="text-[#A45F6F] font-bold">amazing</span> moments together !
            </p>

            <!-- Interaction Buttons Row -->
            <div class="flex items-center justify-between pt-2 border-t border-[#F8ECE6]">
              <!-- Like / Dislike Reaction Pill -->
              <button 
                @click="toggleLike"
                class="flex items-center gap-2 bg-[#F8ECE6] hover:bg-[#F3DDD3] text-[#6B313C] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-sans font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
              >
                <ThumbsUp :class="['w-3.5 h-3.5', hasLiked ? 'fill-[#6B313C]' : '']" />
                <span>{{ (likeCount / 1000).toFixed(1) }}k</span>
                <span class="text-[#6B313C]/20">|</span>
                <ThumbsDown class="w-3.5 h-3.5" />
              </button>

              <!-- Notification Bell Pill -->
              <button class="flex items-center gap-1.5 bg-[#F8ECE6] hover:bg-[#F3DDD3] text-[#6B313C] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-2xs">
                <Bell class="w-3.5 h-3.5 fill-[#6B313C]" />
                <span class="text-[10px]">∨</span>
              </button>

              <!-- Forward Arrow Button -->
              <button 
                @click="emit('next')"
                class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#6B313C] hover:bg-[#53242D] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-2xs"
                title="Next section"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- CARD 2: PHOTO GALLERY CAROUSEL WITH SECTION TABS (Orchid Love) -->
        <div class="relative w-full bg-white rounded-[32px] p-5 md:p-6 shadow-aesthetic border border-[#EEC1AD]/70 flex flex-col space-y-4">
          
          <!-- Section Tabs on Top (Galeri Selector) -->
          <div class="flex flex-col space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-[#6B313C]">
                <FolderHeart class="w-4 h-4 text-[#EB899F]" />
                <h4 class="font-sans font-bold text-xs sm:text-sm tracking-tight uppercase">Pilih Galeri Kenangan</h4>
              </div>
              <span class="font-mono text-[11px] text-[#A45F6F] bg-[#F8ECE6] px-2.5 py-0.5 rounded-full font-semibold border border-[#EEC1AD]/50">
                {{ activePhotoIdx + 1 }} / {{ currentAlbum.photos.length }}
              </span>
            </div>

            <!-- Section Selector Pills: First Chapters, Roadtrips, Cozy Daily -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                v-for="(album, aIdx) in albums"
                :key="album.id"
                @click="switchAlbum(aIdx)"
                :class="[
                  'px-3.5 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-2xs',
                  activeAlbumIdx === aIdx 
                    ? 'bg-[#6B313C] text-white font-semibold shadow-sm scale-102' 
                    : 'bg-[#F8ECE6] text-[#6B313C] hover:bg-[#F3DDD3]'
                ]"
              >
                <span>{{ album.icon }}</span>
                <span>{{ album.name }}</span>
              </button>
            </div>
          </div>

          <!-- Active Gallery Photo Carousel -->
          <div class="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-[#F8ECE6] group shadow-inner border border-[#EEC1AD]">
            <img 
              :src="currentPhoto.localUrl" 
              :alt="currentPhoto.caption" 
              @error="(e) => handleImageError(e, currentPhoto.fallbackUrl)"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              @click="openLightbox(currentPhoto)"
            />

            <!-- Photo Gradient Overlay for Caption readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

            <!-- Gallery Section Tag Overlay (Top Left) -->
            <div class="absolute top-3 left-3 bg-[#6B313C]/85 backdrop-blur-xs text-white text-[10px] md:text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <span>{{ currentAlbum.icon }}</span>
              <span>{{ currentAlbum.name }}</span>
            </div>

            <!-- Lightbox Zoom Hint (Top Right) -->
            <button 
              @click.stop="openLightbox(currentPhoto)"
              class="absolute top-3 right-3 bg-black/40 hover:bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-full cursor-pointer transition-colors"
              title="Perbesar foto"
            >
              <Maximize2 class="w-3.5 h-3.5" />
            </button>

            <!-- Carousel Navigation Arrows -->
            <button 
              @click.stop="prevPhoto"
              class="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#6B313C] flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
              title="Foto sebelumnya"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>

            <button 
              @click.stop="nextPhoto"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#6B313C] flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
              title="Foto berikutnya"
            >
              <ChevronRight class="w-4 h-4" />
            </button>

            <!-- Bottom Caption Inside Photo -->
            <div class="absolute bottom-3 inset-x-3 text-center px-4 pointer-events-none">
              <p class="font-sans text-xs md:text-sm text-white font-medium drop-shadow-sm line-clamp-1">
                "{{ currentPhoto.caption }}"
              </p>
              <span class="font-mono text-[10px] text-[#EEC1AD]">{{ currentPhoto.date }}</span>
            </div>
          </div>

          <!-- Thumbnail Strip to preview all photos in active gallery -->
          <div class="grid grid-cols-4 gap-2 pt-1">
            <button
              v-for="(photo, pIdx) in currentAlbum.photos"
              :key="pIdx"
              @click="activePhotoIdx = pIdx"
              :class="[
                'relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer',
                activePhotoIdx === pIdx 
                  ? 'border-[#6B313C] ring-2 ring-[#EB899F]/50 scale-105 shadow-xs' 
                  : 'border-transparent opacity-65 hover:opacity-100'
              ]"
            >
              <img 
                :src="photo.localUrl" 
                :alt="photo.caption" 
                @error="(e) => handleImageError(e, photo.fallbackUrl)"
                class="w-full h-full object-cover" 
              />
            </button>
          </div>

          <!-- Bottom Quote with Toggle Switch -->
          <div class="flex items-center justify-between gap-4 mt-2 pt-3 border-t border-[#F8ECE6] px-1">
            <!-- Interactive Toggle Switch -->
            <button 
              @click="isToggleActive = !isToggleActive"
              :class="[
                'w-12 md:w-13 h-6 md:h-7 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0',
                isToggleActive ? 'bg-[#6B313C]' : 'bg-gray-300'
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
            <p class="font-sans text-[11px] md:text-xs text-[#6B313C] leading-relaxed text-right">
              sharing joy and sorrow is a beautiful moment that we 
              <span class="text-[#A45F6F] font-bold">will go through</span> together
            </p>
          </div>
        </div>

        <!-- LIGHTBOX MODAL: SCRAPBOOK POLAROID ENLARGED PHOTO (Orchid Love) -->
        <Teleport to="body">
          <div 
            v-if="lightboxPhoto"
            class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
            @click.self="closeLightbox"
          >
            <div class="relative bg-white rounded-3xl p-4 sm:p-5 max-w-lg w-full shadow-2xl border-4 border-[#F8ECE6] flex flex-col items-center animate-fade-in">
              <!-- Close Button -->
              <button 
                @click="closeLightbox"
                class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#6B313C] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
              >
                <X class="w-4 h-4" />
              </button>

              <!-- Scrapbook Washi Tape on top in Soft Cream -->
              <div class="w-16 h-3 bg-[#EEC1AD] rounded-xs -mt-6 mb-3 shadow-2xs transform -rotate-1"></div>

              <!-- Polaroid Image Frame -->
              <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8ECE6] border border-[#EEC1AD] shadow-inner">
                <img 
                  :src="lightboxPhoto.localUrl" 
                  :alt="lightboxPhoto.caption" 
                  @error="(e) => handleImageError(e, lightboxPhoto.fallbackUrl)"
                  class="w-full h-full object-cover" 
                />
              </div>

              <!-- Caption & Date -->
              <div class="w-full text-center mt-4 px-2">
                <p class="font-handwriting text-base sm:text-lg text-[#6B313C] leading-relaxed">
                  "{{ lightboxPhoto.caption }}"
                </p>
                <div class="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-[#A45F6F] bg-[#F8ECE6] px-3 py-1 rounded-full border border-[#EEC1AD]/50">
                  <Sparkles class="w-3 h-3 text-[#EB899F]" />
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
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F8ECE6] hover:bg-[#F3DDD3] text-[#6B313C] px-4 py-2.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-2xs border border-[#EEC1AD]/60"
          >
            <component :is="isPlayingMusic ? Pause : Play" class="w-3.5 h-3.5 fill-[#6B313C]" />
            <span>{{ isPlayingMusic ? 'Pause Melody' : 'Play Melody' }}</span>
            <Volume2 class="w-3.5 h-3.5 text-[#A45F6F]" />
          </button>

          <!-- Next to Journey Roadmap Button -->
          <button
            @click="emit('next')"
            class="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6B313C] hover:bg-[#53242D] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Explore Our Journey</span>
            <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>

  </div>
</template>


