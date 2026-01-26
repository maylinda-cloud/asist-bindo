let dataBaku = [];

// load data kata baku
fetch("kbbi.json")
  .then(res => res.json())
  .then(data => {
    dataBaku = data.kata_baku;
  })
  .catch(err => {
    console.error("Gagal memuat data kata baku:", err);
  });

function normalisasiKata(kata) {
  return kata
    .toLowerCase()
    .replace(/[^a-z\-]/g, "")
    .replace(/^(di|ke|se|ber|me|mem|men|meng|meny|pe|per)/, "")
    .replace(/(kan|an|nya|lah|kah|pun)$/,"");
}

function cekTeks() {
  const input = document.getElementById("inputText").value;
  const hasilDiv = document.getElementById("hasil");
  const daftarDiv = document.getElementById("daftar");

  hasilDiv.innerHTML = "";
  daftarDiv.innerHTML = "";

  if (!input.trim()) {
    hasilDiv.innerHTML = "⚠️ Masukkan teks terlebih dahulu.";
    return;
  }

  const kataAsli = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/);

  let salah = [];

  kataAsli.forEach(kata => {
    const dasar = normalisasiKata(kata);

    if (dasar && !dataBaku.includes(dasar)) {
      salah.push({
        asli: kata,
        dasar: dasar
      });
    }
  });

  if (salah.length === 0) {
    hasilDiv.innerHTML = "✅ Teks sudah sesuai kosakata baku Bahasa Indonesia.";
    return;
  }

  hasilDiv.innerHTML = `❌ Ditemukan ${salah.length} kata yang tidak sesuai kosakata baku:`;

  salah.forEach(item => {
    const div = document.createElement("div");
    div.className = "daftar-item";
    div.innerHTML = `
      <strong>${item.asli}</strong>
      <br>
      Bentuk dasar terbaca: <em>${item.dasar}</em>
    `;
    daftarDiv.appendChild(div);
  });
}
