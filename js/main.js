/* ====================================================
   ORZO BAR Music & Brewery — Main JavaScript
   Mobile nav, Intersection Observer, smooth scroll
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ----- MOBILE NAV TOGGLE -----
  const toggle = document.querySelector('.nav-toggle')
  const menu = document.querySelector('.nav-menu')
  const overlay = document.querySelector('.nav-overlay')
  const navLinks = document.querySelectorAll('.nav-link')

  function closeNav() {
    toggle.classList.remove('active')
    menu.classList.remove('open')
    overlay.classList.remove('active')
    document.body.style.overflow = ''
  }

  function openNav() {
    toggle.classList.add('active')
    menu.classList.add('open')
    overlay.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open')
      isOpen ? closeNav() : openNav()
    })
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav)
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeNav()
      const target = link.getAttribute('href')
      if (target && target.startsWith('#')) {
        e.preventDefault()
        const el = document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })

  // ----- INTERSECTION OBSERVER -----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .stagger-children').forEach(el => {
    observer.observe(el)
  })

  // ----- NAVBAR ACTIVE LINK ON SCROLL -----
  const sections = document.querySelectorAll('section[id]')
  const navLinksArr = Array.from(navLinks)

  function updateActiveLink() {
    let current = ''
    sections.forEach(section => {
      const top = section.offsetTop - 150
      const bottom = top + section.offsetHeight
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id')
      }
    })
    navLinksArr.forEach(link => {
      link.classList.remove('active')
      const href = link.getAttribute('href')
      if (href && href === `#${current}`) {
        link.classList.add('active')
      }
    })
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true })
  updateActiveLink()

  // ----- NAVBAR BACKGROUND ON SCROLL -----
  const nav = document.querySelector('.nav')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY
    if (currentScroll > 100) {
      nav.style.background = currentScroll > lastScroll
        ? 'rgba(10,10,10,.95)'
        : 'rgba(10,10,10,.85)'
    } else {
      nav.style.background = 'rgba(10,10,10,.85)'
    }
    lastScroll = currentScroll
  }, { passive: true })

  // ----- WHATSAPP FORM (if any) -----
  const waBtns = document.querySelectorAll('.wa-btn')
  const waNumber = '5491163676137'
  const waMsg = encodeURIComponent('¡Hola! Quiero más información sobre ORZO BAR Music & Brewery 🍺🎵')

  waBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const msg = btn.dataset.msg || waMsg
      window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank')
    })
  })

  // Pre-filled WhatsApp link for hero CTA
  const waHero = document.querySelector('.wa-hero')
  if (waHero) {
    waHero.addEventListener('click', (e) => {
      e.preventDefault()
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank')
    })
  }

  // ----- KEYBOARD: ESC to close nav -----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeNav()
    }
  })

  // ----- RESIZE: close mobile nav on desktop -----
  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024 && menu.classList.contains('open')) {
        closeNav()
      }
    }, 250)
  })

})
