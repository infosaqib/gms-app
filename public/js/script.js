const invoices = document.getElementById("invoice-coll");
const CreateBtn = document.getElementById("create-btn");
let sideBar = document.getElementById("side-container");
let overlay = document.getElementById("overlay");

//Sidebar Events

function showSidebar() {
  sideBar.classList.add("toggle");
  overlay.classList.add("toggle");
}
function hideSidebar() {
  sideBar.classList.remove("toggle");
  overlay.classList.remove("toggle");
}

//Generate invoice function
// let listCounter = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
function generateInvoiceCard() {
  return (invoices.innerHTML += invoiceItems.map((x) => {
    let { id, Date, Name, itemName, totalPrice } = x
    return `  <div onclick="openInvoice()" id="invoice-list" class="flex flex-row items-center justify-between border border-gray-200 hover:border-purple-500 cursor-pointer rounded-lg my-4 py-6 px-4  bg-white gap-7">
      <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center"><p class="text-black text-sm lg:text-base mb-2"><b class="text-blue-300">#</b>${id}</p>
        <p class="text-gray-400 text-sm lg:text-sm">${Date}</p>
        <p class="text-gray-400 text-sm lg:text-sm">${Name}</p></div> 
   <div class="flex flex-col md:flex-row gap-3 md:gap-12 items-center justify-center">
        <p class="text-gray-400 text-sm lg:text-sm">${itemName}</p>
        <p class="text-gray-400 text-sm lg:text-sm">${totalPrice}</p>
        <svg class="svgicon" width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
        </div>
    </div>
`;
  }).join(''))
  // document.myForm.reset();
}
generateInvoiceCard();
//Setting Error
function setError(id, error) {
  element = document.getElementById(id);
  element.getElementsByClassName("error")[0].innerHTML = error;
}

//Prevent form to reload the window on submission
document.myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//Form Validation
function formValidate() {
  // Name Validation
  let name = document.myForm.name.value;
  if (name.length < 5) {
    setError("name", "Name is too short");

    return false;
  }

  //Item selection validation
  let item = document.myForm.items.value;
  if (item == 0) {
    setError("items", "select an item here");
    return false;
  }
}
//invoice view
let invoiceView = document.getElementById("invoice-view");
function openInvoice() {
  invoiceView.classList.add('toggle');
  overlay.classList.add('toggle')

}
function closeInvoice() {
  invoiceView.classList.remove('toggle');
  overlay.classList.remove('toggle')
  document.myForm.reset();
}

