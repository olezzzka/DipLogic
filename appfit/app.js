/* -------------------------------------------------------------
 * FITMATCH INTERACTION ENGINE - ITERATION 3 REFINED
 * Handles view switching, swipe deck gestures with MATCH/PASS watermarks,
 * vector connector rendering, GPS coordinate ticks, bento-grid heatmap
 * population, and live simulated messaging.
 * ------------------------------------------------------------- */

// 1. RICH ATHLETE DATASET (8 PORTRAIT PROFILES)
const ATHLETE_PROFILES = [
  {
    id: 1,
    name: "Sarah Jenkins",
    age: 23,
    sport: "running",
    sportLabel: "RUNNING",
    level: "INTERMEDIATE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "Aiming for sub-25min 5K. Usually run campus perimeter tracks. Let's push paces together!",
    statPrimary: "4:35",
    unitPrimary: "MIN/KM PACE",
    statSecondary: "10K",
    unitSecondary: "MAX DISTANCE",
    proximity: "0.8 KM",
    locationHud: "Sarah is near the Campus Stadium (Sector 4)",
    schedule: [true, false, true, false, true, true, false],
    // 28 days workout intensity heatmap (0: none, 1: low, 2: mid, 3: high)
    heatmap: [1, 2, 0, 3, 1, 0, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 0, 3, 1, 2, 3, 0, 0, 1, 2, 3, 2],
    chatHistory: [
      { sender: "partner", text: "Hey! Saw you were looking for a high-pace runner. I'm heading out to the Stadium in about 15 minutes. Down to run?", time: "10:45 AM" },
      { sender: "me", text: "Hey Sarah! Definitely. I'll meet you near the main entrance loop. What pace are you starting with?", time: "10:46 AM" },
      { sender: "partner", text: "Starting warm-up at 5:00 min/km, then pushing to a solid 4:35 tempo. Let's do 3 laps!", time: "10:47 AM" }
    ],
    replies: [
      "Awesome! I'm putting on my running shoes now. See you at the entrance gate in 10 mins!",
      "If you're already there, look for the neon green running jacket. Let's go!",
      "Perfect run! We crushed that last kilometer. Let's schedule another run for Wednesday."
    ]
  },
  {
    id: 2,
    name: "Marcus Vance",
    age: 26,
    sport: "tennis",
    sportLabel: "TENNIS",
    level: "ADVANCED",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "Booked Court 3 at Campus Sports Club for 2 hours. Looking for a strong rally partner (NTRP 3.5+).",
    statPrimary: "4.0",
    unitPrimary: "NTRP RATING",
    statSecondary: "2 HRS",
    unitSecondary: "SESSION LEN",
    proximity: "1.4 KM",
    locationHud: "Marcus is at the Clay Court Complex",
    schedule: [false, true, false, true, false, true, true],
    heatmap: [0, 3, 0, 1, 0, 2, 3, 0, 3, 0, 2, 0, 1, 3, 0, 2, 3, 0, 1, 0, 2, 0, 3, 0, 1, 2, 3, 0],
    chatHistory: [
      { sender: "partner", text: "Hey! Ready for some intense singles rallies? I've got balls and the court is reserved.", time: "11:18 AM" },
      { sender: "me", text: "Hi Marcus! Sounds perfect. I play at NTRP 3.5-4.0. Is 12:00 PM still good for you?", time: "11:20 AM" }
    ],
    replies: [
      "Sounds great! Bring your racket, I will bring a fresh tube of Penn Tour balls.",
      "Just arrived at Court 3. Let's stretch and start hitting!",
      "What a match! That backhand down the line was insane. Let's play next Saturday."
    ]
  },
  {
    id: 3,
    name: "Alex Rivera",
    age: 25,
    sport: "cycling",
    sportLabel: "CYCLING",
    level: "EXPERT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "40km road endurance route. High tempo (28-30 km/h average). Bring hydration and helmet.",
    statPrimary: "30",
    unitPrimary: "KM/H AVG SPEED",
    statSecondary: "40K",
    unitSecondary: "TOTAL ROUTE",
    proximity: "3.2 KM",
    locationHud: "Alex is near the West Lake Bridge entrance",
    schedule: [true, false, false, false, true, true, true],
    heatmap: [3, 0, 0, 0, 3, 2, 1, 3, 0, 0, 0, 2, 3, 3, 1, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0, 1, 3, 3],
    chatHistory: [
      { sender: "partner", text: "Hey cyclist, we are leaving the West Gate at 12:15. Pace will be quick. Join us?", time: "12:06 PM" }
    ],
    replies: [
      "Awesome, wait up! I'm pumping my tires now and climbing up the bridge.",
      "We are cycling in a group of three. Keep drafting behind and save your energy!",
      "Great ride today. That climb was killer. Let's plan a 60K next Sunday."
    ]
  },
  {
    id: 4,
    name: "Dmitry Sokolov",
    age: 22,
    sport: "fitness",
    sportLabel: "FITNESS",
    level: "ADVANCED",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "High-intensity functional body building and weight training. Pushing personal records today. Need a spotter.",
    statPrimary: "140",
    unitPrimary: "KG MAX BENCH",
    statSecondary: "5 DAYS",
    unitSecondary: "WEEKLY SPLIT",
    proximity: "0.2 KM",
    locationHud: "Dmitry is at the Campus Gym power racks",
    schedule: [true, true, true, false, true, true, false],
    heatmap: [2, 3, 2, 0, 3, 2, 0, 3, 2, 3, 0, 2, 3, 0, 2, 3, 2, 0, 3, 2, 0, 3, 2, 3, 0, 2, 3, 0],
    chatHistory: [
      { sender: "partner", text: "Hey! In the weight room right now. Need a spot on bench press soon. You nearby?", time: "12:15 PM" }
    ],
    replies: [
      "Let's go! I'm by the dumbbells. Walk over to rack 3.",
      "Just finished my set. Grab the barbell, I've got you covered.",
      "Huge lift today! Next time we push for 145kg. Keep grinding!"
    ]
  },
  {
    id: 5,
    name: "Emily Chen",
    age: 24,
    sport: "fitness",
    sportLabel: "YOGA",
    level: "INTERMEDIATE",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "Focusing on core flexibility and power vinyasa flows. Looking to host outdoor morning yoga in Campus Park.",
    statPrimary: "3 YRS",
    unitPrimary: "PRACTICE EXP",
    statSecondary: "60 MIN",
    unitSecondary: "FLOW DURATION",
    proximity: "1.1 KM",
    locationHud: "Emily is near the Campus Park lawn",
    schedule: [true, true, false, true, false, true, false],
    heatmap: [1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 1, 0, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 2, 1, 0, 1],
    chatHistory: [
      { sender: "partner", text: "Hello! Doing a power flow tomorrow morning at 8:00 AM under the big oak tree. Want to join?", time: "09:30 AM" }
    ],
    replies: [
      "Fantastic! Bring a yoga mat and warm layers, it gets a bit chilly in the shade.",
      "Just setting up my mat now. It's a gorgeous morning!",
      "Namaste! Thanks for flowing with me. Let's do it again next week."
    ]
  },
  {
    id: 6,
    name: "Jordan Taylor",
    age: 21,
    sport: "tennis",
    sportLabel: "BASKETBALL",
    level: "INTERMEDIATE",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "Running pickup games at the outdoor campus courts. Need 2 players for 3v3 games. Fast-paced play.",
    statPrimary: "3v3",
    unitPrimary: "GAME MODE",
    statSecondary: "85",
    unitSecondary: "AVG POINTS",
    proximity: "2.5 KM",
    locationHud: "Jordan is at the Outdoor Basketball Courts",
    schedule: [false, false, true, false, true, true, true],
    heatmap: [0, 0, 3, 0, 2, 3, 3, 0, 0, 2, 0, 3, 2, 3, 0, 0, 3, 0, 2, 3, 1, 0, 0, 3, 0, 2, 3, 3],
    chatHistory: [
      { sender: "partner", text: "Yo! We got a solid squad here. Just need one more for 3v3. We start in 20. You down?", time: "04:15 PM" }
    ],
    replies: [
      "Perfect! Meet us on Court B. We've got the black jerseys.",
      "Just warmed up. Let's play!",
      "Good games today, that last layout was clean. Let's run it back on Wednesday."
    ]
  },
  {
    id: 7,
    name: "Elena Petrova",
    age: 22,
    sport: "cycling",
    sportLabel: "SWIMMING",
    level: "ADVANCED",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "Targeting 100m interval sets at the indoor campus pool. Usually swimming lanes 4-6. Pace is 1:25/100m.",
    statPrimary: "1:25",
    unitPrimary: "MIN/100M PACE",
    statSecondary: "1.5K",
    unitSecondary: "SESSION DIST",
    proximity: "0.5 KM",
    locationHud: "Elena is at the Aquatics Center",
    schedule: [true, false, true, false, true, false, true],
    heatmap: [2, 0, 3, 0, 2, 0, 1, 2, 0, 3, 0, 2, 0, 3, 2, 0, 3, 0, 2, 0, 1, 2, 0, 3, 0, 2, 0, 3],
    chatHistory: [
      { sender: "partner", text: "Hey swimmer, about to hop into Lane 5 for interval sets. Down for a drafting session?", time: "01:02 PM" }
    ],
    replies: [
      "Awesome, look for the blue swim cap in Lane 5. Let's swim!",
      "Doing 10x100m freestyle intervals starting every 2 minutes. Ready?",
      "Excellent workout! Those sets were intense. Let's match up next time."
    ]
  },
  {
    id: 8,
    name: "Liam Davies",
    age: 27,
    sport: "cycling",
    sportLabel: "GRAVEL BIKE",
    level: "ADVANCED",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=750",
    bio: "60km gravel exploration ride through the forest trails. Mixed terrain. Pace averages 22-24 km/h.",
    statPrimary: "24",
    unitPrimary: "KM/H AVG SPEED",
    statSecondary: "60K",
    unitSecondary: "TOTAL ROUTE",
    proximity: "5.0 KM",
    locationHud: "Liam is near the Forest Trailhead Gate A",
    schedule: [false, false, false, false, false, true, true],
    heatmap: [0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 3, 3],
    chatHistory: [
      { sender: "partner", text: "Hey! Heading out for a gravel loop tomorrow morning. Terrain is muddy but fun. Bring a gravel/MTB bike.", time: "08:14 PM" }
    ],
    replies: [
      "Nice! Meet at the forest trailhead at 9:00 AM.",
      "Just arrived. Tire pressure set to 35 PSI. Let's roll!",
      "Great ride! Those mud slides were crazy. Let's do the West trail next week."
    ]
  }
];

