// Mengambil riwayat transaksi
const data = JSON.parse(
    localStorage.getItem("riwayatBookStore")
) || [];

// Mengambil pesanan terakhir
const pesananTerakhir = JSON.parse(
    localStorage.getItem("pesananBookStore")
);

// Memastikan pesanan terakhir ikut ditampilkan
if (
    pesananTerakhir &&
    !data.some(function(pesanan) {
        return pesanan.nomorDO === pesananTerakhir.nomorDO;
    })
) {
    data.push(pesananTerakhir);
}

// Mengambil tabel history
const tabelHistory = document.getElementById("tabelHistory");

// Menampilkan seluruh transaksi
if (data.length > 0) {

    data.forEach(function(pesanan, index) {

        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${pesanan.nomorDO}</td>
            <td>${pesanan.pelanggan}</td>
            <td>Rp ${pesanan.total.toLocaleString("id-ID")}</td>
            <td>${pesanan.status}</td>
        `;

        tabelHistory.appendChild(baris);

    });

} else {

    tabelHistory.innerHTML = `
        <tr>
            <td colspan="5">Belum ada riwayat transaksi.</td>
        </tr>
    `;

}