// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
//onload typewriting animation
const titleText = document.querySelector("#titleText");
const highlightText = document.querySelector("#highlightText");
const subtitleText = document.querySelector("#subtitleText");
const descriptionText = document.querySelector("#descriptionText");




// window.addEventListener("load", () => {
//     await typeWriter(h1,"Hi, I'm Tanapat", 70, () => {
//       typeWriter(p1, "Full Stack Developer", 70, () => {
//         typeWriter(p2, "I create beautiful and functional web applications", 70)
//       });
//     })
// });

function blinkingCursor() {
    const cursor = document.querySelector("#cursor");
    cursor.classList.add("blinking");
    //add blinking class
}

window.addEventListener("load", async () => {
  //wait for each line to fish then blink cursor
  await new Promise(resolve => setTimeout(resolve, 200));
  await typeWriter(titleText, "Hi, I'm"); 
  highlightText.innerHTML += '&ensp;';
  await typeWriter(highlightText, "Tanapat");
  highlightText.innerHTML += '<br>';
  await typeWriter(subtitleText, "Full Stack Developer");
  subtitleText.innerHTML += '<br>';
  await typeWriter(descriptionText, "I create beautiful and functional web applications");

  blinkingCursor(); //then run this function
});

//typewriting animation object
const typeWriter = (element, text) => {
  return new Promise(resolve => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 70);
      } else {
        resolve();
      }
    };
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
