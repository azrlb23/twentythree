<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'
import { Sparkles, Lock, Unlock, HelpCircle, Heart, Delete, RotateCcw } from 'lucide-vue-next'

const emit = defineEmits(['unlocked'])

const TARGET_WORD = 'AIII'
const inputLetters = ref([]) // array of characters, max length 4
const isUnlocked = ref(false)
const isShaking = ref(false)
const showHint = ref(true)

const alphabetRows = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['G', 'H', 'I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X'],
  ['Y', 'Z']
]

const currentInputWord = computed(() => inputLetters.value.join(''))

const isCorrect = computed(() => {
  return currentInputWord.value.toUpperCase() === TARGET_WORD
})

const isFilled = computed(() => {
  return inputLetters.value.length === 4
})

const handleAddLetter = (letter) => {
  if (inputLetters.value.length < 4 && !isUnlocked.value) {
    inputLetters.value.push(letter.toUpperCase())

    // Auto-check if filled
    if (inputLetters.value.length === 4) {
      if (!isCorrect.value) {
        // Trigger gentle shake for incorrect password
        isShaking.value = true
        setTimeout(() => {
          isShaking.value = false
        }, 500)
      }
    }
  }
}

const handleBackspace = () => {
  if (inputLetters.value.length > 0 && !isUnlocked.value) {
    inputLetters.value.pop()
  }
}

const handleClear = () => {
  inputLetters.value = []
}

const handleUnlock = () => {
  if (!isCorrect.value) return

  isUnlocked.value = true

  // Heart confetti celebration
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.5 },
    colors: ['#db3c8a', '#f29ebd', '#e11d48', '#ffffff', '#ffd1dc']
  })

  // Smooth seamless transition
  setTimeout(() => {
    emit('unlocked')
  }, 300)
}

// Auto solve / reveal button
const autoSolve = () => {
  inputLetters.value = TARGET_WORD.split('')
}

