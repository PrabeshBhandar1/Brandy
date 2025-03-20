document.addEventListener('DOMContentLoaded', function () {
    
        // Hero Slider Functionality
        const heroSlider = document.querySelector('.hero-slider');
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');

        // Check if elements exist before proceeding
        if (!heroSlider || slides.length === 0 || dots.length === 0) {
            console.error('Hero slider elements not found');
            return;
        }

        let currentSlide = 0;
        const slideCount = slides.length;

        console.log(`Found ${slideCount} slides and ${dots.length} dots`);

        // Set up initial slide position
        heroSlider.style.width = `${slideCount * 100}%`;
        slides.forEach((slide, index) => {
            slide.style.width = `${100 / slideCount}%`;
            console.log(`Set up slide ${index}`);
        });

        // Function to change slide
        function goToSlide(index) {
            console.log(`Going to slide ${index}`);

            // Proper boundary checking
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            // Apply transform to move slider
            heroSlider.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
            console.log(`Transformed to ${-index * (100 / slideCount)}%`);

            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');

            currentSlide = index;

            // Reset animations for current slide
            if (slides[currentSlide].querySelector('.slide-content')) {
                const currentSlideContent = slides[currentSlide].querySelector('.slide-content');
                const elements = currentSlideContent.querySelectorAll('h1, p, .slide-btn');

                elements.forEach(element => {
                    element.style.animation = 'none';
                    element.offsetHeight; // Trigger reflow
                    element.style.animation = null;
                });
            }
        }

        // Set initial active state
        dots[0].classList.add('active');

        // Call goToSlide initially to set up the first slide
        goToSlide(0);

        // Automatic slideshow
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);

        // Click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                clearInterval(slideInterval);
                goToSlide(index);

                // Restart interval
                slideInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 5000);
            });
        });

        // Add debug information
        console.log('Hero slider initialization complete');
    
    // Testimonials slider functionality
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    const testimonialCount = testimonialSlides.length;

    // Set up initial testimonial position
    testimonialsTrack.style.width = `${testimonialCount * 100}%`;
    testimonialSlides.forEach(slide => {
        slide.style.width = `${100 / testimonialCount}%`;
    });

    // Function to change testimonial
    function goToTestimonial(index) {
        if (index < 0) index = testimonialCount - 1;
        if (index >= testimonialCount) index = 0;

        testimonialsTrack.style.transform = `translateX(-${index * (100 / testimonialCount)}%)`;
        currentTestimonial = index;
    }

    // Click events for testimonial navigation
    prevButton.addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
    });

    nextButton.addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

        const mobileMenuStyles = document.createElement('style');
        mobileMenuStyles.textContent = `
            .mobile-menu-btn {
                display: none;
                font-size: 24px;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                    display: flex;
                }
                
                .nav-links li {
                    margin: 15px 0;
                }
            }
        `;
        document.head.appendChild(mobileMenuStyles);

        nav.appendChild(mobileMenuBtn);

        mobileMenuBtn.addEventListener('click', function () {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    createMobileMenu();

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.category-card, .product-card, .section-title');

    const fadeIn = function () {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    // Add initial styles for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transform = 'translateY(20px)';
    });

    // Create CSS class for visible elements
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Run fade function on load and scroll
    window.addEventListener('scroll', fadeIn);
    window.addEventListener('load', fadeIn);
});





