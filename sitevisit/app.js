import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 1. ASSET PRELOADING CONFIG
const frameCount = 180;
// Vite serves public directory contents directly from '/'
const getFramePath = (index) => `./frames/frame_${(index + 1).toString().padStart(3, '0')}.webp`;

const images = [];
const animationState = { frame: 0 };
let loadedCount = 0;

const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');
const preloaderPercent = document.getElementById('preloader-percent');
const preloaderText = document.querySelector('.preloader-loading-text');

const canvas = document.getElementById('morph-canvas');
const context = canvas.getContext('2d');

// Initialize loading
function preloadImages() {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    
    img.onload = onAssetLoaded;
    img.onerror = onAssetLoadError;
    
    images.push(img);
  }
}

function onAssetLoaded() {
  loadedCount++;
  updatePreloaderProgress();
}

function onAssetLoadError(e) {
  console.error("Failed to load frame asset:", e.target.src);
  // Count as loaded to avoid locking the screen if an asset fails
  loadedCount++;
  updatePreloaderProgress();
}

function updatePreloaderProgress() {
  const percent = Math.floor((loadedCount / frameCount) * 100);
  preloaderBar.style.width = `${percent}%`;
  preloaderPercent.textContent = `${percent.toString().padStart(2, '0')}%`;
  
  if (loadedCount >= frameCount) {
    // Small delay for loading screen aesthetic transition
    setTimeout(startApplication, 600);
  }
}

// 2. CANVAS DRAWING LOGIC (Object-Fit: Cover algorithm)
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderFrame();
}

function renderFrame() {
  const img = images[animationState.frame];
  if (!img) return;
  
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageWidth = img.width;
  const imageHeight = img.height;
  
  const imageRatio = imageWidth / imageHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let drawX = 0;
  let drawY = 0;
  
  if (canvasRatio > imageRatio) {
    // Canvas is wider than image aspect ratio
    drawHeight = canvasWidth / imageRatio;
    drawY = (canvasHeight - drawHeight) / 2;
  } else {
    // Canvas is taller than image aspect ratio
    drawWidth = canvasHeight * imageRatio;
    drawX = (canvasWidth - drawWidth) / 2;
  }
  
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// 3. MAIN APPLICATION BOOTSTRAP
function startApplication() {
  // Fade out loader screen
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      preloader.style.display = 'none';
      initializeAnimations();
    }
  });
}

function initializeAnimations() {
  // Set initial canvas sizing
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // A. Hero Scroll Frame Animation using ScrollTrigger
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom+=250% top", // Scroll distance length (2.5x viewport height)
      scrub: 0.6, // Soft scrubbing delay for butter-smooth morphing
      pin: true, // Lock the hero section
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
  
  heroTimeline.to(animationState, {
    frame: frameCount - 1,
    snap: "frame", // Ensure it snaps to integer frame numbers
    ease: "none",
    onUpdate: renderFrame
  });

  // Fade in hero text elements
  gsap.fromTo('.hero-text-block', 
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
  );

  // Fade in watermark overlay badge widget
  gsap.fromTo('#watermark-overlay',
    { opacity: 0, scale: 0.95, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.4 }
  );

  // B. Bento Grid Card Reveals
  gsap.utils.toArray('.reveal-item').forEach((item) => {
    gsap.fromTo(item, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // C. Horizontal Scrolling Showcase for Collections
  const track = document.getElementById('horizontal-track');
  
  if (track && window.innerWidth > 768) {
    // Calculate scroll distance: total track width minus viewport width
    const getScrollAmount = () => {
      return Math.max(0, track.scrollWidth - window.innerWidth);
    };
    
    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: ".collections-section",
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  }

  // D. Scroll-driven SVG path drawing (curved clay thread)
  const path = document.getElementById('scroll-path');
  if (path) {
    path.style.strokeDasharray = "1";
    path.style.strokeDashoffset = "1";
    
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        endTrigger: ".footer",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });
  }
}

// 4. INTERACTION & UX GLUE
document.addEventListener('DOMContentLoaded', () => {
  // Start loading assets immediately
  preloadImages();
  
  // Header background transition on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Smooth Scroll mapping for CTAs
  const registerSmoothScroll = (triggerId, targetSelector) => {
    const trigger = document.getElementById(triggerId);
    const target = document.querySelector(targetSelector);
    if (trigger && target) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  registerSmoothScroll('widget-cta-btn', '#booking');
  registerSmoothScroll('header-cta-btn', '#booking');
  registerSmoothScroll('logo-link', '#hero');

  // Connect Schedule Table Rows to Booking Form Select
  const tableRows = document.querySelectorAll('.table-row-interactive');
  const workshopSelect = document.getElementById('form-workshop');
  
  tableRows.forEach(row => {
    row.addEventListener('click', () => {
      const workshopName = row.getAttribute('data-workshop');
      if (workshopSelect && workshopName) {
        workshopSelect.value = workshopName;
        // highlight form card visually
        const formCard = document.getElementById('booking');
        formCard.scrollIntoView({ behavior: 'smooth' });
        
        // Brief highlight effect on select input
        workshopSelect.style.borderColor = '#a34e36';
        setTimeout(() => {
          workshopSelect.style.borderColor = '#eae6df';
        }, 1000);
      }
    });
  });

  // Handle Booking Form Submission with Micro-Animations
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const submitBtn = document.getElementById('submit-btn');

  if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animate submit button to loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Simulate API call and slide transition
      setTimeout(() => {
        gsap.to(bookingForm, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          onComplete: () => {
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
            gsap.fromTo(bookingSuccess, 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
          }
        });
      }, 1200);
    });
  }

  // Close Success message and return to form
  const successCloseBtn = document.getElementById('success-close-btn');
  if (successCloseBtn && bookingForm && bookingSuccess) {
    successCloseBtn.addEventListener('click', () => {
      gsap.to(bookingSuccess, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          bookingSuccess.classList.add('hidden');
          bookingForm.classList.remove('hidden');
          bookingForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Book My Spot';
          gsap.fromTo(bookingForm,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4 }
          );
        }
      });
    });
  }
});
