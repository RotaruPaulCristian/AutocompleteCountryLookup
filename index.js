const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// Search countries.json and filter it
const searchCountry = async (searchText) => {
  const res = await fetch("../data/countries.json");
  const countries = await res.json();

  //   Get matches to current text input
  let matches = countries.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.code2.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHTML(matches);
};

// Show results in HTML
const outputHTML = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.code2}) <span class="text-primary">Capital: ${match.capital}, Region: ${match.region}, Subregion: ${match.subregion}</span></h4>
        </div>
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchCountry(search.value));
