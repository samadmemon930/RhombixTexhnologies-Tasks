const songs = [
  {
    name: "Pop Vibes",
    src: "songs/song-1.mp3",
    category: "pop",
    cover: "https://picsum.photos/300?1"
  },
  {
    name: "Rock Energy",
    src: "songs/song-2.mp3",
    category: "rock",
    cover: "https://picsum.photos/300?2"
  },
  {
    name: "Sad Melody",
    src: "songs/song-3.mp3",
    category: "sad",
    cover: "https://picsum.photos/300?3"
  }
];

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const categoryText = document.getElementById("category");
const cover = document.getElementById("cover");

let currentSong = 0;
let isPlaying = false;
let filteredSongs = [...songs];

function loadPlaylist(list) {
  playlist.innerHTML = "";
  list.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => playSong(index, true);
    playlist.appendChild(li);
  });
}

function playSong(index, forcePlay = false) {
  currentSong = index;
  const song = filteredSongs[index];

  audio.src = song.src;
  title.textContent = song.name;
  categoryText.textContent = song.category.toUpperCase();
  cover.src = song.cover;

  if (forcePlay) {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
  }
}

/* Play / Pause */
playBtn.onclick = () => {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
};

/* Skip */
nextBtn.onclick = () => {
  currentSong = (currentSong + 1) % filteredSongs.length;
  playSong(currentSong, true);
};

prevBtn.onclick = () => {
  currentSong = (currentSong - 1 + filteredSongs.length) % filteredSongs.length;
  playSong(currentSong, true);
};

/* Search + Category */
function applyFilters() {
  const searchValue = search.value.toLowerCase();
  const categoryValue = filter.value;

  filteredSongs = songs.filter(song => {
    const matchSearch = song.name.toLowerCase().includes(searchValue);
    const matchCategory =
      categoryValue === "all" || song.category === categoryValue;

    return matchSearch && matchCategory;
  });

  loadPlaylist(filteredSongs);
}

search.oninput = applyFilters;
filter.onchange = applyFilters;

/* Volume */
volume.oninput = () => {
  audio.volume = volume.value;
};

/* Progress */
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

/* Initial Load */
applyFilters();
playSong(0); // Pop Vibes auto load (sound needs click)
