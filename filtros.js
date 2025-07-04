document.addEventListener("DOMContentLoaded", () => {
  const filtroNome = document.getElementById("filtroNome");
  const filtroPrecoMin = document.getElementById("filtroPrecoMin");
  const filtroPrecoMax = document.getElementById("filtroPrecoMax");
  const filtroSubcategoria = document.getElementById("filtroSubcategoria");

  const cards = document.querySelectorAll(".produto-card");

  function aplicarFiltros() {
    const nomeBusca = filtroNome.value.toLowerCase();
    const precoMin = parseFloat(filtroPrecoMin.value) || 0;
    const precoMax = parseFloat(filtroPrecoMax.value) || Infinity;
    const subcategoriaSelecionada = filtroSubcategoria.value;

    cards.forEach(card => {
      const titulo = card.querySelector(".card-title").innerText.toLowerCase();
      const precoTexto = card.querySelector(".card-text").innerText.replace("R$", "").trim();
      const preco = parseFloat(precoTexto.replace(",", "."));
      const subcat = card.getAttribute("data-subcategoria");

      const condicaoNome = titulo.includes(nomeBusca);
      const condicaoPreco = preco >= precoMin && preco <= precoMax;
      const condicaoSubcategoria = subcategoriaSelecionada === "" || subcat === subcategoriaSelecionada;

      if (condicaoNome && condicaoPreco && condicaoSubcategoria) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  }

  filtroNome.addEventListener("input", aplicarFiltros);
  filtroPrecoMin.addEventListener("input", aplicarFiltros);
  filtroPrecoMax.addEventListener("input", aplicarFiltros);
  filtroSubcategoria.addEventListener("change", aplicarFiltros);
});
