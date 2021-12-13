import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';
import toast from "react-hot-toast";
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useHistory } from 'react-router';

const Shipment = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   let history = useHistory();
 
   const [LoggedInUser] = useContext(userContext);

   const onSubmit = data => {
    const saveToCart = getDatabaseCart();
    const orderDetail = {...LoggedInUser, product: saveToCart, shipment: data, orderTime: new Date() };
    fetch('http://localhost:5000/addOrder',{
      method: 'POST',
      headers: { 
        'Content-Type':'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      if(data.insertedId){
        toast.success('Successfully place order');
        history.push('/shop');
        processOrder();
      }
    })
    
 };

   return (
     <form className='shipment' onSubmit={handleSubmit(onSubmit)}>       
       <input defaultValue={LoggedInUser.name} {...register("Name", { required: true })} />
       {errors.Name && <span className='error'>Name is required</span>}

       <input defaultValue={LoggedInUser.email} {...register("Email", { required: true })} />
       {errors.Email && <span className='error'>Email is required</span>}

       <input placeholder="Enter Your Address" {...register("Address", { required: true })} />
       {errors.Address && <span className='error'>Address is required</span>}

       <input placeholder="Enter Your Phone Number" {...register("Phone", { required: true })} />
       {errors.Phone && <span className='error'>Phone is required</span>}
       
       <input type="submit" />
     </form>
   );
 };
 

export default Shipment;