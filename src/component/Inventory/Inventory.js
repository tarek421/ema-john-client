import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
   const handleAddProduct = () => {
      fetch('http://localhost:5000/addProduct',{
         method: 'POST',
         body: JSON.stringify(fakeData),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then(res => res.json())
      .then(data =>{
         console.log(data);
      })
      .catch((err)=>{
         console.log(err);
      })
   }
   return (
      <div>
         <button onClick={handleAddProduct}>AddProduct</button>
      </div>
   );
};

export default Inventory;