// 2. STATE CONTROLLER
let currentProfileId = 1;
let activeSportFilter = "all";
let currentView = "map"; // "map" or "cards"
let swipeDeckProfiles = [...ATHLETE_PROFILES];
let chatReplyCounter = {};

// 3. SELECTIONS
const elements = {
  // Navigation
  navExplore: document.getElementById("nav-explore"),
  navTimeline: document.getElementById("nav-timeline"),
  navMatches: document.getElementById("nav-matches"),
  hamburgerToggle: document.getElementById("hamburger-toggle"),
  mobileDrawer: document.getElementById("mobile-drawer"),
  
  // Mobile Links
  mExplore: document.getElementById("m-explore"),
  mTimeline: document.getElementById("m-timeline"),
  mMatches: document.getElementById("m-matches"),

  // Views & Toggles
  toggleMap: document.getElementById("toggle-map"),
  toggleCards: document.getElementById("toggle-cards"),
  mapPanel: document.getElementById("map-panel"),
  swipePanel: document.getElementById("swipe-panel"),
  filterButtons: document.querySelectorAll(".filter-btn"),

  // Timeline (Athlete list sidebar)
  activityTimeline: document.getElementById("activity-timeline"),

  // Side Drawer elements
  drawerOverlay: document.getElementById("profile-drawer-overlay"),
  btnCloseDrawer: document.getElementById("btn-close-drawer"),

  // Bento Profile (Inside drawer)
  profileAvatar: document.getElementById("profile-avatar"),
  profileSportTag: document.getElementById("profile-sport-tag"),
  profileLevel: document.getElementById("profile-level"),
  profileDisplayName: document.getElementById("profile-display-name"),
  profileBio: document.getElementById("profile-bio"),
  profileStatPrimary: document.getElementById("profile-stat-primary"),
  profileUnitPrimary: document.getElementById("profile-unit-primary"),
  profileStatSecondary: document.getElementById("profile-stat-secondary"),
  profileUnitSecondary: document.getElementById("profile-unit-secondary"),
  profileProximity: document.getElementById("profile-proximity"),
  profileHeatmap: document.getElementById("profile-heatmap"),

  // Map elements
  mapPins: document.querySelectorAll(".map-pin"),
  hudLocation: document.getElementById("hud-location"),
  hudCoords: document.getElementById("hud-coords"),
  radarTextLabel: document.getElementById("radar-text-label"),
  glowingConnector: document.getElementById("glowing-connector"),

  // Swipe elements
  cardDeck: document.getElementById("card-deck"),
  actionDislike: document.getElementById("action-dislike"),
  actionLike: document.getElementById("action-like"),
  btnResetDeck: document.getElementById("btn-reset-deck"),

  // Chat elements (Inside drawer)
  chatPartnerName: document.getElementById("chat-partner-name"),
  chatMessagesBox: document.getElementById("chat-messages-box"),
  chatForm: document.getElementById("chat-form"),
  chatInput: document.getElementById("chat-input"),
};

