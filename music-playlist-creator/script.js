const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

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

  //     document.getElementById('albumName').innerText = playlist.albumName;
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
