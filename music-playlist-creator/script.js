const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];
let currShuffleFunc = null;

fetch("./data/data.json")
  .then((data) => data.json())
  .then((jsonData) => {
    const userPlaylists = JSON.parse(
      localStorage.getItem("userPlaylists") || "[]"
    );
    const allPlaylists = [...jsonData, ...userPlaylists];
    if (window.location.href.includes("featured.html")) {
      showFeaturedPlaylist(allPlaylists);
    } else if (window.location.href.includes("edit_playlist.html")) {
      loadEditPlaylist();
    } else {
      createPlaylistCards(allPlaylists);
    }
  })
  .catch((error) => {
    console.log("Error with fetching data", error);
  });

if (window.location.href.includes("edit_playlist.html")) {
  const addSongButton = document.getElementById("add_song_btn");
  const form = document.getElementById("playlistForm");
  const cancelButton = document.getElementById("cancel_btn");

  addSong();
  addSongButton.addEventListener("click", addSong);
  cancelButton.addEventListener("click", cancelPlaylist);
  form.addEventListener("submit", saveEditedPlaylist);
}
if (window.location.href.includes("add_playlist.html")) {
  const addSongButton = document.getElementById("add_song_btn");
  const form = document.getElementById("playlistForm");
  const cancelButton = document.getElementById("cancel_btn");

  addSong();

  addSongButton.addEventListener("click", addSong);
  cancelButton.addEventListener("click", cancelPlaylist);
  form.addEventListener("submit", createPlaylist);
}

function createPlaylist(event) {
  event.preventDefault();
  const playlistName = document.getElementById("playlist_name").value;
  const playlistAuthor = document.getElementById("playlist_author").value;
  const playlistArt = document.getElementById("playlist_art").value;

  const songList = document.querySelectorAll(".song");
  const songs = [];
  songList.forEach((item) => {
    const songName = item.querySelector(".song_name").value;
    const artist = item.querySelector(".artist_name").value;
    const album = item.querySelector(".album_name").value;
    const duration = item.querySelector(".duration").value;
    const art = item.querySelector(".song_art").value;
    songs.push([songName, artist, album, duration, art]);
  });

  const newPlaylist = {
    playlistID: Date.now(),
    playlist_name: playlistName,
    playlist_author: playlistAuthor,
    playlist_art: playlistArt,
    songs: songs,
    like_count: 0,
  };
  const currentPlaylists = JSON.parse(
    localStorage.getItem("userPlaylists") || "[]"
  );
  currentPlaylists.push(newPlaylist);
  localStorage.setItem("userPlaylists", JSON.stringify(currentPlaylists));
  window.location.href = "index.html";
}

function cancelPlaylist() {
  window.location.href = "index.html";
}

function addSong() {
  const container = document.getElementById("songs_section");
  const songDiv = document.createElement("div");
  songDiv.setAttribute("class", "song");
  songDiv.innerHTML = `
    <input type="text" placeholder="Song Name" class="song_name" required>
    <input type="text" placeholder="Artist" class="artist_name" required>
    <input type="text" placeholder="Album" class="album_name" required>
    <input type="text" placeholder="Song duration" class="duration" required>
    <input type="url" placeholder="Album Art URL" class="song_art" required>
    <button type="button" class="remove_song_btn"> Remove Song </button>
    `;

  const removeButton = songDiv.querySelector(".remove_song_btn");
  removeButton.addEventListener("click", function () {
    if (container.children.length > 1) {
      songDiv.remove();
    }
  });
  container.appendChild(songDiv);
}