// 4. APP INITIALIZATION
function initApp() {
  bindEvents();
  renderTimeline();
  syncActiveProfile(currentProfileId);
  setupSwipeDeck();
  startTelemetryTicker();
}

// 5. EVENT BINDINGS
function bindEvents() {
  // Hamburger drawer
  elements.hamburgerToggle.addEventListener("click", () => {
    const isExpanded = elements.hamburgerToggle.getAttribute("aria-expanded") === "true";
    elements.hamburgerToggle.setAttribute("aria-expanded", !isExpanded);
    elements.hamburgerToggle.classList.toggle("open");
    elements.mobileDrawer.classList.toggle("open");
  });

  // Mobile navigation links
  const mobileLinks = [elements.mExplore, elements.mTimeline, elements.mMatches];
  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mobileLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      elements.hamburgerToggle.setAttribute("aria-expanded", "false");
      elements.hamburgerToggle.classList.remove("open");
      elements.mobileDrawer.classList.remove("open");

      if (link.id === "m-explore") {
        switchToView("map");
      } else if (link.id === "m-timeline") {
        document.querySelector(".timeline-sidebar").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Top nav desktop switcher
  [elements.navExplore, elements.navTimeline, elements.navMatches].forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      [elements.navExplore, elements.navTimeline, elements.navMatches].forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      if (link.id === "nav-explore") {
        switchToView("map");
      } else if (link.id === "nav-timeline") {
        document.querySelector(".timeline-sidebar").scrollIntoView({ behavior: "smooth" });
      } else if (link.id === "nav-matches") {
        switchToView("cards");
      }
    });
  });

  // Map vs Swipe Deck toggles
  elements.toggleMap.addEventListener("click", () => switchToView("map"));
  elements.toggleCards.addEventListener("click", () => switchToView("cards"));

  // Sport Filters
  elements.filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSportFilter = btn.dataset.sport;
      applyFilters();
    });
  });

  // Map Pins click
  elements.mapPins.forEach(pin => {
    pin.addEventListener("click", () => {
      const athleteId = parseInt(pin.dataset.id);
      elements.mapPins.forEach(p => p.classList.remove("active"));
      pin.classList.add("active");
      
      syncActiveProfile(athleteId);
      openDrawer();
      drawVectorConnector(pin);
    });
  });

  // Drawer Close triggers
  elements.btnCloseDrawer.addEventListener("click", closeDrawer);
  elements.drawerOverlay.addEventListener("click", (e) => {
    if (e.target === elements.drawerOverlay) {
      closeDrawer();
    }
  });

  // Chat message submit
  elements.chatForm.addEventListener("submit", handleSendMessage);

  // Swipe Action click buttons
  elements.actionLike.addEventListener("click", () => triggerCardSwipe("right"));
  elements.actionDislike.addEventListener("click", () => triggerCardSwipe("left"));
}

