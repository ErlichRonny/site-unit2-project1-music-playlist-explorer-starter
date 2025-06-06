const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

fetch("./data/data.json")
  .then((data) => data.json())
  .then((jsonData) => {
    if (window.location.href.includes("featured.html")) {
      showFeaturedPlaylist(jsonData);
    } else {
      createPlaylistCards(jsonData);
    }
  })
  .catch((error) => {
    console.log("Error with fetching data", error);
  });

function showFeaturedPlaylist(data) {
  if (!Array.isArray(data) || data.length === 0) {
    const emptyMessage = document.createElement("h3");
    emptyMessage.innerText = "No playlists available";
    section.appendChild(emptyMessage);
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
  });
}

function createLikeView(playlist) {
  const likeDiv = document.createElement("div");
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
  document.getElementById("playlistTitle").innerText =
    playlistDict.playlist_name;
  document.getElementById("creatorName").innerText =
    playlistDict.playlist_author;
  document.getElementById("playlist_img").src = playlistDict.playlist_art;
  if (playlistDict.songs && playlistDict.songs.length >= 3) {
    document.getElementById("song1_img").src = playlistDict.songs[0][4];
    document.getElementById("song1").innerText = playlistDict.songs[0][0];
    document.getElementById("artist1").innerText = playlistDict.songs[0][1];
    document.getElementById("album1").innerText = playlistDict.songs[0][3];

    document.getElementById("song2_img").src = playlistDict.songs[1][4];
    document.getElementById("song2").innerText = playlistDict.songs[1][0];
    document.getElementById("artist2").innerText = playlistDict.songs[1][1];
    document.getElementById("album2").innerText = playlistDict.songs[1][3];

    document.getElementById("song3_img").src = playlistDict.songs[2][4];
    document.getElementById("song3").innerText = playlistDict.songs[2][0];
    document.getElementById("artist3").innerText = playlistDict.songs[2][1];
  }

  modal.style.display = "block";

  const shuffleButton = document.getElementById("shuffle");
  shuffleLogic(shuffleButton, playlistDict);
}

function shuffleLogic(shuffleButton, playlistDict) {
  shuffleButton.addEventListener("click", function () {
    //  let songsList = new Set();
    let indices = [0, 1, 2];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    indices.forEach((originalIndex, newPosition) => {
      updatePlaylistPosition(newPosition, originalIndex, playlistDict);
    });
  });
}

function updatePlaylistPosition(position, originalIndex, playlistDict) {
  const positionStr = (position + 1).toString();
  console.log(playlistDict.songs[originalIndex][4]);
  document.getElementById(`song${positionStr}_img`).src =
    playlistDict.songs[originalIndex][4];
  document.getElementById(`song${positionStr}`).innerText =
    playlistDict.songs[originalIndex][0];
  document.getElementById(`artist${positionStr}`).innerText =
    playlistDict.songs[originalIndex][1];
  document.getElementById(`album${positionStr}`).innerText =
    playlistDict.songs[originalIndex][3];
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