// Keyboard input support
const handleKeydown = (e) => {
  if (isUnlocked.value) return

  const key = e.key.toUpperCase()
  if (/^[A-Z]$/.test(key)) {
    handleAddLetter(key)
  } else if (e.key === 'Backspace') {
    handleBackspace()
  } else if (e.key === 'Enter' && isCorrect.value) {
    handleUnlock()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative w-full max-w-md md:max-w-4xl mx-auto p-4 sm:p-6 flex flex-col items-center">
    
    <!-- DESKTOP 2-COLUMN GRID / MOBILE VERTICAL STACK -->
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
      
      <!-- COLUMN 1: HEADER, 4-SLOT PIN DISPLAY, OPEN BUTTON & HINT -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <!-- Header Title -->
        <div class="mb-5">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-serif-romantic font-bold tracking-tight text-[#283618]">
            Enter The Secret Password
          </h2>
          <p class="font-sans text-xs sm:text-sm text-[#657e4e] mt-1 font-medium">
            Spell out the special 4-letter nickname to unlock
          </p>
        </div>

        <!-- 4-Slot PIN Display -->
        <div 
          :class="[
            'flex items-center justify-center gap-3 mb-6 transition-transform duration-200',
            isShaking ? 'animate-wiggle scale-105' : ''
          ]"
        >
          <div 
            v-for="index in 4" 
            :key="index"
            :class="[
              'w-13 h-15 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-serif-romantic font-black transition-all duration-200 shadow-sm select-none',
              inputLetters[index - 1]
                ? (isCorrect ? 'bg-[#eef3e8] text-[#283618] border-2 border-[#8da871] scale-105' : 'bg-white text-[#283618] border-2 border-[#8da871]/60')
                : (inputLetters.length === index - 1 ? 'bg-white border-2 border-[#8da871] ring-2 ring-[#8da871]/20' : 'bg-white/80 border border-[#d5e0cb]')
            ]"
          >
            <span v-if="inputLetters[index - 1]" class="animate-scale-in">
              {{ inputLetters[index - 1] }}
            </span>
            <span v-else class="w-2.5 h-2.5 rounded-full bg-[#8da871]/30"></span>
          </div>
        </div>

        <!-- OPEN / UNLOCK Action Button -->
        <button
          @click="handleUnlock"
          :disabled="!isCorrect"
          :class="[
            'relative w-full sm:w-auto px-10 py-3 rounded-full font-sans font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors duration-200 cursor-pointer mb-6 shadow-sm',
            isCorrect 
              ? 'bg-[#8da871] hover:bg-[#728d58] text-white shadow-aesthetic active:scale-98' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          ]"
        >
          <span class="flex items-center justify-center gap-2">
            <component :is="isCorrect ? Unlock : Lock" class="w-4 h-4" />
            {{ isCorrect ? 'CLICK TO OPEN' : 'ENTER PASSWORD' }}
          </span>
        </button>

        <!-- Hint Bar -->
        <div 
          v-if="showHint"
          class="w-full bg-[#283618] text-white rounded-2xl py-2.5 px-4 shadow-sm text-center md:text-left flex items-center justify-center md:justify-start gap-2 text-xs font-sans font-medium tracking-wide"
        >
          <HelpCircle class="w-4 h-4 shrink-0 text-[#8da871]" />
          <span>Hint: Her sweetest nickname &mdash; <strong>A - I - I - I</strong></span>
        </div>
      </div>

      <!-- COLUMN 2: LETTER GRID PAPER SHEET WITH KEYPAD -->
      <div class="flex justify-center w-full">
        <div class="relative w-full max-w-sm bg-white border border-[#d5e0cb] rounded-3xl p-5 sm:p-6 shadow-polaroid paper-grid">
          <!-- Paperclip Decoration at Top Right -->
          <div class="absolute -top-3 right-8 w-7 h-11 pointer-events-none z-10 drop-shadow-sm">
            <svg viewBox="0 0 24 40" fill="none" class="w-full h-full text-[#9ca3af]">
              <path d="M7 10V28C7 32.4183 10.5817 36 15 36C19.4183 36 23 32.4183 23 28V6C23 2.68629 20.3137 0 17 0C13.6863 0 11 2.68629 11 6V28C11 30.2091 12.7909 32 15 32C17.2091 32 19 30.2091 19 28V10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          </div>

          <!-- Cute Heart Stickers in Corners -->
          <div class="absolute -bottom-2 -left-2 text-[#8da871] opacity-80 pointer-events-none">
            <Heart class="w-5 h-5 fill-current transform -rotate-12" />
          </div>

          <!-- Alphabet Keypad Grid -->
          <div class="grid grid-rows-5 gap-y-2 py-1">
            <div 
              v-for="(row, rIdx) in alphabetRows" 
              :key="rIdx" 
              class="flex justify-center items-center gap-2 sm:gap-3"
            >
              <button
                v-for="letter in row"
                :key="letter"
                @click="handleAddLetter(letter)"
                class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-[#eaf0e4] hover:border-[#8da871] border border-[#d5e0cb] flex items-center justify-center font-sans text-sm sm:text-base font-bold text-[#283618] transition-all duration-150 active:scale-90 cursor-pointer shadow-2xs select-none"
              >
                {{ letter }}
              </button>
            </div>
          </div>

          <!-- Control Bar: Backspace & Clear & Reveal -->
          <div class="mt-4 pt-3 border-t border-[#d5e0cb] flex items-center justify-between text-xs">
            <button 
              @click="handleClear"
              :disabled="inputLetters.length === 0"
              class="inline-flex items-center gap-1 text-[#657e4e] hover:text-[#283618] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-medium"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button 
              @click="autoSolve" 
              class="text-[11px] text-[#8da871] hover:text-[#556b2f] underline cursor-pointer font-medium"
            >
              Reveal: A I I I
            </button>

            <button 
              @click="handleBackspace"
              :disabled="inputLetters.length === 0"
              class="inline-flex items-center gap-1 text-[#657e4e] hover:text-[#283618] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-medium"
            >
              <Delete class="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
