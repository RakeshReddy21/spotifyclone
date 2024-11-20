const url = "https://spotifyclone-iztn.onrender.com/posts"; // Local API URL
// const url = "https://raw.githubusercontent.com/RakeshReddy21/spotify/main/db.json"; // Local API URL

let activeAudioPlayer = null;
let tracksData = []

async function fetchPlaylist() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    tracksData = data[0].items;
    displayPlaylistItems(data[0].items);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayPlaylistItems(tracks) {
  const container = document.getElementById("playlist-container");
  container.innerHTML = ""; // Clear previous content

  tracks.forEach((item) => {
    const track = item.track;

    const card = document.createElement("div");
    card.classList.add("item");

    const img = document.createElement("img");
    img.src = track.album.images[0].url;
    img.alt = track.name;

    const playIcon = document.createElement("div");
    playIcon.classList.add("play");
    playIcon.innerHTML = '<i class="fa fa-play"></i>';

    const trackTitle = document.createElement("h4");
    trackTitle.textContent = track.name;

    const artistName = document.createElement("p");
    artistName.textContent = track.artists[0].name;

    const audioPlayer = document.createElement("audio");
    audioPlayer.classList.add("audio-player");
    audioPlayer.controls = true;

    playIcon.addEventListener("click", () => {
      const previewUrl = track.preview_url;

      if (previewUrl) {
        audioPlayer.src = previewUrl;
        audioPlayer.play();

        if (activeAudioPlayer && activeAudioPlayer !== audioPlayer) {
          activeAudioPlayer.pause();
          activeAudioPlayer.style.display = "none";
        }

        if (
          audioPlayer.style.display === "none" ||
          audioPlayer.style.display === ""
        ) {
          audioPlayer.style.display = "block";
          activeAudioPlayer = audioPlayer;
        } else {
          audioPlayer.style.display = "none";
          activeAudioPlayer = null;
        }
      } else {
        alert("No preview available for this track.");
      }

      card.style.minWidth="200px"
      card.style.Height = "100px"
    });

    card.appendChild(img);
    card.appendChild(playIcon);
    card.appendChild(trackTitle);
    card.appendChild(artistName);
    card.appendChild(audioPlayer);

    container.appendChild(card);
  });
}

function filterPlaylist() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredTracks = tracksData.filter((item) =>
      item.track.name.toLowerCase().includes(searchTerm) ||
      item.track.artists[0].name.toLowerCase().includes(searchTerm)
    );
    displayPlaylistItems(filteredTracks);
}


fetchPlaylist();


  