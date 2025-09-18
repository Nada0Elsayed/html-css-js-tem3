let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
    document.documentElement.style.setProperty("--main--color",
        maincolor);
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === maincolor) {
            element.classList.add("active");
        }
    });
}
    
document.querySelector(".con-i i").onclick = function () { 
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};

const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);


        handleactive(e);
        
        localStorage.setItem("classactive", e.target);
    });
});

let back_g_option = true;
let back_g_interval;
let landingpage = document.querySelector('.landing-page');
let imgsarray = ["../img/23955_original.jpg", "../img/beach-aegean-sea-partly-cloudy-sky-greece.jpg", "../img/dark-sky-1200x800.jpg", "../img/dk5jhcj-e0df30bd-8225-4b4e-ab57-6860884cf467.jpg", "../img/images.jpeg"];
let mainbackop = localStorage.getItem("back_op");
let mainbackgro = localStorage.getItem("back_gro");
if (mainbackop !== null) {
    landingpage.style.backgroundImage = mainbackgro;

  document.querySelectorAll(".backg span").forEach((element) => {
    element.classList.remove("active");
  });
  if (mainbackop === "true") {
    back_g_option = true;
    document.querySelector(".yes").classList.add("active");
  } else {
    back_g_option = false;
    document.querySelector(".no").classList.add("active");
  }
}

const background_el = document.querySelectorAll(".backg span");
background_el.forEach((span) => {
  span.addEventListener("click", (e) => {
    
   handleactive(e);
      if (e.target.dataset.backg === "yes") {
        back_g_option = true;
        randomizeimgs();
        localStorage.setItem("back_op", true);
      } else {
        back_g_option = false;
          clearInterval(back_g_interval);
        localStorage.setItem("back_op", false);
      }
      
  });
});


function randomizeimgs() {
    if (back_g_option === true) {
        back_g_interval = setInterval(() => {
        let randomnumber = Math.floor(Math.random() * imgsarray.length);
          landingpage.style.backgroundImage =
            "url( " + imgsarray[randomnumber] + ")";
        
          localStorage.setItem(
            "back_gro",
            "url( " + imgsarray[randomnumber] + ")"
          );
        }, 1000);
    }
}
randomizeimgs();


let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsoffsettop = skills.offsetTop;// the distance of skills from top of page
    let skillsouterheight = skills.offsetHeight;// the height of skills
    let windowheight = this.innerHeight;// the height of window
    let windowscrolltop = this.pageYOffset;// the distance of window from top of page .  when we scroll down
    if (windowscrolltop > (skillsoffsettop + skillsouterheight - windowheight))// when we reach to skills section
    {
        // console.log(windowscrolltop);
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        allskills.forEach(skill => {
            skill.style.width = skill.dataset.prog;
        });
    }
}

let ourgallery = document.querySelectorAll(".gallery img");
ourgallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupbox = document.createElement("div");
        popupbox.className = 'popup-box';
        if (img.alt !== null) {
          let imgheading = document.createElement("h3");
          let imgtext = document.createTextNode(img.alt);
          imgheading.appendChild(imgtext);
          popupbox.prepend(imgheading);
        }
        let popupimage = document.createElement("img");
        popupimage.src = img.src;
        popupbox.appendChild(popupimage);
        document.body.appendChild(popupbox);
        let closebutton = document.createElement("span");
        let closebuttontext = document.createTextNode("X");
        closebutton.appendChild(closebuttontext);
        closebutton.className = 'close-button';
        popupbox.appendChild(closebutton);
    });
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

const allbullets = document.querySelectorAll(".nav-bullets .bullet");
const alllinks = document.querySelectorAll(".landing-page .links a");

function scrolltowhere(eles) {
    eles.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            togglebtn.classList.toggle("menu-active"); // to remove class from button
            tlinks.classList.toggle("open");
        document
          .querySelector(e.target.dataset.section)
          .scrollIntoView({ behavior: "smooth" });
      });
    });

}

scrolltowhere(allbullets);
scrolltowhere(alllinks);

function handleactive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletspan = document.querySelectorAll(".bullets-option span");
let bulletco = document.querySelector(".nav-bullets");
let bulletloc = localStorage.getItem("bullets-op");

if (bulletloc !== null) {
    bulletspan.forEach(sp => {
        sp.classList.remove("active");
    });

    if (bulletloc === "yes") {
        bulletco.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add('active');

    } else {
        bulletco.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletspan.forEach(sp => {
    sp.addEventListener("click", (e) => {
        if (sp.dataset.bullets === "yes") {
            bulletco.style.display = "block";
            localStorage.setItem("bullets-op","yes");
            handleactive(e);
        } else {
            bulletco.style.display = "none";
            localStorage.setItem("bullets-op", "no");
            handleactive(e);
        }
    })
})

document.querySelector(".reset-op").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("bullets-op");
    localStorage.removeItem("color-option");
    localStorage.removeItem("back_op");
    window.location.reload();
};

//toggle menu
let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".landing-page .links");
togglebtn.onclick = function (e) {
  e.stopPropagation(); // spans == button
  this.classList.toggle("menu-active"); // toggle == to add or remove class to button
  tlinks.classList.toggle("open");
}
//click anywhere outside menu and button
document.addEventListener("click", (e) => {
    if (e.target !== togglebtn && e.target !== tlinks) {
        if (tlinks.classList.contains("open")) {
            togglebtn.classList.toggle("menu-active"); // to remove class from button
            tlinks.classList.toggle("open");
        }
    }
}
);
tlinks.onclick = function (e) {
    e.stopPropagation(); // to prevent the click on links to close the menu
}

// import Headroom from "headroom.js";
 
// select your header or whatever element you wish
const header = document.querySelector("header");
 
const headroom = new Headroom(header , {
  // vertical offset in px before element is first unpinned
    tolerance: { up: 25, down: 5 },
    offset: 500,
  // scroll tolerance in px before state changes
});
// initialise
headroom.init();