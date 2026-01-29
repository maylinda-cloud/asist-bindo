let kataBaku = [];

// autocorrect sederhana (opsional)
const autoCorrect = {
  "aku": "saya",
  "ga": "tidak",
  "gak": "tidak",
  "nggak": "tidak",
  "gpp": "tidak apa-apa",
  "makasih": "terima kasih",
  "mksh": "terima kasih",
  "yg": "yang"
};

// load kbbi.json
fetch("kbbi.json")
  .then(res => res.json())
  .then(data => {
    kataBaku = data.kata_baku;
  });

function proses() {
  const input = document.getElementById("input").value.toLowerCase();
  const words = input.match(/\b[\w-]+\b/g) || [];

  let hasil = [];

  words.forEach(word => {
    if (kataBaku.includes(word)) {
      hasil.push(word);
    } else if (autoCorrect[word]) {
      hasil.push(autoCorrect[word]);
    } else {
      hasil.push(`[${word}]`);
    }
  });

  document.getElementById("output").value = hasil.join(" ");
}

function salin() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
}
