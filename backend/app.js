const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { doc } = require("firebase/firestore");
const { db, Product, Cart, Table } = require('./config');
const { getDocs, collection, getDoc, setDoc } = require('@firebase/firestore');
const bcrypt = require('bcryptjs');
require('dotenv').config();


app.use(cors());
app.use(express.json());

//############################loginApi###############################

app.get("/login", (req, res) => {

})

app.post("/loginApi", async (req, res) => {
   
  const {email,password,selectedValue}=req.body;
  
if(selectedValue=="admin"){
  
  const UserRef = doc(db, 'User', selectedValue);
  const docSnap = await getDoc(UserRef);
  const Userdata = docSnap.data();
console.log(Userdata);

if(Userdata.Email==email && Userdata.Password==password){
  res.status(200).send({type:"admin"})
  // console.log("user and password match")
}
else{
  res.status(400).json({
    Message:"User Credentials is not correct!"
  })
  // res.redirect('/pages/login')
  console.log("user and password match")
}



  }else if(selectedValue=="chief"){

}
else{
   console.log("error to login");
}

}
)


//################################# AUTH API ##################################
// app.get('/authApi', (req, res) => {

// });

app.post('/authApi', async (req, res) => {
  // console.log();

  const id = req.body.id; // Extract TableId from request body

  try {

    let cart = {
      cart: [],
      totalItem: 0,
      totalAmount: 0
    }
    // Reference to the document in 'Table' collection
    const docRef = doc(db, 'Table', id);
    const docSnap = await getDoc(docRef);

    // Checked if the document exists
    if (docSnap.exists()) {
      const DocData = docSnap.data();
      // console.log('Document data:', DocData);
      // Reference to the document in 'Cart' collection
      const CartRef = doc(db, 'Cart', id);

      // Saved the data to the 'Cart' collection
      await setDoc(CartRef, cart, { merge: true });

      res.status(200).send('Document added to cart');
    } else {
      res.status(404).send('No such document in Table collection');
    }
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).send('Internal Server Error');
  };
})


//###################################  Product Api ####################################
// menu to show category
app.get('/productApi', async (req, res) => {

  const id = req.query.id;
  console.log(id);

  const Product = collection(db, "Product");
  const snapshot = await getDocs(Product);
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
})

// // adminaddproduct
// app.post('/productApi', async (req, res) => {
//   const { name, price, decs , category,imageURL } = req.body;

//   // Define the new product data
//   const newProduct = {id:category,name, price, decs ,imageURL};

//   try {
//     // Reference to the Firestore document
//     const docRef = doc(db, 'Product', category);

//     // Fetch the current document data
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // If the document exists, update it
//       const productData = docSnap.data();
//       if (!productData.product) {
//         productData.product = []; // Initialize product array if not present
//       }
//       productData.product.push(newProduct);

//       // Update the document with the new product list
//       await setDoc(docRef, productData);
//     } else {
//       // If the document doesn't exist, create a new one
//       const productData = { product: [newProduct] };
//       await setDoc(docRef, productData); 
//     }

//     // Send a success response
//     res.status(200).send({message:"Data added successfully"});

//   } catch (error) {
//     // Handle errors and send an error response
//     console.error("Error adding product: ", error);
//     res.status(500).send({error:"Product is not added"});
//   }
// });

// // ################################# SubmenuApi #################################
app.get('/submenuApi', async (req, res) => {
  // // get catergory id
  const tableid = req.query.tableid;
  const categoryid=req.query.categoryid;
  try {
    //Get particular data from submenu
    const docRef = doc(db, 'Product', categoryid);
    const docSnap = await getDoc(docRef);
    const Product = docSnap.data();

    //send data to the submenu component 
    res.status(200).json( {Product} );
  } catch (error) {
    console.log("Error occurs", error);
    res.status(200).send({ Error: "Error occurs" });
  }

});

app.post('/submenuApi', async (req, res) => {

});



// //################################## CartAPI ###################################
// fetch cart state
app.get('/cartApi', async (req, res) => {
 
  

  const id = req.query.id;
  // console.log(id);

  const Product = collection(db, "Cart");
  const snapshot = await getDocs(Product);
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// console.log(list);

if(list){
  res.status(200).send(list);
}
else{
  res.status(400).send("Internal server error!!")
}

// using table id get cart state for particular id
// and sent cart state to client
 
});

