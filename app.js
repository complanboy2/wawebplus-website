const WA_PLUS_SITE = {
  installUrl: "https://chromewebstore.google.com/detail/wa-utils/oajgkebdeioegjkaohcipgblnkjibple",
  loginUrl: "https://extensionpay.com",
  supportEmail: "support@wa-plus.app"
};

const PRICING_MARKETS = [
  { id: "USD", label: "International", currencyCode: "USD" },
  { id: "IN", label: "India", currencyCode: "INR" }
];

const PRICING_CATALOGS = {
  USD: {
    monthly: { price: "$9.99", suffix: "/month", cta: "Install and choose monthly" },
    half_yearly: { price: "$50", suffix: "/6 months", save: "Save 17%", cta: "Install and choose 6 months" },
    yearly: { price: "$80", suffix: "/year", save: "Save 33%", cta: "Install and choose yearly" }
  },
  IN: {
    monthly: { price: "₹799", suffix: "/month", cta: "Install and choose monthly" },
    half_yearly: { price: "₹3,979", suffix: "/6 months", save: "Save 17%", cta: "Install and choose 6 months" },
    yearly: { price: "₹6,424", suffix: "/year", save: "Save 33%", cta: "Install and choose yearly" }
  }
};

function normalizeMarket(value) {
  return String(value || "").trim().toUpperCase() === "IN" ? "IN" : "USD";
}

function detectMarket() {
  try {
    const locale = String(navigator.language || "").toLowerCase();
    const timezone = String(Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    if (locale.includes("-in") || locale.endsWith("_in") || timezone === "asia/kolkata") return "IN";
  } catch {
    // ignore browser capability issues
  }
  return "USD";
}

document.querySelectorAll("[data-install-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.installUrl;
});

document.querySelectorAll("[data-login-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.loginUrl;
});

document.querySelectorAll("[data-support-email]").forEach((link) => {
  link.href = `mailto:${WA_PLUS_SITE.supportEmail}`;
  link.textContent = WA_PLUS_SITE.supportEmail;
});

const marketButtonsRoot = document.querySelector("[data-pricing-market-buttons]");
const marketNote = document.querySelector("[data-pricing-market-note]");
const planCards = Array.from(document.querySelectorAll("[data-plan-card]"));
let selectedMarket = normalizeMarket(detectMarket());

function renderPricing() {
  const catalog = PRICING_CATALOGS[selectedMarket] || PRICING_CATALOGS.USD;
  planCards.forEach((card) => {
    const planId = card.getAttribute("data-plan-card");
    const plan = catalog[planId];
    if (!plan) return;
    const priceEl = card.querySelector("[data-plan-price]");
    const saveEl = card.querySelector("[data-plan-save]");
    const ctaEl = card.querySelector("[data-plan-cta]");
    if (priceEl) {
      priceEl.innerHTML = `${plan.price}<span>${plan.suffix}</span>`;
    }
    if (saveEl) {
      saveEl.textContent = plan.save || "";
      saveEl.style.display = plan.save ? "block" : "none";
    }
    if (ctaEl) {
      ctaEl.textContent = plan.cta;
    }
  });

  if (marketButtonsRoot) {
    marketButtonsRoot.querySelectorAll("button").forEach((button) => {
      const isActive = button.getAttribute("data-market") === selectedMarket;
      button.classList.toggle("active", isActive);
    });
  }

  if (marketNote) {
    marketNote.textContent = selectedMarket === "IN"
      ? "Showing INR plans for India. You can switch to international pricing if needed."
      : "Showing international USD pricing. Switch to India if you want INR plans.";
  }
}

if (marketButtonsRoot) {
  PRICING_MARKETS.forEach((market) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pricing-market-button";
    button.setAttribute("data-market", market.id);
    button.textContent = `${market.label} · ${market.currencyCode}`;
    button.addEventListener("click", () => {
      selectedMarket = normalizeMarket(market.id);
      renderPricing();
    });
    marketButtonsRoot.appendChild(button);
  });
}

renderPricing();
