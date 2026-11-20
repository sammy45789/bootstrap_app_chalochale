const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.getAttribute("aria-pressed") !== "true";
    const destination = button.closest(".destination-card").querySelector("h3").textContent;
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${destination} ${saved ? "from" : "to"} favorites`);
  });
});

const searchForm = document.querySelector(".search-bar");
const searchMessage = document.querySelector(".search-message");

if (searchForm && searchMessage) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const destination = document.querySelector("#destination").value.trim();
    const date = document.querySelector("#travel-date").value;
    const travelers = document.querySelector("#travelers").value;
    const missing = [];

    if (!destination) missing.push("a destination");
    if (!date) missing.push("your dates");
    if (!travelers) missing.push("the number of travelers");

    if (missing.length) {
      searchMessage.textContent = `Add ${missing.join(", ").replace(/, ([^,]*)$/, " and $1")} to find your trip.`;
      return;
    }

    searchMessage.textContent = `Lovely choice! Your ${destination} getaway for ${travelers.toLowerCase()} is ready to plan.`;
  });
}

const destinationFilter = document.querySelector("#destination-filter");
const destinationCards = Array.from(document.querySelectorAll(".destination-page-grid .destination-card"));
const filterButtons = document.querySelectorAll("[data-region-filter]");
const filterEmpty = document.querySelector(".filter-empty");
let activeRegion = "all";

function filterDestinations() {
  if (!destinationCards.length) return;

  const query = destinationFilter ? destinationFilter.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  destinationCards.forEach((card) => {
    const matchesRegion = activeRegion === "all" || card.dataset.region === activeRegion;
    const matchesQuery = !query || card.dataset.name.includes(query);
    card.hidden = !(matchesRegion && matchesQuery);
    if (!card.hidden) visibleCount += 1;
  });

  if (filterEmpty) filterEmpty.hidden = visibleCount > 0;
}

if (destinationFilter) {
  destinationFilter.addEventListener("input", filterDestinations);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeRegion = button.dataset.regionFilter;
    filterButtons.forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("selected", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    filterDestinations();
  });
});

const packageMessage = document.querySelector(".package-message");
document.querySelectorAll(".package-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (packageMessage) {
      packageMessage.textContent = `${button.dataset.package} is ready to plan. Tell us your dates and we’ll help make it yours.`;
    }
  });
});