// // Addtocart
app.post('/cartApi', async (req, res) => {

  const { categoryid,  tableid ,name,price,amount } = req.body;


  const data = {
    categoryid ,name,price,amount
  }


  const quantity = Number.parseInt(amount);
  //get data from the  
  const CartRef = doc(db, 'Cart', tableid)

  const DocRef = await getDoc(CartRef);
  const CartData = DocRef.data();


  
  
  
  
  try {
    
    const itemIndex = CartData.cart.findIndex(item => item.id === data.categoryid);
    const ExistingProduct= CartData.cart[itemIndex];
// console.log(itemIndex)
    if (itemIndex !== -1 && quantity <= 0 ) {
      CartData.cart.splice(indexFound, 1);
      if (CartData.cart.length == 0) {
        CartData.cart.subTotal = 0;
      } else {
        CartData.cart[itemIndex].quantity += quantity;
        CartData.cart[itemIndex].total = CartData.cart[itemIndex].quantity * CartData.cart[itemIndex].price;

        // Update subtotal and other properties
        CartData.cart.subTotal = CartData.cart.map(item => item.total).reduce((acc, next) => acc + next, 0);
        CartData.totalItem = CartData.cart.length;
        CartData.totalAmount = CartData.cart.subTotal;
      }

    }
    //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
    else if (itemIndex >= 0){
     
      const quantity= ExistingProduct.quantity += 1;

     ExistingProduct.total = quantity * ExistingProduct.price;
      
     CartData.cart.subTotal = CartData.cart
      .map(item => item.total)
      .reduce((acc, next) => acc + next, 0);
      // // update totalItem
      CartData.totalItem = CartData.cart.map(item => item.quantity).reduce((acc, next) => acc + next, 0);
      CartData.totalAmount = CartData.cart.subTotal;
      await setDoc(CartRef, CartData);
      res.status(200).json({
        type: "success",
        message: "Product already Exist in Cart!!"
      })


    }
    //----Check if quantity is greater than 0 then add item to items array ----
    else if (quantity > 0) {
      CartData.cart.push({
       id:categoryid,
        name: name,
        quantity: quantity,
        price: data.price,
        total: parseInt(data.price * quantity)
      })
      CartData.cart.subTotal = CartData.cart
        .map(item => item.total)
        .reduce((acc, next) => acc + next, 0);

      // update totalItem
      CartData.totalItem = CartData.cart.map(item => item.quantity).reduce((acc, next) => acc + next, 0);
      CartData.totalAmount = CartData.cart.subTotal;
      await setDoc(CartRef, CartData);

      res.status(200).json({
        type: "success",
        message: "Product added sucessfully!!"
      })

    }
    //----If quantity of price is 0 throw the error -------
    else {
      return res.status(400).json({
        type: "error",
        message: "Invalid request"
      })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
  // Set the updated data in Firestore  
})

// // inc dec from cart  
app.put('/cartApi', async (req, res) => {

//  console.log(req);

  const { name, action, quantity, price, tableid,id } = req.body.data;

  console.log(action);

  const Qty = Number.parseInt(quantity);
  const CartRef = doc(db, 'Cart', tableid);
  const DocRef = await getDoc(CartRef);

  if (!DocRef.exists()) {
    console.error('Cart not found');
    return; // or send an error response
  }

  const CartData = DocRef.data();
  //  console.log(CartData);
  try {
    const itemIndex = CartData.cart.findIndex(item => item.id === id);
    const ExistingProduct= CartData.cart[itemIndex];
    // console.log(ExistingProduct)
    if (action === 'inc') {
  //     // Update item quantity and price
  const quantity= ExistingProduct.quantity += 1;

  ExistingProduct.total = quantity * ExistingProduct.price;
   
  CartData.cart.subTotal = CartData.cart
   .map(item => item.total)
   .reduce((acc, next) => acc + next, 0);
   // // update totalItem
   CartData.totalItem = CartData.cart.map(item => item.quantity).reduce((acc, next) => acc + next, 0);
   CartData.totalAmount = CartData.cart.subTotal;
   await setDoc(CartRef, CartData);
   res.status(200).json({
     type: "success",
     message: "Item quantity increased!!"
   })






  // //     // update totalitem and totalQnty

      CartData.totalItem = CartData.cart.map(item => item.quantity).reduce((acc, next) => acc + next, 0);
      CartData.totalAmount = CartData.cart.subTotal;
      await setDoc(CartRef, CartData);
    } else if (action === 'dec') {
      // console.log("hello")
  //     // Decrement logic
  if (ExistingProduct.quantity === 1 && action === 'dec') {
    console.log("hello");

    CartData.cart.splice(itemIndex, 1);
    CartData.cart.subTotal = CartData.cart
        .map(item => item.total)
        .reduce((acc, next) => acc + next, 0);
    CartData.totalItem = CartData.cart
        .map(item => item.quantity)
        .reduce((acc, next) => acc + next, 0);
    CartData.totalAmount = CartData.cart.subTotal;

    await setDoc(CartRef, CartData);
} else {
        const quantity= ExistingProduct.quantity -= 1;
      
  ExistingProduct.total = quantity * ExistingProduct.price;
   
  CartData.cart.subTotal = CartData.cart
   .map(item => item.total)
   .reduce((acc, next) => acc + next, 0);
   // // update totalItem
   CartData.totalItem = CartData.cart.map(item => item.quantity).reduce((acc, next) => acc + next, 0);
   CartData.totalAmount = CartData.cart.subTotal;
   await setDoc(CartRef, CartData);

    res.status(200).json({
      type: "error",
      message: "Item quantity decreased"
    })
 
   
      }

  //     
  //       // update totalitem and totalQnty

  
        
      

    } else {
      console.error('Invalid action');
      return res.status(500).json({
        type: "error",
        message: "Internal Server Error"
      });
    }

    

  } catch (error) {
    res.status(500).json({ error });  
  }}
)

// // delete from cart
app.delete('/cartApi', async (req, res) => {
  const { id, tableid } = req.body;
console.log(id);
  //GET data from the  CART 
  const CartRef = doc(db, 'Cart', tableid)
  const DocRef = await getDoc(CartRef);
  const CartData = DocRef.data();

  try {
    // Find the index of the item to remove
    const itemIndex = CartData.cart.findIndex(item => item.id=== id);

    if (itemIndex === -1) {
      return res.status(404).send('Item not found in cart');
    }

    // Remove the item from the cart
    CartData.cart.splice(itemIndex, 1);
    CartData.cart.subTotal = CartData.cart
        .map(item => item.total)
        .reduce((acc, next) => acc + next, 0);
    CartData.totalItem = CartData.cart
        .map(item => item.quantity)
        .reduce((acc, next) => acc + next, 0);
    CartData.totalAmount = CartData.cart.subTotal;

    await setDoc(CartRef, CartData);

    res.status(200).json({
      type: "success",
      message: "Product remove sucessfully!!"
    })
    // res.status(200).send('Item removed from cart successfully');
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({
      type: "error",
      message: "Internal Server Error"
    });
    res.status(500).send('Internal Server Error');
  }
})

// ######################################Cart Api #################################################### //
app.get('orderApi',async (req,res)=>{
  console.log(req);
  // const id = req.query.id;
  // console.log(id);

  // const Product = collection(db, "Product");
  // const snapshot = await getDocs(Product);
  // const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // res.send(list);
})



app.post('/orderApi',async (req,res)=>{
  // save form data + cart state + date + order
  const {name, mobile, note, email, categoryid, id}=req.body;
  console.log("data from form ",name,mobile,note,email,categoryid,id)
 
 const currentDate=new Date()
  
  try {
  //get data from the  Cart
  const CartRef = doc(db, 'Cart', id)

  const DocRef = await getDoc(CartRef);
  const CartData = DocRef.data();  

  // make Order Ref
  const OrderRef = doc(db, 'Order', id);

  // Saved the data to the 'Cart' collection
  const data={
    Order:[
      {
        Name:name,
        Mobile:mobile,
        Email:email,Note:note,
        CartData,
        totalAmount:CartData.totalAmount,
        totalItem:CartData.totalItem,
        Date:currentDate.toLocaleDateString(),
        Time:currentDate.toLocaleTimeString()
      }
      
    ] 
    
  }

  await setDoc(OrderRef, data, { merge: true });

  } catch (error) {  
    console.log("Error to do opreation",error)
  }


})





// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
