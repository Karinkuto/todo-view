import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon"]
  static classes = ["dark"]
  static values = { 
    dark: { type: Boolean, default: false },
    icon: { type: String, default: 'moon' }
  }

  connect() {
    // Check for saved user preference, if any, on load
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.darkValue = true
      document.documentElement.classList.add(this.darkClass)
      this.iconValue = 'sun'
    } else {
      this.darkValue = false
      document.documentElement.classList.remove(this.darkClass)
      this.iconValue = 'moon'
    }
  }

  toggle() {
    this.darkValue = !this.darkValue
    
    if (this.darkValue) {
      document.documentElement.classList.add(this.darkClass)
      localStorage.theme = 'dark'
      this.iconValue = 'sun'
    } else {
      document.documentElement.classList.remove(this.darkClass)
      localStorage.theme = 'light'
      this.iconValue = 'moon'
    }
  }

  iconValueChanged(value) {
    for (const icon of this.iconTargets) {
      if (value === 'sun') {
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')
      } else {
        icon.classList.remove('fa-sun')
        icon.classList.add('fa-moon')
      }
    }
  }
}
