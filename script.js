const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')
const addToCartBtn = document.getElementById('add-to-cart-btn')
const basketItems = document.getElementById('basket-items')
const quantityValue = document.getElementById('quantity-value')
const basketTotal = document.querySelector('.basket-total span')
const menBestsellers = document.getElementById('men-bestsellers')

profileIconBtn.addEventListener('click', function() {
  signInDropdown.style.display = 'flex'
})
profileIconBtn.addEventListener('blur', function() {
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

//bestsellers products
fetch('itemsData/menBestsellers.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (const item in data) {
      menBestsellers.innerHTML += `
        <div class="product-container">
          <div class="product-img">
            <img src="" alt="" id="product-img">
            <button>
              <span class="material-symbols-outlined favourites-icon">
                favorite
              </span>
            </button>
          </div>
          <div class="product-footer">
            <div class="product-footer-top">
              <p class="product-name"></p>
              <p class="product-price"></p>
            </div>
            <div class="product-footer-bottom">
              <div>
                <label for="quantity-value">Quantity:</label>
                <input type="number" name="quantity-value" id="quantity-value">
              </div>
              <button id="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      `
  
    const productContainer = document.querySelectorAll('.product-container')

    productContainer.forEach(container => {
      const productImg = container.querySelector('.product-img img')
      const productName = container.querySelector('.product-name')
      const productPrice = container.querySelector('.product-price')

      productImg.src = item.src
      productName.innerText = item.name
      productPrice.innerText = '£' + item.price
    })
    }
  })

const basketTotalFunc = () => {
  const productTotal = document.querySelectorAll('.product-total')
  
  let basketTotalValue = 0
  productTotal.forEach(total => {
    basketTotalValue += Number(total.innerText)
  })

  basketTotal.innerText = Number(basketTotalValue.toFixed(2))
}

const addToCartFunc = () => {
  const productQuantity = quantityValue.value
  basketItems.innerHTML += `
   <div class="basket-item" id="basket-item">
      <div class="basket-item-img-container">
        <img src="" alt="">
      </div>
      <div class="basket-item-info" id="basket-item-info">
        <p>Jacket</p>
        <p>Quantity: ${productQuantity}</p>
        <p>Price: £<span class="product-total">10.95</span></p>
      </div>
      <div class="close-btn-container">
        <button>
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </div>
    </div>
  `
  basketTotalFunc()
}

addToCartBtn.addEventListener('click', addToCartFunc)