document.addEventListener("DOMContentLoaded", () => {
  const filtroNome = document.getElementById("filtroNome");
  const filtroPrecoMin = document.getElementById("filtroPrecoMin");
  const filtroPrecoMax = document.getElementById("filtroPrecoMax");
  const filtroSubcategoria = document.getElementById("filtroSubcategoria");
  const filtroPlataforma = document.getElementById("filtroPlataforma");
  const botoesDepartamento = document.querySelectorAll(".filtros button");
  const subcategoriasPorDepartamento = {

    "Beleza e Cuidados": ["Cabelos", "Pele", "Maquiagem", "Unhas", "Barba e Depilação", "Perfumes"],
    "Fitness": ["Roupas Fitness","Calçados Esportivos","Acessórios de Treino","Equipamentos Fitness","Suplementos Alimentares","Outros Esportes"],
    "Casa e Decoração": ["Organização e Armazenamento","Iluminação","Cozinha e Utensílios","Limpeza e Utilidades","Decoração"],
    "Pet": ["Rações","Acessórios Pet","Brinquedos Pet","Higiene e Cuidados","Saúde Animal"],
    "Tecnologia": ["Celulares e Smartphones","Fones e Áudio","Acessórios para Celular","Notebooks e Informática","Periféricos","Acessórios Gamer","Televisão"],
    "Moda e Acessórios": ["Roupas Femininas","Roupas Masculinas","Calçados","Bolsas e Mochilas","Óculos e Acessórios"]

  };

  let departamentoSelecionado = "";

  // Evento de clique nos botões de departamento
  botoesDepartamento.forEach(botao => {
    botao.addEventListener("click", () => {
      const depto = botao.getAttribute("data-departamento");

      // Alternar classe ativo
      botoesDepartamento.forEach(b => b.classList.remove("ativo"));
      if (departamentoSelecionado === depto) {
        departamentoSelecionado = "";
      } else {
        departamentoSelecionado = depto;
        botao.classList.add("ativo");
      }

      atualizarSubcategorias(departamentoSelecionado);
      aplicarFiltros();
      atualizarSubcategorias(departamentoSelecionado);
    });
  });

  function aplicarFiltros() {
    const nomeBusca = filtroNome?.value?.toLowerCase() || "";
    const precoMin = parseFloat(filtroPrecoMin?.value) || 0;
    const precoMax = parseFloat(filtroPrecoMax?.value) || Infinity;
    const subcategoriaSelecionada = filtroSubcategoria?.value || "";
    const plataformaSelecionada = filtroPlataforma?.value || "";

    const cards = document.querySelectorAll(".produto-card");

    cards.forEach(card => {
      const tituloEl = card.querySelector("h3") || card.querySelector(".card-title");
      const precoEl = card.querySelector("p") || card.querySelector(".card-text");

      const titulo = tituloEl?.innerText?.toLowerCase() || "";
      const precoTexto = precoEl?.innerText.replace("R$", "").trim() || "0";
      const preco = parseFloat(precoTexto.replace(",", ".")) || 0;
      const subcat = card.getAttribute("data-subcategoria");
      const plataforma = card.getAttribute("data-plataforma");
      const cardDepartamento = card.getAttribute("data-departamento");

      const condicaoNome = titulo.includes(nomeBusca);
      const condicaoPreco = preco >= precoMin && preco <= precoMax;
      const condicaoSubcategoria = subcategoriaSelecionada === "" || subcat === subcategoriaSelecionada;
      const condicaoPlataforma = plataformaSelecionada === "" || plataforma === plataformaSelecionada;
      const condicaoDepartamento = departamentoSelecionado === "" || cardDepartamento === departamentoSelecionado;

      if (
        condicaoNome &&
        condicaoPreco &&
        condicaoSubcategoria &&
        condicaoPlataforma &&
        condicaoDepartamento
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function atualizarSubcategorias(departamento) {
    const selectSubcategoria = document.getElementById("filtroSubcategoria");
    selectSubcategoria.innerHTML = "";

    const optionDefault = document.createElement("option");
    optionDefault.value = "";
    optionDefault.textContent = "Todas as subcategorias";
    selectSubcategoria.appendChild(optionDefault);

    // Coleta os cards visíveis no DOM
    const cards = document.querySelectorAll(".produto-card");

    const subcategoriasDisponiveis = new Set();

    cards.forEach(card => {
      const cardDepartamento = card.getAttribute("data-departamento");
      const subcat = card.getAttribute("data-subcategoria");

      // Se não há departamento selecionado, coleta tudo
      if (!departamento || departamento === "" || cardDepartamento === departamento) {
        if (subcat) subcategoriasDisponiveis.add(subcat);
      }
    });

    // Preenche apenas as subcategorias que realmente têm produtos
    [...subcategoriasDisponiveis].sort().forEach(subcat => {
      const option = document.createElement("option");
      option.value = subcat;
      option.textContent = subcat;
      selectSubcategoria.appendChild(option);
    });
  }



  // Eventos de input dos filtros tradicionais
  filtroNome?.addEventListener("input", aplicarFiltros);
  filtroPrecoMin?.addEventListener("input", aplicarFiltros);
  filtroPrecoMax?.addEventListener("input", aplicarFiltros);
  filtroSubcategoria?.addEventListener("change", aplicarFiltros);
  filtroPlataforma?.addEventListener("change", aplicarFiltros);
});