function showFeaturedPlaylist(data) {
  if (!Array.isArray(data) || data.length === 0) {
    const container = document.querySelector(".featured_container");
    const emptyMessage = document.createElement("h3");
    emptyMessage.innerText = "No playlists available";
    container.appendChild(emptyMessage);
    return;
  }
  // Randomly select playlist
  const randomIndex = Math.floor(Math.random() * data.length);
  const featuredPlaylist = data[randomIndex];

  const container = document.querySelector(".featured_container");
  container.innerHTML = "";

  const imgSection = document.createElement("div");
  imgSection.setAttribute("class", "featured_left");
  const featuredPlaylistImg = document.createElement("img");
  featuredPlaylistImg.setAttribute("src", featuredPlaylist.playlist_art);
  featuredPlaylistImg.setAttribute("class", "featured_playlist_img");

  const featuredPlaylistTitle = document.createElement("h1");
  featuredPlaylistTitle.innerText = featuredPlaylist.playlist_name;
  featuredPlaylistTitle.setAttribute("class", "featured_playlist_title");

  const featuredPlaylistAuthor = document.createElement("p");
  featuredPlaylistAuthor.innerText = featuredPlaylist.playlist_author;
  featuredPlaylistAuthor.setAttribute("class", "featured_playlist_author");

  imgSection.appendChild(featuredPlaylistImg);
  imgSection.appendChild(featuredPlaylistAuthor);
  imgSection.appendChild(featuredPlaylistTitle);

  // Create right section
  const playlistSection = document.createElement("div");
  playlistSection.setAttribute("class", "featured_right");

  if (featuredPlaylist.songs && featuredPlaylist.songs.length > 0) {
    const songsList = document.createElement("div");
    songsList.setAttribute("class", "featured_songs_list");
    featuredPlaylist.songs.forEach((song, index) => {
      const featured_song = document.createElement("div");
      featured_song.setAttribute("class", "featured_song");

      const songImg = document.createElement("img");
      songImg.setAttribute("src", song[4]);
      songImg.setAttribute("class", "featured_song_img");

      const songDiv = document.createElement("div");
      songDiv.setAttribute("class", "featured_song_info");

      const songName = document.createElement("h3");
      songName.innerText = song[0];
      songName.setAttribute("class", "featured_song_name");

      const artistName = document.createElement("p");
      artistName.innerText = song[1];
      artistName.setAttribute("class", "featured_artist");

      const albumName = document.createElement("p");
      albumName.innerText = song[3];
      albumName.setAttribute("class", "featured_album");

      songDiv.appendChild(songName);
      songDiv.appendChild(artistName);
      songDiv.appendChild(albumName);

      featured_song.appendChild(songImg);
      featured_song.appendChild(songDiv);
      songsList.appendChild(featured_song);
    });
    playlistSection.appendChild(songsList);
  }
  container.appendChild(imgSection);
  container.appendChild(playlistSection);
}

function createPlaylistCards(data) {
  const section = document.querySelector(".playlist_cards");

  if (!Array.isArray(data) || data.length === 0) {
    const emptyMessage = document.createElement("h3");
    emptyMessage.innerText = "No playlists added";
    section.appendChild(emptyMessage);
    return;
  }
  data.forEach((playlist) => {
    // Create outer div to hold playlist cards
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", `playlist_card`);
    outerDiv.setAttribute("id", playlist.playlistID);

    // Create playlist image
    const img = document.createElement("img");
    img.setAttribute("src", playlist.playlist_art);
    img.setAttribute("width", "200");
    img.setAttribute("height", "200");
    outerDiv.appendChild(img);
    // Create playlist title
    const playlistTitle = document.createElement("h3");
    playlistTitle.innerText = playlist.playlist_name;
    outerDiv.appendChild(playlistTitle);
    // Create playlist creator name
    const creatorName = document.createElement("p");
    creatorName.innerText = playlist.playlist_author;
    outerDiv.appendChild(creatorName);

    // Create like button and number
    const likeDiv = createLikeView(playlist);
    outerDiv.appendChild(likeDiv);
    section.appendChild(outerDiv);
    outerDiv.addEventListener("click", function () {
      openModal(playlist);
    });

    // Create edit button
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit_button");
    editButton.innerText = "✏️";
    likeDiv.appendChild(editButton);
    editButton.addEventListener("click", function (event) {
      event.stopPropagation();
      localStorage.setItem("editPlaylistID", playlist.playlistID);
      window.location.href = "edit_playlist.html";
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete_button");
    deleteButton.innerText = "🗑️";
    likeDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      outerDiv.remove();
    });
  });
}

function createLikeView(playlist) {
  const likeDiv = document.createElement("div");
  likeDiv.setAttribute("class", "like_div");
  const likeButton = document.createElement("button");
  likeButton.setAttribute("class", "like_button");
  likeButton.innerText = "♡ ";
  likeDiv.appendChild(likeButton);
  let likeClicked = false;
  likeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    if (likeClicked === false) {
      likeClicked = true;
      const currentLikes = parseInt(likeCount.innerText);
      likeCount.innerText = currentLikes + 1;
      likeButton.innerText = "❤️";
    } else {
      likeClicked = false;
      const currentLikes = parseInt(likeCount.innerText);
      likeCount.innerText = currentLikes - 1;
      likeButton.innerText = "♡ ";
    }
  });
  const likeCount = document.createElement("p");
  likeCount.innerText = playlist.like_count;
  likeDiv.appendChild(likeCount);
  return likeDiv;
}

