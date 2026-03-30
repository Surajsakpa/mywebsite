const API = 'api';

// Real product images from reliable sources
const products = [
  { id:1,  name:'MRF Virat Kohli Genius',      brand:'MRF',         category:'bat',         price:4499,  mrp:5999,  off:25, img:'virat.jpg',      rating:'4.8/5', reviews:312, badge:'Sale' },
  { id:2,  name:'DSC Krunch Pro Bat',           brand:'DSC',         category:'bat',         price:8999,  mrp:10999, off:18, img:'dsc.jpg',                        rating:'4.7/5', reviews:189, badge:'New' },
  { id:3,  name:'Gray-Nicolls Powerbow',        brand:'Gray-Nicolls',category:'bat',         price:6499,  mrp:7999,  off:19, img:'graynicol.jpg',                        rating:'4.6/5', reviews:245, badge:'' },
  { id:4,  name:'SS Ton Elite Cricket Bat',     brand:'SS Cricket',  category:'bat',         price:5999,  mrp:8499,  off:29, img:'sston.webp',                        rating:'4.9/5', reviews:421, badge:'Sale' },
  { id:5,  name:'Dukes Test Match Ball',        brand:'Dukes',       category:'ball',        price:1299,  mrp:1699,  off:24, img:'dukest.jpg',                        rating:'4.9/5', reviews:567, badge:'Pro' },
  { id:6,  name:'Kookaburra Turf Ball',         brand:'Kookaburra',  category:'ball',        price:899,   mrp:1199,  off:25, img:'koko.png',                        rating:'4.7/5', reviews:312, badge:'' },
  { id:7,  name:'SG Practice Leather Ball',     brand:'SG Cricket',  category:'ball',        price:499,   mrp:649,   off:23, img:'sg.webp',                        rating:'4.5/5', reviews:890, badge:'New' },
  { id:8,  name:'GM Purist Geo II Helmet',      brand:'GM Cricket',  category:'protective',  price:2499,  mrp:3499,  off:29, img:'gm.jpg',                        rating:'4.8/5', reviews:178, badge:'Sale' },
  { id:9,  name:'SS Thigh Guard & Arm Guard',   brand:'SS Cricket',  category:'protective',  price:799,   mrp:1099,  off:27, img:'thigh.webp',                        rating:'4.5/5', reviews:234, badge:'' },
  { id:10, name:'SG Wicket-Keeper Gloves',      brand:'SG Cricket',  category:'protective',  price:1899,  mrp:2499,  off:24, img:'sgwicketkeeper.webp',                        rating:'4.7/5', reviews:145, badge:'New' },
  { id:11, name:'Kookaburra Cricket Pads',      brand:'Kookaburra',  category:'protective',  price:2299,  mrp:2999,  off:23, img:'kokopad.jpg',                        rating:'4.6/5', reviews:267, badge:'' },
  { id:12, name:'Team Jersey + Trousers',       brand:'CricketClubPro',  category:'apparel',     price:1499,  mrp:1999,  off:25, img:'jersey.png',                        rating:'4.8/5', reviews:445, badge:'Member' },
  { id:13, name:'Training DryFit T-Shirt',      brand:'Nike Cricket',category:'apparel',     price:999,   mrp:1499,  off:33, img:'tshirt.png',                        rating:'4.6/5', reviews:567, badge:'' },
  { id:14, name:'Adidas Cricket Spike Shoes',   brand:'Adidas',      category:'apparel',     price:3499,  mrp:4999,  off:30, img:'addidas.png',                        rating:'4.9/5', reviews:312, badge:'New' },
  { id:15, name:'SG Cricket Kit Bag Large',     brand:'SG Cricket',  category:'accessories', price:2999,  mrp:3999,  off:25, img:'sgbag.png',                        rating:'4.7/5', reviews:189, badge:'' },
  { id:16, name:'GM Batting Gloves Pro',        brand:'GM Cricket',  category:'accessories', price:1299,  mrp:1799,  off:28, img:'gmgloves.png',                        rating:'4.8/5', reviews:423, badge:'Sale' },
  { id:17, name:'Bat Grip Roll Set of 5',       brand:'Grays',       category:'accessories', price:299,   mrp:449,   off:33, img:'batgrip.png',                        rating:'4.5/5', reviews:678, badge:'' },
  { id:18, name:'SG Stumps & Bails Full Set',   brand:'SG Cricket',  category:'accessories', price:1599,  mrp:2199,  off:27, img:'stump.png',                        rating:'4.8/5', reviews:234, badge:'New' },
  { id:19, name:'Masuri Elbow Guard Premium',   brand:'Masuri',      category:'protective',  price:699,   mrp:999,   off:30, img:'maskuri.png',                        rating:'4.5/5', reviews:156, badge:'' },
  { id:20, name:'SG Wheelie Cricket Kit Bag',   brand:'SG Cricket',  category:'accessories', price:3499,  mrp:4499,  off:22, img:'sgcricket.png',                        rating:'4.9/5', reviews:98,  badge:'New' },
];

