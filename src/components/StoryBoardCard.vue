<script setup>
import { ref, computed } from 'vue'
import { FolderHeart, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize2, X, ArrowRight } from 'lucide-vue-next'

const emit = defineEmits(['toggle-music', 'next'])

const props = defineProps({
  isPlayingMusic: {
    type: Boolean,
    default: false
  }
})

// Curated Photo Albums — 6 categories from actual DCIM folder
const albums = [
  {
    id: 'jadian',
    name: 'Jadian',
    tagline: '23 Mei 2026 — hari paling bersejarah',
    photos: [
      { localUrl: '/foto/jadian/20260528_213233.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Hari itu, di pinggir pantai, kita resmi jadi satu.', date: '28 Mei 2026' },
      { localUrl: '/foto/jadian/20260528_221052.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Malam pertama sebagai kita.', date: '28 Mei 2026' },
      { localUrl: '/foto/jadian/20260528_221323.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Senyum yang nggak bisa disembunyiin.', date: '28 Mei 2026' }
    ]
  },
  {
    id: 'cafe',
    name: 'Cafe',
    tagline: 'Date cafe yang selalu ngangenin',
    photos: [
      { localUrl: '/foto/cafe/168990.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/cafe/20260526_225422.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Ngobrol panjang sambil duduk berdua.', date: '26 Mei 2026' },
      { localUrl: '/foto/cafe/20260715001428898.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Tiap cafe punya cerita sendiri.', date: '15 Jul 2026' },
      { localUrl: '/foto/cafe/20260715001428986.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '15 Jul 2026' },
      { localUrl: '/foto/cafe/20260906_212141.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Tempat favorit kita ngabisin waktu.', date: '6 Sep 2026' },
      { localUrl: '/foto/cafe/20260906_212150.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '6 Sep 2026' },
      { localUrl: '/foto/cafe/20260909_174127.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Latte art dan tawa yang nggak ada habisnya.', date: '9 Sep 2026' },
      { localUrl: '/foto/cafe/20260909_174129.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '9 Sep 2026' },
      { localUrl: '/foto/cafe/20260909_212212.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Malam yang tenang, cuma berdua.', date: '9 Sep 2026' },
      { localUrl: '/foto/cafe/20260909_212522.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '9 Sep 2026' },
      { localUrl: '/foto/cafe/20260915_234555_0000 (1).webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '15 Sep 2026' },
      { localUrl: '/foto/cafe/IMG-20260514-WA0013.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '14 Mei 2026' },
      { localUrl: '/foto/cafe/IMG-20260906-WA0055.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Yang penting ada kamu di depannya.', date: '6 Sep 2026' },
      { localUrl: '/foto/cafe/IMG-20260915-WA0070.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '15 Sep 2026' },
      { localUrl: '/foto/cafe/VID-20260513-WA0090.mp4', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '13 Mei 2026' }
    ]
  },
  {
    id: 'photobox',
    name: 'Photobox',
    tagline: 'Strip foto yang selalu bikin ketawa',
    photos: [
      { localUrl: '/foto/photobox/20260616_233850.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Selalu gila di depan photobox.', date: '16 Jun 2026' },
      { localUrl: '/foto/photobox/20260616_233900.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Satu strip, banyak ekspresi.', date: '16 Jun 2026' },
      { localUrl: '/foto/photobox/20260624_200341.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Foto yang selalu jadi favorit.', date: '24 Jun 2026' },
      { localUrl: '/foto/photobox/20260812_221835.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Kita dan cahaya neon yang dramatis.', date: '12 Agu 2026' },
      { localUrl: '/foto/photobox/67463215-11d0-428f-8f55-5c8802496baf.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/photobox/6852d00f-c9fe-4cd3-b2de-430b7ad3b2d0.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/photobox/DSCF0339.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Selalu ada di sini, selalu berdua.', date: '2026' },
      { localUrl: '/foto/photobox/IMG-20260624-WA0061.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '24 Jun 2026' },
      { localUrl: '/foto/photobox/da3d1c0e-0d6d-4c99-8065-a4809573ebff.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/photobox/e09d6b81-2d46-4ad0-810d-d70909785418.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/photobox/e17c9e7c-f0b4-477c-bc63-e0ca4f6775a5.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' },
      { localUrl: '/foto/photobox/f1b08bbb-d8ab-4fef-86b7-9e8d194c0700.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2026' }
    ]
  },
  {
    id: 'college',
    name: 'College',
    tagline: 'Nemtek dan SPIN ETAM bareng',
    photos: [
      { localUrl: '/foto/college/20260725_085319.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Ketemu di kampus, cerita dimulai.', date: '25 Jul 2026' },
      { localUrl: '/foto/college/20260809225920859.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '9 Agu 2026' },
      { localUrl: '/foto/college/20260809_182412 (1).webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Nongkrong di SPIN, makin deket.', date: '9 Agu 2026' },
      { localUrl: '/foto/college/20260809_182416.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen SPIN ETAM yang nggak terlupakan.', date: '9 Agu 2026' },
      { localUrl: '/foto/college/20260914_162148.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Sore-sore di kampus, tetap bareng.', date: '14 Sep 2026' },
      { localUrl: '/foto/college/20260914_162151.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '14 Sep 2026' },
      { localUrl: '/foto/college/IMG-20260903-WA0015.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Nemtek yang selalu jadi kenangan.', date: '3 Sep 2026' }
    ]
  },
  {
    id: 'events',
    name: 'Events',
    tagline: 'Nikahan, Dusit, nonton, dan momen spesial lainnya',
    photos: [
      { localUrl: '/foto/events/20260706_200316.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Kondangan bareng, ternyata seru banget.', date: '6 Jul 2026' },
      { localUrl: '/foto/events/20260706_200319.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '6 Jul 2026' },
      { localUrl: '/foto/events/20260706_203606.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Tampil beda tapi tetap serasi.', date: '6 Jul 2026' },
      { localUrl: '/foto/events/20260706_203614.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '6 Jul 2026' },
      { localUrl: '/foto/events/20260801_203832190 (1).webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Nonton bareng, popcornnya abis duluan.', date: '1 Agu 2026' },
      { localUrl: '/foto/events/20260801_203839303.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '1 Agu 2026' },
      { localUrl: '/foto/events/20260801_203846427.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '1 Agu 2026' },
      { localUrl: '/foto/events/20260819221712953.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '19 Agu 2026' },
      { localUrl: '/foto/events/20260819221713028.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '19 Agu 2026' },
      { localUrl: '/foto/events/20260819_202743.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Dusit yang selalu jadi tempat spesial.', date: '19 Agu 2026' },
      { localUrl: '/foto/events/20260921_123858.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Hari yang berat, tapi kita lewatin juga.', date: '21 Sep 2026' },
      { localUrl: '/foto/events/20260921_123924.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Semua ada maksudnya. Kita balik lagi.', date: '21 Sep 2026' },
      { localUrl: '/foto/events/IMG-20260607-WA0018.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Kamu ada di sini pas aku paling butuh.', date: '7 Jun 2026' },
      { localUrl: '/foto/events/IMG-20260607-WA0028.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Nemenin tanpa banyak ngomong, itu yang bikin terharu.', date: '7 Jun 2026' },
      { localUrl: '/foto/events/IMG-20260607-WA0066.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Terima kasih udah nggak kemana-mana.', date: '7 Jun 2026' },
      { localUrl: '/foto/events/IMG-20260706-WA0108.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Event apapun, asalkan bareng kamu.', date: '6 Jul 2026' },
      { localUrl: '/foto/events/VID-20260607-WA0021.mp4', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '7 Jun 2026' },
      { localUrl: '/foto/events/lv_0_20260701024907.mp4', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '1 Jul 2026' }
    ]
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    tagline: 'Momen random yang tetap berharga',
    photos: [
      { localUrl: '/foto/miscellaneous/IMG-20260702-WA0024.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Random, tapi tetap berkesan.', date: '2 Jul 2026' },
      { localUrl: '/foto/miscellaneous/Screenshot_20260616_003825_Gmail.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Bahkan screenshot pun jadi kenangan.', date: '16 Jun 2026' },
      { localUrl: '/foto/miscellaneous/Screenshot_20260616_003831_Gmail.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Hal kecil yang nggak bisa terlupakan.', date: '16 Jun 2026' },
      { localUrl: '/foto/miscellaneous/Screenshot_20260616_010257_Gmail.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Aib tapi sayang banget buat dihapus.', date: '16 Jun 2026' }
    ]
  },
  {
    id: 'rumah',
    name: 'Rumah',
    tagline: 'Momen santai di rumah bareng',
    photos: [
      { localUrl: '/foto/rumah/20260802_104352.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Santai di rumah, tetap seru bareng kamu.', date: '2 Agu 2026' },
      { localUrl: '/foto/rumah/20260831_184532.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Akhir bulan, masih nemenin.', date: '31 Agu 2026' },
      { localUrl: '/foto/rumah/20260831_184542.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Sore yang biasa, tapi berasa beda.', date: '31 Agu 2026' },
      { localUrl: '/foto/rumah/IMG-20260702-WA0008.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Hari-hari kecil yang paling aku rinduin.', date: '2 Jul 2026' },
      { localUrl: '/foto/rumah/IMG-20260702-WA0011.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Momen bersama.', date: '2 Jul 2026' },
      { localUrl: '/foto/rumah/IMG-20260714-WA0071.webp', fallbackUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80', caption: 'Bisa bareng kamu di rumah, itu udah cukup.', date: '14 Jul 2026' }
    ]
  }
];


const activeAlbumIdx = ref(0)
const activePhotoIdx = ref(0)
const lightboxPhoto = ref(null)

const currentAlbum = computed(() => albums[activeAlbumIdx.value])

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

// Transform for Desktop Cover-Flow Carousel
const getDesktopTransform = (idx) => {
  const diff = idx - activePhotoIdx.value;
  let transform = '';
  let zIndex = 30 - Math.abs(diff);
  let opacity = 1;
  let filter = 'none';

  if (diff === 0) {
    transform = 'translateX(0) scale(1) perspective(1000px) rotateY(0deg)';
  } else {
    const sign = Math.sign(diff);
    // Move side items left/right and scale down
    const offset = 180 * sign; 
    const scale = 0.8;
    const rotateY = -25 * sign; 
    transform = `translateX(${offset}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`;
    opacity = Math.abs(diff) <= 2 ? 1 - (Math.abs(diff) * 0.15) : 0;
    filter = Math.abs(diff) > 0 ? 'brightness(0.5)' : 'none';
  }

  return {
    transform,
    zIndex,
    opacity,
    filter,
    pointerEvents: Math.abs(diff) <= 1 ? 'auto' : 'none'
  }
}

// Transform for Mobile Arc Layout (Disney Launchpad style)
const getMobileArcTransform = (idx) => {
  const diff = idx - activePhotoIdx.value;
  const rotateDeg = diff * 22; // Fan out by 22 degrees each
  
  return {
    transform: `rotate(${rotateDeg}deg) scale(${diff === 0 ? 1 : 0.95})`,
    transformOrigin: '-80% 50%', // Pivot point far left
    zIndex: 30 - Math.abs(diff),
    opacity: Math.abs(diff) <= 2 ? 1 : 0,
    pointerEvents: Math.abs(diff) <= 1 ? 'auto' : 'none',
    boxShadow: diff === 0 ? '0 20px 40px -10px rgba(0,0,0,0.8)' : '0 10px 20px -5px rgba(0,0,0,0.5)'
  }
}

// Handle mobile touch swipe to change photos
let touchStartY = 0
const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY
}
const handleTouchEnd = (e) => {
  const touchEndY = e.changedTouches[0].clientY
  const deltaY = touchStartY - touchEndY
  
  if (Math.abs(deltaY) > 40) {
    if (deltaY > 0) {
      // Swipe Up -> Next
      nextPhoto()
    } else {
      // Swipe Down -> Prev
      prevPhoto()
    }
  }
}

</script>

<template>
  <div class="relative w-full min-h-[90vh] bg-[#0a0a0a] text-[#EEC1AD] flex flex-col justify-between overflow-hidden">
    
    <!-- DESKTOP LAYOUT (Cover-flow Carousel) - Hidden on Mobile -->
    <div class="hidden md:flex flex-col items-center justify-center w-full h-full pt-10 pb-8 px-6 flex-1 z-10">
      
      <!-- Top Title -->
      <div class="text-center mb-10">
        <h2 class="font-sans text-[10px] uppercase tracking-[0.3em] text-[#EB899F] font-bold mb-3">
          Our Journey
        </h2>
        <h1 class="font-serif-romantic text-4xl lg:text-5xl font-bold text-[#EEC1AD] mb-3">
          Kisah Kita
        </h1>
        <p class="font-sans text-sm text-[#EEC1AD]/70">
          Setiap bingkai adalah kenangan,<br/>dan setiap cerita adalah tentang kita.
        </p>
      </div>

      <!-- Category Pills -->
      <div class="flex items-center gap-3 mb-12">
        <button
          v-for="(album, aIdx) in albums"
          :key="album.id"
          @click="switchAlbum(aIdx)"
          :class="[
            'px-5 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 border cursor-pointer',
            activeAlbumIdx === aIdx 
              ? 'bg-[#EEC1AD] text-[#180a0d] border-[#EEC1AD] shadow-md scale-105' 
              : 'bg-transparent text-[#EEC1AD] border-[#6B313C]/60 hover:border-[#EB899F]'
          ]"
        >
          {{ album.name }}
        </button>
      </div>

      <!-- 3D Cover-flow Carousel Area -->
      <div class="relative w-full max-w-4xl h-[450px] lg:h-[500px] flex items-center justify-center perspective-[1200px]">
        <div 
          v-for="(photo, idx) in currentAlbum.photos"
          :key="idx"
          @click="activePhotoIdx === idx ? openLightbox(photo) : (activePhotoIdx = idx)"
          class="absolute w-[320px] lg:w-[380px] h-full rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer bg-[#180a0d] border border-[#6B313C]/30 group"
          :style="getDesktopTransform(idx)"
        >
          <img 
            :src="photo.localUrl" 
            :alt="photo.caption" 
            @error="(e) => handleImageError(e, photo.fallbackUrl)"
            class="w-full h-full object-cover"
          />
          
          <!-- Caption overlay for active item -->
          <div 
            class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300"
            :class="activePhotoIdx === idx ? 'opacity-100' : 'opacity-0'"
          >
            <p class="font-sans text-sm text-white font-medium mb-1 drop-shadow-md">
              {{ photo.caption }}
            </p>
            <span class="font-mono text-xs text-[#EB899F]">{{ photo.date }}</span>
          </div>

          <!-- Play/Expand Icon on active hover -->
          <div 
            v-if="activePhotoIdx === idx"
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 class="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <!-- Desktop Navigation Controls -->
      <div class="flex items-center gap-4 mt-12">
        <button 
          @click="prevPhoto"
          class="w-12 h-12 rounded-full border border-[#6B313C] hover:bg-[#2A1116] flex items-center justify-center transition-colors text-[#EEC1AD]"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button 
          @click="nextPhoto"
          class="w-12 h-12 rounded-full border border-[#6B313C] hover:bg-[#2A1116] flex items-center justify-center transition-colors text-[#EEC1AD]"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>

    </div>


    <!-- MOBILE LAYOUT (Disney Arc Style) - Hidden on Desktop -->
    <div 
      class="md:hidden relative w-full flex-1 flex overflow-hidden pt-6"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      
      <!-- Left Text Area (Categories & Title) -->
      <div class="w-[45%] pl-5 py-8 flex flex-col justify-start z-10">
        <h2 class="font-sans text-[9px] uppercase tracking-widest text-[#EB899F] font-bold mb-4">
          OUR<br/>JOURNEY
        </h2>

        <!-- Vertical Category List -->
        <div class="flex flex-col space-y-5 border-l border-[#6B313C]/40 pl-3 mb-8">
          <button 
            v-for="(album, aIdx) in albums" 
            :key="album.id"
            @click="switchAlbum(aIdx)"
            class="text-left font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 relative"
            :class="activeAlbumIdx === aIdx ? 'text-[#EEC1AD] scale-105 origin-left' : 'text-[#6B313C]'"
          >
            {{ album.name }}
            <span 
              v-if="activeAlbumIdx === aIdx"
              class="absolute -left-[14px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#EB899F]"
            ></span>
          </button>
        </div>

        <h1 class="font-serif-romantic text-2xl font-bold text-[#EEC1AD] leading-tight">
          Kisah<br/>Kita
        </h1>
        <p class="font-sans text-[10px] text-[#EEC1AD]/60 mt-3 max-w-[120px]">
          Geser atas & bawah untuk buka kenangan
        </p>

        <div class="mt-auto flex flex-col gap-3">
          <button @click="prevPhoto" class="w-8 h-8 rounded-full border border-[#6B313C] flex items-center justify-center text-[#EEC1AD]">
            <ChevronLeft class="w-4 h-4 rotate-90" />
          </button>
          <button @click="nextPhoto" class="w-8 h-8 rounded-full border border-[#6B313C] flex items-center justify-center text-[#EEC1AD]">
            <ChevronRight class="w-4 h-4 rotate-90" />
          </button>
        </div>
      </div>

      <!-- Right Arc Slider Area -->
      <!-- We push the container to the right and use the transform origin to fan items out -->
      <div class="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[65%] h-[80vh]">
        <div 
          v-for="(photo, idx) in currentAlbum.photos"
          :key="idx"
          @click="activePhotoIdx === idx ? openLightbox(photo) : (activePhotoIdx = idx)"
          class="absolute w-full h-full rounded-[32px] overflow-hidden border-[6px] border-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :style="getMobileArcTransform(idx)"
        >
          <img 
            :src="photo.localUrl" 
            @error="(e) => handleImageError(e, photo.fallbackUrl)"
            class="w-full h-full object-cover"
          />
          
          <!-- Caption for active item in mobile -->
          <div 
            class="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300"
            :class="activePhotoIdx === idx ? 'opacity-100' : 'opacity-0'"
          >
            <span class="font-mono text-[9px] text-[#EB899F] drop-shadow-md">{{ photo.date }}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- GLOBAL: BOTTOM ACTION BAR (Music & Next Step) -->
    <div class="relative w-full z-20 border-t border-[#6B313C]/30 bg-[#0a0a0a]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <!-- Music toggle -->
      <button
        @click="emit('toggle-music')"
        class="inline-flex items-center justify-center gap-2 bg-[#2A1116] hover:bg-[#6B313C] text-[#EEC1AD] px-4 py-2 rounded-full text-xs font-sans font-bold transition-all cursor-pointer shadow-sm border border-[#6B313C]/60"
      >
        <component :is="isPlayingMusic ? Pause : Play" class="w-3.5 h-3.5 fill-current" />
        <span class="hidden sm:inline">{{ isPlayingMusic ? 'Pause' : 'Play' }}</span>
        <Volume2 class="w-3 h-3 text-[#EB899F]" />
      </button>

      <!-- Next Section Button -->
      <button
        @click="emit('next')"
        class="group flex items-center justify-center w-12 h-12 rounded-full bg-[#6B313C] hover:bg-[#A45F6F] text-white border border-[#EB899F]/20 shadow-aesthetic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <ChevronRight class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>


    <!-- LIGHTBOX MODAL -->
    <Teleport to="body">
      <div 
        v-if="lightboxPhoto"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
        @click.self="closeLightbox"
      >
        <div class="relative max-w-4xl w-full flex flex-col items-center animate-fade-in">
          <!-- Close Button -->
          <button 
            @click="closeLightbox"
            class="absolute -top-12 right-0 md:-right-12 w-10 h-10 rounded-full bg-[#2A1116] hover:bg-[#6B313C] text-[#EEC1AD] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Large Image -->
          <img 
            :src="lightboxPhoto.localUrl" 
            @error="(e) => handleImageError(e, lightboxPhoto.fallbackUrl)"
            class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" 
          />

          <!-- Caption & Date -->
          <div class="w-full text-center mt-6 px-4">
            <p class="font-serif-romantic text-xl md:text-2xl text-[#EEC1AD] mb-2">
              "{{ lightboxPhoto.caption }}"
            </p>
            <span class="font-mono text-xs text-[#EB899F] tracking-widest uppercase">
              {{ lightboxPhoto.date }}
            </span>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>
