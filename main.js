const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btn-search");
const wordH1 = document.getElementById("word");
const phoneticSpan = document.getElementById("phonetic");
const firstUl = document.querySelector(".first-ul");
const secondUl = document.querySelector("#second-ul");
const synonymsSpan = document.getElementById("synonyms");
const paraWhite = document.getElementById("para-white");

btnSearch.addEventListener("click", async () => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputSearch.value}`
  );
  const data = await res.json();

  console.log(data);
  wordH1.textContent = data[0].word;
  const phonetics = data[0].phonetics;
  synonymsSpan.textContent = data[0].meanings[0].synonyms;
  paraWhite.textContent = data[0].sourceUrls[0];
  paraWhite.setAttribute("href", data[0].sourceUrls[0])
  const firstPhonetic = phonetics.find((p) => p.text);
  phoneticSpan.textContent = firstPhonetic.text;
  const def = data[0].meanings[0]?.definitions || [];
  const defs = data[0].meanings[2]?.definitions || [];
  const defenition = data[0].meanings[1]?.definitions || [];
  firstUl.innerHTML = "";
  secondUl.innerHTML = "";
  for (let i = 0; i < def.length; i++) {
    const li = document.createElement("li");
    li.textContent = def[i].definition;
    firstUl.appendChild(li);
  }

  for (let i = 0; i < defs.length; i++) {
    const li = document.createElement("li");
    li.textContent = defs[i].definition;
    firstUl.appendChild(li);
  }

  for (let i = 0; i < defenition.length; i++) {
    const li = document.createElement("li");
    const paraExemple = document.createElement("p")
    paraExemple.classList.add("exemple")
    paraExemple.textContent = defenition[i].example;
    li.textContent = defenition[i].definition;
    secondUl.appendChild(li);
    secondUl.appendChild(paraExemple);
  }
});