function generateInvoice() {
  return (invoiceView.innerHTML = invoiceItems.map(x => {

    let { id, Name, Date, itemName, itemPrice, itemWeight, totalPrice } = x
    return ` <header
    class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center bg-white py-3 md:py-6 px-4 my-3 rounded-lg">
    <button onclick="closeInvoice()"
        class=" text-gray-500 hover:text-gray-400 text-sm md:text-lg p-sm flex flex-row items-center justify-center gap-2">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none"
                fill-rule="evenodd" />
        </svg> Go back</button>
    <div class="flex flex-row gap-4"> <button onclick="return printInvoice() "
            class=" text-white text-sm md:text-lg px-3 md:px-4  py-1 md:py-2 bg-purple-700 hover:opacity-[0.8] rounded-lg">Print</button>
        <button
            class="border border-purple-700 rounded-lg px-3 md:px-4  py-1 md:py-2 text-sm md:text-lg text-purple-600 hover:text-purple-700 bg-white hover:bg-gray-50"
            onclick="document.getElementById('invoice-list').remove();closeInvoice()">Delete</button>
    </div>
</header>
<main id="invoice-img " class="bg-white p-2 md:p-4 rounded-lg">
    <div class="flex flex-col  justify-between">
        <div class="flex flex-col gap-4 md:block">
            <div class="flex flex-col">
                <p class="text-black text-xs md:text-lg"><b class="text-blue-300">#</b>${id}</p>
                <p class="text-gray-400 text-xs md:text-base">Mr. ${Name}</p>
            </div>
            <div class="flex flex-col py-3">
                <p class="text-gray-400 text-xs md:text-lg  font-thin">Invoice Date</p>
                <p class="text-black font-bold text-xs md:text-base">${Date}</p>
            </div>
            <!-- <div class="flex flex-col py-3">
            <p class="text-gray-400 text-xs md:text-lg font-thin">Payment method</p>
            <p class="text-black font-bold text-xs md:text-base">Cash on dilivery</p>
        </div>
        <div class="flex flex-col py-3">
            <p class="text-gray-400 text-xs md:text-lg font-thin">Payment action</p>
            <p class="text-black font-bold text-xs md:text-base">pending</p>
        </div> -->
        </div>
        <div
            class="flex flex-row   items-start   justify-evenly bg-gray-100 rounded-lg md:rounded-t-xl md:mx-8 mt-0 md:mt-6 p-2">
            <div class="flex flex-col p-2">
                <p class="text-gray-400 text-xs md:text-base">Item name</p>
                <p class="text-black font-bold text-xs md:text-base">${itemName}</p>
            </div>
            <div class="flex flex-col p-2">
                <p class="text-gray-400 text-xs md:text-base">Qty.</p>
                <p class="text-black font-bold text-xs md:text-base">${itemWeight} kg</p>
            </div>
            <div class="flex flex-col p-2">
            <p class="text-gray-400 text-xs md:text-base">Item price</p>
            <p class="text-black font-bold text-xs md:text-base">Rs.${itemPrice}</p>
        </div>
            <div class="flex flex-col p-2">
                <p class="text-gray-400 text-xs md:text-base">Total</p>
                <p class="text-black font-bold text-xs md:text-base">Rs.${totalPrice}</p>
            </div>
        </div>

    </div>
    <div class="flex flex-row items-center justify-between bg-gray-700 p-3 md:p-6 rounded-lg">
        <h1 class="text-white text-sm md:text-lg font-bold">Amount Due</h1>
        <p class="text-white text-sm md:text-lg font-bold">Rs.${totalPrice}</p>
    </div>
</main>`
  })
  )
}




generateInvoice()


// Product menu generator
let productMenu = document.getElementById('productMenu');
function generateMenu() {
  return (productMenu.innerHTML += productItems.map((x) => {
    let { product_name, id } = x;
    return `<option value="${product_name}">${product_name}</option>`
  }).join(''))
};
generateMenu();

//Remaining weigtht 
let cuttWeight = document.myForm.cutting;
let remainingWeight = document.myForm.remaining;
let itemWeight = document.myForm.weight;

let totalWeight = () => {
  remainingWeight.value = itemWeight.value - cuttWeight.value;
  // console.log(remainingWeight.value)
  let totalCheckout = parseFloat(itemWeight.value) * parseFloat(totalPrice.value)
  console.log(totalCheckout);
  totalPrice.value = totalCheckout;
};

//Total price 
let extraPrice = document.myForm.extra;
let discount = document.myForm.discount;
let totalPrice = document.myForm.total;

function extraCharge() {
  console.log(extraPrice.value)
  let total = (totalPrice.value / 100) * extraPrice.value;
  let newPrice = parseFloat(totalPrice.value) + parseFloat(total);
  totalPrice.value = newPrice;
};

function discountCharge() {
  console.log(discount.value)
  let total = (totalPrice.value / 100) * discount.value;
  let newPrice = parseFloat(totalPrice.value) - parseFloat(total);
  totalPrice.value = newPrice;
}

function totalCheckout() {
  totalPrice.value * itemWeight.value
}

////////////////////
document.addEventListener('DOMContentLoaded', () => {


  let cleaningPriceInput = document.getElementById('cleaning-price')
  let grandingPriceInput = document.getElementById('granding-price')

  productMenu.addEventListener('change', () => {
    document.getElementById('select-item').setAttribute('disabled', true);
    const selectedProduct = productItems.find(product => product.product_name === productMenu.value)
    if (selectedProduct) {
      cleaningPriceInput.value = selectedProduct.cleaning_price;
      grandingPriceInput.value = selectedProduct.granding_price;


      totalPrice.value = selectedProduct.cleaning_price + selectedProduct.granding_price;
    }
  })
})


