
// Testimonial data
const testimonials = [
  {
    text: "Roof repairs can be a real headache, but HomePro makes it easy! Their roofing team turned my leaky roof into a stockade. With their craftsmanship and the best materials, my house is now ready to weather any storm.",
    name: "Kende Attila",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    company: {
      name: "Trustpilot",
      logo: "https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg",
    },
  },
  {
    text: "Outstanding service from start to finish! The team was professional, efficient, and completed the job ahead of schedule. I couldn't be happier with the results.",
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    company: {
      name: "Google Reviews",
      logo: "https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg",
    },
  },
  {
    text: "I was impressed by their attention to detail and commitment to quality. They went above and beyond to ensure everything was perfect.",
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    company: {
      name: "Yelp",
      logo: "https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg",
    },
  },
];

// DOM elements
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const reviewText = document.getElementById("review-text");
const userName = document.getElementById("user-name");
const userImg = document.getElementById("user-img");
const userRating = document.getElementById("user-rating");
const dotsContainer = document.getElementById("dots-container");

let currentIndex = 0;

// Create star rating HTML
function createStarRating(rating) {
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    const starClass = i < rating ? "yellow" : "gray";
    starsHTML += `
      <svg class="star ${starClass}" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01z"></path>
      </svg>
    `;
  }
  return starsHTML;
}

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";
  testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `dot ${index === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => updateSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Update slide content
function updateSlide(index) {
  const testimonial = testimonials[index];
  const direction = index > currentIndex ? 1 : -1;
  const currentSlide = document.querySelector('.reviews');
  
  // Add slide-out animation
  currentSlide.style.opacity = '0';
  currentSlide.style.transform = `translateX(${-100 * direction}px)`;
  
  // Update button states
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === testimonials.length - 1;
  
  setTimeout(() => {
    // Update content
    reviewText.textContent = testimonial.text;
    userName.textContent = testimonial.name;
    userImg.src = testimonial.image;
    userRating.innerHTML = createStarRating(testimonial.rating);
    
    // Update company logo if exists
    const companyLogo = document.querySelector('.company-logo img');
    if (testimonial.company) {
      companyLogo.src = testimonial.company.logo;
      companyLogo.alt = testimonial.company.name;
    }
    
    // Update dots with smooth transition
    document.querySelectorAll('.dot').forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        // Add slide direction class
        dot.classList.add(direction > 0 ? 'slide-left' : 'slide-right');
      } else {
        dot.classList.remove('active', 'slide-left', 'slide-right');
      }
    });
    
    // Prepare for slide-in animation
    currentSlide.style.transform = `translateX(${100 * direction}px)`;
    
    // Trigger slide-in animation
    requestAnimationFrame(() => {
      currentSlide.style.opacity = '1';
      currentSlide.style.transform = 'translateX(0)';
    });
  }, 300);
  
  currentIndex = index;
}

// Event listeners
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    updateSlide(currentIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < testimonials.length - 1) {
    updateSlide(currentIndex + 1);
  }
});

// Initialize
createDots();
updateSlide(0);


// Nav bar
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("show");
}