// MAPEAMENTO
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const mainButton = document.querySelector(".main-button");
const homeButton = document.querySelector("#home-button");
const productButton = document.querySelector("#product-button");
const couponsButton = document.querySelector("#coupons-button");
const cartButton = document.querySelector("#cart-button");
const container1 = document.querySelector(".main-container");
const container2 = document.querySelector(".products-container");
const container3 = document.querySelector(".cart-container");
const container4 = document.querySelector(".coupons-container");
const videoBackground = document.querySelector("video");
const gradientMask = document.querySelector(".dark-mask");
const categories = document.querySelector(".categories");
const grid = document.querySelector(".products-grid");
const categoryButton = document.querySelectorAll(".category-button");
const buttons = document.getElementsByClassName("add-to-cart-btn");
const quantityInputs = document.getElementsByClassName("quantity");

// FORMATA OS PREÇOS EM REAL
const formatPrice = (value) =>
  value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

// CHAMA A ANIMAÇÃO AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  animation();
  scrollToTop();
});
const elementosAnimados = document.querySelectorAll(".animated");

// FAZ A ANIMAÇÃO AO CARREGAR A PÁGINA
const animation = () => {
  setTimeout(() => {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("show-animation");
    });
  }, 10);
};

// ANIMA APENAS OS ELEMENTOS PRINCIPAIS
const mainAnimation = () => {
  elementosAnimados.forEach((elemento) => {
    elemento.classList.remove("animated");
    elemento.classList.remove("show-animation");
  });
  const elementosMain = document.querySelectorAll(".text-animated");
  elementosMain.forEach((elemento) => {
    elemento.classList.add("animated");
  });
  setTimeout(() => {
    elementosMain.forEach((elemento) => {
      elemento.classList.add("show-animation");
    });
  }, 100);
};

// MOSTRA A PÁGINA HOME
const showHomePage = () => {
  header.style.background = "transparent";
  header.style.boxShadow = "none";
  header.style.position = "static";
  gradientMask.style.display = "block";
  videoBackground.style.display = "block";
  container1.style.display = "block";
  container2.style.display = "none";
  container3.style.display = "none";
  container4.style.display = "none";
};

// OCULTA O VÍDEO DE FUNDO
const hideVideo = () => {
  videoBackground.style.display = "none";
  gradientMask.style.display = "none";
  header.style.background = "#111111";
  header.style.position = "sticky";
};

// EXIBE O CARDÁPIO DOS PRODUTOS
const showProducts = (productArray) => {
  let item = "";
  container1.style.display = "none";
  container2.style.display = "flex";
  container3.style.display = "none";
  container4.style.display = "none";
  productArray.map((product) => {
    item += `
  <li>
    <div class="li-box">
      <img src="${product.img}" alt="${product.name}" title="${product.name}">
      <h3 title="${product.name}">${product.name}</h3>
      <p title="${formatPrice(product.price)}">${formatPrice(product.price)}</p>
      <div class="purchase-box">
      <div class="qtd">
          <button id="decrement" title="Diminuir Quantidade">-</button>
          <input type="number" value="1">
          <button id="increment" title="Aumentar Quantidade">+</button>
      </div>
        <button class="add-to-cart-btn" key="${
          product.id
        }" title="Adicionar ao Carrinho">Adicionar</button>
      </div>
    </div>
  </li>
`;
    grid.style.display = "grid";
    grid.innerHTML = item;
    grid.style.gap = "2.75vw";
    responsiveProducts(screen1, screen2);
  });
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addToCart);
  }
  hideVideo();
  increaseOrDecrease();
};

// ADICIONA OUVINTES NOS BOTÕES DA HOME
const learnMore = () => {
  const learnMoreButtons = document.getElementsByClassName("learn-more");
  for (const button of learnMoreButtons) {
    button.addEventListener("click", () => {
      showProducts(menuOptions);
      scrollToTop();
      toggleCategory(document.querySelector("#all"));
    });
  }
};
learnMore();

