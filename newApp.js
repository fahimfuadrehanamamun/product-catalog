console.log('conected');
//selector
const filterInput=document.querySelector('#filter')
const nameInput=document.querySelector('.product-name')
const priceInput=document.querySelector('.product-price')
const addBtn=document.querySelector('.add-product')
const deleteBtn=document.querySelector('.delete-product')
const productListUl=document.querySelector('.collection')
const msg=document.querySelector('.msg')


//data store

let productData=getDataFromLocalStorage()
function getDataFromLocalStorage(){
    let items='';
    if(localStorage.getItem('productItems')===null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('productItems'))
    }
    return items;
}
function saveDataToLocalStorage(item){
    let items='';
    if(localStorage.getItem('productItems')===null){
        items=[];
        items.push(item);
        localStorage.setItem('productItems',JSON.stringify(items))
    }else{
        items=JSON.parse(localStorage.getItem('productItems'))
        items.push(item)
        localStorage.setItem('productItems',JSON.stringify(items))
    
    }
}
function deleteItemFromLocalStorage(id){
    const items=JSON.parse(localStorage.getItem('productItems'))
    let result=items.filter((productItem)=>{
        return productItem.id!==id;
      })
      localStorage.setItem('productItems',JSON.stringify(result))      
      // console.log(result);
    if(result.length===0) location.reload();
    }

function getData(productList) {
    // console.log(data);
        if (productData.length>0) {
            msg.innerHTML=''        
            productList.forEach(product => {
                let li=document.createElement('li');
                li.className='list-group-item collection-item';
                li.id=`product-${product.id}`;
                li.innerHTML=`<strong>${product.name}</strong>-
                <span class="price">${product.price}</span>
                <i class="fa fa-trash float-right delete-btn"></i>`
                productListUl.appendChild(li);

            });
        }else{
            // console.log('No product in the store');
            // msg.innerHTML='No item to show';
            showMsg(true,null)
        }
}
getData(productData);

addBtn.addEventListener('click', e=>{
    e.preventDefault();
    console.log('clicked the add button');
    const name=nameInput.value;
    const price=priceInput.value;
    let id;
    if(productData.length===0){
        id=0;
    }else{
        id=productData[productData.length-1].id+1;
    }
    // !(!isNaN(parseFloat(price))&& isFinite(price)) (its for user only gives number)
   if (name==='' || price==='' || !(!isNaN(parseFloat(price))&& isFinite(price))) {
       alert('please fill the information')
   }else{
       const data={
           id,
           name,
           price
       }
       productData.push(data)
       saveDataToLocalStorage(data);
       productListUl.innerHTML='';
       getData(productData);
       nameInput.value='';
       priceInput.value='';
   }
    // console.log(name,price);
})
// console.log(productData);


// Delete item
productListUl.addEventListener('click',e=>{
    // console.log(e.target);
    if (e.target.classList.contains('delete-btn')) {
        // console.log('You want to delete item')
        //removing data from ui
        // e.target.parentElement.remove();
        const target=e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);
    //removing data from the store
        //getting id
        const id=parseInt(target.id.split('-')[1]);
        let result=productData.filter((productItem)=>{
            return productItem.id!==id;
          })
        productData=result;
        deleteItemFromLocalStorage(id);
    }  
})

filterInput.addEventListener('keyup',e=>{
    // console.log(e.target.value);
    const text=e.target.value;
    let itemLength=0;
    document.querySelectorAll('.collection .collection-item').forEach(item=>{
       const productName=item.firstElementChild.textContent.toLowerCase();
        // console.log(productName);
        if (productName.indexOf(text)=== -1) {
            // msg.innerHTML='No item to show'
            // showMsg(null,true);
            item.style.display='none';
        }else{
            // msg.innerHTML=''
            item.style.display='block';
            ++itemLength
        }
    })
    itemLength>0 ? showMsg(''):showMsg(null,true);
})

function showMsg(fetchMsg,searchMsg) {
    if (fetchMsg) {
        msg.innerHTML='Please add item'
    } else if(searchMsg){
        msg.innerHTML='No item to show in this catalog'
    }
}

