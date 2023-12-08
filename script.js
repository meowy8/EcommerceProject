const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const favouritesItems = document.getElementById('favourites-items')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')
const basketItems = document.getElementById('basket-items')
const basketTotal = document.querySelector('.basket-total span')
const menBestsellers = document.getElementById('men-bestsellers')

profileIconBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(signInDropdown).display
  
  signInDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})
favouritesBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(favouritesDropdown).display
  
  favouritesDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})
basketBtn.addEventListener('click', function() {
  const currentView = window.getComputedStyle(basketDropdown).display
  
  basketDropdown.style.display = currentView === 'none' ? 'flex' : 'none'
})

const favouritesRemoveBtn = () => {
  const favouritesItem = favouritesItems.querySelectorAll('.favourites-item')
  favouritesItem.forEach(item => {
    const removeItemBtn = item.querySelector('button')
    removeItemBtn.addEventListener('click', function() {
      item.remove()
    })
  })
}

const addToFavFunc = (productImgSrc, displayNameText, productPriceNum) => {
  const listOfNameElements = favouritesItems.querySelectorAll('.fav-display-name-text')

  const duplicateItem = Array.from(listOfNameElements).some(element => element.innerText === displayNameText)

  if (!duplicateItem) {
    favouritesItems.innerHTML += `
    <div class="favourites-item">
      <div class="favourites-item-img-container">
        <img src="${productImgSrc}" alt="">
      </div>
      <div class="favourites-item-info">
        <p class="fav-display-name-text">${displayNameText}</p>
        <p>Price: £<span>${productPriceNum}</span></p>
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

    favouritesRemoveBtn()
  }
}

const basketRemoveBtn = () => {
  const basketItem = basketItems.querySelectorAll('.basket-item')
  basketItem.forEach(item => {
    const removeItemBtn = item.querySelector('button')
    const productTotalNum = item.querySelector('.product-total')
    removeItemBtn.addEventListener('click', function() {
      basketTotal.innerText = (Number(basketTotal.innerText) - Number(productTotalNum.innerText)).toFixed(2)
      item.remove()
    })
  })
}

const basketTotalFunc = () => {
  const productTotal = document.querySelectorAll('.product-total')
  
  let basketTotalValue = 0
  productTotal.forEach(total => {
    basketTotalValue += Number(total.innerText)
  })

  basketTotal.innerText = Number(basketTotalValue.toFixed(2))
}

const addToCartFunc = (productImgSrc, displayNameText, productPriceNum, quantityValue) => {
  const productQuantityNum = Number(quantityValue.value)
  const listOfNameElements = basketItems.querySelectorAll('.basket-display-name-text')

  if (productQuantityNum < 1) {
    alert('You must add at least one item.')
    quantityValue.value = 1
    return
  }

  let basketItemInfo = null
  const duplicateItem = Array.from(listOfNameElements).some(element => {
    if (element.innerText === displayNameText) {
      basketItemInfo = element.parentElement
      return true
    } else {
      return false
    }
  })

  if (duplicateItem) {
    const duplicateItemQuantity = basketItemInfo.querySelector('.product-quantity-value')
    const duplicateItemPrice = basketItemInfo.querySelector('.product-total')

    duplicateItemQuantity.innerText = Number(duplicateItemQuantity.innerText) + productQuantityNum 
    duplicateItemPrice.innerText = (Number(duplicateItemPrice.innerText) + (productPriceNum * productQuantityNum)).toFixed(2)
  } else {
    basketItems.innerHTML += `
    <div class="basket-item" id="basket-item">
        <div class="basket-item-img-container">
          <img src="${productImgSrc}" alt="">
        </div>
        <div class="basket-item-info" id="basket-item-info">
          <p class="basket-display-name-text">${displayNameText}</p>
          <p>Quantity: <span class="product-quantity-value">${productQuantityNum}</span></p>
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

    basketRemoveBtn()
  }

  basketTotalFunc()
}

const gatherContainerInfo = (container) => {
  const addToCartBtn = container.querySelector('.add-to-cart-btn')
  const addToFavBtn = container.querySelector('.add-to-fav-btn')
  const productImg = container.querySelector('img')
  const displayName = container.querySelector('.product-name')
  const productPrice = container.querySelector('.product-price')
  const quantityValue = container.querySelector('input')

  const productImgSrc = productImg.src
  const displayNameText = displayName.innerText
  const productPriceNum = Number(productPrice.innerText.replace('£', ''))

  addToCartBtn.addEventListener('click', function() {
    addToCartFunc(productImgSrc, displayNameText, productPriceNum, quantityValue)
  })

  addToFavBtn.addEventListener('click', function() {
    addToFavFunc(productImgSrc, displayNameText, productPriceNum)
  })
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
            <button class="add-to-fav-btn">
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
                <input type="number" name="quantity-value" id="quantity-value" value=1 min="0">
              </div>
              <button id="add-to-cart-btn" class="add-to-cart-btn add-to-cart-btn-${key}">Add to Cart</button>
            </div>
          </div>
        </div>
      `
    }

    const productContainer = menBestsellers.querySelectorAll('.product-container')
    productContainer.forEach(container => {
      gatherContainerInfo(container)
    })
  })
