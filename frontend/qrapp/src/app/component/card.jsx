export default function Card({tableId,id, Name, Amount, Price }){
//addtocart
const handleAddToCart=async ({tableId,id,Name,Amount,Price})=>{
   const data={
    id,Name,Amount,Price,tableId
   }

    try {
        
        const response = await fetch('http://localhost:4000/cartApi', { // Update with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Server response:', result);
  } catch (error) {
    console.error('Error sending data:', error);
}
}


return (
    <>
          <div key={id} className="bg-white p-4 border border-black h-96 flex justify-center items-center flex-col rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{Name}</h2>
            <p className="text-gray-700">{Amount}</p>
            <p className="text-gray-900 font-semibold">${Price.toFixed(2)}</p>
            <button className="bg-pink-700 text-white w-64 h-12 mt-4" onClick={() => handleAddToCart({tableId,id,Name,Amount,Price})}>
              Add to cart
            </button>
          </div>
    </>
)
} 