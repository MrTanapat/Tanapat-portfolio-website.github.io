document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Navigation Toggle ---

  const navToggle = document.querySelector(".nav-toggle");

  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    // Ensure elements exist before adding listeners

    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      navToggle.classList.toggle("active"); // Prevent body scrolling when mobile menu is open

      document.body.classList.toggle(
        "no-scroll",

        navMenu.classList.contains("active")
      );
    }); // Close mobile menu when clicking on a link

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        navToggle.classList.remove("active");

        document.body.classList.remove("no-scroll");
      });
    });
  } // --- Smooth scrolling for navigation links ---

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      const target = document.querySelector(targetId);

      if (target) {
        // Adjust scroll position to account for fixed navbar

        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;

        const offsetTop = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,

          behavior: "smooth",
        });
      }
    });
  }); // --- Navbar background on scroll ---

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  } // --- Contact form handling ---

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Get form data

      const formData = new FormData(contactForm);

      const name = formData.get("name");

      const email = formData.get("email");

      const message = formData.get("message"); // Simple validation

      if (name && email && message) {
        alert("Thank you for your message! I will get back to you soon.");

        contactForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  } // --- Back to Top Button function ---

  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    });
  } // --- Dark Mode Function ---

  const darkModeToggle = document.getElementById("darkModeToggle");

  const body = document.body; // Function to set theme and update local storage

  function setTheme(theme) {
    body.classList.remove("light-mode", "dark-mode");

    body.classList.add(`${theme}-mode`);

    localStorage.setItem("theme", theme); // Update icon visibility

    updateThemeIcon(theme);
  } // Function to update icon visibility based on theme

  function updateThemeIcon(theme) {
    if (darkModeToggle) {
      // Check if the toggle button exists

      const lightIcon = darkModeToggle.querySelector(".icon.light");

      const darkIcon = darkModeToggle.querySelector(".icon.dark");

      if (lightIcon && darkIcon) {
        // Ensure icons exist

        if (theme === "dark") {
          lightIcon.style.display = "none";

          darkIcon.style.display = "inline-block";
        } else {
          lightIcon.style.display = "inline-block";

          darkIcon.style.display = "none";
        }
      }
    }
  } // Initialize theme on load

  const currentTheme = localStorage.getItem("theme") || "light";

  setTheme(currentTheme); // Apply the theme immediately // Event listener for toggle button

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      // Check if 'dark-mode' class is currently on the body

      const currentThemeIsDark = body.classList.contains("dark-mode");

      const newTheme = currentThemeIsDark ? "light" : "dark";

      setTheme(newTheme); // Animation effect - Corrected 'tranform' to 'transform'

      darkModeToggle.style.transform = "rotate(360deg)";

      setTimeout(() => {
        darkModeToggle.style.transform = "rotate(0deg)";
      }, 300);
    });
  }
});

// Loading Animation (Progress Bar Version)
window.addEventListener("load", function () {
  const loader = document.getElementById("loading-overlay");
  const progressBar = document.querySelector(".progress-fill");

  if (loader && progressBar) {
    document.body.style.overflow = "hidden";

    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(loadingInterval);

        setTimeout(() => {
          loader.classList.add("fade-out");

          loader.addEventListener(
            "transitionend",
            function handler() {
              loader.style.display = "none";
              document.body.style.overflow = "auto";
              loader.removeEventListener("transitionend", handler);
            },
            { once: true }
          );
        }, 500);
      }
    }, 150);
  }
});