// 6. DRAWER CONTROLS
function openDrawer() {
  elements.drawerOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  elements.drawerOverlay.classList.remove("open");
  document.body.style.overflow = "";
  elements.glowingConnector.style.opacity = 0;
}

// 7. VIEW SWITCHING & FILTERS
function switchToView(view) {
  currentView = view;
  if (view === "map") {
    elements.toggleMap.classList.add("active");
    elements.toggleCards.classList.remove("active");
    elements.mapPanel.classList.add("active");
    elements.swipePanel.classList.remove("active");
  } else {
    elements.toggleMap.classList.remove("active");
    elements.toggleCards.classList.add("active");
    elements.mapPanel.classList.remove("active");
    elements.swipePanel.classList.add("active");
    elements.glowingConnector.style.opacity = 0;
  }
}

function applyFilters() {
  const cards = elements.activityTimeline.querySelectorAll(".athlete-card-portrait");
  let firstVisibleId = null;

  cards.forEach(card => {
    const athleteId = parseInt(card.dataset.id);
    const profile = ATHLETE_PROFILES.find(p => p.id === athleteId);
    
    let profileSport = profile.sport;
    if (profile.sportLabel === "YOGA") profileSport = "fitness";
    if (profile.sportLabel === "BASKETBALL") profileSport = "tennis";
    if (profile.sportLabel === "SWIMMING") profileSport = "cycling";
    if (profile.sportLabel === "GRAVEL BIKE") profileSport = "cycling";

    if (activeSportFilter === "all" || profileSport === activeSportFilter) {
      card.style.display = "flex";
      if (!firstVisibleId) firstVisibleId = athleteId;
    } else {
      card.style.display = "none";
    }
  });

  elements.mapPins.forEach(pin => {
    const athleteId = parseInt(pin.dataset.id);
    const profile = ATHLETE_PROFILES.find(p => p.id === athleteId);
    let profileSport = profile.sport;
    if (profile.sportLabel === "YOGA") profileSport = "fitness";
    if (profile.sportLabel === "BASKETBALL") profileSport = "tennis";
    if (profile.sportLabel === "SWIMMING") profileSport = "cycling";
    if (profile.sportLabel === "GRAVEL BIKE") profileSport = "cycling";
    
    if (activeSportFilter === "all" || profileSport === activeSportFilter) {
      pin.style.display = "block";
    } else {
      pin.style.display = "none";
      pin.classList.remove("active");
    }
  });

  if (firstVisibleId) {
    elements.mapPins.forEach(pin => {
      if (parseInt(pin.dataset.id) === firstVisibleId) {
        pin.classList.add("active");
        drawVectorConnector(pin);
      }
    });
    syncActiveProfile(firstVisibleId);
  }

  setupSwipeDeck();
}

