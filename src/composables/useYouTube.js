import { ref, computed, watch } from 'vue'

const ytPlayer = ref(null)
const isPlaying = ref(false)
const progress = ref(0)
const ytReady = ref(false)
let progressInterval = null

// Songs data with YouTube IDs
export const songs = [
  {
    id: 1,
    title: 'Berapa Kali Kita Akan Saling Memaafkan',
    artist: 'Pamungkas',
    localCover: 'https://img.youtube.com/vi/WhEUZrB2Osc/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    youtubeId: 'WhEUZrB2Osc'
  },
  {
    id: 2,
    title: 'Ini Abadi',
    artist: 'Perunggu',
    localCover: 'https://img.youtube.com/vi/qQDaxjLReck/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80',
    youtubeId: 'qQDaxjLReck'
  },
  {
    id: 3,
    title: 'Ekspektasi',
    artist: 'Raim Laode',
    localCover: 'https://img.youtube.com/vi/69z_rxOOpCw/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=400&q=80',
    youtubeId: '69z_rxOOpCw'
  },
  {
    id: 4,
    title: 'Ah',
    artist: 'Nadin Amizah',
    localCover: 'https://img.youtube.com/vi/3rf16_Q77WQ/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
    youtubeId: '3rf16_Q77WQ'
  },
  {
    id: 5,
    title: 'Bayangkan Jika Kita Tidak Menyerah',
    artist: 'Hindia',
    localCover: 'https://img.youtube.com/vi/rSTO0VrV38Y/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    youtubeId: 'rSTO0VrV38Y'
  },
  {
    id: 6,
    title: 'Foto Kita Blur',
    artist: 'Sal Priadi',
    localCover: 'https://img.youtube.com/vi/EcinyjC2Lf0/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    youtubeId: 'EcinyjC2Lf0'
  },
  {
    id: 7,
    title: 'Kita Usahakan Rumah Itu',
    artist: 'Sal Priadi',
    localCover: 'https://img.youtube.com/vi/tZq3MHDv2Ns/hqdefault.jpg',
    fallbackCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    youtubeId: 'tZq3MHDv2Ns'
  }
]

export const activeIdx = ref(0)
export const currentSong = computed(() => songs[activeIdx.value])

const startProgressTracking = () => {
  if (progressInterval) clearInterval(progressInterval)
  progressInterval = setInterval(() => {
    if (ytPlayer.value && ytPlayer.value.getCurrentTime) {
      const currentTime = ytPlayer.value.getCurrentTime()
      const duration = ytPlayer.value.getDuration()
      if (duration > 0) {
        progress.value = (currentTime / duration) * 100
      }
    }
  }, 500)
}

const stopProgressTracking = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

export const nextSong = () => {
  activeIdx.value = (activeIdx.value + 1) % songs.length
}

export const prevSong = () => {
  activeIdx.value = (activeIdx.value - 1 + songs.length) % songs.length
}

export const selectSong = (idx) => {
  activeIdx.value = idx
}

export const togglePlay = () => {
  if (!ytPlayer.value) return
  if (isPlaying.value) {
    ytPlayer.value.pauseVideo()
  } else {
    ytPlayer.value.playVideo()
  }
}

const onPlayerStateChange = (event) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true
    startProgressTracking()
  } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.CUED) {
    isPlaying.value = false
    stopProgressTracking()
  } else if (event.data === window.YT.PlayerState.ENDED) {
    isPlaying.value = false
    stopProgressTracking()
    nextSong()
  }
}

const createPlayer = () => {
  ytPlayer.value = new window.YT.Player('youtube-global-player', {
    height: '0',
    width: '0',
    videoId: songs[activeIdx.value].youtubeId,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'rel': 0
    },
    events: {
      'onReady': () => { ytReady.value = true },
      'onStateChange': onPlayerStateChange
    }
  })
}

export const initYouTubeAPI = () => {
  if (ytPlayer.value || ytReady.value) return

  if (window.YT && window.YT.Player) {
    createPlayer()
    return
  }

  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  if (firstScriptTag) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  } else {
    document.head.appendChild(tag)
  }

  window.onYouTubeIframeAPIReady = () => {
    createPlayer()
  }
}

// Watch for song changes to load new YouTube video
watch(activeIdx, (newIdx) => {
  if (ytPlayer.value && ytPlayer.value.loadVideoById) {
    progress.value = 0
    if (isPlaying.value) {
      ytPlayer.value.loadVideoById(songs[newIdx].youtubeId)
    } else {
      ytPlayer.value.cueVideoById(songs[newIdx].youtubeId)
    }
  }
})

export const seekTo = (percent) => {
  if (ytPlayer.value && ytPlayer.value.getDuration) {
    const duration = ytPlayer.value.getDuration()
    const time = (percent / 100) * duration
    ytPlayer.value.seekTo(time, true)
    progress.value = percent
  }
}

export const useYouTube = () => {
  return {
    songs,
    activeIdx,
    currentSong,
    isPlaying,
    progress,
    ytReady,
    initYouTubeAPI,
    togglePlay,
    nextSong,
    prevSong,
    selectSong,
    seekTo
  }
}
