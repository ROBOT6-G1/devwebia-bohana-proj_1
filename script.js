// Logique interactive & Chargeur CMS Dynamique DEVWEBIA
function applyCmsData(data) {
  if (!data) return;
  if (data.siteTitle) {
    document.querySelectorAll('[data-cms="siteTitle"]').forEach(el => el.textContent = data.siteTitle);
    document.title = data.siteTitle;
  }
  if (data.siteSlogan) {
    document.querySelectorAll('[data-cms="siteSlogan"]').forEach(el => el.textContent = data.siteSlogan);
  }
  if (data.siteLogo) {
    const container = document.getElementById("logo-container");
    if (container) {
      container.innerHTML = '<img src="' + data.siteLogo + '" class="w-full h-full object-cover rounded-xl">';
    }
  }
  if (data.heroTitle) {
    document.querySelectorAll('[data-cms="heroTitle"]').forEach(el => el.textContent = data.heroTitle);
  }
  if (data.heroSubtitle) {
    document.querySelectorAll('[data-cms="heroSubtitle"]').forEach(el => el.textContent = data.heroSubtitle);
  }
  if (data.heroCta) {
    document.querySelectorAll('[data-cms="heroCta"]').forEach(el => el.textContent = data.heroCta);
  }
  if (data.heroImage) {
    const imgEl = document.getElementById("hero-custom-img");
    if (imgEl) {
      imgEl.src = data.heroImage;
      imgEl.classList.remove("hidden");
    }
  }
  if (data.servicesTitle) {
    document.querySelectorAll('[data-cms="servicesTitle"]').forEach(el => el.textContent = data.servicesTitle);
  }
  if (data.servicesSubtitle) {
    document.querySelectorAll('[data-cms="servicesSubtitle"]').forEach(el => el.textContent = data.servicesSubtitle);
  }
  if (data.whatsapp) {
    const cleanWa = data.whatsapp.replace(/[^0-9]/g, "");
    document.querySelectorAll('[data-cms-wa-link]').forEach(el => el.href = "https://wa.me/" + cleanWa);
    document.querySelectorAll('[data-cms="whatsapp"]').forEach(el => el.textContent = data.whatsapp);
  }
  if (data.footerText) {
    document.querySelectorAll('[data-cms="footerText"]').forEach(el => el.textContent = data.footerText);
  }
}

function loadCmsData() {
  const localData = localStorage.getItem("devwebia_site_cms");
  if (localData) {
    try { applyCmsData(JSON.parse(localData)); } catch(e){}
  }
  if (window.db) {
    window.db.collection("app_data").doc("site_content").get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        applyCmsData(data);
        localStorage.setItem("devwebia_site_cms", JSON.stringify(data));
      }
    }).catch(err => console.warn("Notice CMS Firestore:", err));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadCmsData();

  const form = document.getElementById("hero-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("hero-name").value;
      const phone = document.getElementById("hero-phone").value;
      const msg = document.getElementById("hero-msg").value;

      const waText = encodeURIComponent(
        "Bonjour ! Je suis " + name + " (" + phone + ").\n" + msg
      );
      const activeWa = localStorage.getItem("devwebia_site_cms") ? JSON.parse(localStorage.getItem("devwebia_site_cms")).whatsapp : "261340000000";
      const finalWa = activeWa ? activeWa.replace(/[^0-9]/g, "") : "261340000000";
      window.open("https://wa.me/" + finalWa + "?text=" + waText, "_blank");
    });
  }
});