// 8. SIDEBAR TIMELINE CARDS RENDERER
function renderTimeline() {
  elements.activityTimeline.innerHTML = "";
  
  ATHLETE_PROFILES.forEach(profile => {
    const li = document.createElement("li");
    li.className = "athlete-card-portrait";
    li.dataset.id = profile.id;
    if (profile.id === currentProfileId) {
      li.classList.add("active");
    }

    li.innerHTML = `
      <div class="card-photo-box">
        <img src="${profile.avatar}" alt="${profile.name}" class="card-photo">
      </div>
      <div class="card-content-box">
        <div class="card-meta-row">
          <span class="card-badge badge-${profile.sport}">${profile.sportLabel}</span>
          <span class="card-dist-label">${profile.proximity} away</span>
        </div>
        <div class="card-title-row">
          <h3 class="card-name-text">${profile.name.split(' ')[0]}</h3>
          <span class="card-age-text">${profile.age}</span>
        </div>
        <p class="card-bio-text">${profile.bio}</p>
      </div>
    `;

    li.addEventListener("click", () => {
      elements.activityTimeline.querySelectorAll(".athlete-card-portrait").forEach(item => {
        item.classList.remove("active");
      });
      li.classList.add("active");

      elements.mapPins.forEach(p => p.classList.remove("active"));
      const pin = Array.from(elements.mapPins).find(p => parseInt(p.dataset.id) === profile.id);
      if (pin) {
        pin.classList.add("active");
        drawVectorConnector(pin);
      }

      syncActiveProfile(profile.id);
      openDrawer();
    });

    elements.activityTimeline.appendChild(li);
  });
}

// 9. MAP VECTOR LINE CONNECTOR
function drawVectorConnector(pinElement) {
  const targetX = pinElement.dataset.x;
  const targetY = pinElement.dataset.y;
  elements.glowingConnector.setAttribute("d", `M 400 300 L ${targetX} ${targetY}`);
  elements.glowingConnector.style.opacity = 0.85;
}

