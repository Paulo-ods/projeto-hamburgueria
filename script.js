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

let cart = []

cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
    updateCartModal()
})

cartModal.addEventListener("click", function(event){
    if (event.target === cartModal || event.target === closeModalBtn){
        cartModal.style.display = 'none'
    }
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    
    if (parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        //add no carrinho
        addToCart(name, price)
    }
})

function addToCart(name, price){
    let existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.innerHTML = totalQuantity;
        return
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

//atualiza o modal
function updateCartModal(){
    cartitemsContainer.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        let cartitemsElement = document.createElement("div")
        cartitemsElement.classList.add("flex", "justify-between", "mt-4", "flex-col")

        cartitemsElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font=medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button>
                    Remover
                </button>
            </div>
        `
        total += item.price * item.quantity

        cartitemsContainer.appendChild(cartitemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.innerHTML = totalQuantity;
}

