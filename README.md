# Contoh Tugas Mini Project TSC Backend KSM Android

Tugas ini mencakup berbagai konsep JavaScript, termasuk  Template Literal, Array Methods , Array & object, Perulangan, Percabangan, Function, dan Asyncronous Process. Kami akan membuat aplikasi CRUD sederhana untuk mengelola data buku.

## Deskripsi Tugas

Anda membuat web server native sederhana yang memungkinkan Anda untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data dummy yang ada. Anda akan menggunakan Node.js untuk membuat server API, dan data akan disimpan dalam file terpisah.

## Contoh Endpoint dan Response

### Endpoints

1. **Tambahkan User**:
   - Endpoint: `POST /user`
   - Deskripsi: Menambahkan user baru ke dalam database.
   - Contoh Permintaan (request):
     ```json
    {
    "name":"salsabila",
    "age":20,
    "email":"salsabila@gmail.com"
    }
     ```

2. **Dapatkan Daftar Seluruh User**:
   - Endpoint: `GET /users`
   - Deskripsi: Mendapatkan daftar semua user yang ada dalam database (file data.js).

3. **Edit User**:
   - Endpoint: `PUT /user/:nama`
   - Deskripsi: Mengedit user berdasarkan nama di database.
   - Contoh Permintaan:
     ```json
     {
    "nama":"irpan syahbana"
     }
     ```

4. **Hapus User**:
   - Endpoint: `DELETE /user/:nama`
   - Deskripsi: Menghapus buku berdasarkan nama dari database.
