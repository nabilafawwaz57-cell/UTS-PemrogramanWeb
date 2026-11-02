// Mengambil elemen dari HTML
const namaBuku = document.getElementById("namaBuku");
const jumlahBuku = document.getElementById("jumlahBuku");
const tombolTambah = document.getElementById("tambahPesanan");
const daftarPesanan = document.getElementById("daftarPesanan");

// Menyimpan data pesanan
let dataPesanan = [];

// Fungsi menampilkan pesanan
function tampilkanPesanan() {

    daftarPesanan.innerHTML = "";

    dataPesanan.forEach(function(pesanan, index) {

        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${pesanan.nama}</td>
            <td>${pesanan.jumlah}</td>
            <td></td>
        `;

        // Membuat tombol Ubah
        const tombolUbah = document.createElement("button");

        tombolUbah.textContent = "Ubah";

        tombolUbah.addEventListener("click", function() {

            const namaBaru = prompt(
                "Masukkan nama buku baru:",
                pesanan.nama
            );

            if (namaBaru === null) return;

            const jumlahBaru = prompt(
                "Masukkan jumlah baru:",
                pesanan.jumlah
            );

            if (jumlahBaru === null) return;

            const jumlahAngka = Number(jumlahBaru);

            if (
                namaBaru.trim() === "" ||
                !Number.isInteger(jumlahAngka) ||
                jumlahAngka < 1
            ) {
                alert("Data pesanan tidak valid!");
                return;
            }

            dataPesanan[index].nama = namaBaru.trim();
            dataPesanan[index].jumlah = jumlahAngka;

            tampilkanPesanan();

            alert("Pesanan berhasil diubah!");

        });

        baris.children[3].appendChild(tombolUbah);

        // Membuat tombol Hapus
        const tombolHapus = document.createElement("button");

        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener("click", function() {

            const konfirmasi = confirm("Yakin ingin menghapus pesanan ini?");

            if (konfirmasi) {

                dataPesanan.splice(index, 1);

                tampilkanPesanan();

                alert("Pesanan berhasil dihapus!");

            }

        });

    baris.children[3].appendChild(tombolHapus);

        daftarPesanan.appendChild(baris);

    });

}

// Tombol Tambah Pesanan
tombolTambah.addEventListener("click", function() {

    const nama = namaBuku.value.trim();
    const jumlah = Number(jumlahBuku.value);

    if (
        nama === "" ||
        !Number.isInteger(jumlah) ||
        jumlah < 1
    ) {
        alert("Masukkan nama buku dan jumlah yang benar!");
        return;
    }

    dataPesanan.push({
        nama: nama,
        jumlah: jumlah
    });

    tampilkanPesanan();

    namaBuku.value = "";
    jumlahBuku.value = "";

    alert("Pesanan berhasil ditambahkan!");

});

// Menyimpan pesanan Checkout
const formCheckout = document.getElementById("formCheckout");

formCheckout.addEventListener("submit", function(event) {
    event.preventDefault();

    const namaPelanggan = document.getElementById("namaPelanggan").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const metode = document.getElementById("metodePembayaran").value;

    if (dataPesanan.length === 0) {
        alert("Silakan tambahkan buku terlebih dahulu!");
        return;
    }

    let total = 0;

    for (let pesanan of dataPesanan) {
        const buku = dataKatalogBuku.find(function(item) {
            return item.judul.toLowerCase() === pesanan.nama.toLowerCase();
        });

        if (!buku) {
            alert("Buku " + pesanan.nama + " tidak ditemukan di katalog!");
            return;
        }

        total += buku.harga * pesanan.jumlah;
    }

    const nomorDO = "DO" + Date.now();

    const pesananSelesai = {
        nomorDO: nomorDO,
        pelanggan: namaPelanggan,
        alamat: alamat,
        telepon: telepon,
        pembayaran: metode,
        daftarBuku: dataPesanan,
        total: total,
        status: "Pesanan Diproses",
        ekspedisi: "JNE",
        tanggal: new Date().toLocaleDateString("id-ID"),
        paket: "Reguler",
        progress: 20
    };

    // Mengambil riwayat transaksi sebelumnya
    const riwayat = JSON.parse(
        localStorage.getItem("riwayatBookStore")
    ) || [];

    // Menambahkan pesanan baru ke riwayat
    riwayat.push(pesananSelesai);

    // Menyimpan seluruh riwayat transaksi
    localStorage.setItem("riwayatBookStore", JSON.stringify(riwayat));

    // Menyimpan pesanan terakhir untuk Tracking
    localStorage.setItem("pesananBookStore", JSON.stringify(pesananSelesai));

    alert("Pesanan berhasil disimpan!\nNomor DO: " + nomorDO);
});