// Shopping Cart 

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {
    // Cart functionality
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartCount = document.querySelector('.cart-count');

    // Product modal functionality
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const decreaseQty = document.getElementById('decrease-qty');
    const increaseQty = document.getElementById('increase-qty');
    const productQty = document.getElementById('product-qty');
    const sizeButtons = document.querySelectorAll('.size-btn');

    // Shopping cart data
    let cart = [];
    let currentProduct = {};

    // Initialize cart count
    updateCartCount();

    // Event listeners for cart toggle
    cartToggle.addEventListener('click', function (e) {
        e.preventDefault();
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', function () {
        cartOverlay.classList.remove('active');
    });

    // Event listeners for product modal
    document.querySelectorAll('.product-action-btn').forEach(function (btn, index) {
        if (index % 3 === 0) { // Only target the shopping cart icons
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');

                // Get product information
                const productImg = productCard.querySelector('.product-img').src;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productTitle = productCard.querySelector('.product-title').textContent;
                const currentPrice = productCard.querySelector('.current-price').textContent;
                const oldPrice = productCard.querySelector('.old-price') ?
                    productCard.querySelector('.old-price').textContent : '';

                // Set current product data
                currentProduct = {
                    image: productImg,
                    category: productCategory,
                    title: productTitle,
                    price: currentPrice,
                    oldPrice: oldPrice,
                    size: null,
                    quantity: 1
                };

                // Update modal with product information
                document.getElementById('modal-product-image').src = productImg;
                document.getElementById('modal-product-category').textContent = productCategory;
                document.getElementById('modal-product-title').textContent = productTitle;
                document.getElementById('modal-current-price').textContent = currentPrice;

                if (oldPrice) {
                    document.getElementById('modal-old-price').textContent = oldPrice;
                    document.getElementById('modal-old-price').style.display = 'inline';
                } else {
                    document.getElementById('modal-old-price').style.display = 'none';
                }

                // Reset selected size and quantity
                sizeButtons.forEach(btn => btn.classList.remove('selected'));
                productQty.value = 1;

                // Show modal
                productModal.classList.add('active');
            });
        }
    });

    closeModal.addEventListener('click', function () {
        productModal.classList.remove('active');
    });

    // Size selection
    sizeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            currentProduct.size = this.textContent;
        });
    });

    // Quantity adjustments
    decreaseQty.addEventListener('click', function () {
        if (productQty.value > 1) {
            productQty.value = parseInt(productQty.value) - 1;
        }
    });

    increaseQty.addEventListener('click', function () {
        if (productQty.value < 10) {
            productQty.value = parseInt(productQty.value) + 1;
        }
    });








    // Add to cart functionality


    
    addToCartBtn.addEventListener('click', function () {
        if (!currentProduct.size) {
            alert('Please select a size');
            return;
        }

        // Update product quantity
        currentProduct.quantity = parseInt(productQty.value);

        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item =>
            item.title === currentProduct.title && item.size === currentProduct.size
        );

        if (existingItemIndex > -1) {
            // Update quantity if product already exists
            cart[existingItemIndex].quantity += currentProduct.quantity;
        } else {
            // Add new item to cart
            cart.push({ ...currentProduct });
        }

        // Update cart UI
        updateCart();

        // Close modal and open cart
        productModal.classList.remove('active');
        cartOverlay.classList.add('active');
    });

    // Function to update cart UI
    function updateCart() {
        // Clear cart items
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartSubtotal.textContent = '$0.00';
        } else {
            let subtotal = 0;

            // Add each item to cart
            cart.forEach((item, index) => {
                // Calculate item total
                const price = parseFloat(item.price.replace('$', ''));
                const itemTotal = price * item.quantity;
                subtotal += itemTotal;

                // Create cart item element
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-size">Size: ${item.size}</div>
                        <div class="cart-item-actions">
                            <div class="cart-qty-selector">
                                <button class="cart-qty-btn cart-decrease" data-index="${index}">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="cart-qty-input" data-index="${index}" readonly>
                                <button class="cart-qty-btn cart-increase" data-index="${index}">+</button>
                            </div>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>
                    </div>
                `;

                cartItems.appendChild(cartItem);
            });

            // Update subtotal
            cartSubtotal.textContent = '$' + subtotal.toFixed(2);

            // Add event listeners to cart item buttons
            addCartItemEventListeners();
        }

        // Update cart count
        updateCartCount();
    }

    // Add event listeners to cart item buttons
    function addCartItemEventListeners() {
        // Decrease quantity
        document.querySelectorAll('.cart-decrease').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });

        // Increase quantity
        document.querySelectorAll('.cart-increase').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity < 10) {
                    cart[index].quantity++;
                    updateCart();
                }
            });
        });

        // Remove item
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Close cart when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });
});

//Emptying the cart when clicked in checkout
// Add this code to your existing JavaScript file, inside the DOMContentLoaded event listener

// Get the checkout button
const checkoutBtn = document.querySelector('.checkout-btn');

// Add event listener to the checkout button
checkoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Empty the cart array
    cart = [];

    // Update the cart UI
    updateCart();

    // Show a success message
    cartItems.innerHTML = '<div class="empty-cart-message">Thank you for your order! Your cart is now empty.</div>';

    // You might want to keep the cart open for a moment so the user can see the message
    // Optional: Add a timer to close the cart after a few seconds
    setTimeout(function () {
        cartOverlay.classList.remove('active');
    }, 3000);
});




// Emptying cart
document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Empty the cart array
            window.cart = [];

            // Show success message
            document.getElementById('cart-items').innerHTML =
                '<div class="empty-cart-message">Thank you for your order!</div>';
            document.getElementById('cart-subtotal').textContent = '$0.00';
            document.querySelector('.cart-count').textContent = '0';

            // Close after delay
            setTimeout(function () {
                document.getElementById('cart-overlay').classList.remove('active');
            }, 3000);
        });
    }
});




/*  

            Favourite and view products


*/

document.addEventListener('DOMContentLoaded', function () {
    // Get existing cart elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartCount = document.querySelector('.cart-count');

    // Product modal elements
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');

    // Favorites array to store favorite products
    let favorites = [];

    // Add event listeners to product action buttons (heart and eye icons)
    document.querySelectorAll('.product-action-btn').forEach(function (btn, index) {
        if (index % 3 === 1) { // Heart button (second button in each set)
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');

                // Toggle favorite status visually
                if (this.classList.contains('favorited')) {
                    this.classList.remove('favorited');
                    this.querySelector('i').style.color = '';
                } else {
                    this.classList.add('favorited');
                    this.querySelector('i').style.color = '#ff4d4d';
                }

                // Get product information
                const productImg = productCard.querySelector('.product-img').src;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productTitle = productCard.querySelector('.product-title').textContent;
                const currentPrice = productCard.querySelector('.current-price').textContent;

                // Create product object
                const product = {
                    image: productImg,
                    category: productCategory,
                    title: productTitle,
                    price: currentPrice
                };

                // Check if product is already in favorites
                const existingProductIndex = favorites.findIndex(item =>
                    item.title === product.title && item.category === product.category
                );

                if (existingProductIndex > -1) {
                    // Remove from favorites if already exists
                    favorites.splice(existingProductIndex, 1);
                    showNotification('Removed from favorites!');
                } else {
                    // Add to favorites
                    favorites.push(product);
                    showNotification('Added to favorites!');
                }

                // Update local storage (optional, for persistence)
                localStorage.setItem('brandyFavorites', JSON.stringify(favorites));
            });
        } else if (index % 3 === 2) { // Eye button (third button in each set)
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');

                // Get product information
                const productImg = productCard.querySelector('.product-img').src;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productTitle = productCard.querySelector('.product-title').textContent;
                const currentPrice = productCard.querySelector('.current-price').textContent;
                const oldPrice = productCard.querySelector('.old-price') ?
                    productCard.querySelector('.old-price').textContent : '';

                // Update modal with product information
                document.getElementById('modal-product-image').src = productImg;
                document.getElementById('modal-product-category').textContent = productCategory;
                document.getElementById('modal-product-title').textContent = productTitle;
                document.getElementById('modal-current-price').textContent = currentPrice;

                if (oldPrice) {
                    document.getElementById('modal-old-price').textContent = oldPrice;
                    document.getElementById('modal-old-price').style.display = 'inline';
                } else {
                    document.getElementById('modal-old-price').style.display = 'none';
                }

                // Show modal
                productModal.classList.add('active');
            });
        }
    });

    // Create and display notification
    function showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        // Add notification to document
        document.body.appendChild(notification);

        // Show and then hide notification
        setTimeout(() => {
            notification.style.opacity = '1';

            setTimeout(() => {
                notification.style.opacity = '0';

                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 10);
    }

    // Load favorites from local storage (optional, for persistence)
    function loadFavorites() {
        const storedFavorites = localStorage.getItem('brandyFavorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);

            // Mark favorited items visually
            document.querySelectorAll('.product-action-btn').forEach(function (btn, index) {
                if (index % 3 === 1) { // Heart button
                    const productCard = btn.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const productCategory = productCard.querySelector('.product-category').textContent;

                    // Check if this product is in favorites
                    const isFavorite = favorites.some(item =>
                        item.title === productTitle && item.category === productCategory
                    );

                    if (isFavorite) {
                        btn.classList.add('favorited');
                        btn.querySelector('i').style.color = '#ff4d4d';
                    }
                }
            });
        }
    }

    // Load favorites when page loads
    loadFavorites();

    // Also add CSS for the notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .product-action-btn.favorited i {
            color: #ff4d4d !important;
        }
    `;
    document.head.appendChild(style);

    // Checkout button functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Empty the cart array
            cart = [];

            // Show success message
            cartItems.innerHTML = '<div class="empty-cart-message">Thank you for your order! Your cart is now empty.</div>';
            cartSubtotal.textContent = '$0.00';

            // Update cart count
            updateCartCount();

            // Close after delay
            setTimeout(function () {
                cartOverlay.classList.remove('active');
            }, 3000);
        });
    }
});





