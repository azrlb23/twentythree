<script setup>
import { ref, onMounted, watch } from 'vue'
import IntroScreen from './components/IntroScreen.vue'
import WordUnlockPuzzle from './components/WordUnlockPuzzle.vue'
import SealedEnvelope from './components/SealedEnvelope.vue'
import LivingCounter from './components/LivingCounter.vue'
import StoryBoardCard from './components/StoryBoardCard.vue'
import JourneyTimeline from './components/JourneyTimeline.vue'
import MusicGallery from './components/MusicGallery.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import { Heart } from 'lucide-vue-next'
import { useYouTube } from './composables/useYouTube.js'

// Stage flow: intro -> puzzle -> envelope -> counter -> letter -> journey -> mixtape
const currentStage = ref('intro')
const hearts = ref([])

// Global state from composable
const { initYouTubeAPI, isPlaying, togglePlay } = useYouTube()

onMounted(() => {
  initYouTubeAPI()
})

watch(currentStage, (newStage) => {
  if (newStage === 'puzzle' && !isPlaying.value) {
    togglePlay()
  }
})

const resetFlow = () => {
  currentStage.value = 'intro'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Click anywhere to spawn a floating heart in Sage Green
const spawnHeart = (e) => {
  const heart = {
    id: Date.now() + Math.random(),
    x: e.clientX,
    y: e.clientY
  }
  hearts.value.push(heart)
  setTimeout(() => {
    hearts.value = hearts.value.filter(h => h.id !== heart.id)
  }, 1000)
}
</script>

<template>
  <div 
    @click="spawnHeart"
    class="min-h-screen w-full bg-washi-journal text-[#EEC1AD] relative selection:bg-[#6B313C] selection:text-[#F3DDD3] flex flex-col justify-center overflow-x-hidden"
  >

    <!-- Organic Leaf / Botanical Doodles (Fixed Background Accents) -->
    <div class="fixed top-8 left-4 w-16 h-28 pointer-events-none opacity-20 text-[#A45F6F] z-0 hidden sm:block">
      <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <path d="M30 90 Q30 50 15 20 M15 20 Q25 25 30 40 M28 45 Q40 35 45 48 M25 60 Q12 55 18 70 M27 75 Q38 68 40 82" />
      </svg>
    </div>

    <div class="fixed bottom-10 right-6 w-20 h-28 pointer-events-none opacity-15 text-[#A45F6F] z-0 hidden sm:block">
      <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <path d="M30 10 Q30 50 45 80 M45 80 Q35 75 30 60 M32 55 Q20 65 15 52 M35 40 Q48 45 42 30 M33 25 Q22 32 20 18" />
      </svg>
    </div>

    <!-- Floating Hearts on Click in Orchid Pink -->
    <div 
      v-for="h in hearts" 
      :key="h.id" 
      class="fixed pointer-events-none z-50 text-[#EB899F] animate-float"
      :style="{ left: `${h.x - 10}px`, top: `${h.y - 10}px` }"
    >
      <Heart class="w-5 h-5 fill-current opacity-80" />
    </div>

    <!-- MAIN LOADING STAGES (Divided into separate aesthetic pages) -->
    <main class="w-full flex-1 flex flex-col items-center justify-center">
      <Transition name="page-fade" mode="out-in">
        <!-- STAGE 0: INTRO SCREEN (twentythree + Nailong) -->
        <section v-if="currentStage === 'intro'" key="intro" class="w-full">
          <IntroScreen @enter="currentStage = 'puzzle'" />
        </section>

        <!-- STAGE 1: PUZZLE LOCK SCREEN (A - I - I - I) -->
        <section v-else-if="currentStage === 'puzzle'" key="puzzle" class="w-full min-h-[80vh] flex items-center justify-center">
          <WordUnlockPuzzle @unlocked="currentStage = 'envelope'" />
        </section>

        <!-- STAGE 2: SEALED ENVELOPE (Olive Wax Seal) -->
        <section v-else-if="currentStage === 'envelope'" key="envelope" class="w-full min-h-[80vh] flex items-center justify-center">
          <SealedEnvelope @opened="currentStage = 'counter'" />
        </section>

        <!-- STAGE 3: LIVING COUNTER -->
        <section v-else-if="currentStage === 'counter'" key="counter" class="w-full">
          <LivingCounter @next="currentStage = 'letter'" />
        </section>

        <!-- STAGE 4: STORY BOARD AESTHETIC CARD (Reference Layout) -->
        <section v-else-if="currentStage === 'letter'" key="letter" class="w-full">
          <StoryBoardCard 
            @next="currentStage = 'mixtape'"
          />
        </section>

        <!-- STAGE 5: THE JOURNEY TIMELINE & REPLAY (FINAL SECTION) -->
        <section v-else-if="currentStage === 'journey'" key="journey" class="w-full">
          <JourneyTimeline @next="currentStage = 'mixtape'" />
        </section>

        <!-- STAGE 6: MUSIC GALLERY MIXTAPE (GRAND FINALE) -->
        <section v-else-if="currentStage === 'mixtape'" key="mixtape" class="w-full">
          <MusicGallery 
            @replay="resetFlow" 
          />
        </section>
      </Transition>
    </main>

    <!-- GLOBAL MUSIC PLAYER COMPONENT (Floating) -->
    <!-- It shows unless we are in the mixtape stage where it's replaced by the big gallery -->
    <MusicPlayer v-if="currentStage !== 'mixtape'" />

    <!-- GLOBAL YOUTUBE HIDDEN PLAYER CONTAINER -->
    <div id="youtube-global-player" class="absolute w-0 h-0 opacity-0 pointer-events-none"></div>
  </div>
</template>

<style scoped>
.page-fade-enter-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-leave-active {
  transition: opacity 0.3s ease-in,
              transform 0.3s ease-in,
              filter 0.3s ease-in;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(6px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.99);
  filter: blur(4px);
}
</style>
