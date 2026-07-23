// modal.js
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const span = document.querySelector(".close");

// Inject prev/next arrows
const prevBtn = document.createElement("a");
prevBtn.className = "modal-prev";
prevBtn.innerHTML = "&#10094;";
modal.appendChild(prevBtn);

const nextBtn = document.createElement("a");
nextBtn.className = "modal-next";
nextBtn.innerHTML = "&#10095;";
modal.appendChild(nextBtn);

// Gallery state
const galleryItems = Array.from(document.querySelectorAll("#bottom .item"));
let currentIndex = 0;

function openModal(index, updateHistory = true) {
  if (galleryItems.length === 0) return;
  if (index < 0) index = galleryItems.length - 1;
  if (index >= galleryItems.length) index = 0;
  currentIndex = index;
  
  const item = galleryItems[currentIndex];
  const imgElement = item.querySelector("img");
  if (!imgElement) return;
  
  modal.style.display = "block";
  modalImg.src = imgElement.dataset.biggerSrc || imgElement.src;
  captionText.innerHTML = imgElement.alt;
  
  if (updateHistory) {
    history.pushState({modal: true}, "");
  }
}

document.addEventListener("click", e => {
  // If clicking on a gallery item image
  if (e.target.classList.contains("item_img") || e.target.id === "myImg") {
    const item = e.target.closest(".item");
    if (item) {
      currentIndex = galleryItems.indexOf(item);
      openModal(currentIndex, true);
    }
  }
});

prevBtn.onclick = (e) => {
  e.stopPropagation();
  openModal(currentIndex - 1, false);
};
nextBtn.onclick = (e) => {
  e.stopPropagation();
  openModal(currentIndex + 1, false);
};

// Clicking the left/right side of the image
modalImg.onclick = (e) => {
  e.stopPropagation();
  const rect = modalImg.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  if (clickX > rect.width / 2) {
    openModal(currentIndex + 1, false);
  } else {
    openModal(currentIndex - 1, false);
  }
};

// Close modal when clicking outside the image
modal.onclick = (e) => {
  if (e.target === modal) {
    closeModal();
  }
};

function closeModal() {
  modal.style.display = "none";
  if (history.state && history.state.modal) {
    history.back();
  }
}

if (span) {
  span.onclick = (e) => {
    e.stopPropagation();
    closeModal();
  }
}

window.addEventListener("popstate", function(e) {
  modal.style.display = "none";
});

// Keyboard navigation & Escape key close
document.addEventListener("keydown", (e) => {
  if (modal && modal.style.display === "block") {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      openModal(currentIndex - 1, false);
    } else if (e.key === "ArrowRight") {
      openModal(currentIndex + 1, false);
    }
  }
});

// Swipe detection
let touchstartX = 0;
let touchendX = 0;
modal.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
}, {passive: true});

modal.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleSwipe();
}, {passive: true});

function handleSwipe() {
  const threshold = 50;
  if (touchendX < touchstartX - threshold) openModal(currentIndex + 1, false); // swipe left -> next
  if (touchendX > touchstartX + threshold) openModal(currentIndex - 1, false); // swipe right -> prev
}

// Universal Reactive Border Outline Interaction
(function initInteractiveGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function handleElementMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    }

    function attachInteractiveGlow() {
        const selectors = [
            // Buttons & CTAs
            '.cta', '.more-button', '.get-a-quote-button', '.back-button', 
            '.np-cta', '.whatsapp_us', 'input[type="submit"]', '.socialmedia-icon',
            // Cards & Service Items
            '.service-item', '.feature-card', '#bottom .item', 
            // Contact Section Cards (Outer Get a Quote Box & Right Cards)
            '.contact-left', '.contact-item', '.map-container',
            // Images & Feature Containers
            '.np-wrapper', '.np-image', '.about-img', '.service-image', '.hero-image-wrap'
        ];
        const elements = document.querySelectorAll(selectors.join(', '));
        elements.forEach(el => {
            if (!el.classList.contains('interactive-glow')) {
                el.classList.add('interactive-glow');
                el.addEventListener('mousemove', handleElementMouseMove);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachInteractiveGlow);
    } else {
        attachInteractiveGlow();
    }
})();