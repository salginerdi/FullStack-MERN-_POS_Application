# Full Stack(MERN) POS Application

Bu proje, bir kategori oluşturma, ürün ekleme, düzenleme ve çıkarma, müşteri ekleme, fatura oluşturma ve yazdırma işlevselliğine sahip bir uygulamadır. Ayrıca, satılan ürünlerin ve müşterilerin istatistiklerinin tutulduğu bir sayfa da mevcuttur. Proje full responsive olup tüm cihazlarla uyumludur.

[İncelemek İçin tıklayın...](https://pos-application-erdi.netlify.app/)

## Kullanılan Teknolojiler

- **Frontend:**
  - React
  - TailwindCSS
  - Redux-Toolkit
  - Ant-Design

- **Backend:**
  - Express.js
  - MongoDB

## Özellikler

- **Kategori Yönetimi:**
  - Kategoriler oluşturma
  - Kategorilere ürün ekleme, düzenleme ve çıkarma

- **Müşteri Yönetimi:**
  - Müşteri ekleme

- **Fatura Yönetimi:**
  - Fatura oluşturma
  - Faturayı printer ile yazdırma

- **İstatistik Sayfası:**
  - Satılan ürünlerin ve müşterilerin istatistiklerinin tutulması

- **Kullanıcı Yönetimi:**
  - Login ve Register sayfaları

## Kurulum

### Gereksinimler

- Node.js
- MongoDB

### Adımlar

1. **Depoyu klonlayın:**
    ```sh
    git clone https://github.com/salginerdi/FullStack-MERN-_POS_Application.git
    cd proje-adi
    ```

2. **Sunucu ve istemci bağımlılıklarını yükleyin:**
    ```sh
    # Sunucu için
    cd server
    npm install

    # İstemci için
    cd ../client
    npm install
    ```

3. **Ortam değişkenlerini yapılandırın:**
    - `server/.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ekleyin.
    - `client/.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ekleyin.

4. **Veritabanını başlatın:**
    MongoDB sunucusunu yerel olarak veya bir bulut hizmeti kullanarak başlatın.

5. **Sunucuyu ve istemciyi başlatın:**
    ```sh
    # Sunucu için
    cd server
    npm start

    # İstemci için
    cd ../client
    npm start
    ```

## Kullanım

1. **Kategoriler ve Ürünler:**
    - Yeni kategoriler oluşturabilir ve bu kategorilere ürünler ekleyebilir, düzenleyebilir veya çıkarabilirsiniz.

2. **Müşteri Ekleme:**
    - Yeni müşteriler ekleyebilirsiniz.

3. **Fatura Oluşturma:**
    - Ürünleri seçerek fatura oluşturabilir ve bu faturayı yazdırabilirsiniz.

4. **İstatistik Sayfası:**
    - Satılan ürünlerin ve müşterilerin istatistiklerini görebilirsiniz.

5. **Kullanıcı Girişi:**
    - Kayıt olabilir ve giriş yapabilirsiniz.

------

# Full Stack(MERN) POS Application

This project is an application with functionalities to create categories, add, edit, and remove products, add customers, create and print invoices. Additionally, there is a page that tracks statistics of sold products and customers. The project is fully responsive and compatible with all devices.

[Click to Preview...](https://pos-application-erdi.netlify.app/)

## Technologies Used

- **Frontend:**
  - React
  - TailwindCSS
  - Redux-Toolkit
  - Ant-Design

- **Backend:**
  - Express.js
  - MongoDB

## Features

- **Category Management:**
  - Create categories
  - Add, edit, and remove products within categories

- **Customer Management:**
  - Add customers

- **Invoice Management:**
  - Create invoices
  - Print invoices

- **Statistics Page:**
  - Track statistics of sold products and customers

- **User Management:**
  - Login and Register pages

## Installation

### Requirements

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
    ```sh
    git clone https://github.com/salginerdi/FullStack-MERN-_POS_Application.git
    cd project-name
    ```

2. **Install server and client dependencies:**
    ```sh
    # For the server
    cd server
    npm install

    # For the client
    cd ../client
    npm install
    ```

3. **Configure environment variables:**
    - Create `server/.env` file and add necessary environment variables.
    - Create `client/.env` file and add necessary environment variables.

4. **Start the database:**
    Start the MongoDB server locally or using a cloud service.

5. **Start the server and client:**
    ```sh
    # For the server
    cd server
    npm start

    # For the client
    cd ../client
    npm start
    ```

## Usage

1. **Categories and Products:**
    - Create new categories and add, edit, or remove products within these categories.

2. **Add Customers:**
    - Add new customers.

3. **Create Invoices:**
    - Select products to create invoices and print these invoices.

4. **Statistics Page:**
    - View statistics of sold products and customers.

5. **User Login:**
    - Register and log in.

