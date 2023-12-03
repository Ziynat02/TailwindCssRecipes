let enter_foodName = document.querySelector("#enter_foodName");
let searchBtn = document.querySelector("#searchBtn");
let meals = document.getElementById("meals");
let selected = document.getElementById("selected");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let peopleOfNumber = document.getElementById("peopleOfNumber");
let bookmark_1 = document.getElementById("bookmark_1");
let bookmark_2 = document.getElementById("bookmark_2");
let gif = document.getElementById("gif");
let gif_big = document.getElementById("gif_big");
let clock = document.getElementById("clock");
let servings = document.getElementById("servings");
let defaultImg = document.getElementById("defaultImg");
let vegetables = document.getElementById("vegetables");
let publisher = document.getElementById("publisher");
let exit = document.getElementById("exit");
let addRecipes_part = document.getElementById("addRecipes_part");
let addRecipes = document.getElementById("addRecipes");
let mainPart = document.getElementById("mainPart");
// let bodyWidth = document.getElementById("bodyWidth");

///////////////////////////////////////////////////////////////
addRecipes.addEventListener("click",()=>{
  addRecipes_part.style.display = "block";
  mainPart.style.display = "none";
  // bodyWidth.style.height = "1000px";
});
exit.addEventListener("click",()=>{
  addRecipes_part.style.display = "none";
  mainPart.style.display = "block";
});

const API_KEY = `01341e80-b80c-416d-b373-248f345f3291`;

function getData() {
  let meal = enter_foodName.value;
  const baseUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${meal}&key=${API_KEY}`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((res) => {
      showUi(res);
      addDel(res.data);
    });
    defaultImg.style.display = "none";
  enter_foodName.value = "";
  gif.style.display = "block";
  gif_big.style.display = "block";
}

let newSet = 1;

function showUi(data) {
  console.log(data);
  if (newSet != 1) meals.innerHTML = "";
  newSet++;

  for (let i = 0; i < data.data.recipes.length; i++) {
    gif.style.display = "none";
    meals.innerHTML += `
    <div onclick=getFoodData(this) id="${
      data.data.recipes[i].id
    }" class=" menu flex gap-7 justify-centr items-center  hover:bg-orange-50 hover:-translate-y-2 focus:bg-orange-200 pl-7 p-7 recipes_list ">
    <div class="cursor-pointer  image object-fit w-[60px] h-[60px] rounded-full bg-cover bg-center  bg-[url('${
      data.data.recipes[i].image_url
    }')]" id='tooltip'>
    <span class='tooltiptext'>${data.data.recipes[i].title}</span>
    </div>
    <div class="text_part ">
    <h4 class="text-blue-500 text-base">${
      data.data.recipes[i].title.substring(0, 25) + "..."
    }</h4>
    <p class="text-gray-600 text-sm mt-1">${data.data.recipes[i].publisher}</p>
    </div>
    </div>
    `;
  }
}


let count = 0;
plus.addEventListener("click", () => {
  peopleOfNumber.innerHTML = `${(count = count + 1)}`;
});
minus.addEventListener("click", () => {
  if (count > 1) {
    peopleOfNumber.innerHTML = `${(count = count - 1)}`;
  } else {
    peopleOfNumber.innerHTML = 1;
  }
});

enter_foodName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getData();
  }
});

bookmark_1.addEventListener("click", () => {
  bookmark_1.style.display = "none";
  bookmark_2.style.display = "block";
});
bookmark_2.addEventListener("click", () => {
  bookmark_1.style.display = "block";
  bookmark_2.style.display = "none";
});

// add del
function getFoodData(e) {
  addDel(e.id);
}

function addDel(data) {
  const addDel = `https://forkify-api.herokuapp.com/api/v2/recipes/${data}?key=${API_KEY}`;
  fetch(addDel)
    .then((res_2) => res_2.json())
    .then((res_2) => { 
      console.log(res_2.data.recipe);         
    if (res_2 === true) {
        gif_big.style.display = "none";
      
      }else{
          gif_big.style.display = "block";
        }            
        selected.innerHTML = `
    <div class=" image_right_part bg-cover bg-center w-full h-72  ">
      <div class="image_right_part  bg-cover bg-center w-full h-[320px] bg-[url('${res_2.data.recipe.image_url}')] "></div>
      <div class="bg-gradient-to-br -skew-x-6  from-blue-600  to-red-400 px-5 py-3 flex justify-center w-96 translate-x-64 -translate-y-12 -rotate-6">
      <p class="text-4xl text-white font-bold ">${res_2.data.recipe.title}
      </p>
      </div>
      </div>
      `;

    clock.innerHTML = `<span  class="mr-1 text-gray-700 font-medium text-lg">${res_2.data.recipe.cooking_time}</span>MINUTES`;

    servings.innerHTML = `<span  class="mr-1 text-gray-700 font-medium text-lg">${res_2.data.recipe.servings}</span>SERVINGS`;
// //////////////////////////////////////////////////
vegetables.innerHTML="";
        for (let i = 0; i < res_2.data.recipe.ingredients.length; i++) {
         vegetables.innerHTML += `
         <div class="flex items-center gap-2  mb-3 ml-[100px] w-[250px]">
         <i class="fa-solid fa-check text-blue-500 text-xl"></i>
         <p class="text-gray-600"><span>${res_2.data.recipe.ingredients[i].quantity}</span><span>${res_2.data.recipe.ingredients[i].unit}</span>${res_2.data.recipe.ingredients[i].description}</p>
        </div>
         `
          
        }
        //////////////////////////////////////////////////////////
        publisher.innerHTML = `${res_2.data.recipe.publisher}`;

  });
}