// FILTRA OS PRODUTOS NO CARDÁPIO
categoryButton.forEach((button) => {
  button.addEventListener("click", function () {
    toggleCategory(button);
    switch (button.id) {
      case "all":
        showProducts(menuOptions);
        break;
      case "devs":
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
      case "frie":
        const frieOptions = menuOptions.filter(
          (product) => product.category === "frie"
        );
        showProducts(frieOptions);
        break;
      case "dessert":
        const dessertOptions = menuOptions.filter(
          (product) => product.category === "dessert"
        );
        showProducts(dessertOptions);
        break;
      case "combo":
        const comboOptions = menuOptions.filter(
          (product) => product.category === "combo"
        );
        showProducts(comboOptions);
        break;
    }
  });
});

// EXIBE E ATIVA OS CUPONS
const showCoupons = () => {
  hideVideo();
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "none";
  container4.style.display = "flex";
  const activateButtons = document.getElementsByClassName("activate-discount");
  for (const button of activateButtons) {
    button.addEventListener("click", () => {
      showAlert("Cupom ativado com sucesso!");
    });
  }
};

// MOSTRA A MENSAGEM NO ALERT
const customAlert = document.getElementById("custom-alert");
const alertMessage = document.getElementById("alert-message");
const closeButton = document.querySelector(".close-alert");
const goToButton = document.querySelector(".alert-button");
function showAlert(message) {
  alertMessage.innerHTML = message;
  customAlert.style.display = "flex";
  closeButton.onclick = function () {
    customAlert.style.display = "none";
  };
  goToButton.onclick = function () {
    customAlert.style.display = "none";
    showProducts(menuOptions);
    toggleCategory(document.querySelector("#all"));
  };
  window.onclick = function (event) {
    if (event.target == customAlert) {
      customAlert.style.display = "none";
    }
  };
}

// ATUALIZA OS OUVINTES DOS BOTÕES DE QUANTIDADE
const changeQuantity = () => {
  for (let i = 0; i < quantityInputs.length; i++) {
    const incrementButton =
      quantityInputs[i].parentElement.getElementsByClassName(
        "increment-button"
      )[0];
    const decrementButton =
      quantityInputs[i].parentElement.getElementsByClassName(
        "decrement-button"
      )[0];
    incrementButton.removeEventListener("click", increaseQuantity);
    incrementButton.addEventListener("click", increaseQuantity);
    decrementButton.removeEventListener("click", decreaseQuantity);
    decrementButton.addEventListener("click", decreaseQuantity);
  }
};

// AUMENTA A QUANTIDADE NO CARRINHO
const increaseQuantity = (event) => {
  const button = event.target;
  const input = button.parentElement.getElementsByClassName("quantity")[0];
  const productRow = input.closest(".cart-product");
  const productName = productRow.querySelector(".cart-item-name").innerText;
  const index = cartItems.findIndex((item) => item.name === productName);
  cartItems[index].quantity++;
  input.value = cartItems[index].quantity;
  updateTotal();
};

// DIMINUI A QUANTIDADE NO CARRINHO
const decreaseQuantity = (event) => {
  const button = event.target;
  const input = button.parentElement.getElementsByClassName("quantity")[0];
  if (input.value <= 1) {
    removeProduct(event);
  } else {
    const productRow = input.closest(".cart-product");
    const productName = productRow.querySelector(".cart-item-name").innerText;
    const index = cartItems.findIndex((item) => item.name === productName);
    cartItems[index].quantity--;
    input.value = cartItems[index].quantity;
    updateTotal();
  }
};

// PEGA O CLICK PARA REMOVER DO CARRINHO
const removeFromCart = () => {
  const removeButtons = document.getElementsByClassName("remove-button");
  for (const button of removeButtons) {
    button.removeEventListener("click", removeProduct);
  }
  for (const button of removeButtons) {
    button.addEventListener("click", removeProduct);
  }
};

// REMOVE O PRODUTO DO CARRINHO
const removeProduct = (event) => {
  const productRow = event.target.closest(".cart-product");
  if (productRow) {
    const productName = productRow.querySelector(".cart-item-name").innerText;
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name === productName
    );
    if (existingItemIndex !== -1) {
      cartItems.splice(existingItemIndex, 1);
      updateCartTable();
      updateTotal();
      changeQuantity();
      removeFromCart();
    }
  }
};

