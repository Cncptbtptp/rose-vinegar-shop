// 商品数据
const products = [
    {
        id: 1,
        name: '瑰意琦行 玫瑰醋经典款 330ml',
        desc: '云南高原玫瑰 · 传统工艺酿造 · 美容养颜',
        price: 28,
        originalPrice: 38,
        sales: 2680,
        cat: 'rose',
        images: ['vinegar_1.jpg', 'vinegar_2.jpg', 'vinegar_1.jpg'],
        specs: ['经典款', '低糖版', '无糖版']
    },
    {
        id: 2,
        name: '瑰意琦行 玫瑰醋精品礼盒 6瓶装',
        desc: '精美包装 · 送礼佳品 · 民族风情',
        price: 158,
        originalPrice: 198,
        sales: 892,
        cat: 'gift',
        images: ['vinegar_1.jpg', 'vinegar_2.jpg', 'vinegar_1.jpg'],
        specs: ['6瓶装', '8瓶装']
    },
    {
        id: 3,
        name: '瑰意琦行 尊享礼盒 12瓶装',
        desc: '高端礼盒 · 企业团购 · 节日礼品',
        price: 288,
        originalPrice: 368,
        sales: 356,
        cat: 'box',
        images: ['vinegar_2.jpg', 'vinegar_1.jpg', 'vinegar_2.jpg'],
        specs: ['12瓶装', '16瓶装']
    },
    {
        id: 4,
        name: '瑰意琦行 玫瑰醋尝鲜装 180ml',
        desc: '便携装 · 初次体验 · 新鲜直达',
        price: 12.9,
        originalPrice: 18,
        sales: 5234,
        cat: 'trial',
        images: ['vinegar_1.jpg', 'vinegar_2.jpg', 'vinegar_1.jpg'],
        specs: ['单瓶装', '3瓶装']
    },
    {
        id: 5,
        name: '瑰意琦行 玫瑰醋家庭装 500ml',
        desc: '大容量 · 家庭分享 · 健康生活',
        price: 45,
        originalPrice: 58,
        sales: 1892,
        cat: 'rose',
        images: ['vinegar_2.jpg', 'vinegar_1.jpg', 'vinegar_2.jpg'],
        specs: ['单瓶装', '2瓶装']
    },
    {
        id: 6,
        name: '瑰意琦行 定制礼盒 企业定制',
        desc: '专属定制 · 企业礼品 · 个性包装',
        price: 388,
        originalPrice: 488,
        sales: 156,
        cat: 'gift',
        images: ['vinegar_1.jpg', 'vinegar_2.jpg', 'vinegar_1.jpg'],
        specs: ['标准定制', '高级定制']
    },
    {
        id: 7,
        name: '瑰意琦行 精美明信片套装',
        desc: '云南民族风情 · 玫瑰主题 · 一套8张',
        price: 38,
        originalPrice: 48,
        sales: 1234,
        cat: 'gift',
        images: ['postcard_1.jpg', 'postcard_2.jpg', 'postcard_3.jpg'],
        specs: ['一套8张', '单张随机']
    },
    {
        id: 8,
        name: '瑰意琦行 玫瑰钥匙扣',
        desc: '精美金属工艺 · 玫瑰造型 · 时尚配饰',
        price: 25,
        originalPrice: 35,
        sales: 892,
        cat: 'gift',
        images: ['keychain.jpg', 'keychain.jpg', 'keychain.jpg'],
        specs: ['玫瑰金', '银色']
    },
    {
        id: 9,
        name: '瑰意琦行 玫瑰徽章',
        desc: '珐琅工艺 · 精致收藏 · 纪念意义',
        price: 18,
        originalPrice: 28,
        sales: 654,
        cat: 'gift',
        images: ['badge.jpg', 'badge.jpg', 'badge.jpg'],
        specs: ['玫瑰款', '民族款']
    }
];

// 购物车数据
let cart = [];
let cartCount = 0;

// 搜索功能
document.getElementById('searchBtn').addEventListener('click', searchProducts);
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') searchProducts();
});

function searchProducts() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        const desc = card.querySelector('.product-desc').textContent.toLowerCase();
        if (name.includes(keyword) || desc.includes(keyword)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 分类筛选
document.querySelectorAll('.category-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const cat = this.dataset.cat;
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (cat === 'all' || card.dataset.cat === cat) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 排序功能
document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const sortBy = this.dataset.sort;
        const container = document.querySelector('.products-grid');
        const cards = Array.from(document.querySelectorAll('.product-card'));
        
        if (sortBy === 'price') {
            cards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('¥', ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('¥', ''));
                return priceA - priceB;
            });
        } else if (sortBy === 'sales') {
            cards.sort((a, b) => {
                const salesA = parseInt(a.querySelector('.product-sales').textContent.replace('已售 ', '').replace(',', ''));
                const salesB = parseInt(b.querySelector('.product-sales').textContent.replace('已售 ', '').replace(',', ''));
                return salesB - salesA;
            });
        }
        
        cards.forEach(card => container.appendChild(card));
    });
});

