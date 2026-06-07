// Custom cursor
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
function animateRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animateRing)}
animateRing();
// Hide cursor on mobile
if('ontouchstart' in window){dot.style.display='none';ring.style.display='none';document.body.style.cursor='auto'}

// Sticky nav
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60)
},{passive:true});

// Hamburger
const ham=document.getElementById('hamburger');
const menu=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{
  ham.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow=menu.classList.contains('open')?'hidden':'';
});
function closeMenu(){ham.classList.remove('open');menu.classList.remove('open');document.body.style.overflow=''}

// Parallax hero image and stop at footer
const heroImg=document.querySelector('.hero-img');
const footer=document.querySelector('footer');
let heroStopY=0;
let heroIsAbsolute=false;

const updateHeroStop = () => {
  heroStopY = Math.round(footer.getBoundingClientRect().top + window.scrollY - heroImg.offsetHeight);
};

const updateHeroPosition = () => {
  const s = window.scrollY;
  if (s >= heroStopY) {
    if (!heroIsAbsolute) {
      heroIsAbsolute = true;
      heroImg.style.position = 'absolute';
      heroImg.style.left = '0';
      heroImg.style.top = `${heroStopY}px`;
      heroImg.style.zIndex = '1';
      heroImg.style.transform = 'translateY(0) scale(1)';
    }
  } else {
    heroIsAbsolute = false;
    heroImg.style.position = 'fixed';
    heroImg.style.top = '0';
    heroImg.style.left = '0';
    heroImg.style.zIndex = '-1';
    heroImg.style.transform = `translateY(${s}px) scale(1)`;
  }
};

window.addEventListener('scroll', updateHeroPosition, {passive:true});
window.addEventListener('resize', () => {
  updateHeroStop();
  updateHeroPosition();
});

updateHeroStop();
updateHeroPosition();

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));

// Contact form submit
document.querySelector('.btn-submit').addEventListener('click',function(){
  this.textContent='Message Sent ✓';
  this.style.background='#639922';
  setTimeout(()=>{this.innerHTML='Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';this.style.background=''},3000);
});


emailjs.init("lDduSG_l1pKvwqOnZ");

document.querySelector(".btn-submit").addEventListener("click", function (e) {
    e.preventDefault();

    const btn = this;

    emailjs.send(
        "service_8oeokui",
        "template_nwnn8l9",
        {
            first_name: document.querySelector('input[placeholder="Maria"]').value,
            last_name: document.querySelector('input[placeholder="Santos"]').value,
            email: document.querySelector('input[type="email"]').value,
            looking_for: document.querySelector('input[placeholder*="Custom"]').value,
            message: document.querySelector("textarea").value
        }
    )
    .then(() => {
        btn.innerHTML = "Message Sent ✓";
        btn.style.background = "#639922";

        setTimeout(() => {
            btn.innerHTML = `
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `;
            btn.style.background = "";
        }, 3000);
    })
    .catch((err) => {
        console.error(err);
        alert("Message failed to send!");
    });
});