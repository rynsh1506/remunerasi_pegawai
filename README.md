

# Dokumentasi Aplikasi Pencatatan Tugas Pegawai

## Arsitektur Solusi

### Diagram Alur Data
- **Frontend (Next.js)** berfungsi untuk menampilkan antarmuka pengguna dan berkomunikasi dengan **Backend (Laravel)** melalui API untuk mengambil, menambah, mengupdate, dan menghapus data tugas.
- **Backend (Laravel)** menyediakan API yang mengelola data tugas, pegawai, dan perhitungan remunerasi berdasarkan input pegawai.
- **Database (MySQL)** digunakan untuk menyimpan data seperti tugas pegawai, data pegawai, dan tarif per jam pegawai.

Alur data:
1. Pengguna login menggunakan akun mereka di frontend (Next.js).
2. Frontend mengirimkan permintaan API ke backend (Laravel) untuk mengambil atau memanipulasi data tugas.
3. Backend melakukan operasi pada data yang tersimpan di database MySQL.
4. Hasilnya dikirimkan kembali ke frontend dan ditampilkan kepada pengguna.

### Penjelasan Desain

- **Mengapa menggunakan login?**  
  Login digunakan untuk membatasi akses data berdasarkan pengguna. Setiap pengguna hanya bisa mengakses dan memodifikasi tugas yang mereka miliki, sementara admin dapat mengakses seluruh data tugas. Hal ini penting untuk menjaga keamanan dan privasi data pengguna.
  
- **Perhitungan Remunerasi:**  
  Remunerasi dihitung berdasarkan jam yang dihabiskan pada setiap tugas dan tarif per jam pegawai. Jika ada biaya tambahan, maka biaya tersebut juga dihitung dalam remunerasi.
  
  Rumus perhitungan:
  ```
  Remunerasi = (Jam yang Dikerjakan * Tarif Per Jam) + Biaya Tambahan
  ```

  Hal ini memastikan bahwa setiap pegawai mendapatkan remunerasi yang sesuai dengan waktu yang mereka habiskan untuk suatu tugas dan biaya terkait lainnya.

### Setup & Deploy

#### Langkah-langkah Menjalankan Aplikasi Secara Lokal

1. **Clone Repository:**
   ```
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. **Instalasi Dependencies:**
   - Backend (Laravel):
     ```
     cd backend
     composer install
     ```
   - Frontend (Next.js):
     ```
     cd frontend
     npm install
     ```

3. **Konfigurasi Environment:**
   - **Backend:**  
     Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi database dan aplikasi sesuai kebutuhan.
     ```
     cp .env.example .env
     ```
   - **Frontend:**  
     Pastikan variabel environment di `frontend/.env` telah sesuai dengan backend dan pengaturan API.

4. **Migrate Database:**
   ```
   php artisan migrate
   ```

5. **Jalankan Aplikasi:**
   - **Backend (Laravel):**
     ```
     php artisan serve
     ```
   - **Frontend (Next.js):**
     ```
     npm run dev
     ```

Aplikasi dapat diakses di `http://localhost:3000`.

### Tantangan & Solusi

#### Tantangan:
1. **Pengelolaan Data Prorata:**  
   Menyusun sistem untuk menghitung remunerasi secara prorata ketika lebih dari satu pegawai mengerjakan tugas yang sama memerlukan perhitungan yang cermat.
   
   **Solusi:**  
   Penggunaan algoritma yang membagi remunerasi berdasarkan jam yang dikerjakan oleh setiap pegawai.

2. **Batasan Akses Data:**  
   Memastikan bahwa hanya admin yang dapat melihat dan mengedit data seluruh pegawai, sementara pegawai hanya dapat mengakses dan mengedit data tugas mereka sendiri.
   
   **Solusi:**  
   Implementasi login dan otorisasi di backend untuk membatasi akses ke data. Penggunaan token JWT untuk mengamankan sesi pengguna.

3. **Kompleksitas Perhitungan Remunerasi:**  
   Perhitungan yang melibatkan jam kerja, tarif per jam, dan biaya tambahan bisa menjadi rumit, terutama dengan data yang besar.
   
   **Solusi:**  
   Pemisahan logika perhitungan remunerasi dalam fungsi terpisah di backend untuk menjaga keterbacaan dan kejelasan kode.

---
