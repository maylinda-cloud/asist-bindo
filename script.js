let kataBaku = [];

// load data kata baku
fetch("kbbi.json")
  .then(res => res.json())
  .then(data => {
    kataBaku = data.kata_baku.map(k => k.toLowerCase());
  })
  .catch(err => {
    console.error("Gagal memuat data:", err);
  });

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

  const kataInput = input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const imbuhanRegex = /^(di|ke|se|me|be|pe|ter|ber|mem|men|meng|meny|per|peng|pen|pem).+|.+(kan|an|i)$/;

  let benar = [];
  let imbuhan = [];
  let tidakDiketahui = [];

  kataInput.forEach(kata => {
    if (kataBaku.includes(kata)) {
      benar.push(kata);
    } else if (imbuhanRegex.test(kata)) {
      imbuhan.push(kata);
    } else {
      tidakDiketahui.push(kata);
    }
  });

  // hasil ringkas
  hasilDiv.innerHTML = `
    ✅ Kata baku terdeteksi: ${benar.length}<br>
    ⚠️ Kata berimbuhan: ${imbuhan.length}<br>
    ❌ Kata tidak terdaftar: ${tidakDiketahui.length}
  `;

  // detail
  imbuhan.forEach(kata => {
    const div = document.createElement("div");
    div.className = "daftar-item";
    div.innerHTML = `
      ⚠️ <strong>${kata}</strong><br>
      Kata ini mengandung imbuhan. Sistem saat ini hanya memeriksa kata dasar,
      sehingga kebenaran kata ini <b>belum dapat ditentukan</b>.
    `;
    daftarDiv.appendChild(div);
  });

  tidakDiketahui.forEach(kata => {
    const div = document.createElement("div");
    div.className = "daftar-item";
    div.innerHTML = `
      ❌ <strong>${kata}</strong><br>
      Kata ini tidak ditemukan dalam daftar kata baku.
    `;
    daftarDiv.appendChild(div);
  });
}
