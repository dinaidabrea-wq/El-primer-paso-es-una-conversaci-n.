//Para Dinaida
// Escribe el código de país y el número, sin +, espacios ni guiones.
const WHATSAPP_NUMBER = "18298781745";

const whatsappFloat = document.getElementById("whatsappFloat");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function whatsappReady() {
  return /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
}

function updateWhatsAppLink() {
  if (whatsappReady()) {
    whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, deseo información sobre sus servicios legales.")}`;
  } else {
    whatsappFloat.href = "#contacto";
    whatsappFloat.addEventListener("click", function (event) {
      if (!whatsappReady()) {
        event.preventDefault();
        document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
        formStatus.textContent = "El WhatsApp oficial todavía no está configurado. Completa el número en script.js.";
      }
    });
  }
}
updateWhatsAppLink();

menuToggle.addEventListener("click", function () {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navigation.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!whatsappReady()) {
    formStatus.textContent = "Antes de publicar, configura el número oficial en la variable WHATSAPP_NUMBER de script.js.";
    return;
  }

  const data = new FormData(contactForm);
  const message = [
    "Hola, deseo solicitar una consulta legal.",
    "",
    `Nombre: ${data.get("nombre")}`,
    `Teléfono: ${data.get("telefono")}`,
    `Correo: ${data.get("correo")}`,
    `Área: ${data.get("servicio")}`,
    `Consulta: ${data.get("consulta")}`
  ].join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  formStatus.textContent = "Se ha preparado tu mensaje en WhatsApp. Revísalo antes de enviarlo.";
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function (element) {
  observer.observe(element);
});