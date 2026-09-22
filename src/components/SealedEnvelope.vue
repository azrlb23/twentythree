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

  // Confetti on opening wax seal in romantic colors
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 60,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#6B313C', '#EB899F', '#ffffff', '#ffccd5']
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
    <!-- Envelope Container -->
    <div 
      @click="!isOpened && openEnvelope()"
      :class="[
        'relative w-full aspect-[4/3] max-w-[440px] select-none transition-all duration-700 perspective-[1000px] group',
        isOpened ? 'scale-100 cursor-default' : 'cursor-pointer hover:scale-[1.02]'
      ]"
    >
      <!-- LAYER 1: Envelope Back (Inside the pocket) -->
      <div class="absolute inset-0 bg-[#E5E5E5] rounded-sm shadow-md overflow-hidden z-0 border border-gray-300">
        <!-- Inner Pattern Lining for a premium feel -->
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#6B313C_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
      </div>

      <!-- LAYER 2: The Letter (Paper) -->
      <!-- We place it slightly inset so it fits inside the envelope pocket -->
      <div 
        :class="[
          'absolute inset-x-2 sm:inset-x-3 top-2 bottom-2 bg-[#FFFEF9] rounded-sm p-5 sm:p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out z-10',
          isOpened 
            ? '-translate-y-40 sm:-translate-y-48 opacity-100 scale-100 pointer-events-auto' 
            : 'translate-y-0 opacity-0 scale-95 pointer-events-none'
        ]"
      >
        <!-- Realistic paper texture overlay -->
        <div class="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply rounded-sm" style="background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');"></div>

        <div class="w-full flex flex-col items-center space-y-3 overflow-y-auto max-h-[300px] sm:max-h-[340px] px-2 scrollbar-none relative z-10 mt-1">
          <p class="font-script font-bold text-2xl sm:text-3xl text-[#6B313C] tracking-wide mt-2">
            Happy 5-Monthversary, sayang.
          </p>

          <p class="font-caveat text-xl sm:text-2xl text-gray-800 leading-relaxed text-left">
            Perjalanan bareng kamu selalu jadi salah satu hal terbaik yang pernah hadir di hidupku. Dari pertama kali kita kenal, sampai akhirnya kita dikasih ruang dan waktu untuk saling menjaga selama ini.
          </p>

          <p class="font-caveat text-xl sm:text-2xl text-gray-800 leading-relaxed text-left">
            Waktu mungkin terus berjalan, tapi tiap detik yang kita lewati bareng selalu berhasil bikin semuanya terasa lebih hangat dan berharga. Terima kasih sudah mengajari aku arti bahagia yang sederhana.
          </p>

          <p class="font-script font-bold text-xl sm:text-2xl text-[#6B313C] text-center pt-3">
            "I love us, more than any words can ever describe."
          </p>
        </div>

        <!-- Button to Continue -->
        <div class="pt-4 w-full border-t border-gray-200 mt-2 flex items-center justify-center relative z-10">
          <button
            @click.stop="handleContinue"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-[#6B313C] hover:bg-[#A45F6F] text-white shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- LAYER 3: Envelope Bottom & Side Flaps (Front Cover) -->
      <!-- We use SVGs to create realistic intersecting folds of a white envelope -->
      <div class="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-sm drop-shadow-sm">
        <svg viewBox="0 0 400 300" class="w-full h-full" preserveAspectRatio="none">
          <!-- Left flap -->
          <polygon points="0,0 200,160 0,300" fill="#F4F4F4" stroke="#E5E5E5" stroke-width="1" stroke-linejoin="round" />
          <!-- Right flap -->
          <polygon points="400,0 200,160 400,300" fill="#F4F4F4" stroke="#E5E5E5" stroke-width="1" stroke-linejoin="round" />
          <!-- Bottom flap (overlaps sides slightly) -->
          <polygon points="0,300 200,160 400,300" fill="#FAFAFA" stroke="#E5E5E5" stroke-width="1" stroke-linejoin="round" />
        </svg>

        <!-- Front Details & Stamps -->
        <div class="absolute inset-0 p-6 flex flex-col justify-between">
          <div class="flex items-end justify-between transition-opacity duration-500 w-full h-full pb-2" :class="isOpened ? 'opacity-0' : 'opacity-100'">
            
            <div class="bg-white/80 border border-gray-300 rounded-sm px-2 py-1 transform -rotate-3 backdrop-blur-sm shadow-sm">
              <span class="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                VIA AIR MAIL
              </span>
            </div>

            <!-- Fake postal stamp -->
            <div class="transform rotate-3 bg-white p-1 rounded-sm shadow-sm border border-gray-200 flex flex-col items-center">
              <div class="w-8 h-10 border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                 <Heart class="w-4 h-4 text-[#EB899F] fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LAYER 4: Envelope Top Flap (Opens upwards) -->
      <div 
        class="absolute inset-x-0 top-0 h-[60%] origin-top transition-transform duration-700 ease-in-out"
        :style="{
          transform: isOpened ? 'rotateX(180deg)' : 'rotateX(0deg)',
          zIndex: isOpened ? 5 : 30
        }"
      >
        <svg viewBox="0 0 400 180" class="w-full h-full filter drop-shadow-md" preserveAspectRatio="none">
          <!-- The top flap polygon -->
          <polygon points="0,0 400,0 200,180" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- LAYER 5: Wax Seal (Realistic Maroon Wax) -->
      <div 
        class="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-40"
        :class="{ 'opacity-0 scale-75 pointer-events-none transition-all duration-300': isOpened }"
      >
        <button
          type="button"
          @click.stop="openEnvelope"
          class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group-hover:rotate-3 shadow-lg"
          :class="{ 'animate-wiggle': !isOpened }"
          style="background: radial-gradient(circle at 30% 30%, #8c1c2f 0%, #5c0f1c 80%, #3a0a11 100%); box-shadow: inset 0 0 8px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3);"
          title="Click to break wax seal"
        >
          <!-- Embossed Heart in Wax -->
          <Heart class="w-6 h-6 sm:w-8 sm:h-8 text-[#4A1E26] fill-[#4A1E26] opacity-90 drop-shadow-sm" />
          
          <!-- Outer subtle wax rim -->
          <div class="absolute inset-0 rounded-full border border-[#a62b42] opacity-30"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-wiggle {
  animation: wiggle 3s infinite ease-in-out;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg) scale(1); }
  50% { transform: rotate(3deg) scale(1.02); }
}
</style>
