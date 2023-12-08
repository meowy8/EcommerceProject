const profileIconBtn = document.getElementById('profile-icon-btn')
const signInDropdown = document.getElementById('sign-in-dropdown')
const favouritesBtn = document.getElementById('favourites-btn')
const favouritesDropdown = document.getElementById('favourites-dropdown')
const favouritesItems = document.getElementById('favourites-items')
const basketBtn = document.getElementById('basket-btn')
const basketDropdown = document.getElementById('basket-dropdown')
const basketItems = document.getElementById('basket-items')
const basketTotal = document.querySelector('.basket-total span')
const productsDisplay = document.getElementById('products-display')

const menSectionDropdownBtns = document.querySelectorAll('.men-section-dropdown button')
menSectionDropdownBtns.forEach(button => {
  button.addEventListener('click', function() {
    const displayChoice = button.innerText
    getMenClothingData(displayChoice)
  })
})

const createProductDisplay = (itemData) => {
  const productDisplayHtml = `
  <div class="product-container">
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
        <button id="add-to-cart-btn" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
  `
  return productDisplayHtml
}

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

const getMenClothingData = (displayChoice) => {
  fetch('itemsData/mensClothing.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)

    if (displayChoice === 'Bestsellers') {
      productsDisplay.innerHTML = `
      <section class="men-bestsellers" id="men-bestsellers"></section>
      `
      const menBestsellers = document.getElementById('men-bestsellers')
  
      const menBestsellersData = data.bestsellers
      console.log(menBestsellersData)
  
      for (const item in menBestsellersData) {
        const itemData = menBestsellersData[item]
        menBestsellers.innerHTML += createProductDisplay(itemData)
      }
  
      menBestsellers.style.display = 'grid'
  
      const productContainer = menBestsellers.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'T-Shirts/Shirts') {
      productsDisplay.innerHTML = `
      <section class="men-shirts" id="men-shirts"></section>
      `
      const menShirts = document.getElementById('men-shirts')
  
      const menShirtsData = data['t-shirts']
      console.log(menShirtsData)
  
      for (const item in menShirtsData) {
        const itemData = menShirtsData[item]
        menShirts.innerHTML += createProductDisplay(itemData)
      }
  
      menShirts.style.display = 'grid'
  
      const productContainer = menShirts.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'Trousers') {
      productsDisplay.innerHTML = `
      <section class="men-trousers" id="men-trousers"></section>
      `
      const menTrousers = document.getElementById('men-trousers')
  
      const menTrousersData = data['trousers']
      console.log(menTrousersData)
  
      for (const item in menTrousersData) {
        const itemData = menTrousersData[item]
        menTrousers.innerHTML += createProductDisplay(itemData)
      }
  
      menTrousers.style.display = 'grid'
  
      const productContainer = menTrousers.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    } else if (displayChoice === 'Sweatshirts/Hoodies') {
      productsDisplay.innerHTML = `
      <section class="men-hoodies" id="men-hoodies"></section>
      `
      const menHoodies = document.getElementById('men-hoodies')
  
      const menHoodiesData = data['sweatshirts/hoodies']
      console.log(menHoodiesData)
  
      for (const item in menHoodiesData) {
        const itemData = menHoodiesData[item]
        menHoodies.innerHTML += createProductDisplay(itemData)
      }
  
      menHoodies.style.display = 'grid'
  
      const productContainer = menHoodies.querySelectorAll('.product-container')
      productContainer.forEach(container => {
        gatherContainerInfo(container)
      }) 
    }
  })
}


