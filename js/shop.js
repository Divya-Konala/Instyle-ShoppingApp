let categories= ["mens","womens","jewellery","electronics"]
let priceRange=["range1","range2","range3","range4"]
let inputFields={
  category:{
    mens: false,
    womens: false,
    jewellery: false,
    electronics: false
  },
  ratingRange: {
    isChanged: false,
    rate: 0
  },
  priceRange:{
    range1:false,
    range2:false,
    range3:false,
    range4:false
  },
  search:{
    value:""
  }
}

//fetchProducts
let products_catalog=document.querySelector(".products_catalog");
let allProducts;

fetch("https://fakestoreapi.com/products")
.then((res)=>res.json())
.then((data)=>{
    // console.log(data);
    allProducts=[...data];
    displayProducts(data);
})
.catch((error)=>console.log(error.message))

function displayProducts(products){
  products_catalog.innerHTML="";
    products.map((product,index)=>{
        let div=document.createElement("div");
        div.setAttribute("class","product");
        div.innerHTML=`<div class="product_image">
        <img
          src=${product.image}
        />
      </div>
      <div class="product_desc">
        <div class="title">
          <strong>${product.title}</strong>
        </div>
        <div class="price">Price: <strong>$${product.price}</strong></div>
        <div class="rating">Rating: <strong>${product.rating.rate}</strong></div>
      </div>
      <button type="button" class="addToCartBtn btn btn-dark">Add to Cart</button>`;
        products_catalog.append(div);
    })
}

const filterProducts=()=>{
  let filteredProducts=[...allProducts];

  if(inputFields.search.value!=""){
    let inputValue=inputFields.search.value;
    filteredProducts=filteredProducts.filter((item)=>item.title.toLowerCase().includes(inputValue.toLowerCase()));
  }

  if(inputFields.category.mens == true ||
    inputFields.category.womens == true ||
    inputFields.category.jewellery == true ||
    inputFields.category.electronics == true){
      filteredProducts = filteredProducts.filter((item) => {
        if (
          (inputFields.category.mens && item.category=='men\'s clothing') ||
          (inputFields.category.womens && item.category=='women\'s clothing') ||
          (inputFields.category.jewellery && item.category=='jewelery') ||
          (inputFields.category.electronics && item.category=='electronics')
        )
          return item;
      });
    }

    if(inputFields.ratingRange.isChanged){
      filteredProducts = filteredProducts.filter((item)=>{
        if(Math.round(item.rating.rate)==inputFields.ratingRange.rate) return item;
      })
    }

    if (
      inputFields.priceRange.range1 == true ||
      inputFields.priceRange.range2 == true ||
      inputFields.priceRange.range3 == true ||
      inputFields.priceRange.range4 == true
    ) {
      filteredProducts = filteredProducts.filter((item) => {
        if (
          (inputFields.priceRange[priceRange[0]] && isOfPriceRange(item, priceRange[0])) ||
          (inputFields.priceRange[priceRange[1]] && isOfPriceRange(item, priceRange[1])) ||
          (inputFields.priceRange[priceRange[2]] && isOfPriceRange(item, priceRange[2])) ||
          (inputFields.priceRange[priceRange[3]] && isOfPriceRange(item, priceRange[3]))
        )
          return item;
      });
    }
    displayProducts(filteredProducts);
}

// let filterBtns=document.querySelectorAll(".filterBtn");

// filterBtns[0].addEventListener("click",()=>{
//   filterProducts();
// })
// filterBtns[1].addEventListener("click",()=>{
//   filterProducts();
//   closeModal();
// })

let filters1 = document.querySelectorAll(".filters1");
let filters2 = document.querySelectorAll(".filters2");

//categories filter
for(let i=0;i<4;i++){
  filters1[i].addEventListener("change",()=>{
    if(filters1[i].checked)
      inputFields.category[categories[i]]=true;
    else
      inputFields.category[categories[i]]=false;
    filterProducts();
  })
}

for(let i=0;i<4;i++){
  filters2[i].addEventListener("change",()=>{
    if(filters2[i].checked)
      inputFields.category[categories[i]]=true;
    else
      inputFields.category[categories[i]]=false;
    filterProducts();
  })
}

//rating
filters1[4].addEventListener("change",()=>{
  if(filters1[4].value==0){
    inputFields.ratingRange.isChanged=false;
  }
  else{
    inputFields.ratingRange.isChanged=true;
  }
  inputFields.ratingRange.rate=filters1[4].value; 
  filterProducts();
})

filters2[4].addEventListener("change",()=>{
  if(filters2[4].value==0){
    inputFields.ratingRange.isChanged=false;
  }
  else{
    inputFields.ratingRange.isChanged=true;
  }
  inputFields.ratingRange.rate=filters2[4].value; 
  filterProducts();
})

//priceRange
for (let i = 5; i <= 8; i++) {
  filters1[i].addEventListener("change", () => {
    if (filters1[i].checked) {
      inputFields.priceRange[priceRange[i-5]] = true;
    } else {
      inputFields.priceRange[priceRange[i-5]] = false;
    }
    filterProducts();
  });
}

for (let i = 5; i <= 8; i++) {
  filters2[i].addEventListener("change", () => {
    if (filters2[i].checked) {
      inputFields.priceRange[priceRange[i-5]] = true;
    } else {
      inputFields.priceRange[priceRange[i-5]] = false;
    }
    filterProducts();
  });
}

function isOfPriceRange(item,range){
  let min=0,max=0;
  if(range=="range1"){min=0; max=25}
  else if(range=="range2"){min=25; max=50}
  else if(range=="range3"){min=50; max=100}
  else {min=100; max=Infinity}
  if(item.price>=min && item.price<=max) return true;
  return false;
}

function closeModal() {
  var element = document.querySelectorAll(".btn-close");
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element[1].dispatchEvent(event);
}

let resetFilters=document.querySelectorAll(".resetFilters");

resetFilters[0].addEventListener("click",()=>{
  for(let i=0;i<filters1.length;i++){
    if(i!==4){
      filters1[i].checked=false;
    }else{
      filters1[i].value=0;
    }
  }
  inputFields={
    category:{
      mens: false,
      womens: false,
      jewellery: false,
      electronics: false
    },
    ratingRange: {
      isChanged: false,
      rate: 0
    },
    priceRange:{
      range1:false,
      range2:false,
      range3:false,
      range4:false
    },
    search:{
      value:""
    }
  }
  document.querySelector("#searchBar").value="";
  filterProducts();
})

resetFilters[1].addEventListener("click",()=>{
  for(let i=0;i<filters2.length;i++){
    if(i!==4){
      filters2[i].checked=false;
    }else{
      filters2[i].value=0;
    }
  }
  inputFields={
    category:{
      mens: false,
      womens: false,
      jewellery: false,
      electronics: false
    },
    ratingRange: {
      isChanged: false,
      rate: 0
    },
    priceRange:{
      range1:false,
      range2:false,
      range3:false,
      range4:false
    },
    search:{
      value:""
    }
  }
  document.querySelector("#searchBar").value="";
  filterProducts();
  closeModal();
})

//search functionality
let searchbar = document.querySelector("#searchBar");
searchbar.addEventListener("change", () => {
  inputFields.search.value = searchbar.value;
  filterProducts();
});

//home page to shop page by clicking categories

let category = document.querySelectorAll(".category");
for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", () => {
    goToShop();
    filters1[i].checked=true;
    filters2[i].checked=true;
    inputFields.category[categories[i]]=true;
    filterProducts();
  });
}

function goToShop() {
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  navLinks[1].dispatchEvent(event);
}