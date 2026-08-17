/* =========================================
   NOVA ADMIN PANEL -- MOBILE ICON EDITION
========================================= */


/* =========================================
   PARTICLE ENGINE
========================================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createParticles();

}

window.addEventListener("resize", resizeCanvas);


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles(){

  particles = [];

  const amount =
    window.innerWidth < 700 ? 65 : 130;

  for(let i = 0; i < amount; i++){

    particles.push({

      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      size: Math.random() * 2.2 + 0.5,

      speed: Math.random() * 0.7 + 0.15,

      drift: (Math.random() - 0.5) * 0.5,

      alpha: Math.random() * 0.7 + 0.2

    });

  }

}

resizeCanvas();


/* =========================================
   PARTICLE ANIMATION
========================================= */

function animateParticles(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(p => {

    p.y -= p.speed;
    p.x += p.drift;

    if(p.y < -5){

      p.y = canvas.height + 5;
      p.x = Math.random() * canvas.width;

    }

    if(p.x < -5)
      p.x = canvas.width;

    if(p.x > canvas.width + 5)
      p.x = 0;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(0,234,255,${p.alpha})`;

    ctx.shadowBlur = 18;

    ctx.shadowColor =
      "#00eaff";

    ctx.fill();

  });

  requestAnimationFrame(
    animateParticles
  );

}

animateParticles();


/* =========================================
   LOGIN ELEMENTS
========================================= */

const loginPage =
  document.getElementById("loginPage");

const loginBox =
  document.getElementById("loginBox");

const dashboard =
  document.getElementById("dashboard");

const loginButton =
  document.getElementById("loginButton");

const username =
  document.getElementById("username");

const password =
  document.getElementById("password");

const message =
  document.getElementById("message");


/* =========================================
   INITIAL DASHBOARD STATE
========================================= */

dashboard.style.display = "none";


/* =========================================
   LOGIN
========================================= */

function login(){

  const user =
    username.value.trim();

  const pass =
    password.value;


  /* SUCCESS */

  if(
    user === "nova" &&
    pass === "test"
  ){

    loginBox.classList.remove(
      "denied"
    );

    void loginBox.offsetWidth;

    loginBox.classList.add(
      "granted"
    );

    message.textContent =
      "ACCESS GRANTED";

    message.style.color =
      "#00ff9d";

    loginButton.textContent =
      "ACCESS GRANTED";


    setTimeout(() => {

      loginPage.style.display =
        "none";

      dashboard.style.display =
        "flex";

      loginBox.classList.remove(
        "granted"
      );

      showPanel("homePanel");

      updateActiveButton(
        homeButton
      );

    },800);

  }


  /* FAILURE */

  else{

    loginBox.classList.remove(
      "granted"
    );

    void loginBox.offsetWidth;

    loginBox.classList.add(
      "denied"
    );

    message.textContent =
      "ACCESS DENIED";

    message.style.color =
      "#ff174f";

    loginButton.textContent =
      "ACCESS DENIED";

    password.value = "";


    setTimeout(() => {

      loginBox.classList.remove(
        "denied"
      );

      loginButton.textContent =
        "ACCESS SYSTEM";

    },900);

  }

}


/* =========================================
   LOGIN EVENTS
========================================= */

loginButton.addEventListener(
  "click",
  login
);


username.addEventListener(
  "keydown",
  event => {

    if(event.key === "Enter"){
      login();
    }

  }
);


password.addEventListener(
  "keydown",
  event => {

    if(event.key === "Enter"){
      login();
    }

  }
);


/* =========================================
   DASHBOARD PANELS
========================================= */

const panels = [

  "homePanel",
  "updatesPanel",
  "commandsPanel",
  "systemPanel"

];


function showPanel(panelID){

  panels.forEach(id => {

    const panel =
      document.getElementById(id);

    if(panel){

      panel.style.display =
        "none";

    }

  });


  const selected =
    document.getElementById(panelID);


  if(selected){

    selected.style.display =
      "block";

    /* Restart panel animation */

    selected.style.animation = "none";

    void selected.offsetWidth;

    selected.style.animation =
      "panelIn .35s ease";

  }

}


/* =========================================
   SIDEBAR BUTTONS
========================================= */

const homeButton =
  document.getElementById("homeButton");

const updatesButton =
  document.getElementById("updatesButton");

const commandsButton =
  document.getElementById("commandsButton");

const systemButton =
  document.getElementById("systemButton");

const logoutButton =
  document.getElementById("logoutButton");


/* =========================================
   MOBILE ICON CONFIG
========================================= */

const navButtons = [

  {
    element: homeButton,
    icon: "◈",
    name: "Dashboard"
  },

  {
    element: updatesButton,
    icon: "◇",
    name: "Updates"
  },

  {
    element: commandsButton,
    icon: "◆",
    name: "Commands"
  },

  {
    element: systemButton,
    icon: "◉",
    name: "System"
  },

  {
    element: logoutButton,
    icon: "⟲",
    name: "Logout"
  }

];


/* =========================================
   PREPARE NAVIGATION
========================================= */

navButtons.forEach(item => {

  const button =
    item.element;

  if(!button) return;


  /* Save original label */

  button.dataset.label =
    item.name;


  /* Mobile icon */

  button.dataset.icon =
    item.icon;


  /* Accessibility */

  button.setAttribute(
    "aria-label",
    item.name
  );


  /* Tooltip */

  button.setAttribute(
    "title",
    item.name
  );

});


/* =========================================
   ACTIVE BUTTON
========================================= */

function updateActiveButton(button){

  navButtons.forEach(item => {

    if(!item.element) return;

    item.element.classList.remove(
      "active"
    );

  });


  if(button){

    button.classList.add(
      "active"
    );

  }

}


/* =========================================
   NAVIGATION
========================================= */

homeButton.addEventListener(
  "click",
  () => {

    showPanel(
      "homePanel"
    );

    updateActiveButton(
      homeButton
    );

  }
);


updatesButton.addEventListener(
  "click",
  () => {

    showPanel(
      "updatesPanel"
    );

    updateActiveButton(
      updatesButton
    );

  }
);


commandsButton.addEventListener(
  "click",
  () => {

    showPanel(
      "commandsPanel"
    );

    updateActiveButton(
      commandsButton
    );

  }
);


systemButton.addEventListener(
  "click",
  () => {

    showPanel(
      "systemPanel"
    );

    updateActiveButton(
      systemButton
    );

  }
);


/* =========================================
   COMMAND BUTTONS
========================================= */

const commandButtons =
  document.querySelectorAll(
    ".commandButton"
  );


commandButtons.forEach(
  (button, index) => {

    const originalText =
      button.textContent.trim();


    const icons = [
      "⚡",
      "↻",
      "⌕"
    ];


    /* Add command icon */

    button.dataset.icon =
      icons[index] || "◆";


    button.addEventListener(
      "click",
      () => {

        button.disabled = true;

        button.textContent =
          "SYSTEM SCANNING...";


        button.style.color =
          "#00eaff";


        button.style.borderColor =
          "#00eaff";


        setTimeout(() => {

          button.textContent =
            "✓ COMPLETE";

          button.style.color =
            "#00ff9d";

          button.style.borderColor =
            "#00ff9d";

        },800);


        setTimeout(() => {

          button.textContent =
            originalText;

          button.style.color =
            "";

          button.style.borderColor =
            "";

          button.disabled =
            false;

        },1800);

      }

    );

  }
);


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener(
  "click",
  () => {

    dashboard.style.display =
      "none";

    loginPage.style.display =
      "flex";


    username.value = "";

    password.value = "";

    message.textContent = "";


    loginButton.textContent =
      "ACCESS SYSTEM";


    loginBox.classList.remove(
      "granted",
      "denied"
    );


    updateActiveButton(
      homeButton
    );


    showPanel(
      "homePanel"
    );

  }
);


/* =========================================
   MOBILE RESPONSIVE ENGINE
========================================= */

function updateMobileMode(){

  const mobile =
    window.innerWidth <= 700;


  if(mobile){

    document.body.classList.add(
      "mobileMode"
    );

  }
  else{

    document.body.classList.remove(
      "mobileMode"
    );

  }

}


updateMobileMode();


window.addEventListener(
  "resize",
  updateMobileMode
);


/* =========================================
   TOUCH FEEDBACK
========================================= */

navButtons.forEach(item => {

  const button =
    item.element;

  if(!button) return;


  button.addEventListener(
    "touchstart",
    () => {

      button.classList.add(
        "touching"
      );

    },
    {passive:true}
  );


  button.addEventListener(
    "touchend",
    () => {

      button.classList.remove(
        "touching"
      );

    },
    {passive:true}
  );

});


/* =========================================
   INITIAL STATE
========================================= */

showPanel(
  "homePanel"
);

updateActiveButton(
  homeButton
);