/* Premium Motion & Logic Engine: PureAura */

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ================= DATA STORE =================
const PRODUCTS = [
    {
        id: "p1",
        title: "Botanical Bloom Serum",
        description: "Soothing serum formulated with niacinamide and centella extract.",
        descriptionLong: "Botanical Bloom Serum is a highly concentrated treatment designed to immediately calm sensitive and irritated skin. Niacinamide regulates sebum production, refines pores, and gently evens out skin tone. Centella Asiatica extract stimulates regeneration processes, targets redness, and strengthens the skin's protective moisture barrier.",
        price: 34,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        skinType: ["dry", "sensitive", "combination"],
        concern: ["redness", "hydration"],
        format: "serum",
        composition: [
            { name: "Centella Asiatica Extract", purpose: "Reduces inflammation, accelerates healing" },
            { name: "Niacinamide (Vitamin B3)", purpose: "Brightens tone, strengthens skin barrier" },
            { name: "Sodium Hyaluronate", purpose: "Attracts and locks moisture inside cells" },
            { name: "Panthenol", purpose: "Softens, calms itching and irritation" }
        ],
        badge: "Best Seller"
    },
    {
        id: "p2",
        title: "Squalane Hydrating Cream",
        description: "Deeply hydrating facial cream containing pure olive-derived squalane.",
        descriptionLong: "A rich yet fast-absorbing cream that restores dehydrated skin by creating a protective lipid layer. Pure olive-derived squalane mimics skin's natural sebum components, preventing moisture loss. A specialized ceramide complex repairs and reinforces the damaged epidermal barrier.",
        price: 38,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
        skinType: ["dry", "combination"],
        concern: ["hydration", "aging"],
        format: "cream",
        composition: [
            { name: "Plant-Derived Squalane", purpose: "Deep softening, prevents dehydration" },
            { name: "Ceramide NP", purpose: "Restores protective lipid barrier" },
            { name: "Shea Butter", purpose: "Nourishes, eliminates dry patches" },
            { name: "Tocopherol (Vitamin E)", purpose: "Provides essential antioxidant defense" }
        ],
        badge: "New"
    },
    {
        id: "p3",
        title: "Herbal Cleansing Oil",
        description: "Hydrophilic makeup removing oil infused with 5 healing herbs.",
        descriptionLong: "Herbal Cleansing Oil delicately dissolves stubborn makeup, SPF filters, and excess sebum without striping the skin's moisture. It emulsifies into a gentle cleansing milk upon contact with water. Chamomile, sage, and green tea extracts soothe skin and help prevent blackheads.",
        price: 26,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
        skinType: ["dry", "oily", "combination"],
        concern: ["pores"],
        format: "oil",
        composition: [
            { name: "Sweet Almond Oil", purpose: "Cleansing oil base, conditions skin" },
            { name: "Green Tea Extract", purpose: "Antioxidant protection, sebum control" },
            { name: "Chamomile Flower Extract", purpose: "Calms irritation, natural antiseptic" },
            { name: "Sage Oil", purpose: "Offers antimicrobial and toning benefits" }
        ],
        badge: "Best Seller"
    },
    {
        id: "p4",
        title: "Rosemary Balancing Toner",
        description: "Pore-refining balancing toner containing pure rosemary hydrosol.",
        descriptionLong: "This lightweight toner restores the skin's natural pH level after cleansing, refines pores, and preps the face for subsequent treatments. Natural rosemary hydrosol acts as an astringent and antiseptic, balancing moisture and oil levels.",
        price: 22,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
        skinType: ["oily", "combination"],
        concern: ["pores", "redness"],
        format: "toner",
        composition: [
            { name: "Rosemary Leaf Water", purpose: "Tones, regulates skin oil production" },
            { name: "Witch Hazel Extract", purpose: "Refines pores, reduces facial puffiness" },
            { name: "Salicylic Acid (BHA)", purpose: "Gently exfoliates dead skin cells" },
            { name: "Allantoin", purpose: "Soothes, conditions, and softens skin layers" }
        ],
        badge: "New"
    },
    {
        id: "p5",
        title: "Bakuchiol Youth Elixir",
        description: "Anti-aging serum containing bakuchiol, a gentle retinol alternative.",
        descriptionLong: "This clean elixir stimulates collagen synthesis, minimizes fine lines, and refines skin texture. Bakuchiol is a safe, botanical alternative to retinol that delivers matching results without dryness, peeling, or sun sensitivity, making it perfect for daily use.",
        price: 42,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
        skinType: ["dry", "oily", "sensitive", "combination"],
        concern: ["aging", "hydration"],
        format: "serum",
        composition: [
            { name: "Bakuchiol (1.5%)", purpose: "Boosts collagen, smooths skin texture" },
            { name: "Rosehip Seed Oil", purpose: "Nourishes deeply, aids skin repair" },
            { name: "Coenzyme Q10", purpose: "Fights free radicals, protects from aging" },
            { name: "Aloe Vera Juice", purpose: "Provides cooling, anti-inflammatory hydration" }
        ],
        badge: "Best Seller"
    },
    {
        id: "p6",
        title: "Centella Calming Gel Cream",
        description: "Lightweight gel moisturizer targeting redness and breakouts.",
        descriptionLong: "An ultra-fresh, water-based gel cream that sinks in instantly without leaving any sticky residue. Specifically formulated for oily and sensitive skin types. Contains 70% Centella Asiatica leaf water to immediately relieve irritation, calm redness, and reduce oiliness.",
        price: 28,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        skinType: ["oily", "sensitive", "combination"],
        concern: ["redness", "pores"],
        format: "cream",
        composition: [
            { name: "Centella Asiatica Leaf Water (70%)", purpose: "Calms inflammation, heals skin micro-damage" },
            { name: "Tea Tree Extract", purpose: "Purifying antiseptic, targets blemishes" },
            { name: "Licorice Root Extract", purpose: "Gently brightens post-acne dark spots" },
            { name: "Glycerin", purpose: "Offers crucial, clean humectant hydration" }
        ],
        badge: "New"
    },
    {
        id: "p7",
        title: "Jasmine Nocturnal Balm",
        description: "Overnight repairing sleeping balm with pure jasmine extract.",
        descriptionLong: "Jasmine Nocturnal Balm works with your skin's nighttime regeneration cycle to repair, deeply hydrate, and soothe. Pure jasmine flower extract provides a calming aroma while delivering antioxidants. Hyaluronic acid and botanical butters lock in moisture, letting you wake up to plumper, glowing skin.",
        price: 46,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
        textureImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
        skinType: ["dry", "sensitive"],
        concern: ["hydration", "redness", "aging"],
        format: "cream",
        composition: [
            { name: "Jasmine Flower Extract", purpose: "Soothes skin, delivers rich antioxidants" },
            { name: "Hyaluronic Acid", purpose: "Deep humectant hydration" },
            { name: "Shea & Mango Seed Butter", purpose: "Locks in skin moisture overnight" },
            { name: "Chamomile Water", purpose: "Calms redness and inflammation" }
        ],
        badge: "New"
    }
];

