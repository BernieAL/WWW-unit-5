
window.onload=()=> {


  const myStorage = window.sessionStorage;

  const inventory = [
    {
      itemName: "GreenSocks",
      price: 19.94,
      stock: 10,
      cat: 'socks'
    }, {
      itemName: "RainbowSocks",
      price: 19.94,
      stock: 10,
      cat: 'socks'
    },
    {
      itemName: "RedSocks",
      price: 19.94,
      stock: 10,
      cat: 'socks'
    },
    {
      itemName: "RedShirt",
      price: 19.94,
      stock: 10,
      cat: 'shirts'
    }, {
      itemName: "BlueShirt",
      price: 19.94,
      stock: 10,
      cat: 'shirts'
    },
    {
      itemName: "PurpleShirt",
      price: 19.94,
      stock: 10,
      cat: 'shirts'
    },
    {
      itemName: "BlackPants",
      price: 19.94,
      stock: 10,
      cat: 'pants'
    },
    {
      itemName: "LeatherPants",
      price: 19.94,
      stock: 10,
      cat: 'pants'
    },
    {
      itemName: "GreyPants",
      price: 19.94,
      stock: 10,
      cat: 'pants'
    },
    {
      itemName: "WhiteShirt",
      price: 19.94,
      stock: 10,
      cat: 'shirts'
    },
    {
      itemName: "GraphicTee",
      price: 19.94,
      stock: 10,
      cat: 'shirts'
    },
  ]

  const itemsInCart = []
  let cartTotal= 0;;

  const baseURL = 'http://127.0.0.1:5500/'

//====================================================
  /* Dynamically generate All items into bootstrap elements*/


  const renderAllItems = (inventory)=>{
    for(i=0;i<inventory.length;i++){
        const UL = document.querySelector('#AllItemsList')

    //<div class="col-sm-6 col-md-3">
        const colSM = document.createElement('div')
        colSM.className =  'col-sm-6 col-md-3';
    
    // <div class="card" style="width: 18rem;">
        const card = document.createElement('card')
        card.className = "card"
        card.style.width= "18rem"
        
    // <div class="card-body">    
        const cardBody = document.createElement('div')
        cardBody.className = "card-body"

    //<h5 class="card-title">Some COOL socks</h5>
        const cardTitle = document.createElement('h5')
        cardTitle.className="card-title"
        cardTitle.style.textAlign="center"
        cardTitle.innerText = JSON.stringify(inventory[i].itemName)

    //<a href="#" class="thumbnail">
        const ahref = document.createElement('a')
        ahref.setAttribute("class","thumbnail")
    
    //<img src="images/img-1.jpg" alt="...">
        const imgEl = document.createElement('img')
        imgEl.setAttribute("src",`images/${inventory[i].itemName}.jpg`)
        
    
    //<p class="card-text">Light up socks</p>
        const p = document.createElement('p')
        p.className = "card-text"
        p.innerHTML = inventory[i].price
    
    //<a href="#" class="btn btn-primary" id="rainbowSock" name="rainbowSock" value="19.94">Add to Cart</a>
        const ahref2 = document.createElement('a')
        ahref2.className =  "btn btn-primary"
        ahref2.setAttribute("id",inventory[i].itemName)
        ahref2.setAttribute("name",inventory[i].itemName)
        ahref2.setAttribute("value",inventory[i].price)
        ahref2.innerHTML="Add To Cart"
    
    //<a href="#" class="btn btn-primary">View</a>  
        const ahref3 = document.createElement('a')
        ahref3.className = "btn btn-primary"
        ahref3.innerHTML = "View"
        
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(ahref)
        ahref.appendChild(imgEl)
        ahref.appendChild(p)
        cardBody.appendChild(ahref2)
        cardBody.appendChild(ahref3)

        card.appendChild(cardBody)

        colSM.appendChild(card)
        UL.appendChild(colSM)
      }
    }
//==============================================
   //RENDER BOOSTRAP ELEMENTS FOR CART ITEMS

   const renderCartItems = (cartItemsSessionStorage)=>{

   console.log(cartItemsSessionStorage)

    for(item in cartItemsSessionStorage){
        
        const liItem = document.createElement('li')
        liItem.className="list-group-item d-flex justify-content-between lh-condensed"

        const innerDiv = document.createElement('div')
            const h6ProductName = document.createElement('h4')
            h6ProductName.setAttribute("id", "productName")
            h6ProductName.className= "my-0"
            h6ProductName.innerText = JSON.stringify(cartItemsSessionStorage[item].itemName)   //destructing and toString

            const smallDescrip = document.createElement('small')
            smallDescrip.className= "text-muted"
            smallDescrip.innerText =  "test description"

        const span = document.createElement('span')
        span.setAttribute("id","price")
        span.innerText = cartItemsSessionStorage[item].price
             //sum up cart total and display (just handling here for convenience since already accessing price )
                // let tempNum = parseFloat(cartItemsSessionStorage[item].price)
                // console.log(typeof tempNum)
                // let testNum = Number(tempNum)
                // cartTotal = cartTotal + testNum

        const cartItemsDiv = document.querySelector("#cart-items-ul")
        cartItemsDiv.appendChild(liItem)
        liItem.append(innerDiv) 
        innerDiv.append(h6ProductName)
        innerDiv.append(smallDescrip)
        liItem.append(span)

    }

    //update 'total' element with new summed total
    // const totalCost = document.querySelector('#amount-total')
    // totalCost.innerText = cartTotal
  }
//========================================================
    //CALC TOTAL FUNCTION


//=========================================================
//=========================================================
  /* General function to handle adding to cart from either AllItems or Top sellers */
      const AddToCart = (e)=>{
        
        
        let t = JSON.parse(myStorage.getItem('ItemsInCart'))
        console.log("myStorage.getItem('ItemsInCart'): " + t)
                //move existing session storage into temp array to concat with updated itemsInCart
        let tempArray = [t]
        console.log(tempArray)
        //= myStorage.getItem('ItemsInCart')

        let itemName = e.target.name
        console.log(itemName)
        let price = document.getElementById(itemName).getAttribute('value')
        alert(itemName + ": "+price + ' added to Cart!')

        let selectedItem = {
          itemName: itemName,
          price: price,
        }
        //cartTotal += price;

        itemsInCart.push(selectedItem)
        
        for(items in itemsInCart){
          tempArray.push(itemsInCart[items])
        }
        
        //update local storage with updated itemsInCart array
        //myStorage is getting rewritten each time here
        myStorage.setItem('ItemsInCart' ,JSON.stringify(tempArray))

        
      
        //console.log(cartTotal)
    } 
//=======================================================

//FUNCTION CALLS 

  /* If URL matches store:
          -Add event listener to item categories
          -Add Event listener to All items button
          - Render All items
  */
  if(window.location.href === (`${baseURL}MyStore.html`) || window.location.href === (`${baseURL}Mystore.html#`)){
    
    let categoryClick = document.querySelector('#categories')
    categoryClick.addEventListener('click',(e)=>{
        let choice = e.target.name
        if(choice === "socks"){
          window.location = baseURL + 'socks.html'
        } else if(choice === "shirts"){
          window.location = baseURL + 'shirts.html'
        } else if(choice === "pants"){
          window.location = baseURL + 'pants.html'
        }
    })
  
      //render top selling items
      let itemToCart = document.querySelector('#topSellingItems')
      itemToCart.addEventListener('click',AddToCart)

      //render all items
      let AllItems = document.querySelector('#AllItemsButton')
      AllItems.addEventListener('click',renderAllItems(inventory))
          
      //Add to cart on click 'ADD TO CART' All other items
      let allItemsList = document.querySelector('#AllItemsList')
      allItemsList.addEventListener('click',AddToCart)
  }
//======================================================
  if(window.location.href === (`${baseURL}cart.html`)){


    let cartItemsSessionStorage = JSON.parse(myStorage.getItem('ItemsInCart'))
    
    console.log(cartItemsSessionStorage)
      if(cartItemsSessionStorage.length === 0){
        console.log("No items in cart")
        //show html element saying "no items in cart"
      } else{
          //console.log(cartItemsSessionStorage[item])
          renderCartItems(cartItemsSessionStorage)

      }
  } 
//=======================================================

if(window.location.href === (`${baseURL}socks.html`)){


//filter inventory array and return items of category = socks only
 let socks = inventory.filter((elem)=>{
      return elem.cat === 'socks'
 })
renderAllItems(socks)
}
//=========================================================
if(window.location.href === (`${baseURL}shirts.html`)){


  //filter inventory array and return items of category = socks only
   let shirts = inventory.filter((elem)=>{
        return elem.cat === 'shirts'
   })
  renderAllItems(shirts)
  }
//===========================================================
if(window.location.href === (`${baseURL}pants.html`)){


  //filter inventory array and return items of category = socks only
   let pants = inventory.filter((elem)=>{
        return elem.cat === 'pants'
   })
  renderAllItems(pants)
  }


}
//END SCRIPT