let cart = [];
window._adminLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  loadNotices();
  renderAdminTab('bookings');
  const ticker = document.getElementById('tickerInner');
  if (ticker) ticker.innerHTML += ticker.innerHTML;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) nav.style.boxShadow = '0 4px 30px rgba(15,24,37,0.12)';
    else nav.style.boxShadow = '0 2px 16px rgba(15,24,37,0.06)';
  });
});

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function renderProducts(category) {
  const grid = document.getElementById('productsGrid');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  grid.innerHTML = filtered.map(p => {
    const bc = p.badge === 'New' ? 'new' : p.badge === 'Member' ? 'member' : p.badge === 'Pro' ? 'pro' : p.badge === 'Sale' ? 'sale' : '';
    return `<div class="product-card" data-cat="${p.category}">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge ${bc}">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
          onerror="this.src='https://placehold.co/400x300/f4f6fb/9aa5b8?text=${encodeURIComponent(p.name)}'">
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-brand">${p.brand}</div>
        <div class="product-rating">&#9733; ${p.rating} <span style="color:var(--text3)">(${p.reviews} reviews)</span></div>
        <div class="product-pricing">
          <span class="product-price">&#8377;${p.price.toLocaleString()}</span>
          <span class="product-mrp">&#8377;${p.mrp.toLocaleString()}</span>
          <span class="product-off">${p.off}% off</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>`;
  }).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

function addToCart(productId) {
  const p = products.find(x => x.id === productId);
  const existing = cart.find(x => x.id === productId);
  if (existing) existing.qty++; else cart.push({ ...p, qty: 1 });
  updateCartUI();
  showToast(`${p.name} added to cart`, 'success');
}

function removeFromCart(productId) { cart = cart.filter(x => x.id !== productId); updateCartUI(); }

function changeQty(productId, delta) {
  const item = cart.find(x => x.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId); else updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cartCount').textContent = count;
  const itemsEl = document.getElementById('cartItems');
  const footer  = document.getElementById('cartFooter');
  document.getElementById('cartTotal').textContent = '&#8377;'+total.toLocaleString();
  if (!cart.length) {
    itemsEl.innerHTML = `<div class="cart-empty"><svg class="cart-empty-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c8d0e0" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Your cart is empty<br><small style="color:var(--text3);font-size:.82rem">Add some cricket gear!</small></div>`;
    footer.style.display = 'none'; return;
  }
  footer.style.display = 'block';
  document.getElementById('cartTotal').textContent = '₹'+total.toLocaleString();
  itemsEl.innerHTML = cart.map(item => `<div class="cart-item">
    <div class="ci-img"><img src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/60x60/f4f6fb/9aa5b8?text=IMG'"></div>
    <div class="ci-info">
      <div class="ci-name">${item.name}</div>
      <div class="ci-price">&#8377;${(item.price*item.qty).toLocaleString()}</div>
      <div class="ci-controls">
        <button onclick="changeQty(${item.id},-1)">&#8722;</button>
        <span class="ci-qty">${item.qty}</span>
        <button onclick="changeQty(${item.id},1)">+</button>
        <button class="ci-remove" onclick="removeFromCart(${item.id})" title="Remove">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>
  </div>`).join('');
}

function toggleCart() {
  const s = document.getElementById('cartSidebar');
  const o = document.getElementById('cartOverlay');
  const open = s.classList.toggle('open');
  o.classList.toggle('open', open);
}

function clearCart() { if(!cart.length)return; cart=[]; updateCartUI(); showToast('Cart cleared',''); }

function showCheckout() {
  if (!cart.length) { showToast('Your cart is empty','error'); return; }
  toggleCart();
  document.getElementById('paymentModal').style.display='flex';
  nextStep(1); updateOrderSummary();
}

function updateOrderSummary() {
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const el = document.getElementById('orderSummaryMini');
  if (el) el.innerHTML = `<strong style="display:block;margin-bottom:.6rem;color:var(--text)">Order Summary</strong>${cart.map(i=>`<div style="display:flex;justify-content:space-between;margin-bottom:.3rem;font-size:.85rem"><span>${i.name} &times;${i.qty}</span><span style="color:var(--accent)">&#8377;${(i.price*i.qty).toLocaleString()}</span></div>`).join('')}<div style="border-top:1px solid var(--border);margin-top:.75rem;padding-top:.75rem;display:flex;justify-content:space-between"><strong>Total</strong><strong style="color:var(--accent)">&#8377;${total.toLocaleString()}</strong></div>`;
}

function nextStep(step) {
  ['chkStep1','chkStep2','chkStep3'].forEach((id,i)=>{ document.getElementById(id).style.display=i+1===step?'block':'none'; });
  ['step1Ind','step2Ind','step3Ind'].forEach((id,i)=>{ document.getElementById(id).classList.toggle('active',i+1<=step); });
  if(step===2) updateOrderSummary();
}

// ===== RAZORPAY =====
function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = ()=>resolve(true); s.onerror = ()=>resolve(false);
    document.head.appendChild(s);
  });
}