// ================= STATE MANAGEMENT =================
const state = {
    currentView: "home",
    filters: {
        skin: "all",
        concern: "all",
        format: "all"
    },
    cart: JSON.parse(localStorage.getItem("pureaura_cart")) || []
};

// Price Formatting Helper
function formatPrice(value) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// ================= SMOOTH SCROLL (LENIS) =================
let lenis;
function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// ================= APP INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initScrollRevealText();
    initProductEvents(); // Initialize click handlers
    renderHomeSlider();   // Populates 7 products dynamically
    initDragSlider();
    initCatalogFilters();
    initCartSystem();
    initCheckoutSystem();
    
    // Initial Render
    renderCatalog();
});

// ================= SPRING CUSTOM CURSOR =================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Spring physics interpolation
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        
        if (cursor) {
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
    
    bindCursorInteractions();
}

function bindCursorInteractions() {
    const cursor = document.getElementById("custom-cursor");
    const cursorText = document.getElementById("cursor-text");
    
    document.addEventListener("mouseover", (e) => {
        const target = e.target;
        
        if (target.closest(".btn, .btn-add-to-cart, .btn-detail-add-to-cart, .nav-link, .cart-trigger, .menu-hamburger, .qty-btn, .cart-item-remove, .filter-chip, .slider-arrow")) {
            cursor.classList.add("hovering-button");
        } else if (target.closest(".product-card-image, .product-title, .gallery-main-frame, .gallery-thumb-frame")) {
            cursor.classList.add("hovering-product");
            cursorText.textContent = "VIEW";
        } else {
            cursor.classList.remove("hovering-button");
            cursor.classList.remove("hovering-product");
        }
    });
}

