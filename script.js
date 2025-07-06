//Increment/Decrease product amount
const changeAmountButtons = document.querySelectorAll('button[type=spinner]')

changeAmountButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculateAmount(button.value)
    })
})

function calculateAmount(buttonValue) {
    const productAmount = document.getElementById('product-amount')
    const currentAmount = +productAmount.textContent
    const direction = buttonValue === '+' ? 1 : -1;
    const newAmount = currentAmount + direction
    productAmount.textContent = newAmount >= 0 ? newAmount : 0;
}

//Open and close categories (hamburguer menu)
const menuButtons = document.querySelectorAll('button[value=menuButton]')
const menuPanel = document.getElementById('menu-panel')
const overlay = document.getElementById('overlay')

menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        openCloseMenu()
    })
})


function openCloseMenu() {
    const isOpen = menuPanel.classList.contains('menu-text')

    menuPanel.classList.toggle('menu-text', !isOpen)
    menuPanel.classList.toggle('menu-displayed', isOpen)
    overlay.classList.toggle('overlay', isOpen)
}

//Change product image 
const nextPreviousButtons = document.querySelectorAll('.next-image-button, .previous-image-button')
nextPreviousButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeImage(button)
    })
})

function changeImage(button) {
    const imagesArray = [
        '/images/image-product-1.jpg',
        '/images/image-product-2.jpg',
        '/images/image-product-3.jpg',
        '/images/image-product-4.jpg'
    ];

    const parentElement = button.parentElement
    const currentImg = Array.from((parentElement.querySelector('.product-image').children))[0]
    const currentImage = currentImg.getAttribute('src')
    const index = imagesArray.indexOf(currentImage)

    const direction = button.value === '+' ? 1 : -1;
    let newIndex = index + direction;

    if (newIndex >= imagesArray.length) {
        newIndex = 0
    } else if (newIndex < 0) {
        newIndex = imagesArray.length - 1
    }

    currentImg.src = imagesArray[newIndex]
}


//Click in cart icon to open cart panel
const cartButton = document.querySelector('.cart-button')
cartButton.addEventListener('click', () => {
    openCart()
})

function openCart() {
    const cartPanel = document.getElementById('cart-panel')
    const isOpen = cartPanel.classList.contains('is-hidden')

    cartPanel.classList.toggle('cart-panel', isOpen)
    cartPanel.classList.toggle('is-hidden', !isOpen)

    const image = Array.from(cartButton.children)[1]
    image.src = isOpen ? '/images/icon-cart-black.svg' : '/images/icon-cart.svg'
}

//Click on Add to cart to open the cart-panel and show the info
const emptyP = document.getElementById('empty-parragraph')
const productDetail = document.getElementById('product-detail')
const buttonSubmit = document.querySelector('.button-submit')
buttonSubmit.addEventListener('click', () => {

    const productAmount = document.getElementById('product-amount')

    if (+productAmount.textContent > 0) {
        openCart()
        showDetail(productAmount.textContent, buttonSubmit)
        changeStateAmountIcon(+productAmount.textContent)
        
    }
})

function changeStateAmountIcon(amount) {
    const amountIcon = document.querySelector('#amount-icon')
    const isUsed=amountIcon.classList.contains('is-hidden')
    amountIcon.classList.toggle('is-hidden', !isUsed)
    amountIcon.classList.toggle('amount-icon', isUsed)
    amountIcon.textContent = amount
}

function showDetail(productAmountValue, button) {

    const amount = document.getElementById('amount')
    const total = document.getElementById('total')

    changeContent(button)

    amount.textContent = productAmountValue
    total.textContent = ` $${calculateTotal(+amount.textContent)}`
}

function changeContent(button) {
    const isShown = button.getAttribute('type') === 'submit'
    emptyP.classList.toggle('is-hidden', isShown)
    productDetail.classList.toggle('is-hidden', !isShown)
    productDetail.classList.toggle('product-detail', isShown)
}

function calculateTotal(amount) {
    return 125 * amount
}

//Checkout and delete button to erase the product added
const deleteButtons = document.querySelectorAll('.checkout-button, .button-delete')
deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeContent(button)
        changeStateAmountIcon(0)
    })
})

//Click on product image and expand it
const openAndCloseButtons = document.querySelectorAll('.product-image, .close-modal')
openAndCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showModal()
    })
})

function showModal() {
    const containerLightbox = document.querySelector('#container-lightbox')
    const isExpanded = containerLightbox.classList.contains('is-hidden')

    overlay.classList.toggle('overlay', isExpanded)
    containerLightbox.classList.toggle('is-hidden', !isExpanded)
    containerLightbox.classList.toggle('product-image-container-expanded', isExpanded)
}