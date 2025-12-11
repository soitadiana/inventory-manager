const API_URL = '/api/items';

// READ
document.addEventListener('DOMContentLoaded', fetchItems);

async function fetchItems() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById('itemList');
    list.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm border';
        div.innerHTML = `
            <div>
                <p class="font-bold text-lg">${item.name}</p>
                <p class="text-sm text-gray-500">Supplier: ${item.supplier} | Qty: ${item.qty}</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-bold text-green-600">$${item.price}</span>
                <button onclick="deleteItem('${item._id}')" class="text-red-500 hover:text-red-700">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// CREATE: Add new item
async function createItem() {
    const name = document.getElementById('name').value;
    const supplier = document.getElementById('supplier').value;
    const qty = document.getElementById('qty').value;
    const price = document.getElementById('price').value;

    if(!name || !price) return alert("Please fill in required fields");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, supplier, qty, price })
    });

    // Clear inputs and refresh list
    document.getElementById('name').value = '';
    document.getElementById('supplier').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('price').value = '';
    fetchItems();
}

// DELETE: Remove item
async function deleteItem(id) {
    if(confirm('Are you sure?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchItems();
    }
}
