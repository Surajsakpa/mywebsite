# 🏏 CricketClub Pro — Full Stack Website

A complete Cricket Club website with PHP backend, SQLite database, and full admin panel.

---

## 📁 Project Structure

```
cricketclub/
├── index.html              ← Main frontend (your original, enhanced)
├── .htaccess               ← Apache rewrite rules
├── css/
│   └── styles.css          ← All styles (your original)
├── js/
│   └── script.js           ← Frontend JS (updated to call PHP APIs)
└── api/
    ├── db.php              ← Database config + schema (SQLite)
    ├── booking.php         ← POST: Ground booking
    ├── membership.php      ← POST: Member registration
    ├── batch.php           ← POST: Batch registration
    ├── order.php           ← POST: Store checkout/orders
    ├── notices.php         ← GET: Fetch notices | POST: Add notice
    └── admin.php           ← Admin login, stats, bookings, members, orders
```

> The database file is auto-created at `data/cricketclub.db` on first load.

---

## 🚀 Setup Instructions

### Requirements
- PHP 7.4+ (with PDO + SQLite3 extension)
- Apache / Nginx web server
- No MySQL needed — uses SQLite (zero config)

### Steps

1. **Upload** the entire `cricketclub/` folder to your web server's public root (e.g. `public_html/` or `www/`)

2. **Set permissions** so PHP can create the database:
   ```bash
   chmod 755 cricketclub/
   mkdir cricketclub/data
   chmod 775 cricketclub/data
   ```

3. **Enable mod_rewrite** (Apache):
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

4. **Open** `http://yourdomain.com/cricketclub/` in your browser.

5. The database and tables are **auto-created** on first visit. No SQL import needed.

---

## 🔐 Admin Panel

- URL: Scroll to the **Admin** section on the page, or click **Admin** in the navbar
- Username: `admin`
- Password: `admin123`

> ⚠️ **Change the admin password** for production! Edit `api/db.php` line with `password_hash('admin123', ...)` and replace `admin123` with your desired password.

---

## 🗄️ Database Tables

| Table       | Purpose                                |
|-------------|----------------------------------------|
| `bookings`  | Ground booking requests (approve/reject) |
| `members`   | Club member registrations              |
| `batches`   | Training batch enrolments              |
| `orders`    | Store checkout orders                  |
| `notices`   | Club notices (post/delete from admin)  |
| `admins`    | Admin credentials (bcrypt hashed)      |

---

## 🔌 API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `api/booking.php`     | Submit ground booking        |
| POST   | `api/membership.php`  | Register as member           |
| POST   | `api/batch.php`       | Enrol in training batch      |
| POST   | `api/order.php`       | Place store order            |
| GET    | `api/notices.php`     | Fetch all notices            |
| GET    | `api/admin.php?action=login`    | Admin login    |
| GET    | `api/admin.php?action=stats`    | Dashboard stats|
| GET    | `api/admin.php?action=bookings` | All bookings   |
| GET    | `api/admin.php?action=members`  | All members    |
| GET    | `api/admin.php?action=batches`  | All batches    |
| GET    | `api/admin.php?action=orders`   | All orders     |
| POST   | `api/admin.php?action=booking_status` | Approve/reject |
| POST   | `api/admin.php?action=post_notice`    | Post notice    |
| POST   | `api/admin.php?action=delete_notice`  | Delete notice  |

---

## 🔄 Switching to MySQL (optional)

To swap SQLite for MySQL, edit `api/db.php`:

```php
// Replace this:
$pdo = new PDO('sqlite:' . DB_PATH, ...);

// With this:
$pdo = new PDO('mysql:host=localhost;dbname=cricketclub;charset=utf8mb4', 'DB_USER', 'DB_PASS', [...]);
```

The rest of the code is standard PDO and works unchanged.

---

## ✅ Features

- 🏏 **Store** — 20 products, cart, checkout with PHP order saving
- 🏟️ **Ground Booking** — form → PHP → DB → admin approval
- 🏅 **Membership** — 3 plans → PHP → DB with duplicate check
- 🎓 **Batch Registration** → PHP → DB
- 🔔 **Notices** — loaded from DB, postable/deletable via admin
- 🔐 **Admin Panel** — bcrypt login, live stats, bookings approve/reject, orders view
- 📱 **Fully responsive** — mobile-first design
- 🛡️ **Graceful fallback** — works as static demo even without a PHP server

---

Built with ❤️ for cricket lovers. Mumbai, India 🇮🇳
