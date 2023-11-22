const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')

profileIconBtn.addEventListener('click', function() {
  signInDropdown.style.display = 'flex'
})
signInDropdown.addEventListener('blur', function() {
  signInDropdown.style.display = 'none'
})
favouritesBtn.addEventListener('click', function() {
  favouritesDropdown.style.display = 'flex'
})
favouritesBtn.addEventListener('blur', function() {
  favouritesDropdown.style.display = 'none'
})
basketBtn.addEventListener('click', function() {
  basketDropdown.style.display = 'flex'
})
basketBtn.addEventListener('blur', function() {
  basketDropdown.style.display = 'none'
})