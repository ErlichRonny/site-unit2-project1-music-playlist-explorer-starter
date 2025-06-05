const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

fetch("./data/data.json")
  .then((data) => data.json())
  .then((jsonData) => {
    createPlaylistCards(jsonData);
  })
  .catch((error) => {
    console.log("Error with fetching data", error);
  });

function createPlaylistCards(data) {
  const section = document.querySelector(".playlist_cards");

  if (!Array.isArray(data) || data.length === 0) {
    console.log(Array.isArray(data));
    const emptyMessage = document.createElement("h3");
    emptyMessage.innerText = "No playlists added";
    section.appendChild(emptyMessage);
    return;
  } else if (Array.isArray(data)) {
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
      likeDiv = createLikeView(playlist);
      outerDiv.appendChild(likeDiv);
      section.appendChild(outerDiv);
      outerDiv.addEventListener("click", function () {
        openModal(playlist);
      });
    });
  }
}

function createLikeView(playlist) {
  const likeDiv = document.createElement("div");
  const likeButton = document.createElement("button");
  likeButton.setAttribute("class", "like_button");
  likeButton.innerText = "♡ ";
  likeDiv.appendChild(likeButton);
  let likeClicked = false;
  likeButton.addEventListener("click", function (event) {
    if (likeClicked === false) {
      likeClicked = true;
      const currentLikes = parseInt(likeCount.innerText);
      likeCount.innerText = currentLikes + 1;
      likeButton.innerText = "❤️";
      event.stopPropagation();
    } else {
      likeClicked = false;
      const currentLikes = parseInt(likeCount.innerText);
      likeCount.innerText = currentLikes - 1;
      likeButton.innerText = "♡ ";
      event.stopPropagation();
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
  modal.style.display = "block";

  const shuffleButton = document.getElementById("shuffle");
  shuffleLogic(shuffleButton, playlistDict);
}

function shuffleLogic(shuffleButton, playlistDict) {
  shuffleButton.addEventListener("click", function () {
    let songsList = new Set();
    while (songsList.size < 3) {
      songsList.add(Math.floor(Math.random() * 3));
    }
    const shuffledArray = Array.from(songsList);
    shuffledArray.forEach((originalIndex, newPosition) => {
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

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
