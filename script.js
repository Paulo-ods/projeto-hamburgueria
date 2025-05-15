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
let openClose = document.getElementById('date-span')
let retirada = document.getElementById('retirada')
let delivery = document.getElementById('delivery')
let entrega = document.getElementById('entrega')
let card = document.getElementById('Wcard')

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
        
        addToCart(name, price)
    }
})

function toggleCheckbox(selectedCheckbox, otherCheckbox) {
    if (selectedCheckbox.checked) {
        otherCheckbox.checked = false; 

        if (selectedCheckbox === retirada) {
            entrega.style.display = 'none'; 
            card.classList.add('cardP')
            addressWarn.classList.add("hidden")
        } else {
            entrega.style.display = 'block'; 
        }
    } else {
        entrega.style.display = 'block'; 
    }
}

retirada.addEventListener('change', () => toggleCheckbox(retirada, delivery));
delivery.addEventListener('change', () => toggleCheckbox(delivery, retirada));

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
        cartitemsElement.classList.add("flex", "justify-between", "py-3", "border-b-2",  "flex-col")

        cartitemsElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font=medium">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-btn bg-red-200 rounded px-2" data-name="${item.name}">
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

//remove
cartitemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }else {
            cart.splice(index, 1)
            updateCartModal()
            return
        }
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

//finalizar
checkoutBtn.addEventListener("click", function(){
    let isOpen = checkOpen()
    if (!isOpen){
        Toastify({
            text: "RESTAURANTE FECHADO NO MOMENTO",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #d86b6b, #ef4444)",
            }, 
        }).showToast();
        return
    }

    if(cart.length === 0){
        return
    }

    if (!retirada.checked && !delivery.checked) {
        Toastify({
            text: "Selecione retirada ou delivery antes de finalizar o pedido.",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #d86b6b, #ef4444)",
            },
        }).showToast();
        return;
    }

    if (delivery.checked && addressInput.value === "" ){
            addressWarn.classList.remove("hidden")
            addressInput.classList.add("border-red-500")
            return
    }

    //api
    let carItems = cart.map((item) => {
        return `*${item.name}*\nQuantidade: (${item.quantity})\nPreço: R$(${item.price})\n`;
      }).join("\n");
      
      let endereco = delivery.checked ? `\nEndereço: ${addressInput.value}` : "";
      
      let message = encodeURIComponent(carItems + endereco);
      let phone = "46988192326";
      
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
      
      

    cart = []
    addressInput.value = ""
    updateCartModal()
})

function checkOpen(){
    let now = new Date();
    let hour = now.getHours();
    return hour >= 12 && hour < 23;
}

let isOpen = checkOpen()

if(isOpen){
    openClose.classList.remove("bg-red-500")
    openClose.classList.add("bg-green-600")
}else{
    openClose.classList.remove("bg-green-600")
    openClose.classList.add("bg-red-500")
}

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("navbar");
    const navInitialOffsetTop = nav.offsetTop; 
  
    document.addEventListener("scroll", () => {
      if (window.scrollY >= navInitialOffsetTop) {
        nav.classList.add("fixed", "top-0", "bg-white", "shadow-lg", "z-50");
      } else {
        nav.classList.remove("fixed", "top-0", "bg-white", "shadow-lg", "z-50");
      }
    });
  });
  
  