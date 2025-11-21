# QuickShop - Complete Fashion E-Commerce Platform 👕👗🛍️

## 🎯 Project Overview

QuickShop is a fully-featured, responsive fashion e-commerce platform with advanced shopping features, inventory management, and customer account management. Built with **HTML5**, **CSS3**, **Bootstrap 5**, and **Vanilla JavaScript** with localStorage persistence—no server required.

---

## ✨ All Features Implemented

### 1. **Emphasized Navigation Bar** 🧭
The navbar is designed to emphasize and showcase the site with:

- **Logo & Branding**: Professional logo with QuickShop text
- **Mega Menu**: Category dropdown with:
  - 👕 T-Shirts
  - 👔 Long Sleeve
  - 🧥 Coats
  - 👗 Dresses
  - 👜 Accessories
- **Search Integration**:
  - Desktop search bar visible in navbar
  - Mobile search bar in collapsible menu
  - Real-time product filtering
- **Action Badges** (with live counts):
  - 🛒 Cart badge showing item count
  - ❤️ Wishlist badge showing item count
- **User Account Dropdown** (when logged in):
  - View Profile
  - Order History
  - Admin Panel (admins only)
  - Logout
- **Auth Buttons** (when logged out):
  - Log In button (opens modal)
  - Sign Up button (opens modal)
- **Sticky Header**: Stays visible while scrolling
- **Responsive Design**: Hamburger menu on mobile

### 2. **Responsive Design** 📱💻🖥️

**Mobile (< 576px)**:
- Single column product grid
- Full-width search and filters
- Hamburger navigation menu
- Touch-optimized buttons

**Tablet (576px - 992px)**:
- 2-column product grid
- Condensed navigation
- Stacked filter sections

**Desktop (> 992px)**:
- 4-column product grid
- Full navbar with search visible
- Advanced filters in horizontal layout
- Sidebar-ready layout

**Responsive Features**:
- Mobile-first Bootstrap 5
- Proper media queries for all breakpoints
- Flexible images and containers
- Touch-friendly form controls

### 3. **Advanced Search & Filtering** 🔍

**Main Filters**:
- **Product Search**: Real-time text search by name/category
- **Category Filter**: Dropdown with all clothing categories
- **Price Range**: Min and max price inputs with live filtering

**Advanced Filters** (Collapsible):
- **Size**: XS, S, M, L, XL, XXL
- **Color**: Black, White, Red, Blue, Pink
- **Rating**: 5⭐, 4+⭐, 3+⭐
- **Clear All**: Single button to reset all filters

**Smart Filtering**:
- Multiple filters combine (AND logic)
- Real-time results update
- Navbar search syncs with main search
- Category links in mega menu apply filters

### 4. **Shopping Cart** 🛒

**Cart Features**:
- **Persistent Storage**: Uses localStorage (`qs_cart`)
- **Add to Cart**: Button on every product card
- **Cart Modal**: Accessible from navbar
- **Quantity Controls**: +/- buttons in cart
- **Item Display**: Product name, image, qty, price
- **Cart Total**: Automatic calculation
- **Clear Cart**: Remove all items
- **Badge Counter**: Live item count in navbar
- **Toast Notifications**: Feedback on actions

### 5. **Wishlist & Favorites** ❤️

**Wishlist Features**:
- **Toggle Heart**: Click heart on product cards
- **Two States**: Empty heart (🤍) vs filled heart (❤️)
- **Persistent Storage**: Uses localStorage (`qs_wishlist`)
- **Wishlist Page**: Dedicated page at `wishlist.html`
- **Badge Counter**: Item count in navbar
- **Add from Wishlist**: Add items to cart from wishlist page
- **Remove from Wishlist**: Delete with one click
- **Cross-Page Sync**: Updates reflect everywhere

### 6. **Customer Authentication** 👤

**Login System**:
- **Login Modal**: Email/password authentication
- **Sign Up Modal**: Create new account with:
  - Full name
  - Email (with uniqueness check)
  - Password (min 6 chars)
  - Role selection (Customer/Admin)
