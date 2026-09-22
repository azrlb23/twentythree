<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, ChevronRight } from 'lucide-vue-next'

const emit = defineEmits(['opened'])

const isOpened = ref(false)
const isBreaking = ref(false)

const openEnvelope = () => {
  if (isOpened.value) return
  isBreaking.value = true

  // Confetti on opening wax seal in Orchid Love palette
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 60,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#6B313C', '#EB899F', '#A45F6F', '#EEC1AD', '#ffffff']
  })

  // Smooth opening sequence
  setTimeout(() => {
    isOpened.value = true
  }, 350)
}

const handleContinue = () => {
  emit('opened')
}
</script>

<template>
  <div class="relative w-full max-w-lg mx-auto pt-20 sm:pt-24 pb-12 px-4 flex flex-col items-center select-none">
    <!-- Subtitle instruction -->
    <div class="text-center mb-6">
      <p class="font-sans text-xs sm:text-sm text-[#A45F6F] font-medium flex items-center justify-center gap-1.5">
        <Sparkles class="w-4 h-4 text-[#EB899F]" />
        {{ isOpened ? 'Surat spesial untukmu...' : 'Sentuh segel lilin untuk membuka surat' }}
      </p>
    </div>

    <!-- Envelope Container -->
    <div 
      @click="!isOpened && openEnvelope()"
      :class="[
        'relative w-full aspect-[4/3] max-w-[440px] select-none transition-all duration-700 perspective-[1000px] group',
        isOpened ? 'scale-100 cursor-default' : 'cursor-pointer hover:scale-[1.02]'
      ]"
    >
      <!-- Base Envelope Back & Body (Behind letter) -->
      <div class="absolute inset-0 bg-[#FDF9F7] rounded-2xl shadow-aesthetic border border-[#EEC1AD] overflow-hidden z-0">
        <!-- Inner Pattern Lining in Orchid -->
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#EB899F_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <!-- Envelope Flap (Bottom Triangles) -->
        <div class="absolute bottom-0 inset-x-0 h-1/2 flex">
          <div class="w-1/2 h-full bg-[#F8ECE6] border-t border-r border-[#EEC1AD] transform origin-bottom-left skew-y-12"></div>
          <div class="w-1/2 h-full bg-[#F8ECE6] border-t border-l border-[#EEC1AD] transform origin-bottom-right -skew-y-12"></div>
        </div>
      </div>

      <!-- Letter Content (Slides up cleanly ABOVE envelope when opened) -->
      <div 
        :class="[
          'absolute inset-x-4 sm:inset-x-6 top-6 bottom-4 bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#EEC1AD] flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out z-30',
          isOpened 
            ? '-translate-y-36 sm:-translate-y-44 shadow-2xl opacity-100 scale-105 pointer-events-auto' 
            : 'translate-y-0 opacity-0 pointer-events-none'
        ]"
      >
        <div class="w-10 h-1 bg-[#EB899F]/50 rounded-full mb-1"></div>
        
        <div class="w-full flex flex-col items-center space-y-2.5 overflow-y-auto max-h-[280px] sm:max-h-[320px] px-1 scrollbar-none">
          <p class="font-serif-romantic font-bold text-xl sm:text-2xl text-[#6B313C]">
            Happy 4-Monthversarry, sayang.
          </p>

          <p class="font-sans text-xs sm:text-sm text-[#4A1E26] leading-relaxed text-left">
            Seru banget menjalani hubungan dengan kamu, aku senang banget bisa kenal sama kamu dari awal sampai kita jadian, sampai akhirnya kita dikasih waktu 4 bulan bareng.
          </p>

          <p class="font-sans text-xs sm:text-sm text-[#4A1E26] leading-relaxed text-left">
            Bukan waktu yang lama, tapi di waktu itu, hidup terasa lebih bahagia dan sederhana dari sebelumnya, terimakasih ya.
          </p>

          <p class="font-serif-romantic font-bold text-sm sm:text-base text-[#6B313C] text-center pt-1">
            "I Love us, more than words can be expressed."
          </p>
        </div>

        <!-- Button to Continue -->
        <div class="pt-3 w-full border-t border-[#F8ECE6] flex items-center justify-center">
          <button
            @click.stop="handleContinue"
            class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6B313C] hover:bg-[#53242D] text-white text-xs font-sans font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Buka Cerita Kita</span>
            <ChevronRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Envelope Front Flap Top (Opens 180 degrees upwards) -->
      <div 
        class="absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-700 ease-in-out"
        :style="{
          transform: isOpened ? 'rotateX(180deg)' : 'rotateX(0deg)',
          zIndex: isOpened ? 5 : 25
        }"
      >
        <svg viewBox="0 0 400 180" class="w-full h-full filter drop-shadow-sm">
          <polygon points="0,0 400,0 200,160" fill="#FDF9F7" stroke="#EEC1AD" stroke-width="1.5" />
        </svg>
      </div>

      <!-- Front Details & Stamps on the envelope body -->
      <div class="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-between">
        <!-- Top Row: Stamps & Note (Fades out when opened so it never overlaps the letter) -->
        <div 
          :class="[
            'flex items-start justify-between transition-opacity duration-500',
            isOpened ? 'opacity-0' : 'opacity-100'
          ]"
        >
          <!-- Cupid Stamp in Rose Wine -->
          <div class="flex flex-col items-start transform -rotate-6">
            <div class="w-14 h-16 border-2 border-dashed border-[#A45F6F]/60 rounded-md p-1 bg-white/90 flex flex-col items-center justify-center text-center">
              <svg viewBox="0 0 24 24" class="w-8 h-8 text-[#A45F6F]">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="text-[8px] font-mono tracking-tighter text-[#6B313C] font-bold">LOVE 23</span>
            </div>
          </div>

          <!-- Handwritten Note on Envelope -->
          <div class="text-right">
            <p class="font-serif-romantic font-bold text-xl sm:text-2xl text-[#6B313C]">
              Hey, Aiii!
            </p>
            <p class="font-sans text-xs sm:text-sm text-[#A45F6F] font-medium">
              A 4-Monthversary Letter.
            </p>
          </div>
        </div>

        <!-- Bottom Row: Postal Stamp & Flower -->
        <div 
          :class="[
            'flex items-end justify-between transition-opacity duration-500',
            isOpened ? 'opacity-30' : 'opacity-100'
          ]"
        >
          <div class="bg-white/90 border border-[#EEC1AD] rounded-full px-3 py-1 transform -rotate-3">
            <span class="font-mono text-[9px] uppercase tracking-widest text-[#6B313C] font-semibold">
              ★ OFFICIAL LOVE ISSUE ★
            </span>
          </div>

          <!-- Rose Sticker -->
          <div class="transform rotate-6 bg-white/90 p-2 rounded-xl shadow-2xs border border-[#EEC1AD] flex items-center gap-1.5">
            <span class="text-lg">🌺</span>
            <span class="font-sans text-xs font-semibold text-[#A45F6F]">Forever & Always</span>
          </div>
        </div>
      </div>

      <!-- Center Wax Seal (Deep Maroon 3D Seal) -->
      <div 
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        :class="{ 'opacity-0 scale-75 pointer-events-none transition-all duration-300': isOpened }"
      >
        <button
          type="button"
          @click.stop="openEnvelope"
          class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group-hover:rotate-6"
          :class="{ 'animate-wiggle': !isOpened }"
          title="Click to break wax seal"
        >
          <!-- Embossed Heart in Wax -->
          <div class="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <Heart class="w-8 h-8 sm:w-10 sm:h-10 text-[#4A1E26] fill-[#4A1E26] opacity-60 absolute translate-x-0.5 translate-y-0.5" />
            <Heart class="w-8 h-8 sm:w-10 sm:h-10 text-[#F8ECE6] fill-[#F8ECE6] opacity-95 drop-shadow-xs" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