async function processPayment() {
  const btn = document.getElementById('payNowBtn');
  btn.textContent = 'Processing...'; btn.disabled = true;
  const name=document.getElementById('chkName').value.trim(), phone=document.getElementById('chkPhone').value.trim(), email=document.getElementById('chkEmail').value.trim(), address=document.getElementById('chkAddress').value.trim();
  if(!name||!phone||!email||!address){ showToast('Please fill delivery details first','error'); btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Pay Now'; btn.disabled=false; nextStep(1); return; }
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const items=cart.map(i=>({id:i.id,name:i.name,qty:i.qty,price:i.price}));
  try {
    const res=await fetch(`${API}/razorpay_create.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:total*100,type:'order'})});
    const data=await res.json();
    if(!data.success){showToast(data.message,'error');btn.innerHTML='Pay Now';btn.disabled=false;return;}
    const loaded=await loadRazorpay();
    if(!loaded){showToast('Could not load payment gateway','error');btn.innerHTML='Pay Now';btn.disabled=false;return;}
    new Razorpay({
      key:data.data.key_id, amount:data.data.amount, currency:data.data.currency,
      name:'CricketClub Pro', description:`Order - ${items.length} item(s)`,
      order_id:data.data.razorpay_order_id, prefill:{name,email,contact:phone}, theme:{color:'#c8360a'},
      handler:async function(response){
        const verify=await fetch(`${API}/razorpay_verify.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({razorpay_order_id:response.razorpay_order_id,razorpay_payment_id:response.razorpay_payment_id,razorpay_signature:response.razorpay_signature,type:'order',payload:{name,email,phone,address,items,total}})});
        const vdata=await verify.json();
        if(vdata.success){document.getElementById('orderId').textContent=vdata.data.order_ref;nextStep(3);}
        else showToast(vdata.message,'error');
      },
      modal:{ondismiss:function(){showToast('Payment cancelled','');btn.innerHTML='Pay Now';btn.disabled=false;}}
    }).open();
  } catch {
    document.getElementById('orderId').textContent='CH'+Date.now().toString().slice(-8); nextStep(3);
  }
  btn.innerHTML='Pay Now'; btn.disabled=false;
}

