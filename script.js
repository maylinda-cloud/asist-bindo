let kataBaku = [];

// load data kata baku
fetch("kbbi.json")
  .then(res => res.json())
  .then(data => {
    kataBaku = data.kata_baku.map(k => k.toLowerCase());
  });

function cekTeks() {
  const input = document.getElementById("inputText").value.trim();
  const hasilDiv = document.getElementById("hasil");

  if (!input) {
    hasilDiv.innerHTML = "⚠️ Masukkan teks terlebih dahulu.";
    return;
  }

  const kataInput = input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  let hasilKata = [];
  let tidakBaku = [];

  kataInput.forEach(kata => {
    if (kataBaku.includes(kata)) {
      hasilKata.push(kata);
    } else {
      hasilKata.push(kata); // biarkan, tidak dipaksa salah
      tidakBaku.push(kata);
    }
  });

  const hasilTeks = hasilKata.join(" ");

  hasilDiv.innerHTML = `
    <div class="daftar-item">
      <strong>✨ Versi teks yang dapat digunakan:</strong>
      <textarea id="outputText" readonly>${hasilTeks}</textarea>
      <button onclick="salinHasil()">📋 Salin Teks</button>
    </div>

    <div class="daftar-item">
      <strong>ℹ️ Catatan:</strong><br>
      Beberapa kata mungkin tidak terdaftar dalam sistem.
      Sistem ini berfokus membantu, bukan menyalahkan.
    </div>
  `;
}

function salinHasil() {
  const text = document.getElementById("outputText");
  text.select();
  document.execCommand("copy");
  alert("✅ Teks berhasil disalin!");
}