// ================= ROUTING & NAV =================
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-link");
    const logoLink = document.getElementById("logo-link");
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = link.getAttribute("data-target");
            switchView(targetView);
            
            if (mobileMenu.classList.contains("active")) {
                toggleMobileMenu();
            }
        });
    });
    
    logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("home");
    });
    
    document.getElementById("hero-to-catalog-btn").addEventListener("click", () => switchView("catalog"));
    document.getElementById("hero-to-values-btn").addEventListener("click", () => {
        const offset = document.querySelector(".values-section").offsetTop - 80;
        lenis.scrollTo(offset);
    });
    
    menuBtn.addEventListener("click", toggleMobileMenu);
}

function toggleMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const isOpen = mobileMenu.classList.contains("active");
    
    if (isOpen) {
        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        lenis.start();
    } else {
        menuBtn.classList.add("active");
        mobileMenu.classList.add("active");
        lenis.stop();
        
        gsap.fromTo(".mobile-nav-link", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out", delay: 0.2 }
        );
    }
}

function switchView(viewName) {
    if (state.currentView === viewName && viewName !== "product") return;
    
    const activeViewEl = document.querySelector(".page-view.active");
    const nextViewEl = document.getElementById(`view-${viewName}`);
    
    if (!nextViewEl) return;
    
    gsap.to(activeViewEl, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
            activeViewEl.classList.remove("active");
            window.scrollTo(0, 0);
            
            nextViewEl.classList.add("active");
            gsap.fromTo(nextViewEl, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
            );
            
            state.currentView = viewName;
            updateNavPillState(viewName);
        }
    });
}

