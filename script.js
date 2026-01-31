const API_URL = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 5;

let priceAsc = true;
let titleAsc = true;

/* =====================
   GET ALL - DASHBOARD
===================== */
async function getAll() {
    try {
        const res = await fetch(API_URL);
        products = await res.json();
        filteredProducts = [...products];
        render();
    } catch (error) {
        console.error("Lỗi khi fetch API", error);
    }
}

getAll();

/* =====================
   RENDER TABLE
===================== */
function render() {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredProducts.slice(start, end);

    pageData.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>
                    <img src="${item.images[0]}" alt="">
                </td>
                <td>${item.title}</td>
                <td>${item.price}</td>
            </tr>
        `;
    });

    document.getElementById("pageInfo").innerText =
        `Trang ${currentPage} / ${Math.ceil(filteredProducts.length / pageSize)}`;
}

/* =====================
   SEARCH - ONCHANGE
===================== */
document.getElementById("search").addEventListener("input", function (e) {
    const keyword = e.target.value.toLowerCase();
    filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    render();
});

/* =====================
   PAGE SIZE
===================== */
document.getElementById("pageSize").addEventListener("change", function (e) {
    pageSize = Number(e.target.value);
    currentPage = 1;
    render();
});

/* =====================
   PAGINATION
===================== */
function nextPage() {
    if (currentPage < Math.ceil(filteredProducts.length / pageSize)) {
        currentPage++;
        render();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
}

/* =====================
   SORT
===================== */
function sortByPrice() {
    filteredProducts.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
    );
    priceAsc = !priceAsc;
    render();
}

function sortByTitle() {
    filteredProducts.sort((a, b) =>
        titleAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    titleAsc = !titleAsc;
    render();
}
