let menu = document.getElementById('menu')
let cartBtn = document.getElementById('cart-btn')
let cartModal = document.getElementById('cart-modal')
let cartitemsContainer = document.getElementById('cart-items')
let cartTotal = document.getElementById('cart-total')
let checkoutBtn = document.getElementById('checkout-btn')
let closeModalBtn = document.getElementById('close-modal-btn')
let cartCounter = document.getElementById('cart-count')
let addressInput = document.getElementById('address')
let addressWarn = document.getElementById('address-warn')

cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function(event){
    if (event.target === cartModal || event.target === closeModalBtn){
        cartModal.style.display = 'none'
    }
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    console.log(parentButton);
    
    if (parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        //add no carrinho
        addToCart(name, price)
    }
})

function addToCart(name, price){
    alert("o item é " + name)
}