// 10. REAL-TIME COORDINATES TICKER
function startTelemetryTicker() {
  setInterval(() => {
    const baseLat = 55.7512;
    const baseLng = 37.6184;
    const varLat = (Math.random() - 0.5) * 0.005;
    const varLng = (Math.random() - 0.5) * 0.005;
    
    const count = ATHLETE_PROFILES.filter(p => {
      let profileSport = p.sport;
      if (p.sportLabel === "YOGA") profileSport = "fitness";
      if (p.sportLabel === "BASKETBALL") profileSport = "tennis";
      if (p.sportLabel === "SWIMMING") profileSport = "cycling";
      if (p.sportLabel === "GRAVEL BIKE") profileSport = "cycling";
      return activeSportFilter === "all" || profileSport === activeSportFilter;
    }).length;

    elements.hudCoords.textContent = `LAT: ${(baseLat + varLat).toFixed(5)} // LNG: ${(baseLng + varLng).toFixed(5)}`;
    elements.radarTextLabel.textContent = `GPS MONITOR ACTIVE // ${count} BUDDIES IN SECTOR`;
  }, 1500);
}

// 11. DETAIL PROFILE HEATMAP
function syncActiveProfile(profileId) {
  currentProfileId = profileId;
  const profile = ATHLETE_PROFILES.find(p => p.id === profileId);
  if (!profile) return;

  elements.profileAvatar.src = profile.avatar;
  elements.profileAvatar.alt = profile.name;
  elements.profileDisplayName.textContent = profile.name.toUpperCase();
  elements.profileBio.textContent = `"${profile.bio}"`;
  
  elements.profileSportTag.textContent = profile.sportLabel;
  elements.profileSportTag.className = "card-badge";
  elements.profileSportTag.classList.add(`badge-${profile.sport}`);
  
  elements.profileLevel.textContent = profile.level;
  
  elements.profileStatPrimary.textContent = profile.statPrimary;
  elements.profileUnitPrimary.textContent = profile.unitPrimary;
  elements.profileStatSecondary.textContent = profile.statSecondary;
  elements.profileUnitSecondary.textContent = profile.unitSecondary;
  elements.profileProximity.textContent = profile.proximity;

  renderConsistencyHeatmap(profile);

  elements.chatPartnerName.textContent = `CHAT: ${profile.name.toUpperCase()}`;
  renderChatHistory(profile);
}

function renderConsistencyHeatmap(profile) {
  elements.profileHeatmap.innerHTML = "";
  
  profile.heatmap.forEach((intensity, index) => {
    const cell = document.createElement("div");
    cell.className = "heatmap-cell";
    
    let shadeClass = "shade-none";
    let tooltipText = `Day ${index + 1}: No workouts logged`;
    
    if (intensity === 1) {
      shadeClass = "shade-low";
      tooltipText = `Day ${index + 1}: Light warm-up session`;
    } else if (intensity === 2) {
      shadeClass = "shade-mid";
      tooltipText = `Day ${index + 1}: Completed standard training`;
    } else if (intensity === 3) {
      shadeClass = (profile.sport === "running" || profile.sport === "fitness") ? "shade-high" : "shade-purple";
      tooltipText = `Day ${index + 1}: High intensity interval workout completed!`;
    }
    
    cell.classList.add(shadeClass);
    cell.title = tooltipText;
    elements.profileHeatmap.appendChild(cell);
  });
}