// Favourite 

document.addEventListener('DOMContentLoaded', function () {
    // Add favorites icon to the menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Create favorites icon list item
        const favItem = document.createElement('li');
        favItem.innerHTML = `
            <a href="#" id="favorites-toggle">
                <i class="fas fa-heart"></i>
                <span class="favorites-count">0</span>
            </a>
        `;
        navLinks.appendChild(favItem);

        // Add styles for the favorites icon
        const favStyles = document.createElement('style');
        favStyles.textContent = `
            #favorites-toggle {
                position: relative;
                display: inline-block;
            }
            
            .favorites-count {
                position: absolute;
                top: -10px;
                right: -10px;
                background-color: #ff4d4d;
                color: white;
                font-size: 12px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .favorites-overlay {
                position: fixed;
                top: 0;
                right: 0;
                width: 100%;
                max-width: 400px;
                height: 100%;
                background-color: white;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            
            .favorites-overlay.active {
                transform: translateX(0);
            }
            
            .favorites-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .favorites-header h3 {
                margin: 0;
            }
            
            .close-favorites {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
            }
            
            .favorites-items {
                flex-grow: 1;
                overflow-y: auto;
                padding: 20px;
            }
            
            .favorite-item {
                display: flex;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .favorite-item-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                margin-right: 15px;
            }
            
            .favorite-item-details {
                flex-grow: 1;
            }
            
            .favorite-item-title {
                margin: 0 0 5px;
                font-size: 16px;
            }
            
            .favorite-item-category {
                color: #888;
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .favorite-item-price {
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .favorite-item-actions {
                display: flex;
                justify-content: space-between;
            }
            
            .move-to-cart, .remove-favorite {
                padding: 5px 10px;
                background-color: #f5f5f5;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
            }
            
            .move-to-cart:hover {
                background-color: #4CAF50;
                color: white;
            }
            
            .remove-favorite:hover {
                background-color: #ff4d4d;
                color: white;
            }
            
            .empty-favorites-message {
                text-align: center;
                color: #888;
                padding: 30px 0;
            }
        `;
        document.head.appendChild(favStyles);

        // Create favorites overlay
        const favoritesOverlay = document.createElement('div');
        favoritesOverlay.className = 'favorites-overlay';
        favoritesOverlay.innerHTML = `
            <div class="favorites-header">
                <h3>My Favorites</h3>
                <button class="close-favorites">&times;</button>
            </div>
            <div class="favorites-items">
                <div class="empty-favorites-message">Your favorites list is empty</div>
            </div>
        `;
        document.body.appendChild(favoritesOverlay);

        // Get references to new elements
        const favoritesToggle = document.getElementById('favorites-toggle');
        const closeFavorites = document.querySelector('.close-favorites');
        const favoritesItems = document.querySelector('.favorites-items');
        const favoritesCount = document.querySelector('.favorites-count');

        // Initialize favorites array
        let favorites = [];

        // Load favorites from local storage
        const storedFavorites = localStorage.getItem('brandyFavorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);

            // Update favorites count
            favoritesCount.textContent = favorites.length;

            // Mark favorited items visually
            document.querySelectorAll('.product-action-btn').forEach(function (btn, index) {
                if (index % 3 === 1) { // Heart button
                    const productCard = btn.closest('.product-card');
                    if (productCard) {
                        const productTitle = productCard.querySelector('.product-title').textContent;
                        const productCategory = productCard.querySelector('.product-category').textContent;

                        // Check if this product is in favorites
                        const isFavorite = favorites.some(item =>
                            item.title === productTitle && item.category === productCategory
                        );

                        if (isFavorite) {
                            btn.classList.add('favorited');
                            btn.querySelector('i').style.color = '#ff4d4d';
                        }
                    }
                }
            });
        }

        // Make favorites available globally
        window.favorites = favorites;

        // Function to update favorites UI
        function updateFavorites() {
            // Clear favorites items
            favoritesItems.innerHTML = '';

            if (favorites.length === 0) {
                favoritesItems.innerHTML = '<div class="empty-favorites-message">Your favorites list is empty</div>';
            } else {
                // Add each item to favorites
                favorites.forEach((item, index) => {
                    // Create favorite item element
                    const favoriteItem = document.createElement('div');
                    favoriteItem.className = 'favorite-item';
                    favoriteItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="favorite-item-image">
                        <div class="favorite-item-details">
                            <h4 class="favorite-item-title">${item.title}</h4>
                            <div class="favorite-item-category">${item.category}</div>
                            <div class="favorite-item-price">${item.price}</div>
                            <div class="favorite-item-actions">
                                <button class="move-to-cart" data-index="${index}">Add to Cart</button>
                                <button class="remove-favorite" data-index="${index}">Remove</button>
                            </div>
                        </div>
                    `;

                    favoritesItems.appendChild(favoriteItem);
                });

                // Add event listeners to favorite item buttons
                addFavoriteItemEventListeners();
            }

            // Update favorites count
            favoritesCount.textContent = favorites.length;

            // Update local storage
            localStorage.setItem('brandyFavorites', JSON.stringify(favorites));

            // Make favorites available globally
            window.favorites = favorites;
        }

        // Add event listeners to favorite item buttons
        function addFavoriteItemEventListeners() {
            // Move to cart button
            document.querySelectorAll('.move-to-cart').forEach(btn => {
                btn.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'));
                    const item = favorites[index];

                    // Show product modal for size selection
                    const productModal = document.getElementById('product-modal');
                    if (productModal) {
                        // Update modal with product information
                        document.getElementById('modal-product-image').src = item.image;
                        document.getElementById('modal-product-category').textContent = item.category;
                        document.getElementById('modal-product-title').textContent = item.title;
                        document.getElementById('modal-current-price').textContent = item.price;

                        // Reset selected size and quantity
                        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                        document.getElementById('product-qty').value = 1;

                        // Update current product
                        window.currentProduct = {
                            image: item.image,
                            category: item.category,
                            title: item.title,
                            price: item.price,
                            oldPrice: '',
                            size: null,
                            quantity: 1
                        };

                        // Close favorites and show modal
                        favoritesOverlay.classList.remove('active');
                        productModal.classList.add('active');
                    } else {
                        alert('Please select a product size before adding to cart');
                    }
                });
            });

            // Remove favorite button
            document.querySelectorAll('.remove-favorite').forEach(btn => {
                btn.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'));

                    // Get product info before removing
                    const removedItem = favorites[index];

                    // Remove from favorites
                    favorites.splice(index, 1);

                    // Update UI
                    updateFavorites();

                    // Update heart icon on product card
                    document.querySelectorAll('.product-action-btn').forEach(function (btn, i) {
                        if (i % 3 === 1) { // Heart button (second button in each set)
                            const productCard = btn.closest('.product-card');
                            if (productCard) {
                                const productTitle = productCard.querySelector('.product-title').textContent;
                                const productCategory = productCard.querySelector('.product-category').textContent;

                                if (productTitle === removedItem.title && productCategory === removedItem.category) {
                                    btn.classList.remove('favorited');
                                    btn.querySelector('i').style.color = '';
                                }
                            }
                        }
                    });

                    // Show notification
                    showNotification('Removed from favorites!');
                });
            });
        }

        // Event listeners for favorites toggle
        favoritesToggle.addEventListener('click', function (e) {
            e.preventDefault();
            updateFavorites(); // Update favorites before showing
            favoritesOverlay.classList.add('active');
        });

        closeFavorites.addEventListener('click', function () {
            favoritesOverlay.classList.remove('active');
        });

        // Close favorites when clicking outside
        window.addEventListener('click', function (e) {
            if (e.target === favoritesOverlay) {
                favoritesOverlay.classList.remove('active');
            }
        });

        // Show notification function
        function showNotification(message) {
            // Remove any existing notifications
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Create new notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;

            // Style notification
            Object.assign(notification.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#333',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '4px',
                zIndex: '1000',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });

            // Add notification to document
            document.body.appendChild(notification);

            // Show and then hide notification
            setTimeout(() => {
                notification.style.opacity = '1';

                setTimeout(() => {
                    notification.style.opacity = '0';

                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 2000);
            }, 10);
        }

        // Make the showNotification function globally available
        window.showNotification = showNotification;

        // Update favorites initially
        updateFavorites();

        // IMPORTANT: Connect to existing heart button functionality
        // Override the existing click event for heart buttons
        document.querySelectorAll('.product-action-btn').forEach(function (btn, index) {
            if (index % 3 === 1) { // Heart button (second button in each set)
                // Remove any existing event listeners (if possible)
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                // Add our new event listener
                newBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const productCard = this.closest('.product-card');

                    // Toggle favorite status visually
                    if (this.classList.contains('favorited')) {
                        this.classList.remove('favorited');
                        this.querySelector('i').style.color = '';
                    } else {
                        this.classList.add('favorited');
                        this.querySelector('i').style.color = '#ff4d4d';
                    }

                    // Get product information
                    const productImg = productCard.querySelector('.product-img').src;
                    const productCategory = productCard.querySelector('.product-category').textContent;
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const currentPrice = productCard.querySelector('.current-price').textContent;

                    // Create product object
                    const product = {
                        image: productImg,
                        category: productCategory,
                        title: productTitle,
                        price: currentPrice
                    };

                    // Check if product is already in favorites
                    const existingProductIndex = favorites.findIndex(item =>
                        item.title === product.title && item.category === product.category
                    );

                    if (existingProductIndex > -1) {
                        // Remove from favorites if already exists
                        favorites.splice(existingProductIndex, 1);
                        showNotification('Removed from favorites!');
                    } else {
                        // Add to favorites
                        favorites.push(product);
                        showNotification('Added to favorites!');
                    }

                    // Update UI immediately - THIS IS THE KEY FIX
                    updateFavorites();
                });
            }
        });
    }
});
