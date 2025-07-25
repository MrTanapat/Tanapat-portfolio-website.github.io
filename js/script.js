document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Navigation Toggle ---

  const navToggle = document.querySelector(".nav-toggle");

  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      navToggle.classList.toggle("active");

      document.body.classList.toggle(
        "no-scroll",

        navMenu.classList.contains("active")
      );
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        navToggle.classList.remove("active");

        document.body.classList.remove("no-scroll");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      const target = document.querySelector(targetId);

      if (target) {
        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;

        const offsetTop = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,

          behavior: "smooth",
        });
      }
    });
  });

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      const name = formData.get("name");

      const email = formData.get("email");

      const message = formData.get("message");

      if (name && email && message) {
        alert("Thank you for your message! I will get back to you soon.");

        contactForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

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
  }
  // --- Dark Mode Function ---

  const darkModeToggle = document.getElementById("darkModeToggle");

  const body = document.body;

  function setTheme(theme) {
    body.classList.remove("light-mode", "dark-mode");

    body.classList.add(`${theme}-mode`);

    localStorage.setItem("theme", theme);

    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (darkModeToggle) {
      const lightIcon = darkModeToggle.querySelector(".icon.light");
      const darkIcon = darkModeToggle.querySelector(".icon.dark");

      if (lightIcon && darkIcon) {
        if (theme === "dark") {
          lightIcon.style.display = "none";

          darkIcon.style.display = "inline-block";
        } else {
          lightIcon.style.display = "inline-block";

          darkIcon.style.display = "none";
        }
      }
    }
  }

  const currentTheme = localStorage.getItem("theme") || "light";

  setTheme(currentTheme);

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      const currentThemeIsDark = body.classList.contains("dark-mode");

      const newTheme = currentThemeIsDark ? "light" : "dark";

      setTheme(newTheme);

      darkModeToggle.style.transform = "rotate(360deg)";

      setTimeout(() => {
        darkModeToggle.style.transform = "rotate(0deg)";
      }, 300);
    });
  }
});

// Loading Animation
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

//Scroll Progress
function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  const scrollProgressBar = document.getElementById(
    "scroll-progress-indicator"
  );
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrollPercent + "%";
  }

  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  let currentActiveSectionId = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - 10;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
      currentActiveSectionId = section.getAttribute("id");
    }
  });

  if (scrollTop === 0) {
    currentActiveSectionId = "hero";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  if (currentActiveSectionId) {
    const activeLink = document.querySelector(
      `.nav-menu .nav-link[href="#${currentActiveSectionId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("DOMContentLoaded", updateScrollProgress);