function openModal(playlistDict) {
  clearModalSongs();

  document.getElementById("playlistTitle").innerText =
    playlistDict.playlist_name;
  document.getElementById("creatorName").innerText =
    playlistDict.playlist_author;
  document.getElementById("playlist_img").src = playlistDict.playlist_art;

  const songsContainer = document.getElementById("songs_list_container");
  songsContainer.innerHTML = "";

  if (playlistDict.songs && playlistDict.songs.length > 0) {
    playlistDict.songs.forEach((song) => {
      const songRow = document.createElement("div");
      songRow.setAttribute("class", "playlist_card");
      songRow.innerHTML = `
         <div class="song_modal">
        <img id="playlist_card" src="${song[4]}" width="200" height="200"/>
         <div>
            <h1 id="playlistTitle"></h1>
            <h2 id="creatorName"></h2>
                <h3 id="${song[0]}"> ${song[0]} </h3>
                <p id="${song[1]}">${song[1]}</p>
                <p id="${song[3]}">${song[3]}</p>
         </div>
         </div>
        `;
      songsContainer.appendChild(songRow);
    });
  } else {
    songsContainer.innerHTML = "<p> No songs available</p>";
  }

  const shuffleButton = document.getElementById("shuffle");

  if (currShuffleFunc) {
    shuffleButton.removeEventListener("click", currShuffleFunc);
  }
  currShuffleFunc = function () {
    shufflePlaylistDisplay(playlistDict);
  };

  shuffleButton.addEventListener("click", currShuffleFunc);
  modal.style.display = "block";
}

function shufflePlaylistDisplay(playlistDict) {
  const songsContainer = document.getElementById("songs_list_container");
  let indices = [0, 1, 2];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  songsContainer.innerHTML = "";
  indices.forEach((originalIndex, newPosition) => {
    const song = playlistDict.songs[originalIndex];
    const songRow = document.createElement("div");
    songRow.setAttribute("class", "playlist_card");

    songRow.innerHTML = `
    <div class="song_modal">
    <img id="playlist_card" src="${song[4]}" width="200" height="200"/>
    <div>
    <h1 id="playlistTitle"></h1>
    <h2 id="creatorName"></h2>
        <h3 id="${song[0]}">${song[0]}</h3>
        <p id="${song[1]}">${song[1]}</p>
        <p id="${song[3]}">${song[3]}</p>
    </div>
    </div>
    `;
    songsContainer.appendChild(songRow);
  });
}
function editPlaylist(playlistID) {
  const playlistCard = document.querySelector(
    `[data-playlist-id="${playlistID}]"`
  );
}

function loadEditPlaylist() {
  const playlistID = localStorage.getItem("editPlaylistId");
  const userPlaylists = JSON.parse(
    localStorage.getItem("userPlaylists") || "[]"
  );
  let playlist = userPlaylists.find((p) => p.playlistID == playlistID);
  if (playlist) {
    populateEditForm(playlist);
  }
}

function populateEditForm(playlist) {
  document.getElementById("playlist_name").value = playlist.playlist_name;
  document.getElementById("playlist_author").value = playlist.playlist_author;
  document.getElementById("playlist_art").value = playlist.playlist_art;
  const songsSection = document.getElementById("songs_section");
  songsSection.innerHTML = "";
  playlist.songs.forEach((song) => {
    addSongWithData(song);
  });
}

function saveEditedPlaylist() {
  const playlistID = localStorage.getItem("editPlaylistID");
  const playlistName = document.getElementsById("playlist_name").value;

  const playlistAuthor = document.getElementsById("playlist_author").value;

  const playlistArt = document.getElementsById("playlist_art").value;

  const songList = document.querySelectorAll(".song");
  const songs = [];
  songList.forEach((item) => {
    const songName = item.querySelector(".song_name").value;
    const artist = item.querySelector(".artist_name").value;
    const album = item.querySelector(".album_name").value;
    const duration = item.querySelector(".duration").value;
    const art = item.querySelector(".song_art").value;
    songs.push([songName, artist, album, duration, art]);
  });

  const currentPlaylists = JSON.parse(
    localStorage.getItem("userPlaylists") || "[]"
  );
  const index = currentPlaylists.findIndex((p) => p.playlistID == playlistID);
  const updatedPlaylist = {
    playlistID: playlistID,
    playlist_name: playlistName,
    playlist_author: playlistAuthor,
    playlist_art: playlistArt,
    songs: songs,
    likeCount: 0,
  };

  // Prevent duplicate edited playlists
  if (index !== -1) {
    currentPlaylists[index] = updatedPlaylist;
  } else {
    currentPlaylists.push(updatedPlaylist);
  }

  localStorage.setItem("userPlaylists", JSON.stringify(currentPlaylists));
  localStorage.removeItem("editPlaylistID");
  window.location.href = "index.html";
}
function clearModalSongs() {
  const songsContainer = document.getElementById("songs_list_container");
  if (songsContainer) {
    songsContainer.innerHTML = "";
  }
}

if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  };
}

if (modal) {
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
