// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loader
  initLoader()

  // Initialize custom cursor
  initCursor()

  // Initialize navigation
  initNavigation()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize testimonial slider
  initTestimonialSlider()

  // Initialize project filter
  initProjectFilter()

  // Initialize contact form
  initContactForm()
})

// Loader animation
function initLoader() {
  const loader = document.querySelector(".loader")
  const progressBar = document.querySelector(".loader-progress-bar")

  let width = 0
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        loader.classList.add("hidden")
        // Trigger animations that should start after page load
        document.querySelectorAll(".reveal-text h1, .reveal-text p, .hero-cta").forEach((el) => {
          el.style.visibility = "visible"
        })
      }, 500)
    } else {
      width += 1
      progressBar.style.width = width + "%"
    }
  }, 20)
}

// Custom cursor
function initCursor() {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    // Add a slight delay to the follower for a smoother effect
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 50)
  })

  // Change cursor size on clickable elements
  document.querySelectorAll("a, button, .project-card, .skill-card").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.style.width = "30px"
      cursor.style.height = "30px"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
    })

    item.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })
  })
}

// Navigation functionality
function initNavigation() {
  const header = document.querySelector("header")
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav-link")

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Update active nav link based on scroll position
    updateActiveNavLink()
  })

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mobileNav.classList.toggle("active")
    document.body.classList.toggle("no-scroll")

    // Animate mobile nav links
    if (mobileNav.classList.contains("active")) {
      document.querySelectorAll(".mobile-nav-link").forEach((link, index) => {
        link.style.transitionDelay = 0.1 * index + "s"
      })
    }
  })

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Smooth scroll to sections
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      })
    })
  })

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".desktop-nav a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }
}

// Scroll animations
function initScrollAnimations() {
  // Add data-aos attribute to elements that should animate on scroll
  document.querySelectorAll(".skill-card, .project-card, .timeline-item").forEach((el, index) => {
    el.setAttribute("data-aos", "fade-up")
    el.setAttribute("data-aos-delay", (index * 100).toString())
  })

  // Simple scroll animation observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")
      }
    })
  }, observerOptions)

  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element)
  })
}

// Testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial-item")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-testimonial")
  const nextBtn = document.querySelector(".next-testimonial")
  let currentIndex = 0

  // Show testimonial based on index
  function showTestimonial(index) {
    testimonials.forEach((item) => item.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
    currentIndex = index
  }

  // Event listeners for controls
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let index = currentIndex - 1
      if (index < 0) index = testimonials.length - 1
      showTestimonial(index)
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let index = currentIndex + 1
      if (index >= testimonials.length) index = 0
      showTestimonial(index)
    })
  }

  // Click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Auto slide
  let interval = setInterval(() => {
    let index = currentIndex + 1
    if (index >= testimonials.length) index = 0
    showTestimonial(index)
  }, 5000)

  // Pause auto slide on hover
  document.querySelector(".testimonials-slider").addEventListener("mouseenter", () => {
    clearInterval(interval)
  })

  document.querySelector(".testimonials-slider").addEventListener("mouseleave", () => {
    interval = setInterval(() => {
      let index = currentIndex + 1
      if (index >= testimonials.length) index = 0
      showTestimonial(index)
    }, 5000)
  })
}

// Project filter
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((btn) => btn.classList.remove("active"))
      btn.classList.add("active")

      // Filter projects
      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else if (card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }

        // Reset and trigger animation
        card.classList.remove("aos-animate")
        setTimeout(() => {
          if (card.style.display === "block") {
            card.classList.add("aos-animate")
          }
        }, 10)
      })
    })
  })
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For this demo, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset

  // Parallax for hero elements
  const heroImage = document.querySelector(".image-container")
  const floatingElements = document.querySelectorAll(".floating-element")

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`
  }

  floatingElements.forEach((el, index) => {
    el.style.transform = `translateY(${scrollPosition * (0.05 + index * 0.02)}px) rotate(${scrollPosition * 0.02}deg)`
  })
})

// Reveal animations on page load
window.addEventListener("load", () => {
  // Remove loader
  document.querySelector(".loader").classList.add("hidden")

  // Animate hero elements
  setTimeout(() => {
    document.querySelectorAll(".hero-text h1, .hero-text p, .hero-cta").forEach((el) => {
      el.classList.add("visible")
    })
  }, 500)
})
