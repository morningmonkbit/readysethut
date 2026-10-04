/* =========================================================
   READYSETHUT
========================================================= */

const menuButton = document.querySelector("#menuButton");
const menuClose = document.querySelector("#menuClose");
const menuOverlay = document.querySelector("#menuOverlay");
const menuLinks = document.querySelectorAll(".menu-nav a");


/* =========================================================
   MENU
========================================================= */

function openMenu() {
  menuOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menuOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

menuButton.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

menuLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});


/* =========================================================
   ESC CLOSE
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMenu();
  }

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight) {

    heroImage.style.transform =
      `scale(1.04) translateY(${scrollY * 0.08}px)`;

  }

});

/* =========================================================
   NEWSLETTER DEMO
========================================================= */

const newsletterForm =
  document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", event => {

  event.preventDefault();

  const button =
    newsletterForm.querySelector("button");

  button.textContent = "YOU'RE IN ✓";

});

/* =========================================================
   PRODUCT SLIDER
========================================================= */

const productSlider = document.querySelector(".product-slider");
const productGrid = document.querySelector(".product-grid");

const productPrev =
  document.querySelector(".product-arrow-prev");

const productNext =
  document.querySelector(".product-arrow-next");


if (
  productSlider &&
  productGrid &&
  productPrev &&
  productNext
) {

  const productCards =
    Array.from(productGrid.querySelectorAll(".product-card"));

  let currentProduct = 0;


  /* ---------------------------------------------------------
     Anzahl sichtbarer Produkte
  --------------------------------------------------------- */

  function getVisibleProducts() {

    if (window.innerWidth <= 600) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 3;
  }


  /* ---------------------------------------------------------
     Slider aktualisieren
  --------------------------------------------------------- */

  function updateProductSlider() {

    const visibleProducts =
      getVisibleProducts();

    const maxIndex =
      Math.max(0, productCards.length - visibleProducts);


    /*
      Verhindert, dass wir nach einem Resize
      außerhalb des gültigen Bereichs landen.
    */

    if (currentProduct > maxIndex) {
      currentProduct = maxIndex;
    }


    /*
      Tatsächliche Breite einer Card inklusive Gap.
    */

    const firstCard = productCards[0];

    if (!firstCard) {
      return;
    }

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const gridStyles =
      window.getComputedStyle(productGrid);

    const gap =
      parseFloat(gridStyles.columnGap) || 0;

    const offset =
      currentProduct * (cardWidth + gap);


    productGrid.style.transform =
      `translateX(-${offset}px)`;


    /*
      Pfeile am Anfang / Ende deaktivieren
    */

    productPrev.disabled =
      currentProduct === 0;

    productNext.disabled =
      currentProduct >= maxIndex;
  }


  /* ---------------------------------------------------------
     Nächstes Produkt
  --------------------------------------------------------- */

  productNext.addEventListener("click", () => {

    const visibleProducts =
      getVisibleProducts();

    const maxIndex =
      productCards.length - visibleProducts;

    if (currentProduct < maxIndex) {

      currentProduct++;

      updateProductSlider();
    }

  });


  /* ---------------------------------------------------------
     Vorheriges Produkt
  --------------------------------------------------------- */

  productPrev.addEventListener("click", () => {

    if (currentProduct > 0) {

      currentProduct--;

      updateProductSlider();
    }

  });


  /* ---------------------------------------------------------
     Responsive
  --------------------------------------------------------- */

  window.addEventListener(
    "resize",
    updateProductSlider
  );


  /* Initialisieren */

  updateProductSlider();

}