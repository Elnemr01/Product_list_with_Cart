let cards=document.querySelector(".cards");
let firstPart=document.querySelector(".firstPart .images");
let myCart=document.querySelector(".secondPart h2");
let confirm=document.querySelector("button.confirm");
let totalPrice=document.querySelector(".totalPrice span:last-child");
let confirmedPrice=document.querySelector(".priceTotal span:last-child");
let confirmMessage=document.querySelector(".message");
let confirmedProducts=document.querySelector(".message .finalProducts");
let newOrder=document.querySelector(".message button ");
let mainContainer=document.querySelector(".container");

let numOfProduts=0;
let orderTotal=0;
let dataLen=0;
let confirmed=false;

fetch("data.json").then((res)=> res.json())
.then((data) => {
    dataLen=data.length;
    data.forEach(element => {
        // card div
        let card=document.createElement("div");
        card.className=`card ${element.name}`;
        // image div and cart icon
        let imageDiv=document.createElement("div");
        imageDiv.className="image";
        //-------------
        // let img=document.createElement("img");
        // img.setAttribute("alt",`photo`); 
        // img.setAttribute("loading",`lazy`);
        // img.className="productImg";
        // img.setAttribute("src",`${element.image.desktop}`);
        //-------------
        let pictureDiv=document.createElement("picture");
        pictureDiv.className="pictureDiv";
        pictureDiv.innerHTML=`<source media="(min-width: 1200px)" srcset="${element.image.desktop}">
        <source media="(min-width: 768px)" srcset="${element.image.tablet}">
        <source media="(max-width: 767px)" srcset="${element.image.mobile}">
        <img src="${element.image.mobile}" alt="photo" loading="lazy" class="productImg">`;
        // image when confirm
        let imgWhenConfirm=document.createElement("div");
        // imgWhenConfirm.setAttribute("alt",`photo`); 
        // imgWhenConfirm.setAttribute("loading",`lazy`);
        imgWhenConfirm.className=element.name;
        imgWhenConfirm.textContent=element.image.thumbnail;
        firstPart.appendChild(imgWhenConfirm);
        // cart icon 1
        let icon1=document.createElement("div");
        icon1.className="icon1";
        icon1.innerHTML=`<img src="images/icon-add-to-cart.svg" alt="photo" loading="lazy"> <span>add to cart</span>`;
        // cart icon 2
        let icon2=document.createElement("div");
        icon2.className="icon2";
        icon2.innerHTML=`<img src="images/icon-decrement-quantity.svg" class="minus" alt="pgoto" loading="lazy">
        <span>1</span><img src="images/icon-increment-quantity.svg" class="plus" alt="pgoto" loading="lazy">`
        // add image and icon
        imageDiv.appendChild(pictureDiv);
        imageDiv.appendChild(icon1);
        imageDiv.appendChild(icon2);
        // add the info of product 
        // add product taste 
        let category=document.createElement("p");
        category.className="taste";
        category.innerHTML=element.category;
        // add product name 
        let name=document.createElement("h2");
        name.className="proName";
        name.innerHTML=element.name;
         // add product price 
        let price=document.createElement("p");
        price.className="price";
        price.innerHTML=`$${element.price}`;
        // add element into card
        card.appendChild(imageDiv);
        card.appendChild(category);
        card.appendChild(name);
        card.appendChild(price);
        // add card into cards div
        cards.appendChild(card);
    });

    let icon1s=document.querySelectorAll(".icon1");
    icon1s.forEach((ele)=> ele.addEventListener("click",HandleCartClick));

    let plusIcons=document.querySelectorAll(".plus");
    let minusIcons=document.querySelectorAll(".minus");
    plusIcons.forEach((ele)=> ele.addEventListener("click",increaseProduct));
    minusIcons.forEach((ele)=> ele.addEventListener("click",decreaseProduct));

});

confirm.addEventListener("click",confirmOrder);
newOrder.addEventListener("click",clearForNewOrder);

// ---------- function of events -----------//

function HandleCartClick (event) {
    let curr=event.target;
    let next=curr.nextElementSibling;
    if(!curr.classList.contains("icon1")) {
        curr=event.target.parentElement;
    }
    next=curr.nextElementSibling;
    let prevEle=curr.previousElementSibling.lastElementChild;
    curr.style.cssText=`opacity: 0; z-index: 1;`;
    next.style.cssText=`opacity: 1; z-index: 2`;
    prevEle.style.cssText=`border-color: #ef5220;`;
    numOfProduts++;
    myCart.innerHTML=`your cart(${numOfProduts})`;
    addToBasketForFirstTime(curr);
}

