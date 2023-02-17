import { Product } from '../models/product'
/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export function sortProductsBy(sortBy: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [...products];

  const comparison = (p1: Product, p2: Product) => {
    if (sortBy === Sort.PRICE_ASCENDING) {
      return p1.price - p2.price;
    } else if (sortBy === Sort.PRICE_DECENDING) {
      return p2.price - p1.price;
    } else if (sortBy === Sort.NAME_ALPHABETIC) {
      return p1.name.localeCompare(p2.name, "sv");
    } else {
      return p2.name.localeCompare(p1.name, "sv");
    }
  }
  return copiedList.sort(comparison);
}


/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");


export function createProductHtml() {

  updateCartQuantity();

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    
    let RenderdogImg = createDogImg(i);
    dogproduct.appendChild(RenderdogImg);

    let RenderDogProps = createDogProductProps(i);
    dogproduct.appendChild(RenderDogProps);
 
    sortProducts(i, dogproduct);
  }

  function createDogImg(i: number){
    let dogImgContainer: HTMLDivElement = document.createElement("div");
      dogImgContainer.className = "dogimgcontainer";

      let dogImg: HTMLImageElement = document.createElement("img");

      dogImg.src = productList[i].picture;
      dogImg.alt = productList[i].pictureAlt;

      dogImg.addEventListener("mouseover", () => {
        cartSymbolContainer.classList.add("hover");
        dogImg.classList.add("hover");
      });

      dogImg.addEventListener("mouseout", () => {
        dogImg.classList.remove("hover");
        cartSymbolContainer.classList.remove("hover");
      });

      dogImgContainer.appendChild(dogImg);

      let cartSymbolContainer: HTMLDivElement = document.createElement("div");
      cartSymbolContainer.className = "cartSymbolContainer";
      dogImgContainer.appendChild(cartSymbolContainer);

      let cartSymbol: HTMLElement = document.createElement("i");
      cartSymbol.className = "bi bi-bag-plus";
      cartSymbolContainer.appendChild(cartSymbol);

      cartSymbol.addEventListener("click", () => {
        let cart = new Cart();
        cart.addToCart(i);
      });

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    return dogImgContainer;
  }

  function createDogProductProps(i: number){

    let dogProps: HTMLDivElement = document.createElement("div");

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogProps.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogProps.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogProps.appendChild(info);

      return dogProps;
  }

  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

function updateCartQuantity() {

  let cartQuantity = cartList.reduce((previousItem: number, currentItem: number) => previousItem + currentItem);

  let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = "" + cartQuantity;
}

function sortProducts(i: number, dogproduct: HTMLDivElement) {
  if (productList[i].category === "sassy") {
    let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat1.appendChild(dogproduct);
  }
  if (productList[i].category === "kriminella") {
    let cat2: HTMLElement = document.getElementById(
      "kriminella"
    ) as HTMLElement;
    dogproduct.className = "dogproduct";
    cat2.appendChild(dogproduct);
  }
  if (productList[i].category == "singlar") {
    let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat3.appendChild(dogproduct);
  }
  if (productList[i].category === "puppy") {
    let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat4.appendChild(dogproduct);
  }
  if (productList[i].category === "oldies") {
    let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
    dogproduct.className = "dogproduct";
    cat5.appendChild(dogproduct);
  }
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

let fromstorage: string = localStorage.getItem("savedCart") || "";
let cartProducts: CartProduct[] = JSON.parse(fromstorage);

function createTableHtml() {


  let { titleContainer, amountContainer, productQuantity, checkkoutTotal } = RenderTable();

  for (let i: number = 0; i < cartProducts.length; i++) {
    let amountQuantity: HTMLTableCellElement = renderTableHead(i);

    renderButtons(amountQuantity);
  }

  let addition = cartProducts.reduce((accumulate, current) =>{
    return accumulate + (current.price * current.amount);
  }, 0);

  let totalprice: HTMLTableCellElement = document.createElement("th");
  checkkoutTotal.appendChild(totalprice);
  totalprice.innerHTML = addition + "$";
  totalprice.id = "total__price";

  function renderButtons(amountQuantity: HTMLTableCellElement) {
    let amountPlusBtn: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountPlusBtn);
    amountQuantity.className = "amount__quantity";

    let iconPlus: HTMLSpanElement = document.createElement("i");
    amountPlusBtn.appendChild(iconPlus);

    iconPlus.className = "fas fa-plus";
    amountPlusBtn.className = "plusbtn";

    let iconMinus: HTMLSpanElement = document.createElement("i");
    iconMinus.className = "fas fa-minus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountminusbtn);
    amountminusbtn.appendChild(iconMinus);
    amountminusbtn.className = "minusbtn";
  }

  function renderTableHead(i: number) {
    let tableProduct: HTMLTableCellElement = document.createElement("th");
    titleContainer.appendChild(tableProduct);
    tableProduct.innerHTML = cartProducts[i].name;
    tableProduct.className = "table__product";

    let tableAmount: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(tableAmount);
    tableAmount.innerHTML = "x" + cartProducts[i].amount;
    tableAmount.className = "table__amount";

    let amountQuantity: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(amountQuantity);
    return amountQuantity;
  }

  function RenderTable() {
  let amountContainer = document.getElementById("amount-checkout-container") as HTMLDivElement;

  let amountText: HTMLTableCellElement = document.createElement("th");
  amountContainer.appendChild(amountText);
  amountText.innerHTML = "amount:";

  let titleContainer = document.getElementById("title-container") as HTMLTableRowElement;
  titleContainer.innerHTML = `<strong>products:</strong>`;

  let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;

  let qttext: HTMLTableCellElement = document.createElement("th");
  productQuantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkoutTotal = document.getElementById("title-total") as HTMLTableCellElement;

  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkoutTotal.appendChild(totaltext);
  totaltext.innerHTML = "total:";
  return { titleContainer, amountContainer, productQuantity, checkkoutTotal };
  }
}