// 商品详情弹窗
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let detailHtml = `
        <div class="detail-content">
            <div class="detail-images">
                <img src="${product.images[0]}" class="detail-main-img" id="mainImg">
                <div class="detail-thumbnails">
                    ${product.images.map((img, index) => 
                        `<img src="${img}" ${index === 0 ? 'class="active"' : ''} onclick="changeMainImg('${img}')">`
                    ).join('')}
                </div>
            </div>
            <div class="detail-info">
                <h2 class="detail-title">${product.name}</h2>
                <div class="detail-price-box">
                    <span class="detail-price">¥${product.price}</span>
                    <span class="detail-original-price">¥${product.originalPrice}</span>
                    <div class="detail-sales">已售 ${product.sales.toLocaleString()} 件</div>
                </div>
                <div class="detail-specs">
                    <h4>规格选择</h4>
                    <div class="spec-options">
                        ${product.specs.map((spec, index) => 
                            `<span class="spec-option ${index === 0 ? 'active' : ''}" onclick="selectSpec(this)">${spec}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="detail-quantity">
                    <h4>购买数量</h4>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="decreaseQty()">-</button>
                        <input type="number" class="qty-input" id="qtyInput" value="1" min="1">
                        <button class="qty-btn" onclick="increaseQty()">+</button>
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="detail-cart-btn" onclick="addToCartFromDetail(${productId})">加入购物车</button>
                    <button class="detail-buy-btn" onclick="buyNow(${productId})">立即购买</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modalBody').innerHTML = detailHtml;
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function changeMainImg(src) {
    document.getElementById('mainImg').src = src;
    document.querySelectorAll('.detail-thumbnails img').forEach(img => img.classList.remove('active'));
    document.querySelector(`.detail-thumbnails img[src="${src}"]`).classList.add('active');
}

function selectSpec(el) {
    document.querySelectorAll('.spec-option').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
}

function decreaseQty() {
    const input = document.getElementById('qtyInput');
    if (input.value > 1) input.value = parseInt(input.value) - 1;
}

function increaseQty() {
    const input = document.getElementById('qtyInput');
    input.value = parseInt(input.value) + 1;
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 加入购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            spec: product.specs[0]
        });
    }
    
    cartCount++;
    updateCartUI();
    showToast('已加入购物车');
}

function addToCartFromDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const qty = parseInt(document.getElementById('qtyInput').value);
    const spec = document.querySelector('.spec-option.active').textContent;
    
    const existingItem = cart.find(item => item.id === productId && item.spec === spec);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: qty,
            spec: spec
        });
    }
    
    cartCount += qty;
    updateCartUI();
    closeModal();
    showToast('已加入购物车');
}

function updateCartUI() {
    document.getElementById('cartLink').textContent = `🛒 购物车 (${cartCount})`;
}

// 购物车弹窗
function openCart() {
    if (cart.length === 0) {
        document.getElementById('cartBody').innerHTML = `
            <div class="empty-cart">
                <p>购物车是空的</p>
                <button onclick="closeCartModal()">去逛逛</button>
            </div>
        `;
    } else {
        let cartHtml = '';
        let total = 0;
        
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            cartHtml += `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-spec">规格：${item.spec}</p>
                        <p class="cart-item-price">¥${item.price}</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.spec}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQty(${item.id}, '${item.spec}', 1)">+</button>
                            <span class="cart-item-delete" onclick="removeFromCart(${item.id}, '${item.spec}')">删除</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('cartBody').innerHTML = cartHtml;
        document.querySelector('.total-price').textContent = `¥${total.toFixed(2)}`;
    }
    
    document.getElementById('cartModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateCartQty(productId, spec, delta) {
    const item = cart.find(i => i.id === productId && i.spec === spec);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId, spec);
        } else {
            cartCount += delta;
            updateCartUI();
            openCart();
        }
    }
}

function removeFromCart(productId, spec) {
    const index = cart.findIndex(i => i.id === productId && i.spec === spec);
    if (index !== -1) {
        cartCount -= cart[index].quantity;
        cart.splice(index, 1);
        updateCartUI();
        openCart();
    }
}

// 立即购买
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const qty = parseInt(document.getElementById('qtyInput').value) || 1;
    const spec = document.querySelector('.spec-option.active')?.textContent || product.specs[0];
    
    addToCartFromDetail(productId);
    openCart();
}

function checkout() {
    if (cart.length === 0) return;
    
    alert('订单已提交！感谢您的购买！');
    cart = [];
    cartCount = 0;
    updateCartUI();
    closeCartModal();
}

// 关注店铺
function toggleFollow() {
    const btn = document.querySelector('.follow-btn');
    if (btn.textContent.includes('关注')) {
        btn.textContent = '已关注';
        btn.style.background = '#ccc';
        showToast('已关注店铺');
    } else {
        btn.textContent = '+ 关注店铺';
        btn.style.background = 'linear-gradient(135deg, #ffd100 0%, #ffb800 100%)';
        showToast('已取消关注');
    }
}

// 领取优惠券
document.querySelectorAll('.coupon-get').forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = '已领取';
        this.style.background = '#ccc';
        this.disabled = true;
        showToast('优惠券已领取');
    });
});

// Toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 添加Toast样式
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 0.9rem;
        opacity: 0;
        transition: all 0.3s;
        z-index: 3000;
    }
    .toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(toastStyle);

// 点击弹窗外部关闭
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) closeCartModal();
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('productModal').style.display = 'none';
        document.getElementById('cartModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
