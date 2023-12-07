const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')
const basketItems = document.getElementById('basket-items')
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
/*basketBtn.addEventListener('blur', function() {
  basketDropdown.style.display = 'none'
})*/

const basketTotalFunc = () => {
  const productTotal = document.querySelectorAll('.product-total')
  
  let basketTotalValue = 0
  productTotal.forEach(total => {
    basketTotalValue += Number(total.innerText)
  })

  basketTotal.innerText = Number(basketTotalValue.toFixed(2))
}

const addToCartFunc = (productImg, displayName, productPrice, quantityValue) => {
  const productImgSrc = productImg.src
  const displayNameText = displayName.innerText
  const productPriceNum = Number(productPrice.innerText.replace('£', ''))
  const productQuantityNum = Number(quantityValue.value)

  basketItems.innerHTML += `
  <div class="basket-item" id="basket-item">
      <div class="basket-item-img-container">
        <img src="${productImgSrc}" alt="">
      </div>
      <div class="basket-item-info" id="basket-item-info">
        <p>${displayNameText}</p>
        <p>Quantity: ${productQuantityNum}</p>
        <p>Price: £<span class="product-total">${productPriceNum * productQuantityNum}</span></p>
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

  const basketItem = basketItems.querySelectorAll('.basket-item')
  basketItem.forEach(item => {
    const removeItemBtn = item.querySelector('button')
    removeItemBtn.addEventListener('click', function() {
      console.log('test')
      item.remove()
    })
  })
  
  basketTotalFunc()
}

//bestsellers products
fetch('itemsData/menBestsellers.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)

    let key = 0
    for (const item in data) {
      const itemData = data[item]
      key += 1
      menBestsellers.innerHTML += `
        <div class="product-container product-container-key-${key}">
          <div class="product-img">
            <img src="${itemData.src}" alt="" id="product-img">
            <button>
              <span class="material-symbols-outlined favourites-icon">
                favorite
              </span>
            </button>
          </div>
          <div class="product-footer">
            <div class="product-footer-top">
              <p class="product-name">${itemData.name}</p>
              <p class="product-price">£${itemData.price}</p>
            </div>
            <div class="product-footer-bottom">
              <div>
                <label for="quantity-value">Quantity:</label>
                <input type="number" name="quantity-value" id="quantity-value" value=1>
              </div>
              <button id="add-to-cart-btn" class="add-to-cart-btn add-to-cart-btn-${key}">Add to Cart</button>
            </div>
          </div>
        </div>
      `
    }

    const productContainer = menBestsellers.querySelectorAll('.product-container')
    productContainer.forEach(container => {
      const addToCartBtn = container.querySelector('.add-to-cart-btn')
      const productImg = container.querySelector('img')
      const displayName = container.querySelector('.product-name')
      const productPrice = container.querySelector('.product-price')
      const quantityValue = container.querySelector('input')
      addToCartBtn.addEventListener('click', function() {
        addToCartFunc(productImg, displayName, productPrice, quantityValue)
      })
    })
  })

