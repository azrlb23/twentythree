<script setup>
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['enter'])

const letters = 'twentythree'.split('')
const visibleLetters = ref([])
const isReady = ref(false)
const isHovered = ref(false)

// Letter color palette (Sage Green, Forest, and Olive aesthetic tones)
const colors = [
  'text-[#8da871]', // t
  'text-[#657e4e]', // w
  'text-[#283618]', // e
  'text-[#8da871]', // n
  'text-[#556b2f]', // t
  'text-[#3b4c20]', // y
  'text-[#8da871]', // t
  'text-[#657e4e]', // h
  'text-[#283618]', // r
  'text-[#a3be87]', // e
  'text-[#556b2f]'  // e
]

// Playful letter rotations (retained as requested)
const rotations = [
  '-rotate-6', 'rotate-6', '-rotate-3', 'rotate-4', '-rotate-6',
  'rotate-8', '-rotate-4', 'rotate-6', '-rotate-3', 'rotate-6', '-rotate-6'
]

onMounted(() => {
  // Stagger letter appearance smoothly without pop sounds
  letters.forEach((letter, i) => {
    setTimeout(() => {
      visibleLetters.value.push(i)

      if (i === letters.length - 1) {
        setTimeout(() => {
          isReady.value = true
        }, 200)
      }
    }, i * 110 + 150)
  })
})

const handleEnter = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.5 },
    colors: ['#db3c8a', '#f29ebd', '#e11d48', '#facc15', '#ffffff']
  })

  emit('enter')
}
</script>

<template>
  <div class="relative w-full min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none">
    <!-- Cute Nailong (奶龙) Mascot -->
    <div 
      @mouseenter="isHovered = true" 
      @mouseleave="isHovered = false"
      class="relative mb-6 cursor-pointer transform hover:scale-105 transition-transform duration-300"
    >
      <!-- Floating heart balloon above Nailong -->
      <div class="absolute -top-9 left-1/2 -translate-x-1/2">
        <Heart 
          :class="[
            'w-7 h-7 text-[#db3c8a] fill-[#db3c8a] filter drop-shadow-sm transition-transform duration-300',
            isHovered ? 'scale-125 -translate-y-1' : ''
          ]" 
        />
        <div class="w-0.5 h-5 bg-[#db3c8a]/30 mx-auto -mt-0.5"></div>
      </div>

      <!-- Nailong SVG Illustration -->
      <svg viewBox="0 0 140 140" class="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-md">
        <!-- Nailong Two Cute Little Green Horns on Top -->
        <path d="M52 28 C50 18, 56 12, 60 16 C63 19, 60 27, 56 30 Z" fill="#84cc16" stroke="#65a30d" stroke-width="1.5" />
        <path d="M88 28 C90 18, 84 12, 80 16 C77 19, 80 27, 84 30 Z" fill="#84cc16" stroke="#65a30d" stroke-width="1.5" />

        <!-- Nailong Chubby Pear-Shaped Body & Head -->
        <!-- Lower Chubby Belly -->
        <ellipse cx="70" cy="85" rx="46" ry="40" fill="#facc15" stroke="#eab308" stroke-width="2.5" />

        <!-- Upper Head -->
        <ellipse cx="70" cy="54" rx="38" ry="34" fill="#facc15" stroke="#eab308" stroke-width="2.5" />

        <!-- Soft Light Yellow Tummy Patch -->
        <ellipse cx="70" cy="88" rx="30" ry="26" fill="#fef9c3" />

        <!-- Chubby Pink Cheeks -->
        <ellipse cx="44" cy="65" rx="7" ry="5" fill="#fb7185" opacity="0.6" />
        <ellipse cx="96" cy="65" rx="7" ry="5" fill="#fb7185" opacity="0.6" />

        <!-- Big Expressive Eyes -->
        <!-- Left Eye -->
        <circle cx="52" cy="52" r="9" fill="#ffffff" stroke="#ca8a04" stroke-width="1" />
        <circle cx="53" cy="52" r="5" fill="#1f2937" />
        <circle cx="55" cy="50" r="2" fill="#ffffff" />

        <!-- Right Eye -->
        <circle cx="88" cy="52" r="9" fill="#ffffff" stroke="#ca8a04" stroke-width="1" />
        <circle cx="87" cy="52" r="5" fill="#1f2937" />
        <circle cx="85" cy="50" r="2" fill="#ffffff" />

        <!-- Cute Smile -->
        <path d="M60 67 Q70 78 80 67" stroke="#713f12" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <!-- Tongue -->
        <path d="M65 72 Q70 78 75 72" fill="#f43f5e" />

        <!-- Tiny Cute Hands holding a red heart -->
        <!-- Stubby Hands -->
        <ellipse cx="40" cy="84" rx="7" ry="6" fill="#facc15" stroke="#eab308" stroke-width="2" />
        <ellipse cx="100" cy="84" rx="7" ry="6" fill="#facc15" stroke="#eab308" stroke-width="2" />

        <!-- Little Red Heart held in hands -->
        <path d="M70 85 C70 80, 64 77, 60 80 C56 77, 50 80, 50 85 C50 91, 70 100, 70 100 C70 100, 90 91, 90 85 C90 80, 84 77, 80 80 C76 77, 70 80, 70 85 Z" 
              fill="#e11d48" transform="translate(14, -7) scale(0.8)" />

        <!-- Cute Feet -->
        <ellipse cx="52" cy="120" rx="10" ry="7" fill="#eab308" />
        <ellipse cx="88" cy="120" rx="10" ry="7" fill="#eab308" />
      </svg>
    </div>

    <!-- Animated Letters: "twentythree" (Same as before) -->
    <div class="relative flex items-center justify-center gap-1 sm:gap-2 my-3 flex-wrap max-w-xl">
      <span
        v-for="(letter, index) in letters"
        :key="index"
        :class="[
          'inline-block font-serif-romantic font-black text-4xl sm:text-6xl md:text-7xl transition-all duration-500 transform cursor-pointer select-none hover:scale-125 hover:rotate-12 active:scale-95',
          colors[index],
          rotations[index],
          visibleLetters.includes(index) 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-50 translate-y-8 pointer-events-none'
        ]"
      >
        {{ letter }}
      </span>
    </div>

    <!-- Bottom Section: Clean Typography in English -->
    <div 
      :class="[
        'transition-all duration-700 ease-out mt-4 space-y-6',
        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      ]"
    >
      <!-- Subtitle -->
      <div>
        <p class="font-sans font-bold text-lg sm:text-xl text-[#283618] tracking-tight">
          Our Special World &middot; 23
        </p>
        <p class="font-sans text-xs sm:text-sm text-[#657e4e] mt-1 tracking-normal font-medium">
          A digital love archive made just for you
        </p>
      </div>

      <!-- Action Love Button (Sage Green) -->
      <div>
        <button
          @click="handleEnter"
          class="group relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8da871] hover:bg-[#728d58] text-white shadow-aesthetic hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer mx-auto"
          title="Love"
          aria-label="Love"
        >
          <Heart class="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white group-hover:scale-110 transition-transform" />
        </button>

        <p class="font-sans text-xs text-[#788a6d] mt-3 font-normal">
          Tap to open
        </p>
      </div>
    </div>
  </div>
</template>
