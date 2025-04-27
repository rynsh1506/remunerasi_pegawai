

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
  Login digunakan untuk membatasi akses data berdasarkan pengguna. Setiap pengguna hanya bisa mengakses dan memodifikasi tugas yang mereka miliki. Hal ini penting untuk menjaga keamanan dan privasi data pengguna.
  
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
   git clone https://github.com/rynsh1506/remunerasi_pegawai.git
   cd remunerasi_pegawai.git
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


4. **Setup Database:**

   Pastikan Anda telah menginstall `Docker` dan berada di root direktori proyek, tempat file `docker-compose.yml` berada. Kemudian jalankan perintah berikut untuk memulai semua layanan yang terdefinisi di dalam file `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```
   Perintah ini akan menjalankan kontainer PostgresSQL di background. Anda dapat memverifikasi apakah kontainer berjalan dengan perintah:

   ```bash
   docker-compose ps
   ```
   Ini akan menampilkan daftar kontainer yang sedang berjalan.
  
5. **Migrate Database:**
   ```
   php artisan migrate
   ```

6. **Jalankan Aplikasi:**
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
   Memastikan bahwa pegawai hanya dapat mengakses dan mengedit data tugas mereka sendiri.
   
   **Solusi:**  
   Implementasi login dan otorisasi di backend untuk membatasi akses ke data. Penggunaan token JWT untuk mengamankan sesi pengguna.

3. **Tampilan yang Menarik dan Intuitif:**
   Menciptakan tampilan antarmuka yang memudahkan pengguna untuk berinteraksi dengan aplikasi. Desain yang intuitif akan membuat pengalaman pengguna lebih lancar dan menyenangkan, sehingga meningkatkan produktivitas.
   
   **Solusi:**
    Menggunakan DaisyUI untuk menyediakan komponen UI yang konsisten dan responsif, memungkinkan aplikasi untuk tampil baik di berbagai perangkat.
    
    Menyediakan modals interaktif untuk menambah, mengedit, dan mengonfirmasi tindakan (seperti hapus tugas), menggunakan animasi Framer Motion untuk membuat transisi yang halus dan menarik.
    
    Mengimplementasikan paginasi pada tabel tugas untuk memastikan pengguna dapat dengan mudah menavigasi data tugas yang banyak.
    
    Menyediakan statistik visual untuk membantu pegawai melihat detail remunerasi yang telah dihitung.
