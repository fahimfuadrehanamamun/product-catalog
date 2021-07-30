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

let productData=[]

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
       productData.push({
           id,
           name,
           price
       })
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
    const result=productData.filter((product)=>{
      return product.id!==id;
    })
    // console.log(result);
   productData=result; 
    }  
})

filterInput.addEventListener('keyup',e=>{
    // console.log(e.target.value);
    const text=e.target.value;
    document.querySelectorAll('.collection .collection-item').forEach(item=>{
       const productName=item.firstElementChild.textContent.toLowerCase();
        // console.log(productName);
        if (productName.indexOf(text)=== -1) {
            // msg.innerHTML='No item to show'
            showMsg(null,true);
            item.style.display='none';
        }else{
            msg.innerHTML=''
            item.style.display='block'
        }
    })
    
})

function showMsg(fetchMsg,searchMsg) {
    if (fetchMsg) {
        msg.innerHTML='Please add item'
    } else if(searchMsg){
        msg.innerHTML='No item to show in this catalog'
    }
}

