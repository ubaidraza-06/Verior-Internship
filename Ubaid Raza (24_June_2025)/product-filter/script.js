const products = [
  { name: "Smartphone", category: "Electronics", price: 200 },
  { name: "Laptop", category: "Electronics", price: 1000 },
  { name: "Headphones", category: "Accessories", price: 50 },
  { name: "T-Shirt", category: "Clothing", price: 20 },
  { name: "Jeans", category: "Clothing", price: 40 },
  { name: "Backpack", category: "Accessories", price: 35 },
  { name: "Desk Lamp", category: "Furniture", price: 25 },
  { name: "Office Chair", category: "Furniture", price: 120 },
  { name: "Bookshelf", category: "Furniture", price: 90 },
  { name: "Bluetooth Speaker", category: "Electronics", price: 60 },
  { name: "Watch", category: "Accessories", price: 80 },
  { name: "Hoodie", category: "Clothing", price: 45 },
  { name: "Novel - Mystery", category: "Books", price: 15 },
  { name: "Notebook", category: "Books", price: 8 },
  { name: "Diary", category: "Books", price: 10 },
];

const list = document.getElementById("product-list");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");

function renderProducts(items) {
  list.innerHTML = '';
  if (items.length === 0) {
    list.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Price:</strong> $${p.price}</p>
    `;
    list.appendChild(div);
  });
}

function filterProducts() {
  const keyword = search.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) &&
    (category === "" || p.category === category)
  );

  renderProducts(filtered);
}

search.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Initial render
renderProducts(products);