async function submitBooking(e) {
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Processing...'; btn.disabled=true;
  const formData=new FormData(e.target);
  const payload=Object.fromEntries(formData.entries());
  const groundPrices={'Ground A — Main Stadium':2000,'Ground B — Practice Nets':800,'Ground C — Academy Pitch':1200};
  const amount=(groundPrices[payload.ground]||1000)*100;
  try {
    const res=await fetch(`${API}/razorpay_create.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,type:'booking'})});
    const data=await res.json();
    if(!data.success){showToast(data.message,'error');btn.textContent='Submit Booking Request';btn.disabled=false;return;}
    const loaded=await loadRazorpay();
    if(!loaded){showToast('Could not load payment gateway','error');btn.textContent='Submit Booking Request';btn.disabled=false;return;}
    new Razorpay({
      key:data.data.key_id,amount:data.data.amount,currency:data.data.currency,
      name:'CricketClub Pro',description:`${payload.ground} - ${payload.slot}`,
      order_id:data.data.razorpay_order_id,prefill:{name:payload.name,email:payload.email,contact:payload.phone},theme:{color:'#c8360a'},
      handler:async function(response){
        const verify=await fetch(`${API}/razorpay_verify.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({razorpay_order_id:response.razorpay_order_id,razorpay_payment_id:response.razorpay_payment_id,razorpay_signature:response.razorpay_signature,type:'booking',payload})});
        const vdata=await verify.json();
        if(vdata.success){e.target.reset();showToast(`Booking confirmed! Ref: ${vdata.data.ref}`,'success');}
        else showToast(vdata.message,'error');
      },
      modal:{ondismiss:function(){showToast('Payment cancelled','');btn.textContent='Submit Booking Request';btn.disabled=false;}}
    }).open();
  } catch { e.target.reset(); showToast('Booking submitted! Awaiting approval.','success'); }
  btn.textContent='Submit Booking Request'; btn.disabled=false;
}

function showMembershipForm(plan) {
  document.getElementById('selectedPlan').textContent='Plan: '+plan;
  document.getElementById('membershipModal').dataset.plan=plan;
  document.getElementById('membershipModal').style.display='flex';
}

async function submitMembership(e) {
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Processing...'; btn.disabled=true;
  const inputs=[...e.target.querySelectorAll('input,select,textarea')];
  const [fn,ln,email,phone,dob,role,address]=inputs.map(i=>i.value.trim());
  const plan=document.getElementById('membershipModal').dataset.plan||'';
  const planPrices={'Starter':2499,'Pro Player':5999,'Elite':11999};
  const planName=plan.split(' ')[0]==='Pro'?'Pro Player':plan.split(' ')[0];
  const amount=(planPrices[planName]||2499)*100;
  try {
    const res=await fetch(`${API}/razorpay_create.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,type:'membership'})});
    const data=await res.json();
    if(!data.success){showToast(data.message,'error');btn.textContent='Complete Registration';btn.disabled=false;return;}
    const loaded=await loadRazorpay();
    if(!loaded){showToast('Could not load payment gateway','error');btn.textContent='Complete Registration';btn.disabled=false;return;}
    new Razorpay({
      key:data.data.key_id,amount:data.data.amount,currency:data.data.currency,
      name:'CricketClub Pro',description:planName+' Membership',
      order_id:data.data.razorpay_order_id,prefill:{name:fn+' '+ln,email,contact:phone},theme:{color:'#c8360a'},
      handler:async function(response){
        const verify=await fetch(`${API}/razorpay_verify.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({razorpay_order_id:response.razorpay_order_id,razorpay_payment_id:response.razorpay_payment_id,razorpay_signature:response.razorpay_signature,type:'membership',payload:{first_name:fn,last_name:ln,email,phone,dob,role,address,plan}})});
        const vdata=await verify.json();
        if(vdata.success){closeModal('membershipModal');showToast(`Membership activated! ID: ${vdata.data.ref}`,'success');}
        else showToast(vdata.message,'error');
      },
      modal:{ondismiss:function(){showToast('Payment cancelled','');btn.textContent='Complete Registration';btn.disabled=false;}}
    }).open();
  } catch { closeModal('membershipModal'); showToast('Membership registration submitted!','success'); }
  btn.textContent='Complete Registration'; btn.disabled=false;
}

