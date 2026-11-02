// Mengambil seluruh riwayat transaksi
const dataPengiriman = JSON.parse(
    localStorage.getItem("riwayatBookStore")
) || [];

// Mengambil pesanan terakhir
const pesananTerakhir = JSON.parse(
    localStorage.getItem("pesananBookStore")
);

// Memastikan pesanan terakhir tersedia
if (
    pesananTerakhir &&
    !dataPengiriman.some(function(data) {
        return data.nomorDO === pesananTerakhir.nomorDO;
    })
) {
    dataPengiriman.push(pesananTerakhir);
}

// Mengambil elemen HTML
const formTracking = document.getElementById("formTracking");
const hasilTracking = document.getElementById("hasilTracking");

// Proses pencarian
formTracking.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomor = document.getElementById("nomorDO").value.trim();

    const pesanan = dataPengiriman.find(function(data) {
        return data.nomorDO === nomor;
    });

    if (!pesanan) {
        alert("Nomor DO tidak ditemukan!");
        hasilTracking.style.display = "none";
        return;
    }

    // Menampilkan informasi pengiriman
    document.getElementById("namaPelanggan").textContent = pesanan.pelanggan;
    document.getElementById("statusPengiriman").textContent = pesanan.status;
    document.getElementById("ekspedisi").textContent = pesanan.ekspedisi;
    document.getElementById("tanggalPengiriman").textContent = pesanan.tanggal;
    document.getElementById("jenisPaket").textContent = pesanan.paket;

    document.getElementById("totalPembayaran").textContent =
        "Rp " + pesanan.total.toLocaleString("id-ID");

    // Menampilkan progress pengiriman
    document.getElementById("progressPengiriman").innerHTML = `
        <div style="background-color: #eee; width: 100%; height: 20px; border-radius: 10px;">
            <div style="
                background-color: #e889b1;
                width: ${pesanan.progress}%;
                height: 20px;
                border-radius: 10px;
            "></div>
        </div>
        <p>${pesanan.progress}%</p>
    `;

    hasilTracking.style.display = "block";
});