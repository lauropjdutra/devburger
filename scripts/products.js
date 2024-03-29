const menuOptions = [
  {
    name: "Dev Kids",
    id: 0,
    quantity: 0,
    price: 24.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-fury.jpg",
  },
  {
    name: "Dev Junior",
    id: 1,
    quantity: 0,
    price: 27.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-junior.jpg",
  },
  {
    name: "Dev Chicken",
    id: 2,
    quantity: 0,
    price: 29.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-chicken.jpg",
  },
  {
    name: "Dev Bacon",
    id: 3,
    quantity: 0,
    price: 32.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-bacon.jpg",
  },
  {
    name: "Dev Vegano",
    id: 4,
    quantity: 0,
    price: 34.99,
    category: "dev",
    vegan: true,
    img: "./assets/dev-vegano.jpg",
  },
  {
    name: "Dev Pleno",
    id: 5,
    quantity: 0,
    price: 37.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-pleno.jpg",
  },
  {
    name: "Dev Cheddar",
    id: 6,
    quantity: 0,
    price: 39.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-cheddar.jpg",
  },
  {
    name: "Dev Fit",
    id: 7,
    quantity: 0,
    price: 42.99,
    category: "dev",
    vegan: true,
    img: "./assets/dev-fit.jpg",
  },
  {
    name: "Dev Splash",
    id: 8,
    quantity: 0,
    price: 44.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-splash.jpg",
  },
  {
    name: "Dev Senior",
    id: 9,
    quantity: 0,
    price: 47.99,
    category: "dev",
    vegan: false,
    img: "./assets/dev-senior.jpg",
  },
  {
    name: "X-Salada",
    id: 10,
    quantity: 0,
    price: 19.99,
    category: "simple",
    vegan: false,
    img: "./assets/x-salada.jpg",
  },
  {
    name: "X-Frango",
    id: 11,
    quantity: 0,
    price: 22.99,
    category: "simple",
    vegan: false,
    img: "./assets/x-frango.jpeg",
  },
  {
    name: "X-Bacon",
    id: 12,
    quantity: 0,
    price: 24.99,
    category: "simple",
    vegan: false,
    img: "./assets/x-bacon.png",
  },
  {
    name: "X-Tudo",
    id: 13,
    quantity: 0,
    price: 27.99,
    category: "simple",
    vegan: false,
    img: "./assets/x-tudo.jpg",
  },
  {
    name: "X-Vegano",
    id: 14,
    quantity: 0,
    price: 29.99,
    category: "simple",
    vegan: true,
    img: "./assets/x-vegano.jpg",
  },
  {
    name: "X-Fit",
    id: 15,
    quantity: 0,
    price: 32.99,
    category: "simple",
    vegan: true,
    img: "./assets/x-fit.jpg",
  },
  {
    name: "Batata Frita Tradicional",
    id: 16,
    quantity: 0,
    price: 14.99,
    category: "frie",
    vegan: false,
    img: "./assets/frita-tradicional.jpg",
  },
  {
    name: "Batata Frita com Cheddar",
    id: 17,
    quantity: 0,
    price: 19.99,
    category: "frie",
    vegan: false,
    img: "./assets/frita-cheddar.png",
  },
  {
    name: "Batata Frita com Calabresa",
    id: 18,
    quantity: 0,
    price: 24.99,
    category: "frie",
    vegan: false,
    img: "./assets/frita-calabresa.jpg",
  },
  {
    name: "Batata Frita com Nuggets",
    id: 19,
    quantity: 0,
    price: 29.99,
    category: "frie",
    vegan: false,
    img: "./assets/frita-nuggets.jpg",
  },
  {
    name: "Cookie Clássico",
    id: 20,
    quantity: 0,
    price: 0.99,
    category: "dessert",
    vegan: false,
    img: "./assets/cookie-classico.jpg",
  },
  {
    name: "Sorvete na Casquinha",
    id: 21,
    quantity: 0,
    price: 3.99,
    category: "dessert",
    vegan: false,
    img: "./assets/casquinha.jpg",
  },
  {
    name: "Cheesecake de Chocolate",
    id: 22,
    quantity: 0,
    price: 7.99,
    category: "dessert",
    vegan: false,
    img: "./assets/cake-chocolate.jpg",
  },
  {
    name: "Sorvete na Taça 500ml",
    id: 23,
    quantity: 0,
    price: 12.99,
    category: "dessert",
    vegan: false,
    img: "./assets/shake.jpg",
  },
  {
    name: "Fudge com Castanhas",
    id: 24,
    quantity: 0,
    price: 17.99,
    category: "dessert",
    vegan: false,
    img: "./assets/fudge.jpg",
  },
  {
    name: "Petit Gateau Tradicional",
    id: 25,
    quantity: 0,
    price: 22.99,
    category: "dessert",
    vegan: false,
    img: "./assets/petit-gateau.jpeg",
  },
  {
    name: "Combo Trio Tradicional com 3 burgers",
    id: 26,
    quantity: 0,
    price: 49.99,
    category: "combo",
    vegan: false,
    img: "./assets/trio-simples.jpg",
  },
  {
    name: "Combo Dev com 3 burgers + 2 batatas",
    id: 27,
    quantity: 0,
    price: 64.99,
    category: "combo",
    vegan: false,
    img: "./assets/combo-dev.jpg",
  },
  {
    name: "Combo Trio Vegano com 3 burgers Dev Fit",
    id: 28,
    quantity: 0,
    price: 79.99,
    category: "combo",
    vegan: true,
    img: "./assets/trio-vegano.jpg",
  },
  {
    name: "Combo Plus com 5 burgers + batata + Refri",
    id: 29,
    quantity: 0,
    price: 94.99,
    category: "combo",
    vegan: false,
    img: "./assets/combo-plus.jpg",
  },
];