function showBatchForm(batch) {
  document.getElementById('selectedBatch').textContent='Batch: '+batch;
  document.getElementById('batchModal').dataset.batch=batch;
  document.getElementById('batchModal').style.display='flex';
}

async function submitBatch(e) {
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Registering...'; btn.disabled=true;
  const inputs=[...e.target.querySelectorAll('input,select')];
  const [name,age,guardian,phone,email,experience]=inputs.map(i=>i.value.trim());
  const batch=document.getElementById('batchModal').dataset.batch||'';
  try {
    const res=await fetch(`${API}/batch.php`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,age:parseInt(age),guardian,phone,email,experience,batch})});
    const j=await res.json();
    if(j.success){closeModal('batchModal');showToast(`Registered! Ref: ${j.data.ref}`,'success');}
    else showToast(j.message,'error');
  } catch { closeModal('batchModal'); showToast('Batch registration submitted!','success'); }
  btn.textContent='Register for Batch'; btn.disabled=false;
}

async function loadNotices() {
  try {
    const res=await fetch(`${API}/notices.php`);
    const j=await res.json();
    if(j.success&&j.data.length){renderNotices(j.data);return;}
  } catch {}
  renderNotices(noticesStatic);
}

const noticesStatic=[
  {type:'urgent',tag:'URGENT',title:'Ground B Maintenance — 28th March',body:'Ground B (Practice Nets) will be closed for maintenance on 28th March. All bookings rescheduled.',date:'22 Mar 2025'},
  {type:'info',tag:'TOURNAMENT',title:'Inter-Club T20 Tournament 2025',body:'Registrations open. Last date: 5th April. Fee: ₹5,000/team.',date:'20 Mar 2025'},
  {type:'general',tag:'COACHING',title:'Summer Coaching Camp — May Intake',body:'Limited seats from 1st May for juniors, youth and seniors.',date:'18 Mar 2025'},
  {type:'info',tag:'STORE',title:'New Bat Range Now Live',body:'Latest 2025 bats from SG, Kookaburra, Gray-Nicolls. Members get 15% off.',date:'15 Mar 2025'},
  {type:'general',tag:'AGM',title:'Annual General Meeting — 10th April',body:'All members invited to AGM on 10th April at 6 PM.',date:'12 Mar 2025'},
  {type:'urgent',tag:'REMINDER',title:'Membership Renewal Deadline',body:'Renew memberships before 31st March to avoid lapse.',date:'10 Mar 2025'},
];

function renderNotices(data) {
  document.getElementById('noticesGrid').innerHTML=data.map(n=>`<div class="notice-card ${n.type}">
    <span class="notice-tag ${n.type}">${n.tag}</span>
    <div class="notice-title">${n.title}</div>
    <div class="notice-body">${n.body}</div>
    <div class="notice-date">${n.date||''}</div>
  </div>`).join('');
}

// Admin stubs (dashboard is separate page now)
function renderAdminTab(){}

function closeModal(id){
  document.getElementById(id).style.display='none';
  if(id==='paymentModal'){nextStep(1);const btn=document.getElementById('payNowBtn');if(btn){btn.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Pay Now';btn.disabled=false;}}
}

document.addEventListener('click',e=>{
  if(e.target.classList.contains('modal-overlay')){
    if(!e.target.querySelector('#chkStep3[style*="block"]')) e.target.style.display='none';
  }
});

function showToast(msg, type='') {
  const toast=document.getElementById('toast');
  toast.textContent=msg; toast.className=`toast ${type} show`;
  clearTimeout(toast._timer); toast._timer=setTimeout(()=>toast.classList.remove('show'),3500);
}
