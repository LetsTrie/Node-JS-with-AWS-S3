const PhotoPreview = () => {
  document.getElementById("image").addEventListener("change", (e) => {
    files = e.target.files || e.dataTransfer.files;
    document.getElementById("fileBoxID").classList.add("increaseHeight");
    document.getElementById("dragP").classList.add("hidden");
    document.getElementById("image-preview").classList.remove("hidden");
    document.getElementById("image-preview").src = URL.createObjectURL(files[0]);
  });
}

PhotoPreview();