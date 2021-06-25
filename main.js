const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')
const links = document.querySelectorAll('nav ul li a')

// abre e fecha o menu clicando no hamburguer ou x
for (const element of toggle) {
  element.addEventListener('click', () => {
    nav.classList.toggle('show')
  })
}

//fecha o menu quando clica nos links
for (const link of links) {
  link.addEventListener('click', () => {
    nav.classList.remove('show')
  })
}

// Mudar o header e adicionar shadow no scroll
function headerScroll() {
  const header = document.querySelector('#header')
  const navHeight = header.offsetHeight

  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
}

// botão volta pro topo
function buttonTop() {
  const btnVolta = document.querySelector('.back-to-top')
  if (window.scrollY >= 2000) {
    btnVolta.classList.add('show')
  } else {
    btnVolta.classList.remove('show')
  }
}

// Swiper slider Testimonials
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

// Mostra elementos quando der scroll mostra suave

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image,
   #home .text,
   #about .text,
   #about .image,
   #sevices header, #services .card,
   #testimonials header, #testimonials .testimonials,
   #contact .text, #contact .links,
   footer .brand, footer .social  
  `,
  {
    interval: 100
  }
)

// menu ativo conforme a sessao na página
const sections = document.querySelectorAll('main section[id]')
function ativaButtonMenu() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkStart = checkpoint >= sectionTop
    const checkEnd = checkpoint <= sectionTop + sectionHeight

    if (checkStart && checkEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}
// executa as funçoes quando der scroll
window.addEventListener('scroll', () => {
  headerScroll()
  buttonTop()
  ativaButtonMenu()
})
