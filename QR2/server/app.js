const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { doc } = require("firebase/firestore");
const  {db,Product,Cart,Table }  = require('./config');
const { getDocs, collection,getDoc,setDoc } = require('@firebase/firestore');

require('dotenv').config();


app.use(cors());
app.use(express.json());


// AUTH API
app.get('/authApi', (req, res) => {
  res.send({hello:"hello"});
});

app.post('/authApi',async (req, res) => {

  try {
    const TableId = req.body.TableId; // Extract TableId from request body
    const id = TableId;

  let cart={
    cart:[],
    totalItem:0,
    totalAmount:0
  }

    // Reference to the document in 'Table' collection
    const docRef = doc(db, 'Table', id);
    const docSnap = await getDoc(docRef);

    // Checked if the document exists
    if (docSnap.exists()) {
      const DocData = docSnap.data();
      console.log('Document data:', DocData);
      // Reference to the document in 'Cart' collection
      const CartRef = doc(db, 'Cart',id);

      // Saved the data to the 'Cart' collection
      await setDoc(CartRef,cart, { merge: true });

      res.status(200).send('Document added to cart');
    } else {
      res.status(404).send('No such document in Table collection');
    }
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).send('Internal Server Error');
  }



});

// Product Api
app.get('/productApi',async(req,res)=>{
  const Product = collection(db, "Product");
  
  const snapshot = await getDocs(Product);
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.send(list);
})

app.post('/productApi',(req,res)=>{
   
})


// CartAPI
app.get('/cartApi', async (req, res) => {
  //get all data from the 'CART' database 
 const snapshot = await getDocs(Cart);
 const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
 //Set data as response
 res.send(list);
});

app.post('/cartApi', async (req, res) => {
 const {id,Name,Amount,Price,tableId} = req.body;


 const data={
  id,Name,Amount,Price,tableId
 }

//get data from the  
  const CartRef=doc(db,'Cart',tableId)

  const DocRef=await getDoc(CartRef);
  const CartData=DocRef.data();

  try {

    const itemIndex = CartData.cart.findIndex(item => item.id === data.id);
  
    if (itemIndex !== -1) {
      // Item exists, update its quantity and price
      CartData.cart[itemIndex].Amount += data.Amount;
      CartData.cart[itemIndex].Price += data.Price;
    } else {
      // Item does not exist, add it to the cart
      CartData.cart.push(data);
    }
       CartData.totalItem += data.Amount; // Update totalItem
      CartData.totalAmount += data.Price; // Update totalAmount
  
    // Set the updated data in Firestore
    await setDoc(CartRef, CartData);
    
    res.status(200).send('Cart updated successfully');  
  } catch (error) {
    console.log(error);
  }

});

app.put('/cartApi',async(req,res)=>{
   const {id,Name,Amount,Price,action}=req.body;
 
   const CartRef=doc(db,'Cart',id)

  const DocRef=await getDoc(CartRef);
  const CartData=DocRef.data();

  try {
   
    const itemIndex = CartData.cart.findIndex(item => item.id === id);

    if (action=="Inc") {
      // Item exists, update its quantity and price
      CartData.cart[itemIndex].Amount +=Amount;
      CartData.cart[itemIndex].Price += Price;

      CartData.totalItem += Amount; // Update totalItem
      CartData.totalAmount += Price; // Update totalAmount
    }

    if (action=="Dec") {
      // Item exists, update its quantity and price
      CartData.cart[itemIndex].Amount -=Amount;
      CartData.cart[itemIndex].Price -= Price;

      CartData.totalItem -= Amount; // Update totalItem
      CartData.totalAmount -= Price; // Update totalAmount
    }


   res.status(200).send("cart status updated !!!!");


  } catch (error) {
    console.log('Error occurs:' , error)
    res.status(500).send('Internal Server Error');
  }
      
   
})

app.delete('/cartApi',async(req,res)=>{
  const {id,Name,Amount,Price}=req.body;
  
  const data={
    id,Name,Amount,Price
   }
  //GET data from the  CART 
  const CartRef=doc(db,'Cart',id)

  
  const DocRef=await getDoc(CartRef);
  const CartData=DocRef.data();





  try {

   const updatedCart = CartData.cart.findIndex(item => item.id !== id);




   CartData.cart.push(updatedCart);
   CartData.totalItem -= data.Amount; // Update totalItem
   CartData.totalAmount -= data.Price; // Update totalAmount

   await setDoc(CartRef, CartData);
   
    res.status(200).send('Document Deleted sucessfully');
  } catch (error) {
    console.log('Error occurs:' , error)
    res.status(500).send('Internal Server Error');  
  }

})


//BUYApi
app.get('/buyApi', (req, res) => {


});

app.post('/buyApi', (req, res) => {
//save data to order data base 
 try {

  
 } catch (error) {
  console.log('Error occurs:' , error)
  res.status(500).send('Internal Server Error');
 }

});

// orderapi
app.get('/orderApi', (req, res) => {

// fetch data from the order database and show it on admin dashboard as well as chief
});

app.post('/orderApi', (req, res) => {
//save admin action proceed to bill then make Proceed_to_bill=="OK";
// in cheif if action == completed then field order=="completed"
 try {

  
 } catch (error) {
  console.log('Error occurs:' , error)
  res.status(500).send('Internal Server Error');
 }

});




// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
