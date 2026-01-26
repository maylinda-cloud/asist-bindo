let dataBahasa = {};

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataBahasa = data;
  })
  .catch(err => {
    console.error("Gagal memuat data bahasa:", err);
  });

function cekTeks() {
  const input = document.getElementById("inputText").value;
  const hasilDiv = document.getElementById("hasil");
  const daftarDiv = document.getElementById("daftar");

  hasilDiv.innerHTML = "";
  daftarDiv.innerHTML = "";

  if (!input.trim()) {
    hasilDiv.innerHTML = "⚠️ Silakan masukkan teks terlebih dahulu.";
    return;
  }

  const kataInput = input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  let temuan = [];

  for (const [formal, informalList] of Object.entries(dataBahasa)) {
    informalList.forEach(informal => {
      if (kataInput.includes(informal)) {
        temuan.push({
          informal,
          formal
        });
      }
    });
  }

  if (temuan.length === 0) {
    hasilDiv.innerHTML = "✅ Teks sudah sesuai dengan ragam bahasa formal.";
    return;
  }

  hasilDiv.innerHTML = "❌ Teks belum sepenuhnya sesuai ragam bahasa formal.";

  temuan.forEach(item => {
    const div = document.createElement("div");
    div.className = "daftar-item";
    div.innerHTML = `
      <strong>${item.informal}</strong> → ${item.formal}
    `;
    daftarDiv.appendChild(div);
  });
}
