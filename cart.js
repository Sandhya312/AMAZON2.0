// get item for m cart.html

function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.docs.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateCartItems(cartItems);
    getTotalCost(cartItems);
  });
}

// //calulate total cost
function getTotalCost(items){
    let totalCost =0;
    items.forEach((item)=>{
           totalCost +=(item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText = numeral(totalCost).format('$0,0.00');

}

// decrease count of item
function decreaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get()
    .then((doc)=>{
        if(doc.exists){
            if(doc.data().quantity >1){
                cartItem.update({
                    quantity: doc.data().quantity-1
                })
            }else{
                deleteItem(itemId);
            }
        }
    })
}
// increase count of item

function increaseCount(itemId){
    let cartItem =db.collection("cart-items").doc(itemId);
    cartItem.get()
    .then((doc)=>{
        if(doc.exists){
            if(doc.data().quantity>0){
              cartItem.update({
                  quantity: doc.data().quantity+1
              })
            }
        }
    })
}

// delete item
function deleteItem(itemId){
    console.log(itemId)
    db.collection("cart-items").doc(itemId).delete();
}

// item in cart.html
function generateCartItems(cartItems) {
  let itemsHTML = "";
  cartItems.forEach((item) => {
    itemsHTML += `
       <div class="cart-item flex items-center
       border-b border-gray-200 pb-4 ">
         <div class="cart-item-image w-40 h-24 bg-white mr-5
         p-4 rounded-lg">
             <img class="w-full h-full object-contain"
                 src="${item.image}">
         </div>
         <div class="cart-item-details flex-grow ">
             <div class="cart-item-title font-bold text-sm
           text-gray-600">
                ${item.name}
             </div>
             <div class="cart-item-brand text-sm text-gray-400
           ">
                 ${item.make}
             </div>
         </div>
         <div class="cart-item-counter w-48 flex items-center">
             <div data-id=${item.id} class="cart-item-decrease chevron-left  cursor-pointer bg-gray-200 rounded
           text-gray-400 flex justify-center items-center hover:bg-gray-300 mr-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                     <path stroke-linecap="round" stroke-linejoin="round"
                         d="M15.75 19.5L8.25 12l7.5-7.5" />
                 </svg>

             </div>
             <h4 class="text-gray-400">${item.quantity}</h4>

             <div data-id=${item.id} class="cart-item-increase chevron-right cursor-pointer bg-gray-200 rounded
                  text-gray-400 flex justify-center items-center hover:bg-gray-300 ml-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                     <path stroke-linecap="round" stroke-linejoin="round"
                         d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                 </svg>

             </div>
         </div>
         <div class="item-total-cost w-48 font-bold text-gray-400">
              ${numeral(item.price * item.quantity).format('$0,0.00')}
         </div>
         <div data-id=${item.id} class="cart-item-delete  w-10 font-bold
             cursor-pointer hover:text-gray-400 text-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>

         </div>
     </div>
            
       
       `;
  });
  document.querySelector(".cart-items").innerHTML =itemsHTML;
  createEventListeners();
}

// create event linsterner in each button
function createEventListeners(){
    let decreaseButtons = document
    .querySelectorAll(".cart-item-decrease");
    let increaseButtons = document
    .querySelectorAll(".cart-item-increase");
   let deleteButtons =document
   .querySelectorAll(".cart-item-delete");


    decreaseButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
             decreaseCount(button.dataset.id);
        })
    })

increaseButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        increaseCount(button.dataset.id);
    })
})

deleteButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        deleteItem(button.dataset.id);
        console.log(button.dataset.id);
    })
})

}



getCartItems();
