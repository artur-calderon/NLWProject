import { getEvents, saveEvent } from './firebase.js'
import { onSnapshot } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

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
// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1,
//   pagination: {
//     el: '.swiper-pagination'
//   },
//   mousewheel: true,
//   keyboard: true,
//   breakpoints: {
//     767: {
//       slidesPerView: 2,
//       setWrapperSize: true
//     }
//   }
// })

// Mostra elementos quando der scroll mostra suave

// const scrollReveal = ScrollReveal({
//   origin: 'top',
//   distance: '30px',
//   duration: 700,
//   reset: true
// })

// scrollReveal.reveal(
//   `#home .image,
//    #home .text,
//    #about .text,
//    #about .image,
//    #sevices header, #services .card,
//    #testimonials header, #testimonials .testimonials,
//    #contact .text, #contact .links,
//    footer .brand, footer .social
//   `,
//   {
//     interval: 100
//   }
// )

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

// ######## CALENDAR SCRIPT INIT
var storedEvents = []

let a // pega as informações do dia em questão para salvar

const horarioToAdd = document.querySelector('.horarioToAdd')
let hour = 8
let minutes1 = '00'
let minutes2 = '30'

for (let i = 0; i < 11; i++) {
  horarioToAdd.innerHTML += `
  	<option value="${hour + i}:${minutes1}">${hour + i}:${minutes1}</option>
    <option value="${hour + i}:${minutes2}">${hour + i}:${minutes2}</option>
  `
}

var calendarEl = document.getElementById('calendar')
var cal = new FullCalendar.Calendar(calendarEl, {
  locale: 'pt-br',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  navLinks: true,
  selectable: true,
  selectMirror: true,
  select: function (args) {
    modal.showModal()
    a = args

    let closeModalbtn = document.querySelector('#evtClose')
    closeModalbtn.addEventListener('click', () => modal.close())
    cal.unselect()
  },
  eventClick: function (arg) {
    if (confirm('Tem certeza que quer excluir esse horário?')) {
      arg.event.remove()
    }
  },
  events: [
    {
      title: 'All Day Event',
      start: '2023-02-01'
    }
  ],
  editable: true,
  dayMaxEvents: true
})
cal.render()
let modal = document.querySelector('#calForm')
const btnSaveModal = document.querySelector('#evtSave')

btnSaveModal.addEventListener('click', () => {
  console.log(horarioToAdd.value)
  console.log(a.start, a.end, a.allDay)
  if (horarioToAdd.value) {
    // saveEvent({
    //   store: 'BeautySalon',
    //   title: horarioToAdd.value,
    //   start: a.start,
    //   end: a.end,
    //   allDay: a.allDay
    // })
  }
  onSnapshot(getEvents('BeautySalon'), result => {
    result.forEach(element => {
      console.log(getDate(element.data().start))
      console.log(Date(element.data().end))
      console.log(element.data().allDay)
      cal.addEvent({
        title: element.data().title,
        start: Date(element.data().start),
        end: Date(element.data().end),
        allDay: element.data().allDay
      })
    })
  })
})
