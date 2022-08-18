'use strict';

///////////////////////////////////////
const header = document.querySelector('header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollButton = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');
const navContainer = document.querySelector('.nav');
const logo = document.querySelector('#logo');
const initialCoords = section1.getBoundingClientRect();
const allSections = document.querySelectorAll('.section');
////////////////////////////////////////

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scrolling button

scrollButton.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

function changeOpacity(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
}

navContainer.addEventListener('mouseover', e => {
  changeOpacity(e, 0.5);
});

navContainer.addEventListener('mouseout', e => {
  changeOpacity(e, 1);
});

function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    document.querySelector('.nav').classList.add('sticky');
  else document.querySelector('.nav').classList.remove('sticky');
}

const obsOptions = {
  root: null,
  threshold: 0,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const revealSectionOptions = {
  root: null,
  threshold: 0.2,
};
const sectionObserver = new IntersectionObserver(
  revealSection,
  revealSectionOptions
);

allSections.forEach(section => {
  sectionObserver.observe(section);
});

// lazy images download

const imgTargets = document.querySelectorAll('img[data-src]');

function revealImage(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const revealImageOptions = {
  root: null,
  threshold: 0.4,
};

const imgObserver = new IntersectionObserver(revealImage, revealImageOptions);

imgTargets.forEach(el => {
  imgObserver.observe(el);
  el.classList.add('lazy-img');
});

//slider
function sliderContent() {
  const sliderContent = document.querySelectorAll('.slide');
  const sliderButtonLeft = document.querySelector('.slider__btn--left');
  const sliderButtonRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currSlide = 0;

  function createDots() {
    sliderContent.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  }

  function activeDot(slide) {
    document.querySelectorAll('.dots__dot').forEach(i => {
      console.log(i.classList);
      i.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  function slideChange(currSlide) {
    sliderContent.forEach((s, i) => {
      s.style.transform = `TranslateX(${100 * (i - currSlide)}%)`;
    });
  }

  function nextSlide() {
    if (currSlide === sliderContent.length - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    slideChange(currSlide);
    activeDot(currSlide);
  }

  function prevSlide() {
    if (currSlide == 0) {
      currSlide = sliderContent.length - 1;
    } else {
      currSlide--;
    }
    slideChange(currSlide);
    activeDot(currSlide);
  }

  function init() {
    createDots();
    activeDot(0);
    slideChange(0);
  }
  init();

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const targetItem = e.target.dataset.slide;
      slideChange(targetItem);
      activeDot(targetItem);
    }
  });

  sliderButtonRight.addEventListener('click', nextSlide);
  sliderButtonLeft.addEventListener('click', prevSlide);
}

sliderContent();
