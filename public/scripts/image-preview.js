const imagePickerElement = document.querySelector(
  "#image-upload-control  input"
);
const imagePreviewElement = document.querySelector(
  "#image-upload-control  img"
);

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagePickerElement.style.display = "none";
    return;
  }

  const pickedFile = files[0]; //we have only one file

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block"; //dafult was none in css
}

imagePickerElement.addEventListener("change", updateImagePreview);
