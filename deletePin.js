export function openDeletePinModal() {
  document.getElementById("delete-pin-modal").style.display = "flex";
}

export function closeDeletePinModal() {
  document.getElementById("delete-pin-modal").style.display = "none";
}

const closeBtn = document.querySelectorAll(".close-btn");
closeBtn.forEach((closeBtn) => {
  closeBtn.addEventListener("click", function () {
    closeDeletePinModal();
  });
});

document
  .getElementById("delete-pin-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      event.stopPropagation();
    }
  });
