// Update these values with your own information.
const roles = ["IT Student", "Aspiring Developer", "Creative Problem Solver"];
const typedText = document.getElementById("typedText");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  typedText.textContent = current.substring(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeRole, 95);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 45);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1200 : 250);
  }
}
typeRole();

// Theme toggle (dark theme is the default).
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeIcon();
});
function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("light-theme")
    ? '<i class="bi bi-moon-stars-fill"></i>'
    : '<i class="bi bi-sun-fill"></i>';
}

// Reveal sections and animate skill bars when they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".progress-bar").forEach(bar => {
        bar.style.width = bar.dataset.width || "0%";
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal, .skill-panel").forEach(el => revealObserver.observe(el));

// Project category filtering.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectItems.forEach(item => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("d-none", !matches);
    });
  });
});

// Active navigation link while scrolling.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
  document.getElementById("backToTop").classList.toggle("show", window.scrollY > 500);
});

// Close the mobile navigation after choosing a section.
document.querySelectorAll("#mainNav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});

// Frontend-only contact form: validates fields, then opens the user's email app.
// Replace the recipient address below with your own email.
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const feedback = document.getElementById("formFeedback");
  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    feedback.textContent = "Please complete all fields with a valid email address.";
    feedback.style.color = "#e58b9b";
    return;
  }
  const data = new FormData(contactForm);
  const recipient = "hello@example.com"; // CHANGE THIS TO YOUR EMAIL
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
  );
  feedback.textContent = "Opening your email app...";
  feedback.style.color = "var(--accent)";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("year").textContent = new Date().getFullYear();
