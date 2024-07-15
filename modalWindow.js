export function openModal() {
  document.getElementById("name-modal").style.display = "flex";
}

export function closeModal() {
  document.getElementById("name-modal").style.display = "none";
}

document.querySelector(".close-btn").addEventListener("click", closeModal);

document
  .getElementById("name-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      event.stopPropagation();
    }
  });