function renderChatHistory(profile) {
  elements.chatMessagesBox.innerHTML = "";
  profile.chatHistory.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${msg.sender === "me" ? "sent" : "received"}`;
    bubble.innerHTML = `
      <span class="bubble-meta">${msg.sender === "me" ? "YOU" : profile.name.toUpperCase()} • ${msg.time}</span>
      <p class="bubble-text">${msg.text}</p>
    `;
    elements.chatMessagesBox.appendChild(bubble);
  });
  elements.chatMessagesBox.scrollTop = elements.chatMessagesBox.scrollHeight;
}

// 12. SWIPE CARDS DRAGGING MECHANICS
function setupSwipeDeck() {
  const emptyState = elements.cardDeck.querySelector(".deck-empty-state");
  elements.cardDeck.innerHTML = "";
  elements.cardDeck.appendChild(emptyState);

  swipeDeckProfiles = ATHLETE_PROFILES.filter(p => {
    let profileSport = p.sport;
    if (p.sportLabel === "YOGA") profileSport = "fitness";
    if (p.sportLabel === "BASKETBALL") profileSport = "tennis";
    if (p.sportLabel === "SWIMMING") profileSport = "cycling";
    if (p.sportLabel === "GRAVEL BIKE") profileSport = "cycling";
    return activeSportFilter === "all" || profileSport === activeSportFilter;
  });

  if (swipeDeckProfiles.length === 0) {
    emptyState.style.display = "flex";
    return;
  } else {
    emptyState.style.display = "none";
  }

  swipeDeckProfiles.forEach((profile, index) => {
    const card = document.createElement("div");
    card.className = "swipe-card";
    card.style.zIndex = swipeDeckProfiles.length - index;
    card.dataset.id = profile.id;

    card.innerHTML = `
      <div class="swipe-stamp stamp-like">MATCH</div>
      <div class="swipe-stamp stamp-dislike">PASS</div>

      <div class="swipe-photo-container">
        <img src="${profile.avatar}" alt="${profile.name}" class="swipe-photo">
        <div class="swipe-meta-overlay">
          <div class="swipe-title-row">
            <h3 class="swipe-name">${profile.name.split(' ')[0]}</h3>
            <span class="swipe-age">${profile.age}</span>
          </div>
          <div class="swipe-sub-row">
            <span>${profile.sportLabel} // ${profile.level}</span>
          </div>
        </div>
      </div>
      <div class="swipe-details-body">
        <p class="swipe-bio">"${profile.bio}"</p>
        <div class="swipe-stats-row">
          <div class="swipe-stat-box">
            <span class="swipe-stat-val">${profile.statPrimary}</span>
            <span class="swipe-stat-label">${profile.unitPrimary.split(' ')[0]}</span>
          </div>
          <div class="swipe-stat-box">
            <span class="swipe-stat-val">${profile.statSecondary}</span>
            <span class="swipe-stat-label">${profile.unitSecondary.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    `;

    setupCardGestures(card);
    elements.cardDeck.appendChild(card);
  });
}

function setupCardGestures(card) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  const stampLike = card.querySelector(".stamp-like");
  const stampDislike = card.querySelector(".stamp-dislike");

  const onDragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    card.style.transition = 'none';
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = x - startX;
    
    const rotate = currentX * 0.08;
    card.style.transform = `translate(${currentX}px, ${Math.abs(currentX) * 0.1}px) rotate(${rotate}deg)`;
    
    if (currentX > 15) {
      const opacity = Math.min((currentX - 15) / 100, 0.9);
      stampLike.style.opacity = opacity;
      stampDislike.style.opacity = 0;
      stampLike.style.transform = `rotate(-12deg) scale(${1 + (opacity * 0.1)})`;
    } else if (currentX < -15) {
      const opacity = Math.min((Math.abs(currentX) - 15) / 100, 0.9);
      stampDislike.style.opacity = opacity;
      stampLike.style.opacity = 0;
      stampDislike.style.transform = `rotate(12deg) scale(${1 + (opacity * 0.1)})`;
    } else {
      stampLike.style.opacity = 0;
      stampDislike.style.opacity = 0;
    }
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1), opacity 0.5s ease';
    stampLike.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    stampDislike.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    const swipeThreshold = 130;
    if (currentX > swipeThreshold) {
      card.classList.add("swipe-right");
      stampLike.style.opacity = 0.9;
      handleCardMatched(parseInt(card.dataset.id), "right");
    } else if (currentX < -swipeThreshold) {
      card.classList.add("swipe-left");
      stampDislike.style.opacity = 0.9;
      handleCardMatched(parseInt(card.dataset.id), "left");
    } else {
      card.style.transform = 'translate(0px, 0px) rotate(0deg)';
      stampLike.style.opacity = 0;
      stampDislike.style.opacity = 0;
    }
    currentX = 0;
  };

  card.addEventListener("mousedown", onDragStart);
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);

  card.addEventListener("touchstart", onDragStart, { passive: true });
  card.addEventListener("touchmove", onDragMove, { passive: true });
  document.addEventListener("touchend", onDragEnd);
}

function triggerCardSwipe(direction) {
  const cards = elements.cardDeck.querySelectorAll(".swipe-card");
  if (cards.length === 0) return;

  const topCard = cards[0];
  const athleteId = parseInt(topCard.dataset.id);
  
  const stampLike = topCard.querySelector(".stamp-like");
  const stampDislike = topCard.querySelector(".stamp-dislike");

  if (direction === "right") {
    topCard.classList.add("swipe-right");
    stampLike.style.opacity = 0.9;
    stampDislike.style.opacity = 0;
    handleCardMatched(athleteId, "right");
  } else {
    topCard.classList.add("swipe-left");
    stampDislike.style.opacity = 0.9;
    stampLike.style.opacity = 0;
    handleCardMatched(athleteId, "left");
  }
}

function handleCardMatched(athleteId, action) {
  const card = Array.from(elements.cardDeck.querySelectorAll(".swipe-card")).find(c => parseInt(c.dataset.id) === athleteId);
  
  setTimeout(() => {
    if (card) card.remove();
    
    const cardsLeft = elements.cardDeck.querySelectorAll(".swipe-card");
    if (cardsLeft.length === 0) {
      elements.cardDeck.querySelector(".deck-empty-state").style.display = "flex";
    }

    if (action === "right") {
      syncActiveProfile(athleteId);
      openDrawer();
      addSystemMatchNotification(athleteId);
      
      elements.activityTimeline.querySelectorAll(".athlete-card-portrait").forEach(item => {
        if (parseInt(item.dataset.id) === athleteId) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      
      elements.mapPins.forEach(p => {
        if (parseInt(p.dataset.id) === athleteId) {
          p.classList.add("active");
          drawVectorConnector(p);
        } else {
          p.classList.remove("active");
        }
      });
    }
  }, 350);
}

function resetSwipeDeck() {
  setupSwipeDeck();
}

function addSystemMatchNotification(athleteId) {
  const profile = ATHLETE_PROFILES.find(p => p.id === athleteId);
  if (!profile) return;

  const systemBubble = document.createElement("div");
  systemBubble.className = "chat-bubble received";
  systemBubble.style.backgroundColor = "rgba(60, 255, 208, 0.1)";
  systemBubble.style.borderColor = "var(--color-mint)";
  systemBubble.style.borderWidth = "1px";
  systemBubble.style.borderStyle = "solid";
  systemBubble.innerHTML = `
    <span class="bubble-meta" style="color: var(--color-mint);">FITMATCH DESPATCH ENGINE</span>
    <p class="bubble-text" style="font-weight: 700; color: var(--color-mint);">You connected with ${profile.name.toUpperCase()}! Say hello.</p>
  `;
  elements.chatMessagesBox.appendChild(systemBubble);
  elements.chatMessagesBox.scrollTop = elements.chatMessagesBox.scrollHeight;
}

// 13. CHAT MESSAGING ENGINE
function handleSendMessage(e) {
  e.preventDefault();
  const text = elements.chatInput.value.trim();
  if (!text) return;

  const now = new Date();
  const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble sent";
  userBubble.innerHTML = `
    <span class="bubble-meta">YOU • ${timestamp}</span>
    <p class="bubble-text">${text}</p>
  `;
  
  elements.chatMessagesBox.appendChild(userBubble);
  elements.chatInput.value = "";
  elements.chatMessagesBox.scrollTop = elements.chatMessagesBox.scrollHeight;

  const activeProfile = ATHLETE_PROFILES.find(p => p.id === currentProfileId);
  if (activeProfile) {
    activeProfile.chatHistory.push({ sender: "me", text: text, time: timestamp });
  }

  triggerSimulatedReply(activeProfile);
}

function triggerSimulatedReply(profile) {
  if (!profile || !profile.replies) return;

  if (chatReplyCounter[profile.id] === undefined) {
    chatReplyCounter[profile.id] = 0;
  }

  const replyIndex = chatReplyCounter[profile.id];
  const replyText = profile.replies[replyIndex % profile.replies.length];
  chatReplyCounter[profile.id]++;

  setTimeout(() => {
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble received typing-indicator";
    typingBubble.innerHTML = `
      <span class="bubble-meta">${profile.name.toUpperCase()} IS TYPING...</span>
      <p class="bubble-text">...</p>
    `;
    elements.chatMessagesBox.appendChild(typingBubble);
    elements.chatMessagesBox.scrollTop = elements.chatMessagesBox.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const replyBubble = document.createElement("div");
      replyBubble.className = "chat-bubble received";
      replyBubble.innerHTML = `
        <span class="bubble-meta">${profile.name.toUpperCase()} • ${timestamp}</span>
        <p class="bubble-text">${replyText}</p>
      `;
      
      elements.chatMessagesBox.appendChild(replyBubble);
      elements.chatMessagesBox.scrollTop = elements.chatMessagesBox.scrollHeight;

      profile.chatHistory.push({ sender: "partner", text: replyText, time: timestamp });
    }, 1500);

  }, 1000);
}

window.addEventListener("DOMContentLoaded", initApp);