// ALTERA A QUANTIDADE ANTES DE ADICIONAR O PRODUTO
const increaseOrDecrease = () => {
  const productQuantity = document.querySelectorAll("input");
  for (const input of productQuantity) {
    const decrementButton = input.parentElement.querySelector("#decrement");
    const incrementButton = input.parentElement.querySelector("#increment");
    decrementButton.addEventListener("click", () =>
      input.value > 1 ? input.value-- : input.value
    );
    incrementButton.addEventListener("click", () => input.value++);
  }
};

// ADICIONA O PRODUTO AO CARRINHO
const cartItems = [];
const addToCart = (event) => {
  const button = event.target;
  let key = button.getAttribute("key");
  const productName = button
    .closest(".li-box")
    .querySelectorAll("h3")[0].innerText;
  const productQuantity = button.parentElement.querySelector("input");
  const existingItem = cartItems.find((item) => item.name === productName);
  if (existingItem) {
    existingItem.quantity =
      parseInt(existingItem.quantity) + parseInt(productQuantity.value);
  } else {
    const newItem = {
      name: productName,
      price: menuOptions[key].price,
      quantity: productQuantity.value,
      img: menuOptions[key].img,
    };
    cartItems.push(newItem);
  }
  updateCartTable();
  changeQuantity();
  removeFromCart();
  updateTotal();
};

// ATUALIZA A TABELA DO CARRINHO
const updateCartTable = () => {
  const cart = document.querySelector(".cart-display tbody");
  cart.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItem = `
      <tr class="cart-product">
        <td>
          <div class="name-box">
            <img src=${item.img} alt="${item.name}" title="${item.name}" />
            <strong class="cart-item-name" title="${item.name}">${item.name}</strong>
          </div>
        </td>
        <td>
          <span class="product-price" title="${formatPrice(item.price)}">${formatPrice(item.price)}</span>
        </td>
        <td>
          <div>
            <div class="quantity-box">
              <button class="decrement-button" title="Diminuir">-</button>
              <input
                type="number"
                id="quantity"
                class="quantity"
                value="${item.quantity}" disabled
                min="0"
              />
              <button class="increment-button" title="Aumentar">+</button>
            </div>
            <button class="remove-button" title="Excluir">Excluir</button>
          </div>
        </td>
      </tr>
    `;
    cart.innerHTML += cartItem;
  });
};

