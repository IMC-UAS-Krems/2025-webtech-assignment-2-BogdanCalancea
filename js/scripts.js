const products = [
    {
        id: 1,
        name: "Basic Scratching </br>Post",
        price: 10.49,
        image: "img/cat1.webp",
        descr: "<b>Colour</b>: grey </br><b>Overall dimensions</b>: 47 x 37 x 80 cm </br>(L x W x H)"
    },
    {
        id: 2,
        name: "Paradise Scratching </br>Tree",
        price: 125.29,
        image: "img/cat2.webp",
        descr: "<b>Colour</b>: cream </br><b>Total dimensions</b>: max. 175 x 105 x 90cm </br>(H x L x W)"
    },
    {
        id: 3,
        name: "Penelope Cat </br>Tree",
        price: 52.99,
        image: "img/cat3.webp",
        descr: "<b>Colour</b>: dark grey </br><b>Overall dimensions</b>: 55 x 40 x 116cm </br>(L x W x H)"
    },
    {
        id: 4,
        name: "Scratching post with </br>beds",
        price: 99.99,
        image: "img/cat4.webp",
        descr: "<b>Colour</b>: light grey </br><b>Overall dimensions</b>: max. 136.5 x L 80 x W 55cm"
    },
    {
        id: 5,
        name: "Diogenes Scratching </br>Barrel",
        price: 139.49,
        image: "img/cat5.webp",
        descr: "<b>Colour</b>: beige </br><b>Overall dimensions</b>: 85 x 39cm (H x Ø)"
    },
    {
        id: 6,
        name: "Nature Tunnel </br>Tent",
        price: 46.29,
        image: "img/cat6.webp",
        descr: "<b>Colour</b>: turquoise</br><b>Overall dimensions</b>: 32 x 16 x 23 cm </br>(L x W x H)"
    },
    {
        id: 7,
        name: "Collapsible Transport </br>Case",
        price: 28.99,
        image: "img/cat7.webp",
        descr: "<b>Colour</b>: grey with orange </br><b>Maximum load</b>: 6kg</br><b>Overall dimensions</b>: 42 x 32 x 30cm (L x W x H)"
    },
    {
        id: 8,
        name: "Mesh Carry </br>Case",
        price: 25.99,
        image: "img/cat8.webp",
        descr: "<b>Colour</b>: beige </br><b>Maximum load</b>: 6kg</br><b>Overall dimensions</b>: 46 x 28 x 28 cm (L x W x H)"
    },
    {
        id: 9,
        name: "Mochi Cat </br>Bed",
        price: 12.99,
        image: "img/cat9.webp",
        descr: "<b>Colour</b>: light grey</br><b>Overall dimensions</b>: approx. 55 x 25cm (Ø x H)"
    },
    {
        id: 10,
        name: "Pueblo Cat </br>Den",
        price: 51.99,
        image: "img/cat10.webp",
        descr: "<b>Overall dimensions</b>: 56 cm x 36 cm x 36 cm (L x W x H)</br><b>Cushion material</b>: 100% Polyester</br>Washable at up to 30°C"
    },

]

function add_product(){
    products_catalog = document.getElementById("products_catalog");
    products_catalog.innerHTML = "";
    
    for(product of products) {
        products_catalog.innerHTML += `
        <div class="col-lg-3 col-md-4 col-6 my-auto mt-3">
        <div class="card product-card shadow bg-body-tertiary rounded">
          <img src=${product.image} class="card-img-top" alt="cat">
          <div class="card-body">
            <p class="card-text text-wrap"><b>${product.name}</b></p>
          </div>
          <p>Price: <b>€${product.price}</b></p>
          <button class="btn mx-5 mb-2 p-1" id="buybtn" onclick="add_to_table(${product.id}); toggleAlert();" data-id="${product.id}">Add to Cart</button>
          <a class="btn mx-5 mb-2 p-1" data-bs-toggle="collapse" href="#descr${product.id}" id="seemorebtn">See more</a>
          <div class="collapse" data-bs-parent="#products_catalog" id="descr${product.id}">
            <p class="px-2 text-start">${product.descr}</p>
          </div>
        </div>
        `;
    }
}
add_product();

const carttable = document.getElementById("cartscreen")

function close_open(){

    carttable.classList.toggle("show");
  };

function closeit(){

    carttable.classList.remove("show")
}

const tableBody = document.getElementById("table_body")

