var addToShoppingCartButtons = document.querySelectorAll(".addToCart");
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener("click", addToCartClicked);
});

var comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

var shoppingCartItemsContainer = document.querySelector(".shoppingCartItemsContainer");

function addToCartClicked(event){
    var button = event.target;
    var item = button.closest(".card");
    var itemTitle = item.querySelector(".item-title").textContent;
    var itemPrice = item.querySelector(".item-price").textContent;
    var itemImage = item.querySelector(".item-image").src;
    
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){

    var elementsTitle = shoppingCartItemsContainer.getElementsByClassName("shoppingCartItemTitle");

    for(var i = 0; i < elementsTitle.length; i++){
        if (elementsTitle[i].innerText === itemTitle){
            var elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
            elementQuantity.value++;
            $(".toast").toast("show");
            updateShoppingCartTotal();
            return;
        }
    }

    var shoppingCartRow = document.createElement("div");
    var shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow); 

    shoppingCartRow.querySelector(".buttonDelete").addEventListener("click", removeShoppingCartItem);

    shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change", quantityChanged);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal(){
    var total = 0;
    var shoppingCartTotal = document.querySelector(".shoppingCartTotal");

    var shoppingCartItems = document.querySelectorAll(".shoppingCartItem");
    
    shoppingCartItems.forEach(shoppingCartItem => {
        var shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice");
        var shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace("$", ""));
        var shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".shoppingCartItemQuantity");
        var shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$ ${total}`
}

function removeShoppingCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.closest(".shoppingCartItem").remove();
    updateShoppingCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if (input.value <= 0){
        input.value = 1;
        updateShoppingCartTotal();
    }
}

function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = "";
    updateShoppingCartTotal();
}