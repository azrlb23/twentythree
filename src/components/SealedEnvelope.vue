<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['opened'])

const isOpened = ref(false)
const isBreaking = ref(false)

const openEnvelope = () => {
  if (isOpened.value) return
  isBreaking.value = true

  // Confetti on opening wax seal in Sage Green & White tones
  confetti({
    particleCount: 55,
    angle: 60,
    spread: 55,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#8da871', '#a3be87', '#556b2f', '#eef3e8', '#ffffff']
  })

  // Smooth opening sequence
  setTimeout(() => {
    isOpened.value = true
    setTimeout(() => {
      emit('opened')
    }, 2200)
  }, 350)
}
</script>

<template>
  <div class="relative w-full max-w-lg mx-auto pt-24 pb-12 px-4 flex flex-col items-center select-none">
    <!-- Subtitle instruction -->
    <div class="text-center mb-6">
      <p class="font-sans text-xs sm:text-sm text-[#556b2f] font-medium flex items-center justify-center gap-1.5">
        <Sparkles class="w-4 h-4 text-[#8da871]" />
        {{ isOpened ? 'Opening your letter...' : 'Tap the olive wax seal to break the seal & open!' }}
      </p>
    </div>

    <!-- Envelope Container -->
    <div 
      @click="openEnvelope"
      :class="[
        'relative w-full aspect-[4/3] max-w-[420px] cursor-pointer select-none transition-all duration-700 perspective-[1000px] group',
        isOpened ? 'scale-105' : 'hover:scale-[1.02]'
      ]"
    >
      <!-- Base Envelope Back & Body (Behind letter) -->
      <div class="absolute inset-0 bg-[#fbfbf7] rounded-2xl shadow-aesthetic border border-[#d5e0cb] overflow-hidden z-0">
        <!-- Inner Pattern Lining in Sage -->
        <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#8da871_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <!-- Envelope Flap (Bottom Triangles) -->
        <div class="absolute bottom-0 inset-x-0 h-1/2 flex">
          <div class="w-1/2 h-full bg-[#f3f6ee] border-t border-r border-[#d5e0cb] transform origin-bottom-left skew-y-12"></div>
          <div class="w-1/2 h-full bg-[#f3f6ee] border-t border-l border-[#d5e0cb] transform origin-bottom-right -skew-y-12"></div>
        </div>
      </div>

      <!-- Letter Content (Slides up cleanly ABOVE envelope when opened) -->
      <div 
        :class="[
          'absolute inset-x-6 top-8 bottom-6 bg-white rounded-2xl p-6 shadow-md border border-[#e2ecd8] flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out',
          isOpened 
            ? '-translate-y-32 sm:-translate-y-36 shadow-2xl opacity-100 z-30 scale-105' 
            : 'translate-y-0 opacity-0 z-10 pointer-events-none'
        ]"
      >
        <div class="w-10 h-1 bg-[#8da871]/30 rounded-full mb-3"></div>
        <p class="font-serif-romantic font-bold text-2xl sm:text-3xl text-[#283618] mb-1">My Dearest Aiii,</p>
        <p class="font-sans text-xs sm:text-sm text-[#475b36] leading-relaxed max-w-xs">
          "Every day with you is my favorite chapter. Let's look back at our little universe..."
        </p>
        <div class="mt-3 inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#8da871]">
          <span>Unfolding your memories</span>
          <Heart class="w-3.5 h-3.5 fill-current animate-bounce" />
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
          <polygon points="0,0 400,0 200,160" fill="#fbfbf7" stroke="#d5e0cb" stroke-width="1.5" />
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
          <!-- Cupid Stamp in Sage Green -->
          <div class="flex flex-col items-start transform -rotate-6">
            <div class="w-14 h-16 border-2 border-dashed border-[#8da871]/60 rounded-md p-1 bg-white/80 flex flex-col items-center justify-center text-center">
              <svg viewBox="0 0 24 24" class="w-8 h-8 text-[#8da871]">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="text-[8px] font-mono tracking-tighter text-[#283618] font-bold">LOVE 23</span>
            </div>
          </div>

          <!-- Handwritten Note on Envelope -->
          <div class="text-right">
            <p class="font-serif-romantic font-bold text-xl sm:text-2xl text-[#283618]">
              Hey, Aiii!
            </p>
            <p class="font-sans text-xs sm:text-sm text-[#657e4e] font-medium">
              This letter is for you.
            </p>
          </div>
        </div>

        <!-- Bottom Row: Postal Stamp & Rose Bouquet -->
        <div 
          :class="[
            'flex items-end justify-between transition-opacity duration-500',
            isOpened ? 'opacity-40' : 'opacity-100'
          ]"
        >
          <div class="bg-white/90 border border-[#8da871]/40 rounded-full px-3 py-1 transform -rotate-3">
            <span class="font-mono text-[9px] uppercase tracking-widest text-[#283618] font-semibold">
              ★ OFFICIAL LOVE ISSUE ★
            </span>
          </div>

          <!-- Bouquet Sticker -->
          <div class="transform rotate-6 bg-white/90 p-2 rounded-xl shadow-2xs border border-[#d5e0cb] flex items-center gap-1.5">
            <span class="text-lg">🌿</span>
            <span class="font-sans text-xs font-semibold text-[#556b2f]">Forever & Always</span>
          </div>
        </div>
      </div>

      <!-- Center Wax Seal (Olive Green 3D Seal) -->
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
            <Heart class="w-8 h-8 sm:w-10 sm:h-10 text-[#1f2913] fill-[#1f2913] opacity-50 absolute translate-x-0.5 translate-y-0.5" />
            <Heart class="w-8 h-8 sm:w-10 sm:h-10 text-[#eaf0e4] fill-[#eaf0e4] opacity-95 drop-shadow-xs" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
