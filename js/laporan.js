// Mengambil riwayat transaksi
const data = JSON.parse(
    localStorage.getItem("riwayatBookStore")
) || [];

// Mengambil tabel laporan
const tabelLaporan = document.getElementById("tabelLaporan");

// Menampilkan seluruh transaksi
if (data.length > 0) {

    data.forEach(function(pesanan, index) {

        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${pesanan.nomorDO}</td>
            <td>${pesanan.pelanggan}</td>
            <td>Rp ${pesanan.total.toLocaleString("id-ID")}</td>
            <td>${pesanan.pembayaran}</td>
        `;

        tabelLaporan.appendChild(baris);

    });

} else {

    tabelLaporan.innerHTML = `
        <tr>
            <td colspan="5">Belum ada data pesanan.</td>
        </tr>
    `;

}