function add_to_table(id){

    const product = products.find(p => p.id === id)
    if (!product) return;

    const row = document.createElement("tr")

    row.innerHTML =  `
        <th scope="row">${product.name}</th>
        <td class="text-center">
            <button class="qty-btn border-0 text-center p-2 bg-transparent" onclick="changeQty(this, -1)"><h3><b>-</b></h3></button>
                <span class="qty">1</span>
            <button class="qty-btn border-0 text-center p-2 bg-transparent" onclick="changeQty(this, 1)"><h4><b>+</b></h4></button>
        </td>
        <td class="price text-center p-0 pt-4">${product.price}</td>
        <td class="subtotal text-center table-active p-0 pt-4">${product.price}</td>
        <td class="text-center border-0"><button type="button" class="btn-close p-0 mb-0 mt-3" aria-label="Close" onclick="remove_row(this);" ></button></td>
            `;
        
tableBody.appendChild(row)
calc_total();
}

const cartTotal = document.getElementById("cart-total");

function calc_total() {

    const rows = document.querySelectorAll("#table_body tr");

    let total = 0;

    rows.forEach(row => {
        const price = Number(row.querySelector(".price").textContent);
        const qty = Number(row.querySelector(".qty").textContent);
        total += price * qty;
    });

    cartTotal.textContent = total.toFixed(2) + " €";
}

function remove_row(button) {
 
    button.closest("tr").remove();
    calc_total();
}

function changeQty(button, num) {
    const qty_select = button.parentElement.querySelector(".qty");
    let qty = Number(qty_select.textContent);

    qty += num;
    if (qty < 1) qty = 1; 

    qty_select.textContent = qty;
    calc_total();
    calc_subtotal(); 
}

function calc_subtotal() {
    const rows = document.querySelectorAll("#table_body tr");

    rows.forEach(row => {
        const price = Number(row.querySelector(".price").textContent);
        const qty = Number(row.querySelector(".qty").textContent);
        const subtotal = row.querySelector(".subtotal");

        const sub_price = price * qty;
        subtotal.textContent = sub_price.toFixed(2) + " €";
    });
}


let alertTimeout;

function toggleAlert(){
    const alert = document.getElementById("alertbottom")
    if(!alert) return;


    alert.classList.add("show")

    if (alertTimeout) clearTimeout(alertTimeout);

    alertTimeout = setTimeout(() => {
      alert.classList.remove("show");
    }, 3000);
}
const checkout = document.getElementById("checkout")

function open_checkout(){

    checkout.classList.toggle("show");
    carttable.classList.remove("show")
  };

function closecheckout() {

    checkout.classList.remove("show")
    
}

function forfirstname() {
    const input = document.getElementById("firstname");
    const output = document.getElementById("outputfn");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function forlastname() {
    const input = document.getElementById("lastname");
    const output = document.getElementById("outputln");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function foradress() {
    const input = document.getElementById("adress");
    const output = document.getElementById("outputadr");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function forcity() {
    const input = document.getElementById("city");
    const output = document.getElementById("outputcity");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function forzip() {
    const input = document.getElementById("zip");
    const output = document.getElementById("outputzip");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function forphone() {
    const input = document.getElementById("phone");
    const output = document.getElementById("outputphone");

    const user_input = input.value;
    output.textContent = `${user_input}`;
}

function fortotal() {
    document.getElementById("outputtotal").textContent =
    document.getElementById("cart-total").textContent;
}

const confirmit = document.getElementById("confirmit")

function open_confirmation(){
    confirmit.classList.add("show")
    checkout.classList.remove("show")
}

function discount() {
    const discounttext = document.getElementById("discounttext")
    let totalDiscount = 0

    const totalText = document.getElementById("cart-total").textContent;
    const totalNumber = parseFloat(totalText.replace("€", ""));
    console.log(totalNumber)

    if (totalNumber > 200) {
        totalDiscount = totalNumber - totalNumber * 0.2

        const par = document.createElement("div")
        par.innerHTML = 
        `
        <p><b>Because your total is bigger than 200 you get a 20% discount. Your new price is ${totalDiscount.toFixed(2)}€</b></p>`
        discounttext.appendChild(par)
    } 
    else {
        totalDiscount = 200 - totalNumber

        const neg = document.createElement("div")
        neg.innerHTML =  `<p><b>You need ${totalDiscount.toFixed(2)}€ more to get a 20% discount!</b></p>`
        discounttext.appendChild(neg)
    }
}

function restartPage() {
    location.reload(); 
}

function confirmation() {
    forfirstname()
    open_confirmation()
    forlastname()
    foradress()
    forcity()
    forzip()
    forphone()
    fortotal()
    discount()
}