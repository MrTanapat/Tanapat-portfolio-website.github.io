// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
//onload typewriting animation
const titleText = document.querySelector("#titleText");
const highlightText = document.querySelector("#highlightText");
const subtitleText = document.querySelector("#subtitleText");
const descriptionText = document.querySelector("#descriptionText");
const cursor = document.querySelector("#cursor");



function blinkingCursor() {
    cursor.classList.add("blinking");
    //add blinking class
}

//onload to typewriting effect
window.addEventListener("load", async () => {
  //wait for each line to fish then blink cursor
  await typeWriter(titleText, "Hi, I'm"); 
  highlightText.innerHTML += '&ensp;';
  await typeWriter(highlightText, "Tanapat");
  highlightText.innerHTML += '<br>';
  await typeWriter(subtitleText, "Full Stack Developer");
  subtitleText.innerHTML += '<br>';
  await typeWriter(descriptionText, "I create beautiful and functional web applications", 30);

  blinkingCursor(); //then blinking
});

//typewriting animation object
const typeWriter = (element, text,  speed = 70, ) => {
  var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style); 

  return new Promise(resolve => {
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
    cursor.style.height = (fontSize + 3) + "px";
    console.log(element.style.fontSize);
    cursor.style.bottom = (fontSize / 2) + "px";
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
  backToTopBtn.classList.add('pill')
  backToTopIcon.innerHTML = "<span class='pillText'>&ensp;Back To Top</span>"
});

backToTopBtn.addEventListener("mouseleave", () => {
  backToTopBtn.classList.remove('pill');
  backToTopIcon.innerHTML = "";

});
