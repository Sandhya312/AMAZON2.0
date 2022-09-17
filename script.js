
// get item
function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });
      });
      generateItems(items);
    });
}

// add item to cart.html
function addToCart(item) {
  
  //create new database collection
 let cartItem= db.collection("cart-items").doc(item.id);
 cartItem.get()
 .then(function(doc){
    //  update quantity
      if(doc.exists){
          cartItem.update({
              quantity: doc.data().quantity+1
          })
      }else{
          cartItem.set({
            image:item.image,
            make:item.make,
            name:item.name,
            rating:item.rating,
            price:item.price,
            quantity:1
        })
      }
 })
}

//  add product in index.html
function generateItems(items) {

  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-5","mt-10");
    doc.innerHTML = `
        <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
        <img src="${item.image}"
            class="w-full h-full object-contain" alt="product">
         </div>
    <div class="product-name text-gray-700 font-bold mt-2 text-sm">
       ${item.name}
    </div>
    <div class="product-make text-green-700 font-bold">
       ${item.make}
    </div>
    <div class="product-rating text-yellow-300 font-bold my-1">
    ⭐⭐⭐⭐${item.rating}</div>
    <div class="product-price font-bold
     text-gray-700 text-lg">   ${numeral(item.price).format('$0,0.00')}</div>
    
             
        `;
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "add-to-cart",
      "w-20",
      "h-8",
      "bg-yellow-500",
      "flex",
      "items-center",
      "justify-center",
      "text-white",
      "text-md",
      "hover:bg-yellow-600",
      "cursor-pointer",
      "text-sm",
      "rounded"
    );

    addToCartEl.innerText = "Add to cart";
    addToCartEl.addEventListener("click", () => {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}

getItems();