function increaseProduct (event) {
    let curr=event.target;
    let last=curr.previousElementSibling;
    let val=last.innerHTML;
    last.innerHTML= ++val;
    numOfProduts++;
    myCart.innerHTML=`your cart(${numOfProduts})`;
    addToBasketWithPlus(curr);
}

function decreaseProduct (event) {
    let curr=event.target;
    let last=curr.nextElementSibling;
    let val=last.innerHTML;
    if(--val > 0) {
        last.innerHTML=val;
    }
    else {
        let par2=curr.parentElement;
        let par1=par2.previousElementSibling;
        par2.style.cssText=`opacity: 0; z-index: 1;`;
        par1.style.cssText=`opacity: 1; z-index: 2`;
        let proImg=par1.previousElementSibling.lastElementChild;
        proImg.style.borderColor="transparent";
    }
    numOfProduts--;
    myCart.innerHTML=`your cart(${numOfProduts})`;
    removeFromBasketWithMinus(curr);
}

function addToBasketForFirstTime (curr) {
    // add to cart products and display the basket
    let chosenProducts=document.querySelector(".chosenProducts");
    let emptyCart=document.querySelector(".emptyCart");
    let products=document.querySelector(".products");

    chosenProducts.style.display="block";
    emptyCart.style.display="none";
    // create div for one product
    let divProduct=document.createElement("div");
    let proName=document.createElement("div");
    let nums=document.createElement("span");
    let onePrice=document.createElement("span");
    let totalOfOne=document.createElement("span");
    let remIcon=document.createElement("img");

    divProduct.className=`${curr.parentElement.nextElementSibling.nextElementSibling.innerHTML}`;
    proName.className="proName";
    proName.innerHTML=`${curr.parentElement.nextElementSibling.nextElementSibling.innerHTML}`;
    nums.className="nums";
    nums.innerHTML="1x";
    onePrice.className="onePrice";
    onePrice.innerHTML=`@${curr.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML}`;
    totalOfOne.className="totalOfOne";
    totalOfOne.innerHTML=onePrice.innerHTML;
    remIcon.setAttribute("alt",`photo`); 
    remIcon.setAttribute("loading",`lazy`);
    remIcon.setAttribute("onclick",`removeElefromCart(this)`);
    remIcon.className="remove";
    remIcon.setAttribute("src","images/icon-remove-item.svg");

    // add to products
    divProduct.appendChild(proName);
    divProduct.appendChild(nums);
    divProduct.appendChild(onePrice);
    divProduct.appendChild(totalOfOne);
    divProduct.appendChild(remIcon);
    products.appendChild(divProduct);
    // add price to total
    let price= parseFloat(onePrice.textContent.slice(2));
    orderTotal+=price;
    totalPrice.innerHTML=`$${orderTotal}`;

}

function addToBasketWithPlus (curr) {
    let proName=curr.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent;
    let onePrice=document.querySelector(`.products [class="${proName}"] .onePrice`);
    let totalOfOne=document.querySelector(`.products [class="${proName}"] .totalOfOne`);
    let numOfPro=document.querySelector(`.products [class="${proName}"] .nums`);

    let number=parseInt(numOfPro.textContent.slice(0,numOfPro.textContent.length-1));
    number++;
    numOfPro.innerHTML=`${number}x`;

    let price1=parseFloat(onePrice.textContent.slice(2));
    let priceTotal=parseFloat(totalOfOne.textContent.slice(2));

    priceTotal+=price1;
    orderTotal+=price1;
    totalOfOne.innerHTML=`@$${priceTotal}`;
    totalPrice.innerHTML=`$${orderTotal}`;
}

function removeFromBasketWithMinus (curr) {
    let proName=curr.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent;
    let onePrice=document.querySelector(`.products [class="${proName}"] .onePrice`);
    let totalOfOne=document.querySelector(`.products [class="${proName}"] .totalOfOne`);
    let numOfPro=document.querySelector(`.products [class="${proName}"] .nums`);

    let number=parseInt(numOfPro.textContent.slice(0,numOfPro.textContent.length-1));
    number--;
    numOfPro.innerHTML=`${number}x`;
    

    let price1=parseFloat(onePrice.textContent.slice(2));
    let priceTotal=parseFloat(totalOfOne.textContent.slice(2));

    priceTotal-=price1;
    orderTotal-=price1;
    totalOfOne.innerHTML=`@$${priceTotal}`;
    totalPrice.innerHTML=`$${orderTotal}`;
    console.log(proName)
    if(number<=0) {
        let eleRm=document.querySelector(`.products [class="${proName}"]`);
        eleRm.remove();
    }

    if(numOfProduts<=0) {
        let emptyCart=document.querySelector(".emptyCart");
        let chosenProducts=document.querySelector(".chosenProducts");
        chosenProducts.style.display="none";
        emptyCart.style.display="block";
    }
}


