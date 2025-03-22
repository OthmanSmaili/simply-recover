// AOS (Animate On Scroll) Initialization
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: true,
  });

  // Initialize testimonial slider
  initTestimonialSlider();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Add mouse move effect for about images
  const imageContainers = document.querySelectorAll(".image-container");
  imageContainers.forEach((container) => {
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
  });

  // Toggle mobile menu
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");

        mobileMenuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Handle window resize for testimonial slider
  window.addEventListener("resize", function () {
    showSlide(currentSlide);

    // Ensure mobile menu is properly initialized
    if (window.innerWidth >= 992) {
      mobileNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Prevent default on form submissions until we have real backend
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!form.hasAttribute("onsubmit")) {
        e.preventDefault();
        alert(
          "Form submission captured. In a live environment, this would be sent to the server."
        );
      }
    });
  });
});

// Testimonial slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".slider-dot");
const wrapper = document.querySelector(".testimonial-wrapper");

function initTestimonialSlider() {
  // Set initial position
  showSlide(0);
}

function showSlide(n) {
  if (n >= slides.length) currentSlide = 0;
  if (n < 0) currentSlide = slides.length - 1;

  const slideWidth = slides[0].offsetWidth;
  wrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  showSlide(++currentSlide);
}

function prevSlide() {
  showSlide(--currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Auto-advance slides every 4 seconds
setInterval(nextSlide, 4000);

// Mouse move tilt effect for images
function handleMouseMove(e) {
  const container = this;
  const { left, top, width, height } = container.getBoundingClientRect();

  const x = e.clientX - left;
  const y = e.clientY - top;

  const xRotation = ((y - height / 2) / height) * 10;
  const yRotation = ((x - width / 2) / width) * -10;

  container.style.transform = `
        perspective(1000px)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)
        scale(1.05)
    `;
}

function handleMouseLeave(e) {
  this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
}

// Form submission handlers
function submitBookingForm(event) {
  event.preventDefault();
  const form = document.getElementById("booking-form");
  const statusDiv = document.getElementById("booking-form-status");

  // Get form data
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  // Prepare email content
  const subject = `Booking Request: ${formObject.service} Service`;
  const body = `
        Name: ${formObject.name}
        Email: ${formObject.email}
        Phone: ${formObject.phone}
        Service: ${formObject.service}
        Message: ${formObject.message || "No message provided"}
    `;

  // Open default email client
  const mailtoLink = `mailto:admin@simplyrecoveroc.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  try {
    window.location.href = mailtoLink;

    // Show success message
    statusDiv.textContent =
      "Form submitted! Your default email client has been opened with the form information.";
    statusDiv.className = "form-status success";

    // Reset form
    form.reset();
  } catch (error) {
    statusDiv.textContent =
      "There was an error submitting the form. Please try again or contact us directly.";
    statusDiv.className = "form-status error";
  }
}

function submitContactForm(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const statusDiv = document.getElementById("contact-form-status");

  // Get form data
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  // Prepare email content
  const subject = `Contact Form: ${formObject.name} - ${formObject.subject}`;
  const body = `
        Name: ${formObject.name}
        Email: ${formObject.email}
        Phone: ${formObject.phone || "Not provided"}
        Message: ${formObject.message}
    `;

  // Open default email client
  const mailtoLink = `mailto:admin@simplyrecoveroc.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  try {
    window.location.href = mailtoLink;

    // Show success message
    statusDiv.textContent =
      "Message sent! Your default email client has been opened with the form information.";
    statusDiv.className = "form-status success";

    // Reset form
    form.reset();
  } catch (error) {
    statusDiv.textContent =
      "There was an error sending your message. Please try again or contact us directly.";
    statusDiv.className = "form-status error";
  }
}
