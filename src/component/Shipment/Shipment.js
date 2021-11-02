import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
   const { register, handleSubmit, watch, formState: { errors } } = useForm();
   const onSubmit = data => console.log(data);
   console.log(watch("example"));  
 
   const [LoggedInUser] = useContext(userContext);

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