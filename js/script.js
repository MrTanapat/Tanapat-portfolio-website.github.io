// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
//onload typewriting animation
const titleText = document.querySelector("#titleText");
const highlightText = document.querySelector("#highlightText");
const subtitleText = document.querySelector("#subtitleText");
const descriptionText = document.querySelector("#descriptionText");
const cursor = document.querySelector("#cursor");
const projectContainer = document.querySelector("#projectContainer");
let allProjects = [];

function blinkingCursor() {
  cursor.classList.add("blinking");
  //add blinking class
}

//onload to typewriting effect
window.addEventListener("load", async () => {
  //wait for each line to fish then blink cursor
  await typeWriter(titleText, "Hi, I'm");
  highlightText.innerHTML += "&ensp;";
  await typeWriter(highlightText, "Tanapat");
  highlightText.innerHTML += "<br>";
  await typeWriter(subtitleText, "Full Stack Developer");
  subtitleText.innerHTML += "<br>";
  await typeWriter(
    descriptionText,
    "I create beautiful and functional web applications",
    30
  );
  blinkingCursor(); //then blinking
});

//typewriting animation object
const typeWriter = (element, text, speed = 70) => {
  var style = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-size");
  var fontSize = parseFloat(style);

  return new Promise((resolve) => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };
    cursor.style.height = fontSize + 3 + "px";
    console.log(element.style.fontSize);
    cursor.style.bottom = fontSize / 2 + "px";
    type();
  });
};

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple validation
  if (name && email && message) {
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

//project filter button functions
const projectsFilter = document.querySelector("#projectsFilter");
let isClick = false;
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");

searchBtn.addEventListener("click", () => {
  ShowProject(allProjects);
  searchInput.value = "";
  if (!isClick) {
    searchInput.style.display = "block";
    searchInput.focus();
    projectsFilter.classList.toggle("project-pill");
    searchBtn.style.cssText += `
      background-color : #3498db;
      color: #ffffff;
    `;
    searchBtn.innerHTML = `
      <i class="fa-solid fa-x"></i>
    `;
    isClick = !isClick;
  } else {
    projectsFilter.classList.toggle("project-pill");
    searchInput.style.display = "none";
    searchBtn.style.cssText += `
      background-color : #f8f9fa;
      color: #2c3e50;
    `;
    searchBtn.innerHTML = `
          <i class="fa-solid fa-magnifying-glass"></i>
    `;
    isClick = !isClick;
  }
});
searchBtn.addEventListener("mouseover", () => {
  searchBtn.style.cssText = `
    color: #fff;
    background-color: #3498db;
  `;
});
searchBtn.addEventListener("mouseleave", () => {
  if (!isClick) {
    searchBtn.style.cssText = `
      color: #2c3e50;
      background-color: #f8f9fa;
    `;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  fetch("js/project.json")
    .then((reponse) => reponse.json())
    .then((data) => {
      ShowProject(data);
      allProjects = data;
    })
    .catch((error) => {
      console.log("Error fetching", error);
    });
});

searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredProducts = allProjects.filter((projects) => {
    return projects.title.toLowerCase().includes(searchTerm);
  });
  ShowProject(filteredProducts);
});

function filterClickedFunction(name) {
  console.log(name);
}

const ShowProject = (projects) => {
  projectContainer.innerHTML = '';
  projects.forEach((project) => {
    let i = 0;
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML += `
      <img src="${project.image}" alt="Project ${i}">
      <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
              <a href="${project.links.liveDemo}" class="btn btn-small">Live Demo</a>
              <a href="${project.links.github}" class="btn btn-small btn-secondary">GitHub</a>
          </div>
      </div>
    `;
    projectContainer.appendChild(projectCard);
    i++;
  });
};

// Back to Top Button function
const backToTopBtn = document.getElementById("backToTopBtn");
const backToTopIcon = document.getElementById("backToTopIcon");

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

//back to top tool-tips (pill button) animations
backToTopBtn.addEventListener("mouseenter", () => {
  backToTopBtn.classList.toggle("pill");
});

backToTopBtn.addEventListener("mouseleave", () => {
  backToTopBtn.classList.toggle("pill");
});
