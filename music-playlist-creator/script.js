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
        console.log(Array.isArray(data));

    data.forEach((playlist) => {
      const outerDiv = document.createElement("div");
      outerDiv.setAttribute("class", "playlist_card");
      const img = document.createElement("img");
      img.setAttribute("src", playlist.playlist_art);
      img.setAttribute("width", "200");
      img.setAttribute("height", "200");
      outerDiv.appendChild(img);
      const playlistTitle = document.createElement("h3");
      playlistTitle.innerText = playlist.playlist_name;
      outerDiv.appendChild(playlistTitle);
      const creatorName = document.createElement("p");
      creatorName.innerText = playlist.playlist_author;
      outerDiv.appendChild(creatorName);
      const likeCount = document.createElement("p");
      outerDiv.appendChild(likeCount);
      section.appendChild(outerDiv);

      // Each card should display the playlist's cover image, name, author, and like count.
    });
  }
}
/*
          <div
            class="playlist_card"
            onclick="openModal({playlistTitle: [['Playlist Title', 'Creator Name'], ['Song Title 1', 'Artist Name 1', 'Album Name 1'], ['Song Title 2', 'Artist Name 2', 'Album Name 2'], ['Song Title 3', 'Artist Name 3', 'Album Name 3']]})"
          >
            <img src="./assets/img/playlist.png" width="200" height="200" />
            <h3>Playlist Title</h3>
            <p>Creator Name</p>
            <p>Like Count</p>
          </div>
          */

function openModal(playlistDict) {
  document.getElementById("playlistTitle").innerText =
    playlistDict.playlistTitle[0][0];
  document.getElementById("creatorName").innerText =
    playlistDict.playlistTitle[0][1];
  document.getElementById("song1").innerText = playlistDict.playlistTitle[1][0];
  document.getElementById("artist1").innerText =
    playlistDict.playlistTitle[1][1];
  document.getElementById("album1").innerText =
    playlistDict.playlistTitle[1][2];
  document.getElementById("song2").innerText = playlistDict.playlistTitle[2][0];
  document.getElementById("artist2").innerText =
    playlistDict.playlistTitle[2][1];
  document.getElementById("album2").innerText =
    playlistDict.playlistTitle[2][2];
  document.getElementById("song3").innerText = playlistDict.playlistTitle[3][0];
  document.getElementById("artist3").innerText =
    playlistDict.playlistTitle[3][1];
  document.getElementById("album3").innerText =
    playlistDict.playlistTitle[3][2];

  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

