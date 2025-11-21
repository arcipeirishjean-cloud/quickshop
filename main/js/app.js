'use strict';
(function () {
  const LS_KEYS = {
    users: 'qs_users',
    products: 'qs_products',
    session: 'qs_session_user',
    cart: 'qs_cart',
  };

  const DEFAULT_ADMIN = {
    id: 'u_admin',
    name: 'Administrator',
    email: 'admin@quickshop.com',
    password: 'Admin123!',
    role: 'admin',
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function readLS(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function toast(el, msg) {
    if (!el) return;
    el.textContent = msg;
  }

  function ensureSeed() {
    const users = readLS(LS_KEYS.users, []);
    if (!users.find((u) => u.email === DEFAULT_ADMIN.email)) {
      users.push(DEFAULT_ADMIN);
      writeLS(LS_KEYS.users, users);
    }

    const products = readLS(LS_KEYS.products, null);
    if (!products) {
      const seed = [
        { id: uid('p'), name: 'Alo Cap', category: 'Accesories', price: 99, image: "assets/images/ALO CAP.jpg" },
        { id: uid('p'), name: 'Amelia Coord', category: 'Terno', price: 120, image: 'assets/images/AMELIA COORD.jpg' },
        { id: uid('p'), name: 'Animal Sando', category: 'Top', price: 99, image: 'assets/images/ANIMAL-SANDO.jpg' },
        { id: uid('p'), name: 'Kyla Short', category: 'Shorts', price: 65, image: 'assets/images/Kyla Short.jpg' },
        { id: uid('p'), name: 'Comby BodySuit', category: 'SwimSuit', price: 129, image: 'assets/images/Combi Swimsuit.jpg' },
      ];
      writeLS(LS_KEYS.products, seed);
    }
  }

  // Normalize product image paths stored in localStorage.
  // This fixes entries that accidentally include a leading `public/` or an absolute path
  // so images resolve relative to the site root (e.g. `assets/images/...`).
  function normalizeProductImagePaths() {
    const products = readLS(LS_KEYS.products, []);
    let changed = false;
    const fixed = products.map((p) => {
      if (!p || !p.image) return p;
      let img = (p.image || '').trim();
      // remove leading public/ or ./ or leading slash
      if (img.startsWith('public/')) { img = img.replace(/^public\//, ''); changed = true; }
      if (img.startsWith('./')) { img = img.replace(/^\.\//, ''); changed = true; }
      if (img.startsWith('/')) { img = img.replace(/^\//, ''); changed = true; }
      // if the path contains main/assets/ somewhere, normalize to start at main/assets/
      const idx = img.indexOf('main/assets/');
      if (idx > 0) { img = img.slice(idx); changed = true; }
      if (img !== p.image) return { ...p, image: img };
      return p;
    });
    if (changed) writeLS(LS_KEYS.products, fixed);
  }

  function getSession() {
    return readLS(LS_KEYS.session, null);
  }

  /* Cart functions */
  function getCart() {
    return readLS(LS_KEYS.cart, []);
  }

  function saveCart(cart) {
    writeLS(LS_KEYS.cart, cart);
    updateCartCount();
  }

  function addToCart(productId) {
    const products = readLS(LS_KEYS.products, []);
    const product = products.find(p => p.id === productId || p.id === String(productId));
    if (!product) return;
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) item.qty = (item.qty || 1) + 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    saveCart(cart);
    toast($('#productStatus'), 'Added to cart');
  }

  function updateCartCount() {
    const count = getCart().reduce((s, it) => s + (it.qty || 1), 0);
    const el = $('#cartCount');
    if (el) {
      el.textContent = count;
      el.classList.toggle('d-none', count === 0);
    }
  }

  /* Wishlist functions */
  function getWishlist() {
    return readLS('qs_wishlist', []);
  }

  function saveWishlist(wishlist) {
    writeLS('qs_wishlist', wishlist);
    updateWishlistCount();
  }

  function addToWishlist(productId) {
    const wishlist = getWishlist();
    if (!wishlist.find(w => w.id === productId)) {
      wishlist.push({ id: productId, addedAt: Date.now() });
      saveWishlist(wishlist);
      toast($('#productStatus'), '❤️ Added to wishlist');
    }
  }

  function removeFromWishlist(productId) {
    const wishlist = getWishlist();
    const next = wishlist.filter(w => w.id !== productId);
    saveWishlist(next);
  }

  function isInWishlist(productId) {
    return getWishlist().some(w => w.id === productId);
  }

  function updateWishlistCount() {
    const count = getWishlist().length;
    const el = $('#wishlistBadge');
    if (el) {
      el.textContent = count;
      el.classList.toggle('d-none', count === 0);
    }
  }

  function renderCart() {
    const container = $('#cartItemsContainer');
    if (!container) return;
    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      $('#cartTotals').textContent = '';
      return;
    }
    container.innerHTML = cart.map((it, idx) => `
      <div class="d-flex align-items-center gap-3 mb-3">
        <img src="${it.image}" alt="${it.name}" style="width:64px;height:64px;object-fit:cover">
        <div class="flex-grow-1">
          <div class="fw-semibold">${it.name}</div>
          <div class="text-muted">Qty: <button class="btn btn-sm btn-outline-secondary btn-cart-decr" data-index="${idx}">-</button> ${it.qty} <button class="btn btn-sm btn-outline-secondary btn-cart-incr" data-index="${idx}">+</button></div>
        </div>
        <div class="fw-bold">$${(it.price * it.qty).toFixed(2)}</div>
      </div>
    `).join('');

    const total = cart.reduce((s,it) => s + (it.price * (it.qty || 1)), 0);
    $('#cartTotals').textContent = 'Total: $' + total.toFixed(2);
  }

  function changeQty(index, delta) {
    const cart = getCart();
    const item = cart[index];
    if (!item) return;
    item.qty = Math.max(0, (item.qty || 1) + delta);
    const next = cart.filter(i => i.qty > 0);
    saveCart(next);
    renderCart();
  }

  function clearCart() {
    saveCart([]);
    renderCart();
  }

  function checkout() {
    window.location.href = 'checkout.html';
  }

  function setSession(user) {
    writeLS(LS_KEYS.session, user);
    updateNavbar();
    updateAdminVisibility();
  }

  function logout() {
    localStorage.removeItem(LS_KEYS.session);
    updateNavbar();
    updateAdminVisibility();
  }

  function updateNavbar() {
    const user = getSession();
    const loginItem = $('#nav-login-item');
    const signupItem = $('#nav-signup-item');
    const accountItem = $('#nav-account-item');

    if (user) {
      loginItem?.classList.add('d-none');
      signupItem?.classList.add('d-none');
      accountItem?.classList.remove('d-none');
      const accountName = document.getElementById('accountName');
      if (accountName) accountName.textContent = user.name.split(' ')[0]; // first name only
    } else {
      loginItem?.classList.remove('d-none');
      signupItem?.classList.remove('d-none');
      accountItem?.classList.add('d-none');
    }
  }

  function renderProducts(list) {
    const grid = $('#productGrid');
    const status = $('#productStatus');
    if (!grid) return;
    grid.innerHTML = '';

    if (!list || list.length === 0) {
      toast(status, 'No products found.');
      return;
    }
    toast(status, `${list.length} product(s) shown`);

    list.forEach((p) => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
      col.setAttribute('role', 'listitem');
      col.dataset.name = p.name.toLowerCase();
      col.dataset.category = p.category.toLowerCase();
      col.dataset.price = p.price;

      const inWishlist = isInWishlist(p.id);
      const wishlistBtnClass = inWishlist ? 'btn-danger' : 'btn-outline-danger';
      const wishlistBtnText = inWishlist ? '❤️ Remove' : '🤍 Wishlist';

      col.innerHTML = `
        <div class="card h-100 product-item position-relative">
          <img src="${p.image}" alt="${p.name}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h6 class="text-uppercase">${p.name}</h6>
            <div class="text-muted mb-2">${p.category}</div>
            <div class="mt-auto fw-bold mb-3">$${Number(p.price).toFixed(2)}</div>
            <div class="mt-3 d-grid gap-2">
              <button class="btn btn-sm btn-primary btn-add-to-cart" data-id="${p.id}">Add to cart</button>
              <button class="btn btn-sm ${wishlistBtnClass} btn-wishlist-toggle" data-id="${p.id}">${wishlistBtnText}</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(col);
    });
  }

  function applyFilters() {
    const q = ($('#productSearch')?.value || '').trim().toLowerCase();
    const cat = ($('#categoryFilter')?.value || '').trim().toLowerCase();
    const priceMin = parseFloat($('#priceMin')?.value || 0);
    const priceMax = parseFloat($('#priceMax')?.value || Infinity);
    const size = ($('#sizeFilter')?.value || '').trim().toLowerCase();
    const color = ($('#colorFilter')?.value || '').trim().toLowerCase();
    
    const products = readLS(LS_KEYS.products, []);
    const filtered = products.filter((p) => {
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesC = !cat || p.category.toLowerCase() === cat;
      const matchesPrice = p.price >= priceMin && p.price <= priceMax;
      const matchesSize = !size || (p.size && p.size.toLowerCase() === size);
      const matchesColor = !color || (p.color && p.color.toLowerCase() === color);
      return matchesQ && matchesC && matchesPrice && matchesSize && matchesColor;
    });
    renderProducts(filtered);
  }

  function fillAdminTable() {
    const tbody = $('#productTableBody');
    if (!tbody) return;
    const products = readLS(LS_KEYS.products, []);
    tbody.innerHTML = '';
    products.forEach((p) => {
      const tr = document.createElement('tr');
      const stock = p.stock || 0;
      const stockClass = stock > 10 ? 'text-success' : stock > 0 ? 'text-warning' : 'text-danger';
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>$${Number(p.price).toFixed(2)}</td>
        <td class="fw-bold ${stockClass}">${stock}</td>
        <td><img src="${p.image}" alt="${p.name}" style="width:48px;height:48px;object-fit:cover"></td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${p.id}">Edit</button>
          <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${p.id}">Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  function fillInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    const products = readLS(LS_KEYS.products, []);
    tbody.innerHTML = '';
    products.forEach((p) => {
      const stock = p.stock || 0;
      let status = '🟢 In Stock';
      let statusClass = 'text-success';
      if (stock === 0) {
        status = '🔴 Out of Stock';
        statusClass = 'text-danger';
      } else if (stock <= 5) {
        status = '🟡 Low Stock';
        statusClass = 'text-warning';
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td><input type="number" class="form-control form-control-sm" style="width:80px" value="${stock}" data-id="${p.id}" class="inventory-input"></td>
        <td class="${statusClass} fw-bold">${status}</td>
        <td><button class="btn btn-sm btn-outline-primary" data-id="${p.id}" class="update-stock-btn">Update</button></td>
      `;
      tbody.appendChild(tr);
    });

    // Add event listeners for stock update
    document.querySelectorAll('.update-stock-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const input = document.querySelector(`input[data-id="${id}"]`);
        if (input) {
          const newStock = parseInt(input.value, 10) || 0;
          const products = readLS(LS_KEYS.products, []);
          const product = products.find(p => p.id === id);
          if (product) {
            product.stock = newStock;
            writeLS(LS_KEYS.products, products);
            fillInventoryTable();
            toast($('#productStatus'), `Stock updated for ${product.name}`);
          }
        }
      });
    });
  }

  function fillOrdersDisplay() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    const orders = readLS('qs_orders', []);
    if (orders.length === 0) {
      container.innerHTML = '<p class="text-muted">No orders yet.</p>';
      return;
    }
    container.innerHTML = orders.slice().reverse().slice(0, 10).map(order => `
      <div class="mb-4 pb-4 border-bottom">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <strong>${order.firstName} ${order.lastName}</strong><br>
            <small class="text-muted">${order.email}</small><br>
            <small class="text-muted">Order ID: ${order.id}</small>
          </div>
          <div class="text-end">
            <strong>$${order.total.toFixed(2)}</strong><br>
            <small class="text-muted">${new Date(order.timestamp).toLocaleDateString()}</small>
          </div>
        </div>
        <small class="text-muted">Items: ${order.cartItems.length} • Shipping: ${order.shipping}</small>
      </div>
    `).join('');
  }

  function updateAdminVisibility() {
    const session = getSession();
    const adminBtn = $('#openAdminPanel');
    if (!adminBtn) return;
    if (session && session.role === 'admin') {
      adminBtn.removeAttribute('aria-disabled');
    } else {
      adminBtn.setAttribute('aria-disabled', 'true');
    }
  }

  function bindEvents() {
    $('#productSearch')?.addEventListener('input', applyFilters);
    $('#categoryFilter')?.addEventListener('change', applyFilters);
    $('#priceMin')?.addEventListener('input', applyFilters);
    $('#priceMax')?.addEventListener('input', applyFilters);
    $('#sizeFilter')?.addEventListener('change', applyFilters);
    $('#colorFilter')?.addEventListener('change', applyFilters);
    $('#ratingFilter')?.addEventListener('change', applyFilters);
    
    // Clear filters button
    $('#clearFiltersBtn')?.addEventListener('click', () => {
      $('#productSearch').value = '';
      $('#categoryFilter').value = '';
      $('#priceMin').value = '';
      $('#priceMax').value = '';
      $('#sizeFilter').value = '';
      $('#colorFilter').value = '';
      $('#ratingFilter').value = '';
      applyFilters();
    });

    // Navbar search sync
    $('#navbarSearch')?.addEventListener('input', (e) => {
      $('#productSearch').value = e.target.value;
      applyFilters();
    });

    $('#mobileNavbarSearch')?.addEventListener('input', (e) => {
      $('#productSearch').value = e.target.value;
      applyFilters();
    });

    // Category dropdown category links
    document.querySelectorAll('[data-category]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (e.target.dataset.category) {
          $('#categoryFilter').value = e.target.dataset.category;
          applyFilters();
        }
      });
    });

    $('#logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      applyFilters();
    });

    const loginForm = $('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = $('#loginEmail').value.trim().toLowerCase();
        const password = $('#loginPassword').value;
        const users = readLS(LS_KEYS.users, []);
        const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);
        if (!user) {
          toast($('#loginStatus'), 'Invalid credentials');
          return;
        }
        setSession({ id: user.id, name: user.name, email: user.email, role: user.role });
        toast($('#loginStatus'), 'Logged in');
        const modalEl = document.getElementById('loginModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }

    const signupForm = $('#signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#signupName').value.trim();
        const email = $('#signupEmail').value.trim().toLowerCase();
        const password = $('#signupPassword').value;
        const role = $('#signupRole').value === 'admin' ? 'admin' : 'user';

        if (!name || !email || !password) {
          toast($('#signupStatus'), 'All fields are required');
          return;
        }
        const users = readLS(LS_KEYS.users, []);
        if (users.find((u) => u.email === email)) {
          toast($('#signupStatus'), 'Email already registered');
          return;
        }
        const newUser = { id: uid('u'), name, email, password, role };
        users.push(newUser);
        writeLS(LS_KEYS.users, users);
        setSession({ id: newUser.id, name, email, role });
        toast($('#signupStatus'), 'Account created');
        const modalEl = document.getElementById('signupModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      });
    }

    const openAdmin = $('#openAdminPanel');
    if (openAdmin) {
      openAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        const user = getSession();
        if (!user || user.role !== 'admin') return;
        fillAdminTable();
        fillInventoryTable();
        fillOrdersDisplay();
        const modalEl = document.getElementById('adminModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
      });
    }

    const productForm = $('#productForm');
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = $('#productId').value;
        const name = $('#productName').value.trim();
        const category = $('#productCategory').value.trim();
        const price = parseFloat($('#productPrice').value);
        const image = $('#productImage').value.trim();
        const stock = parseInt($('#productStock')?.value || 0, 10);
        const sku = ($('#productSku')?.value || '').trim();
        if (!name || !category || isNaN(price) || !image) return;

        const products = readLS(LS_KEYS.products, []);
        if (id) {
          const idx = products.findIndex((p) => p.id === id);
          if (idx >= 0) products[idx] = { ...products[idx], name, category, price, image, stock, sku };
        } else {
          products.push({ id: uid('p'), name, category, price, image, stock, sku });
        }
        writeLS(LS_KEYS.products, products);
        fillAdminTable();
        fillInventoryTable();
        applyFilters();
        productForm.reset();
        $('#productId').value = '';
        toast($('#productStatus'), 'Product saved');
      });

      $('#resetProductForm')?.addEventListener('click', () => {
        productForm.reset();
        $('#productId').value = '';
      });

      $('#productTableBody')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const products = readLS(LS_KEYS.products, []);
        if (action === 'edit') {
          const p = products.find((pp) => pp.id === id);
          if (!p) return;
          $('#productId').value = p.id;
          $('#productName').value = p.name;
          $('#productCategory').value = p.category;
          $('#productPrice').value = p.price;
          $('#productImage').value = p.image;
          $('#productStock').value = p.stock || 0;
          $('#productSku').value = p.sku || '';
          // Scroll to products tab
          document.getElementById('productsTab')?.click();
        } else if (action === 'delete') {
          const next = products.filter((pp) => pp.id !== id);
          writeLS(LS_KEYS.products, next);
          fillAdminTable();
          fillInventoryTable();
          applyFilters();
        }
      });
    }

    // reset demo products from seed (admin only)
    $('#resetProductsBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!confirm('Reset products to demo seed? This will overwrite current products.')) return;
      localStorage.removeItem(LS_KEYS.products);
      ensureSeed();
      applyFilters();
      fillAdminTable();
    });

    // Delegated event for add-to-cart buttons
    $('#productGrid')?.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-to-cart');
      const wishBtn = e.target.closest('.btn-wishlist-toggle');
      if (addBtn) {
        addToCart(addBtn.dataset.id);
      } else if (wishBtn) {
        const id = wishBtn.dataset.id;
        if (isInWishlist(id)) {
          removeFromWishlist(id);
        } else {
          addToWishlist(id);
        }
        applyFilters(); // re-render to update button state
      }
    });

    // Open cart button
    $('#openCartBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      renderCart();
      const modalEl = document.getElementById('cartModal');
      if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    // Cart increment/decrement
    $('#cartItemsContainer')?.addEventListener('click', (e) => {
      const decr = e.target.closest('.btn-cart-decr');
      const incr = e.target.closest('.btn-cart-incr');
      if (decr) {
        changeQty(parseInt(decr.dataset.index, 10), -1);
      } else if (incr) {
        changeQty(parseInt(incr.dataset.index, 10), +1);
      }
    });

    $('#clearCartBtn')?.addEventListener('click', (e) => { e.preventDefault(); clearCart(); });
    $('#checkoutBtn')?.addEventListener('click', (e) => { e.preventDefault(); checkout(); });
  }

  function init() {
    ensureSeed();
    normalizeProductImagePaths();
    updateNavbar();
    updateAdminVisibility();
    updateCartCount();
    updateWishlistCount();
    applyFilters();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