function removeElefromCart (ele) {
    let removedEle=ele.parentElement;
    let totalOfOne=ele.previousElementSibling;
    let numOfPro=totalOfOne.previousElementSibling.previousElementSibling;

    let price=parseFloat(totalOfOne.textContent.slice(2));
    let num=parseFloat(numOfPro.textContent.slice(0,numOfPro.textContent.length-1));

    numOfProduts-=num;
    orderTotal-=price;

    myCart.innerHTML=`your cart(${numOfProduts})`;
    totalPrice.innerHTML=`$${orderTotal}`;
    
    if(numOfProduts===0) {
        let emptyCart=document.querySelector(".emptyCart");
        let chosenProducts=document.querySelector(".chosenProducts");
        chosenProducts.style.display="none";
        emptyCart.style.display="block";
    }

    let nameOfPro=removedEle.className;
    let e=document.querySelector(`[class="card ${nameOfPro}"]`);
    let icon1=e.children[0].children[1];
    let icon2=e.children[0].children[2];
    let img=e.children[0].children[0].lastElementChild;

    let span=icon2.children[1];
    span.innerHTML="1";

    icon1.style.cssText="opacity: 1; z-index: 2;";
    icon2.style.cssText="opacity: 0; z-index: 1;";
    img.style.borderColor="transparent";

    removedEle.remove();
}

function confirmOrder () {
    if(confirmed) return;
    confirmed=true;
    let finalProducts=document.querySelectorAll(".chosenProducts .products > div ");
    finalProducts.forEach((ele)=> {
        let pName=ele.className;
        let nums=ele.children[1].textContent;
        let onePrice=ele.children[2].textContent;
        let total=ele.children[3].textContent;

        let productDiv=document.createElement("div");
        productDiv.className="product";

        let imgDiv=document.createElement("div");
        imgDiv.className="image";
        let minImg=document.querySelector(`div[class="${pName}"]`);
        console.log(minImg);
        imgDiv.innerHTML=`<img src="${minImg.textContent}" loading="lazy" alt="photo">`;

        let infoDiv=document.createElement("div");
        infoDiv.className="info";

        let proName=document.createElement("div");
        proName.className="proName";
        proName.innerHTML=pName;

        let NumSpan=document.createElement("span");
        NumSpan.className="nums";
        NumSpan.innerHTML=nums;

        let onePriceSpan=document.createElement("span");
        onePriceSpan.className="onePrice";
        onePriceSpan.innerHTML=onePrice;

        let totalPrice=document.createElement("div");
        totalPrice.className="total";
        totalPrice.innerHTML=total;

        // append elements
        infoDiv.appendChild(proName);
        infoDiv.appendChild(NumSpan);
        infoDiv.appendChild(onePriceSpan);
        infoDiv.appendChild(totalPrice);

        productDiv.appendChild(imgDiv);
        productDiv.appendChild(infoDiv);
        confirmedProducts.appendChild(productDiv);
    });

    confirmedPrice.innerHTML=`$${orderTotal}`;
    mainContainer.classList.add("disabled");
    confirmMessage.style.cssText=`opacity: 1; z-index: 5; top: 25%; transform: translate(-50%,0)`;
    window.scrollTo({
        left:0,
        top:0,
        behavior:"smooth"
    });

    if(innerWidth <= 767) {
        confirmMessage.style.cssText=`opacity: 1; z-index: 5; min-width: calc(100% - 20px);
        top: 100px; transform: translate(-50%,0)`;
    }

}

function clearForNewOrder () {
    let minusIconsAfterContirm=document.querySelectorAll(".chosenProducts .products .remove");
    minusIconsAfterContirm.forEach((rem)=> {
        removeElefromCart(rem);
    });

    if(innerWidth <= 767) {
        confirmMessage.style.cssText=`opacity: 1; z-index: 5; min-width: calc(100% - 20px);
        top: 100px; transform: translate(-50%,0)`;
    }
    else {
        confirmMessage.style.cssText=`opacity: 0; z-index: 0; top: 50%; transform: translate(-50%,0)`;
    }
    confirmedProducts.innerHTML=""; 
    confirmedPrice.innerHTML=``;
    confirmed=false;
    mainContainer.classList.remove("disabled");
}