- **Account Dropdown**: Shows for logged-in users
- **Logout**: Clear session and reset navbar
- **Session Persistence**: localStorage (`qs_session_user`)

**Demo Accounts**:
```
Admin Account:
  Email: admin@quickshop.com
  Password: Admin123!

User Account:
  Email: user@quickshop.com
  Password: user123
```

### 7. **Secure Checkout** 💳

**Checkout Page** (`checkout.html`):

**Shipping Address Section**:
- First & Last Name
- Email address
- Street Address
- City, State/Province, ZIP/Postal Code
- Country selection
- Phone Number

**Billing Address Section**:
- Toggle "Same as Shipping"
- Custom billing address if needed

**Shipping Methods**:
- Standard (5-7 days): $5.99
- Express (2-3 days): $14.99
- Overnight: $24.99
- Price updates total automatically

**Payment Methods**:
- Credit/Debit Card:
  - Auto-formatted card number (1234 5678 9012 3456)
  - Expiry date (MM/YY)
  - CVV (123)
- PayPal option

**Order Summary** (Sticky Panel):
- Cart items preview
- Subtotal calculation
- Shipping cost
- Discount display (if promo applied)
- **Grand Total**

**Promo Codes**:
- WELCOME10: 10% discount
- SAVE15: 15% discount
- FRIEND20: 20% discount

**Order Processing**:
- Form validation
- Order saved to localStorage (`qs_orders`)
- Order confirmation with ID
- Auto-redirect to home
- Email confirmation message

### 8. **Inventory & Admin Management** 📦

**Admin Dashboard** (Modal in navbar):

**Products Tab**:
- **Add/Edit Products**:
  - Name, Category, Price
  - Image URL, Stock Level, SKU
  - Save/Clear buttons
- **Products Table**:
  - All products listed
  - Color-coded stock levels (Green/Yellow/Red)
  - Edit and Delete buttons
  - Inline image preview

**Inventory Tab**:
- **Stock Management**:
  - Real-time stock display for each product
  - Status indicators:
    - 🟢 In Stock (> 10)
    - 🟡 Low Stock (1-10)
    - 🔴 Out of Stock (0)
  - Quick update buttons
  - Inline stock input

**Orders Tab**:
- **Recent Orders**:
  - Customer name and email
  - Order ID
  - Order total
  - Order date
  - Items count
  - Shipping method
  - Shows 10 most recent orders

**Admin Features**:
- Only admins can access admin panel
- Admin button hidden for non-admin users
- Reset to demo products option
- Auto-refresh tables after changes

### 9. **Data Persistence** 💾

**localStorage Keys**:
- `qs_users`: User accounts and auth info
- `qs_products`: Product catalog with stock
- `qs_session_user`: Currently logged-in user
- `qs_cart`: Shopping cart items
- `qs_wishlist`: Favorited items
- `qs_orders`: Order history

**Automatic Seeding**:
- Demo products loaded on first visit
- Admin account pre-created
- All data persists across browser sessions

### 10. **Visual Design & Theming** 🎨