function updateNavPillState(viewName) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        const linkTarget = link.getAttribute("data-target");
        if (linkTarget === viewName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// ================= HERO MOTION =================
function initHeroAnimations() {
    const title = document.getElementById("hero-title");
    if (title) {
        const spans = title.querySelectorAll("span");
        spans.forEach(span => {
            if (span.classList.contains("inline-typography-image")) return;
            const text = span.textContent;
            span.innerHTML = "";
            text.split("").forEach(char => {
                const letter = document.createElement("span");
                letter.className = "letter";
                letter.textContent = char === " " ? "\u00A0" : char;
                span.appendChild(letter);
            });
        });
        
        gsap.from(".letter", {
            opacity: 0,
            y: 50,
            filter: "blur(6px)",
            stagger: 0.015,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.1
        });
    }

    gsap.to(".orb-1", {
        x: "+=70",
        y: "+=60",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    gsap.to(".orb-2", {
        x: "-=80",
        y: "-=70",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    gsap.to(".orb-3", {
        x: "+=60",
        y: "-=60",
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    
    gsap.from(".hero-img", {
        scale: 1.08,
        duration: 2.5,
        ease: "power3.out"
    });

    initMagneticButtons();
}

function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".cart-trigger, .btn-primary, .slider-arrow");
    magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.35,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });
}

// ================= STORY SCROLL REVEAL (Desire / GSAP Scrubbing) =================
function initScrollRevealText() {
    const words = document.querySelectorAll(".reveal-word");
    if (words.length === 0) return;
    
    gsap.to(words, {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
            trigger: ".story-reveal-section",
            start: "top 75%",
            end: "bottom 35%",
            scrub: true
        }
    });
}

// ================= TOUCH & DRAG SLIDER =================
function initDragSlider() {
    const slider = document.getElementById("hits-slider");
    const track = document.getElementById("hits-track");
    const prevBtn = document.querySelector(".btn-prev");
    const nextBtn = document.querySelector(".btn-next");
    
    if (!slider || !track) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener("mouseleave", () => {
        isDown = false;
    });
    
    slider.addEventListener("mouseup", () => {
        isDown = false;
    });
    
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    slider.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener("touchend", () => {
        isDown = false;
    });
    
    slider.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    const cardWidth = 314;
    
    prevBtn.addEventListener("click", () => {
        slider.scrollTo({
            left: slider.scrollLeft - cardWidth,
            behavior: "smooth"
        });
    });
    
    nextBtn.addEventListener("click", () => {
        slider.scrollTo({
            left: slider.scrollLeft + cardWidth,
            behavior: "smooth"
        });
    });
}

// ================= DYNAMIC PRODUCT RENDERING (Encapsulated 3D Tilt) =================
function createProductCardHTML(prod) {
    const card = document.createElement("div");
    card.className = "product-card double-bezel-outer";
    card.setAttribute("data-id", prod.id);
    
    card.innerHTML = `
        <div class="double-bezel-inner">
            ${prod.badge ? `<div class="product-card-badge">${prod.badge}</div>` : ""}
            <div class="product-card-image">
                <img src="${prod.image}" alt="${prod.title}" class="product-img">
                <img src="${prod.textureImage}" alt="${prod.title} texture" class="product-texture-img">
            </div>
            <div class="product-card-info">
                <h3 class="product-title">${prod.title}</h3>
                <p class="product-description">${prod.description}</p>
                <div class="product-price-row">
                    <span class="product-price">${formatPrice(prod.price)}</span>
                    <button class="btn-add-to-cart ${isProductInCart(prod.id) ? "added" : ""}" data-id="${prod.id}">
                        <span>${isProductInCart(prod.id) ? "In Ritual" : "Add"}</span>
                        <i class="ph-light ${isProductInCart(prod.id) ? "ph-check" : "ph-plus"}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Direct 3D Tilt binding for encapsulation
    bindTiltToElement(card);
    
    return card;
}

function bindTiltToElement(card) {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const tiltX = ((y / rect.height) - 0.5) * -12;
        const tiltY = ((x / rect.width) - 0.5) * 12;
        
        const inner = card.querySelector(".double-bezel-inner");
        if (inner) {
            inner.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });
    
    card.addEventListener("mouseleave", () => {
        const inner = card.querySelector(".double-bezel-inner");
        if (inner) {
            inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
    });
}

// Global Event Delegation for Product Clicks
function initProductEvents() {
    document.addEventListener("click", (e) => {
        // Add to Cart click
        const addBtn = e.target.closest(".btn-add-to-cart");
        if (addBtn) {
            e.preventDefault();
            const id = addBtn.getAttribute("data-id");
            addToCart(id);
            addBtn.classList.add("added");
            addBtn.innerHTML = `<span>In Ritual</span><i class="ph-light ph-check"></i>`;
            return;
        }

        // Title or Image click -> Navigate to details
        const detailsTrigger = e.target.closest(".product-title, .product-card-image");
        if (detailsTrigger) {
            const card = detailsTrigger.closest(".product-card");
            if (card) {
                const id = card.getAttribute("data-id");
                showProductDetails(id);
            }
        }
    });
}

function renderHomeSlider() {
    const track = document.getElementById("hits-track");
    if (!track) return;
    track.innerHTML = "";
    
    PRODUCTS.forEach(prod => {
        const slide = createProductCardHTML(prod);
        track.appendChild(slide);
    });
}

// ================= CATALOG SYSTEM =================
function initCatalogFilters() {
    const filterChips = document.querySelectorAll(".filter-chip");
    
    filterChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const filterType = chip.getAttribute("data-filter");
            const filterValue = chip.getAttribute("data-value");
            
            const groupChips = document.querySelectorAll(`.filter-chip[data-filter="${filterType}"]`);
            groupChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            
            state.filters[filterType] = filterValue;
            
            renderCatalogWithAnimation();
        });
    });
}

function renderCatalog() {
    const grid = document.getElementById("catalog-products-grid");
    const emptyState = document.getElementById("catalog-empty");
    if (!grid) return;
    
    const filteredProducts = PRODUCTS.filter(prod => {
        const matchSkin = state.filters.skin === "all" || prod.skinType.includes(state.filters.skin);
        const matchConcern = state.filters.concern === "all" || prod.concern.includes(state.filters.concern);
        const matchFormat = state.filters.format === "all" || prod.format === state.filters.format;
        return matchSkin && matchConcern && matchFormat;
    });
    
    grid.innerHTML = "";
    
    if (filteredProducts.length === 0) {
        emptyState.style.display = "block";
        grid.style.display = "none";
        return;
    }
    
    emptyState.style.display = "none";
    grid.style.display = "grid";
    
    filteredProducts.forEach(prod => {
        const card = createProductCardHTML(prod);
        grid.appendChild(card);
    });
}

function renderCatalogWithAnimation() {
    const grid = document.getElementById("catalog-products-grid");
    if (!grid) return;
    
    const cards = grid.querySelectorAll(".product-card");
    if (cards.length > 0) {
        gsap.to(cards, {
            opacity: 0,
            y: 10,
            scale: 0.98,
            duration: 0.25,
            stagger: 0.03,
            ease: "power2.out",
            onComplete: () => {
                renderCatalog();
                const newCards = grid.querySelectorAll(".product-card");
                gsap.fromTo(newCards,
                    { opacity: 0, y: 15, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }
                );
            }
        });
    } else {
        renderCatalog();
        const newCards = grid.querySelectorAll(".product-card");
        gsap.fromTo(newCards,
            { opacity: 0, y: 15, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }
        );
    }
}

// ================= PRODUCT DETAILS VIEW =================
function showProductDetails(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;
    
    const container = document.getElementById("product-detail-content");
    
    container.innerHTML = `
        <div class="product-detail-layout">
            <div class="product-detail-gallery">
                <div class="gallery-main-container double-bezel-outer">
                    <div class="double-bezel-inner">
                        <div class="gallery-main-frame" id="zoom-frame">
                            <img src="${prod.image}" alt="${prod.title}" class="gallery-main-img" id="main-gallery-img">
                        </div>
                    </div>
                </div>
                <div class="gallery-thumbnails">
                    <div class="gallery-thumb-container double-bezel-outer active" data-src="${prod.image}">
                        <div class="double-bezel-inner">
                            <div class="gallery-thumb-frame">
                                <img src="${prod.image}" alt="${prod.title}" class="gallery-thumb-img">
                            </div>
                        </div>
                    </div>
                    <div class="gallery-thumb-container double-bezel-outer" data-src="${prod.textureImage}">
                        <div class="double-bezel-inner">
                            <div class="gallery-thumb-frame">
                                <img src="${prod.textureImage}" alt="${prod.title} texture" class="gallery-thumb-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="product-detail-info">
                <div class="product-detail-header">
                    <span class="eyebrow-badge">${prod.badge || "Treatment"}</span>
                    <h1 class="product-detail-title">${prod.title}</h1>
                    <span class="product-detail-price">${formatPrice(prod.price)}</span>
                </div>
                
                <p class="product-detail-desc">${prod.descriptionLong}</p>
                
                <div class="product-ingredients-block double-bezel-outer">
                    <div class="double-bezel-inner">
                        <h3 class="ingredients-title">Key Active Ingredients</h3>
                        <div class="ingredients-list">
                            ${prod.composition.map(ing => `
                                <div class="ingredient-item">
                                    <span class="ingredient-name">${ing.name}</span>
                                    <span class="ingredient-purpose">— ${ing.purpose}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                
                <div class="detail-action-row">
                    <button class="btn-detail-add-to-cart ${isProductInCart(prod.id) ? "added" : ""}" id="detail-add-btn" data-id="${prod.id}">
                        <span>${isProductInCart(prod.id) ? "Already In Ritual" : "Add to Ritual"}</span>
                        <i class="ph-light ${isProductInCart(prod.id) ? "ph-check" : "ph-shopping-bag"}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    switchView("product");
    initGalleryLogic();
    bindCursorInteractions();
    
    const detailAddBtn = document.getElementById("detail-add-btn");
    detailAddBtn.addEventListener("click", () => {
        if (isProductInCart(prod.id)) {
            openCart();
            return;
        }
        addToCart(prod.id);
        detailAddBtn.classList.add("added");
        detailAddBtn.innerHTML = `<span>Already In Ritual</span><i class="ph-light ph-check"></i>`;
    });
}

function initGalleryLogic() {
    const mainImg = document.getElementById("main-gallery-img");
    const zoomFrame = document.getElementById("zoom-frame");
    const thumbs = document.querySelectorAll(".gallery-thumb-container");
    
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            thumbs.forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
            
            const targetSrc = thumb.getAttribute("data-src");
            
            gsap.to(mainImg, {
                opacity: 0,
                duration: 0.15,
                onComplete: () => {
                    mainImg.src = targetSrc;
                    gsap.to(mainImg, { opacity: 1, duration: 0.25 });
                }
            });
        });
    });
    
    zoomFrame.addEventListener("mousemove", (e) => {
        if (!zoomFrame.classList.contains("zoomed")) return;
        const rect = zoomFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
    
    zoomFrame.addEventListener("click", () => {
        zoomFrame.classList.toggle("zoomed");
        if (!zoomFrame.classList.contains("zoomed")) {
            mainImg.style.transformOrigin = "center center";
        }
    });
    
    zoomFrame.addEventListener("mouseleave", () => {
        zoomFrame.classList.remove("zoomed");
        mainImg.style.transformOrigin = "center center";
    });
}

// ================= CART DRAWER SYSTEM =================
function initCartSystem() {
    const cartBtn = document.getElementById("cart-btn");
    const cartCloseBtn = document.getElementById("cart-close-btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const checkoutTrigger = document.getElementById("checkout-trigger-btn");
    
    cartBtn.addEventListener("click", openCart);
    cartCloseBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    
    checkoutTrigger.addEventListener("click", () => {
        if (state.cart.length === 0) return;
        closeCart();
        openCheckout();
    });
    
    updateCartUI();
}

function openCart() {
    document.getElementById("cart-drawer").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
    lenis.stop();
}

// Persisted Cart Sync in Catalog view state
function closeCart() {
    document.getElementById("cart-drawer").classList.remove("active");
    document.getElementById("cart-overlay").classList.remove("active");
    lenis.start();
}

function isProductInCart(id) {
    return state.cart.some(item => item.id === id);
}

function addToCart(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;
    
    const existingItem = state.cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            image: prod.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${prod.title} added to your ritual`);
}

function showToast(message) {
    const toast = document.getElementById("toast-notif");
    const msgEl = document.getElementById("toast-msg");
    msgEl.textContent = message;
    
    toast.classList.add("active");
    
    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500);
}

function saveCart() {
    localStorage.setItem("pureaura_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const countBadge = document.querySelector(".cart-count");
    const totalCountEl = document.getElementById("cart-total-count");
    const subtotalEl = document.getElementById("cart-subtotal");
    
    container.innerHTML = "";
    
    let totalItems = 0;
    let subtotal = 0;
    
    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-message" style="text-align:center; padding:40px 0; color:var(--color-text-muted);">
                <i class="ph-light ph-shopping-bag-open" style="font-size:32px; display:block; margin-bottom:12px; color:var(--color-primary);"></i>
                Your ritual is empty.
            </div>
        `;
    } else {
        state.cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;
            
            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div class="cart-item-img-container">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                    <div class="cart-item-controls">
                        <div class="cart-qty-selector">
                            <button class="qty-btn dec-qty" data-id="${item.id}"><i class="ph-light ph-minus"></i></button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn inc-qty" data-id="${item.id}"><i class="ph-light ph-plus"></i></button>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}"><i class="ph-light ph-trash"></i></button>
                    </div>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }
    
    countBadge.textContent = totalItems;
    totalCountEl.textContent = totalItems;
    subtotalEl.textContent = formatPrice(subtotal);
    
    bindCartControls();
    bindCursorInteractions();
}

function bindCartControls() {
    document.querySelectorAll(".inc-qty").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const item = state.cart.find(i => i.id === id);
            if (item) {
                item.quantity += 1;
                saveCart();
                updateCartUI();
            }
        });
    });
    
    document.querySelectorAll(".dec-qty").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const item = state.cart.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCart();
                updateCartUI();
            }
        });
    });
    
    document.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            state.cart = state.cart.filter(item => item.id !== id);
            saveCart();
            updateCartUI();
            
            if (state.currentView === "catalog") {
                renderCatalog();
            }
        });
    });
}

// ================= CHECKOUT MODAL SYSTEM =================
function initCheckoutSystem() {
    const checkoutOverlay = document.getElementById("checkout-overlay");
    const checkoutClose = document.getElementById("checkout-close-btn");
    const checkoutForm = document.getElementById("checkout-form");
    
    checkoutClose.addEventListener("click", closeCheckout);
    
    checkoutOverlay.addEventListener("click", (e) => {
        if (e.target === checkoutOverlay) {
            closeCheckout();
        }
    });
    
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        processOrder();
    });
}

function openCheckout() {
    const totalVal = document.getElementById("cart-subtotal").textContent;
    document.getElementById("checkout-total-price").textContent = totalVal;
    
    document.getElementById("checkout-overlay").classList.add("active");
    lenis.stop();
}

function closeCheckout() {
    document.getElementById("checkout-overlay").classList.remove("active");
    lenis.start();
}

function processOrder() {
    const submitBtn = document.getElementById("place-order-btn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Processing...</span><span class="btn-icon-circle"><i class="ph-light ph-spinner-gap spin"></i></span>`;
    
    const spinIcon = submitBtn.querySelector("i");
    spinIcon.style.animation = "spin 1s linear infinite";
    
    setTimeout(() => {
        state.cart = [];
        saveCart();
        updateCartUI();
        renderCatalog();
        closeCheckout();
        
        showToast("Order placed successfully! We've sent a confirmation email.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Place Order <span class="btn-icon-circle"><i class="ph-light ph-check"></i></span>`;
        
        setTimeout(() => {
            switchView("home");
        }, 1500);
        
    }, 2000);
}
