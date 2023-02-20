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
var calendarEl = document.getElementById('calendar');
var cal = new FullCalendar.Calendar(calendarEl,{
  locale:'pt-br',
  headerToolbar:{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  navLinks:true,
  selectable:true,
  selectMirror:true,
   select: function(arg) {
    var title = prompt('Event Title:');
    if (title) {
      cal.addEvent({
        title: title,
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay
      })
    }
    cal.unselect()
  }, 
  eventClick: function(arg) {
    if (confirm('Are you sure you want to delete this event?')) {
      arg.event.remove()
    }
  },
  editable: true,
  dayMaxEvents: true,
})
cal.render()
const btn = document.getElementById('addEvent')

// document.addEventListener('DOMContentLoaded', function() {
 

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: 'dayGridMonth',
//     initialDate: '2023-02-07',
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title addEventButton',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     customButtons:{
//       addEventButton:{
//         text:"Adicione um horário",
//         click:function(){
//           calendar.addEvent({
//             title:'Evento Teste',
//             start:'2023-02-20',
//             allDay:true
//           })
//         }
//       }
//     }
//   });

//   calendar.render();
// });


btn.addEventListener('click',()=>{
  cal.addEvent({
    title:'Evento Teste',
    start:'2023-02-20',
    allDay:true
  })
  

})