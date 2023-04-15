document.addEventListener("DOMContentLoaded", async () => {
  const video = document.getElementById("bg-video");

  try {
    await video.play();
  } catch (e) {
    setTimeout(() => {
      video.play();
    }, 1000);
  }

  const audioElements = document.querySelectorAll("audio");
  let currentSongIndex = 0;

  const playSong = (index) => {
    const a = audioElements[index];
    a.currentTime = 0;
    a.play();

    a.onended = () => {
      currentSongIndex++;
      if (currentSongIndex < audioElements.length) {
        playSong(currentSongIndex);
      }
    };
  };

  document.getElementById("play-me").addEventListener("click", () => {
    playSong(currentSongIndex);
  });

  const allAudioLoaded = () =>
    Array.from(audioElements).every((audio) => audio.loaded);

  const onAllAudioLoaded = () => {
    setTimeout(() => {
      document.body.classList.add("playable");
      document.getElementById("play-me").innerHTML = "❤️";

      document.getElementById("play-me").addEventListener("click", () => {
        document.body.classList.add("playing");
      });
    }, 3000);
  };

  audioElements.forEach((audio) => {
    audio.loaded = false;

    audio.addEventListener("canplaythrough", function () {
      this.loaded = true;

      if (allAudioLoaded()) {
        onAllAudioLoaded();
      }
    });
  });
});