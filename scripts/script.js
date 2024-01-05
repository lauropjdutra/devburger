// MAPEAMENTO
const mainButton = document.querySelector(".main-button");
const productButton = document.querySelector("#product-button");
const discountButton = document.querySelector("#discount-button");
const categoryButton = document.querySelector("#category-button");
const cartButton = document.querySelector("#cart-button");
const container1 = document.querySelector(".hero-container");
const container2 = document.querySelector(".products-container");
const discountInfo = document.querySelector(".discount-text");
const title = document.querySelector(".page-title");
const filter = document.querySelector(".filter");
const select = document.querySelector("#categories");
const grid = document.querySelector(".products-grid");
const screen1 = window.matchMedia("(max-width: 600px)");
const screen2 = window.matchMedia("(max-width: 1200px)");

// FORMATAÇÃO DOS PREÇOS
const formatPrice = (value) =>
  value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

// EXIBIÇÃO DOS PRODUTOS
const showProducts = (productArray) => {
  let item = "";
  container1.style.display = "none";
  container2.style.display = "flex";
  container2.style.flexDirection = "column";
  productArray.forEach((product) => {
    item += `
  <li>
    <img src="${product.src}" alt="Hamburguer">
    <h3>${product.name}</h3>
    <p>${formatPrice(product.price)}</p>
  </li>
`;
    grid.style.display = "grid";
    grid.innerHTML = item;
    grid.style.gap = "5px"
    title.innerHTML = "Produtos";
    title.style.fontWeight = "700";
    discountInfo.style.display = "none";
    filter.style.display = "none";
    responsiveProducts(screen1, screen2);
  });
};

// CÁLCULO DO DESCONTO
const menuWithDiscount = menuOptions.map((product) => ({
  ...product,
  price: product.price * 0.9,
}));

// APLICAÇÃO DO DESCONTO
const applyDiscount = () => {
  showProducts(menuWithDiscount);
  title.innerHTML = "Ofertas";
  discountInfo.innerHTML = "Cupom de 10% de desconto aplicado!";
  discountInfo.style.display = "block";
  discountInfo.style.color = "#de010a";
  discountInfo.style.fontWeight = "700";
  discountInfo.style.fontSize = "18px";
};

// FILTRO DOS PRODUTOS
const showCategories = () => {
  switch (select.value) {
    case "dev":
      const menuDev = menuOptions.filter(
        (product) => product.category === "dev"
      );
      showProducts(menuDev);
      break;
    case "simple":
      const menuSimple = menuOptions.filter(
        (product) => product.category === "simple"
      );
      showProducts(menuSimple);
      break;
    case "vegan":
      const menuVegan = menuOptions.filter((product) => product.vegan);
      showProducts(menuVegan);
      break;
  }
  title.innerHTML = "Categorias";
  filter.style.display = "block";
};

// TOTAL DO CARRINHO
const addCart = () => {
  applyDiscount();
  const totalPrice = menuOptions.reduce((acc, curr) => acc + curr.price, 0);
  const priceWithDiscount = menuWithDiscount.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  filter.style.display = "none";
  title.innerHTML = `Total: <b style="font-weight: 800">${formatPrice(
    priceWithDiscount
  )}</b>`;
  title.style.fontWeight = "600";
  discountInfo.style.display = "block";
  discountInfo.style.color = "#222222";
  discountInfo.innerHTML = `A soma total dos itens é ${formatPrice(
    totalPrice
  )}, porém você obteve o desconto de ${formatPrice(
    totalPrice - priceWithDiscount
  )} e paga apenas ${formatPrice(priceWithDiscount)}`;
  responsiveCart(screen1, screen2);
};

// RESPONSIVO DOS PRODUTOS
const responsiveProducts = (size1, size2) => {
  if (size1.matches) {
    grid.style.gridTemplateColumns = "150px 150px";
  } else if (size2.matches) {
    grid.style.gridTemplateColumns = "150px 150px 150px";
  } else {
    grid.style.gridTemplateColumns = "200px 200px 200px 200px 200px";
  }
};

// RESPONSIVO DO CARRINHO
const responsiveCart = (size1, size2) => {
  if (size1.matches) {
     discountInfo.style.width = "340px";
  } else if (size2.matches) {
     discountInfo.style.width = "350px";
  } else {
     discountInfo.style.width = "350px";
    grid.style.gridTemplateColumns = "150px 150px 150px 150px 150px";
    container2.style.flexDirection = "row";
  }
};

// EVENTOS
mainButton.addEventListener("click", applyDiscount);
productButton.addEventListener("click", () => showProducts(menuOptions));
discountButton.addEventListener("click", applyDiscount);
categoryButton.addEventListener("click", showCategories);
select.addEventListener("change", showCategories);
cartButton.addEventListener("click", addCart);