**Color Scheme**:
- **Primary Color**: Dirty Pink (#c77b8a)
- **RGB**: 199, 123, 138
- **Applied to**: Buttons, links, badges, accents

**Components**:
- Bootstrap 5 for core layout
- Custom CSS for styling
- Consistent button styling
- Card-based product layout
- Modal dialogs for modals
- Form validation styling

**Icons & Emojis**:
- Heart (❤️/🤍) for wishlist
- Shopping bag (🛒) for cart
- Gear (⚙️) for admin
- Stars (⭐) for ratings
- Category icons in mega menu

### 11. **Image Handling** 🖼️

**Image Features**:
- **Product Images**: High-quality thumbnails
- **Path Normalization**: Auto-fixes broken paths
- **Fallback Images**: Shows placeholder if image fails to load
- **Responsive Images**: Proper sizing for all screens
- **Logo**: Displays in navbar and page footer

---

## 📁 File Structure

```
public/
├── index.html                  # Main shop page
├── checkout.html               # Checkout flow
├── wishlist.html               # Wishlist page
├── cart.html                   # Cart page
├── login.html                  # Login page
├── signup.html                 # Signup page
├── admin.html                  # Admin panel
├── about.html                  # About page
├── feature.html                # Features page
│
├── js/
│   └── app.js                  # Main application (622 lines)
│       ├── Data management (localStorage)
│       ├── Cart functions
│       ├── Wishlist functions
│       ├── Product filtering
│       ├── Authentication
│       ├── Admin panel
│       └── Event binding
│
└── assets/
    ├── css/
    │   ├── main.css            # Custom styles (700+ lines)
    │   ├── style.css           # Bootstrap variables
    │   ├── normalize.css       # Browser normalization
    │   └── vendor.css          # Third-party styles
    │
    └── images/
        ├── logo.png            # Site logo
        ├── poster.png          # About section image
        ├── ajax-loader.gif     # Broken image fallback
        ├── my advertisement.mp4
        ├── t-shirts/           # T-shirt images
        ├── coat/               # Coat images
        ├── dress/              # Dress images
        ├── accesories/         # Accessory images
        ├── long sleeve/        # Long sleeve images
        └── street-styles/      # Street style images
```

---

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Local server or Python/Node.js for serving files

### Installation & Running

**Option 1: Python 3**
```bash
cd c:\websites\Quickshop\public
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option 2: Python 2**
```bash
cd c:\websites\Quickshop\public
python -m SimpleHTTPServer 8000
# Visit: http://localhost:8000
```

**Option 3: Node.js (http-server)**
```bash
npm install -g http-server
cd c:\websites\Quickshop\public
http-server -c-1
# Visit: http://localhost:8080
```

**Option 4: Built-in Node Server**
```bash
cd c:\websites\Quickshop\public
npx http-server -p 8000
# Visit: http://localhost:8000
```

---

## 🧪 Testing the Features

### Test Checklist

#### Navigation
- [ ] Logo visible and clickable
- [ ] Mega menu categories dropdown works
- [ ] Search bar visible on desktop
- [ ] Mobile hamburger menu works
- [ ] Cart badge shows count
- [ ] Wishlist badge shows count
- [ ] Login/Signup buttons visible when logged out
- [ ] Account dropdown visible when logged in

#### Responsive Design
- [ ] Mobile layout on phone (< 576px)
- [ ] Tablet layout (576px - 992px)
- [ ] Desktop layout (> 992px)
- [ ] All buttons touch-friendly on mobile
- [ ] Images responsive on all sizes

#### Search & Filtering
- [ ] Search text works instantly
- [ ] Category filter narrows results
- [ ] Price range filters work
- [ ] Size filter works (if data provided)
- [ ] Color filter works (if data provided)
- [ ] Rating filter works (if data provided)
- [ ] Clear filters button resets all

#### Shopping Cart
- [ ] Add to cart increases badge
- [ ] Cart modal shows items
- [ ] Quantity +/- buttons work
- [ ] Cart total calculates correctly
- [ ] Clear cart empties items
- [ ] Cart persists after page reload

#### Wishlist
- [ ] Heart toggle on products
- [ ] Wishlist badge updates
- [ ] Wishlist page shows items
- [ ] Add to cart from wishlist
- [ ] Remove from wishlist works

#### Authentication
- [ ] Login modal opens
- [ ] Valid credentials log in
- [ ] Invalid credentials show error
- [ ] Signup modal opens
- [ ] Signup creates account
- [ ] Account dropdown shows name
- [ ] Logout clears session

#### Checkout
- [ ] All form fields validate
- [ ] Shipping methods show different prices
- [ ] Card formatting works (1234 5678...)
- [ ] Promo codes apply discount
- [ ] Order summary calculates total
- [ ] Order saves after submission
- [ ] Order confirmation shows

#### Admin Panel
- [ ] Admin can see panel
- [ ] Non-admin cannot access
- [ ] Can add product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Can update stock
- [ ] Inventory table shows status
- [ ] Orders display correctly

#### Images
- [ ] Product images load
- [ ] Broken images show fallback
- [ ] Logo displays in navbar
- [ ] Images responsive on all sizes

---

## 🔑 Key Technologies

**Frontend Stack**:
- HTML5
- CSS3 with custom properties
- JavaScript (ES6+)
- Bootstrap 5 (CDN)

**Data Storage**:
- localStorage API
- JSON serialization/parsing

**No Backend Required**:
- All data client-side
- No database needed
- No API calls

---

## 📊 Demo Data

**Seeded Products**:
- Sweater (Coat) - $120
- Baggy Shirt (T-shirts) - $55
- Handmade Crop Sweater (Dress) - $70
- Cotton Off-white Shirt (Accessories) - $65
- Handbag Deluxe (Accessories) - $89

**Demo User Accounts**:
- Admin: admin@quickshop.com / Admin123!
- User: user@quickshop.com / user123

---

## 🎨 Customization

### Change Theme Color
Edit `public/assets/css/main.css`:
```css
:root {
  --primary: #c77b8a;  /* Change this hex color */
}
```

### Add More Products
Edit `public/js/app.js` in the `ensureSeed()` function:
```javascript
const seed = [
  { id: uid('p'), name: 'Product Name', category: 'Category', price: 99, image: 'assets/images/path/image.jpg', stock: 10 },
  // Add more...
];
```

### Add Promo Codes
Edit `public/checkout.html` in the promo codes section:
```javascript
const promoCodes = {
  'WELCOME10': 0.10,
  'SAVE15': 0.15,
  'CUSTOM50': 0.50,  // Add new code
};
```

---

## ⚠️ Important Notes

1. **No Backend**: This is a frontend-only application. All data is stored in browser localStorage.
2. **Demo Passwords**: Passwords are stored in plain text (for demo purposes only). Never do this in production.
3. **Image Paths**: Images should be in `public/assets/images/` folder structure.
4. **Browser Storage Limit**: localStorage has ~5-10MB limit per domain.
5. **Data Persistence**: Users on different devices will have separate data (localStorage is per-device).

---

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Chrome/Safari

---

## 🐛 Troubleshooting

### Images Not Loading
1. Check image paths in product data
2. Images should be in `public/assets/images/[category]/`
3. Check browser console (F12) for 404 errors
4. Fallback image (ajax-loader.gif) should display

### Cart/Wishlist Not Persisting
1. Check localStorage in DevTools (F12 → Application → Local Storage)
2. Look for `qs_cart` and `qs_wishlist` keys
3. Clear localStorage if corrupted: `localStorage.clear()`

### Login Issues
1. Check exact email (case-sensitive for password)
2. Use demo accounts: admin@quickshop.com / Admin123!
3. Clear localStorage if account not found

### Admin Panel Not Showing
1. Log in as admin account
2. Check user role in localStorage
3. Reload page after login

---

## 📄 Files Summary

| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | Main shop page with navbar, products, filters | 457 |
| `checkout.html` | Checkout flow with shipping, payment, promo | 481 |
| `wishlist.html` | Wishlist page with cart integration | 153 |
| `app.js` | Core app logic: cart, wishlist, auth, admin | 622 |
| `main.css` | Custom styles and responsive design | 700+ |
| `style.css` | Bootstrap theme variables | 100+ |

---

## ✅ Completion Status

✅ All requested features implemented  
✅ Responsive design for all devices  
✅ Advanced search & filtering  
✅ Shopping cart with persistence  
✅ Inventory management for admin  
✅ Customer authentication  
✅ Wishlist/favorites system  
✅ Secure checkout flow  
✅ Enhanced navigation with emphasis  
✅ No errors or warnings  

---

## 📞 Support

For questions or issues:
1. Check browser console (F12 → Console tab)
2. Review SETUP_GUIDE.txt and FEATURES_IMPLEMENTED.md
3. Verify localStorage keys in DevTools
4. Ensure images are in correct folders
5. Test with demo accounts provided

---

**Happy Shopping! 🛍️**

*QuickShop v1.0 - Built with ❤️ using HTML, CSS, and JavaScript*

Last Updated: November 20, 2025
#   q u i c k s h o p  
 