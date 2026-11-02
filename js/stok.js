const tabelBuku = document.getElementById("tabelBuku");

function tampilkanBuku() {

    tabelBuku.innerHTML = "";

    dataKatalogBuku.forEach(function(buku, index) {

        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${buku.judul}</td>
            <td>${buku.penulis}</td>
            <td>Rp ${buku.harga.toLocaleString("id-ID")}</td>
            <td>${buku.stok}</td>
        `;

        tabelBuku.appendChild(baris);

    });
}

tampilkanBuku();

const formBuku = document.getElementById("formBuku");

formBuku.addEventListener("submit", function(event) {

    event.preventDefault();

    const judul = document.getElementById("judulBuku").value.trim();
    const penulis = document.getElementById("penulisBuku").value.trim();
    const harga = Number(document.getElementById("hargaBuku").value);
    const stok = Number(document.getElementById("stokBuku").value);

    dataKatalogBuku.push({
        judul: judul,
        penulis: penulis,
        harga: harga,
        stok: stok
    });

    tampilkanBuku();

    formBuku.reset();

    alert("Buku berhasil ditambahkan!");

});