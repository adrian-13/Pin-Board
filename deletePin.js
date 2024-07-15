export function openDeletePinModal() {
  document.getElementById("delete-pin-modal").style.display = "flex";
}

export function closeDeletePinModal() {
  document.getElementById("delete-pin-modal").style.display = "none";
}

// Pridajte event listener pre zatváracie tlačidlo
const closeBtn = document.querySelectorAll(".close-btn");
closeBtn.forEach((closeBtn) => {
  closeBtn.addEventListener("click", function () {
    closeDeletePinModal();
  });
});

// Zabráňte zatvoreniu modálneho okna kliknutím mimo neho
document
  .getElementById("delete-pin-modal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      event.stopPropagation();
    }
  });