// INÍCIO DA FUNÇÃO UPDATE TOTAL
const updateTotal = () => {
  // Calcula o valor
  let totalAmount = 0;
  let productQuantityTotal = 0;
  const cartProduct = document.getElementsByClassName("cart-product");
  for (let i = 0; i < cartProduct.length; i++) {
    const productPrice = cartProduct[i].getElementsByClassName("product-price")[0].innerHTML.replace("R$&nbsp;", "").replace(",", ".");
    const productQuantity =
      cartProduct[i].getElementsByClassName("quantity")[0].value;
    totalAmount += productPrice * productQuantity;
    productQuantityTotal =
      parseInt(productQuantity) + parseInt(productQuantityTotal);
  }
  // Mapeia os elementos para mostrar o valor
  const total = document.querySelector(".total");
  const subtotal = document.querySelector(".subtotal");
  const discount = document.querySelector(".off");
  const productWord = productQuantityTotal < 2 ? "produto" : "produtos";
  subtotal.innerHTML = `Subtotal (${productQuantityTotal} ${productWord}): <strong>${formatPrice(
    totalAmount
  )}</strong>`;
  // Mostra e calcula o desconto
  const DISCOUNT = {
    NAME:
      totalAmount > 200
        ? "30% OFF"
        : totalAmount > 100
        ? "20% OFF"
        : totalAmount > 30
        ? "10% OFF"
        : "0% OFF",
    PERCENTAGE:
      totalAmount > 200
        ? 0.3
        : totalAmount > 100
        ? 0.2
        : totalAmount > 30
        ? 0.1
        : 0,
  };
  if (totalAmount > 200) {
    discount.style.color = "#68f252";
    discount.innerHTML = `Desconto (${DISCOUNT.NAME}): <strong>${formatPrice(
      totalAmount * DISCOUNT.PERCENTAGE
    )}</strong>`;
  } else if (totalAmount > 100) {
    discount.style.color = "#f6df4a";
    discount.innerHTML = `Desconto (${DISCOUNT.NAME}): <strong>${formatPrice(
      totalAmount * DISCOUNT.PERCENTAGE
    )}</strong>`;
  } else if (totalAmount > 30) {
    discount.style.color = "#f87249";
    discount.innerHTML = `Desconto (${DISCOUNT.NAME}): <strong>${formatPrice(
      totalAmount * DISCOUNT.PERCENTAGE
    )}</strong>`;
  } else {
    discount.style.color = "#999999";
    discount.style.fontSize = "14px";
    discount.innerHTML = `Desconto não aplicado`;
  }
  // Mostra o indicador de produtos
  const emptyCart = document.querySelector(".table-display");
  const quantityViewer = document.getElementById("cart-qtd");
  if (productQuantityTotal < 1) {
    quantityViewer.style.visibility = "hidden";
    emptyCart.style.display = "none";
  } else {
    quantityViewer.style.visibility = "visible";
    quantityViewer.innerText = `${productQuantityTotal}`;
    emptyCart.style.display = "flex";
  }
  // Exibe o total
  const totalWithDiscount = totalAmount - totalAmount * DISCOUNT.PERCENTAGE;
  total.innerHTML = `Total: <strong>${formatPrice(totalWithDiscount)}</strong>`;
  // Finaliza o pedido
  const closeOrder = () => {
    showAlert(`Seu pedido foi concluído!
    <br>
    Total a pagar: <b>${formatPrice(totalWithDiscount)}</b>
    <br>
    <br>
    <strong>Agradecemos pela preferência! :)</strong>`);
    goToButton.innerText = "Fechar";
    goToButton.onclick = function () {
      window.location.href = "index.html";
    };
    closeButton.onclick = function () {
      window.location.href = "index.html";
    };
    window.onclick = function (event) {
      if (event.target == customAlert) {
        window.location.href = "index.html";
      }
    };
  };
  const closeOrderButton = document.querySelector(".close");
  closeOrderButton.addEventListener("click", () => {
    if (productQuantityTotal < 1) {
      showAlert(`Seu carrinho está vazio! :(</strong>
      <br>`);
      goToButton.innerText = "Ir para o cardápio";
      goToButton.onclick = function () {
        customAlert.style.display = "none";
        showProducts(menuOptions);
        toggleCategory(document.querySelector("#all"));
      };
    } else {
      closeOrder();
    }
  });
};
// FIM DA FUNÇÃO UPDATE TOTAL

// MOSTRA O CARRINHO
const showCart = () => {
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "flex";
  container4.style.display = "none";
  hideVideo();
  updateTotal();
};

// MUDA O TAMANHO DA GRADE DE PRODUTOS
const screen1 = window.matchMedia("(min-width: 1200px)");
const screen2 = window.matchMedia("(min-width: 600px)");
const responsiveProducts = () => {
  if (screen1.matches) {
    grid.style.gridTemplateColumns = "11rem 11rem 11rem 11rem 11rem";
  } else if (screen2.matches) {
    grid.style.gridTemplateColumns = "11rem 11rem 11rem";
  } else {
    grid.style.gridTemplateColumns = "11rem 11rem";
  }
};

// ROLA PARA O TOPO DA PÁGINA
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// SELECIONA A CATEGORIA NO CARDÁPIO
function toggleCategory(button) {
  categoryButton.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
  const categoryList = document.querySelector("#category-list");
  categoryList.classList.add("selected");
}

// MUDA A IMAGEM DO CLIENTE
const changeCustomerImage = (newImage, newName) => {
  var customerImg = document.getElementById("customer-img");
  customerImg.src = newImage;
  const customerName = customerImg.parentElement.querySelector("h4");
  customerName.innerText = newName;
};

function toggleMenu() {
  var menu = document.querySelector('.animated ul');
  menu.classList.toggle('show');
}

// EVENTOS
mainButton.addEventListener("click", () => {
  showProducts(menuOptions);
  toggleCategory(document.querySelector("#all"));
});
homeButton.addEventListener("click", () => {
  scrollToTop();
  mainAnimation();
  showHomePage();
});
productButton.addEventListener("click", () => {
  showProducts(menuOptions);
  toggleCategory(document.querySelector("#all"));
});
couponsButton.addEventListener("click", showCoupons);
cartButton.addEventListener("click", showCart);
screen1.addEventListener("change", responsiveProducts);
screen2.addEventListener("change", responsiveProducts);