import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { emptyCart } from '../redux/slices/cartSlice';






function Cart() {
  const cartArray = useSelector((state)=>state.cartReducer)
  /* console.log(cartArray); */
  const dispatch = useDispatch()
  const [total,setTotal]=useState(0)
  const navigate = useNavigate()

  const getTotal=()=>{
   if(cartArray.length>0){
    setTotal(cartArray?.map(item=>item.price).reduce((p1,p2)=>p1+p2))
   }
   else{
    setTotal(0)
   }
  }
  useEffect(()=>{
    getTotal()
  },[cartArray])

  const handlecart =()=>{
    alert('Order placed')
    dispatch(emptyCart())
    navigate('/')
  }

  return (
    <div style={{marginTop:'150px',marginBottom:'100px'}}>
    {cartArray?.length>0?
<div className='row w-100'>

<div className='col-lg-6 m-5'>
  <table className='table border shadow'>
    <thead>
      <tr>
        <th>#</th>
        <th>Product</th>
        <th>image</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {cartArray?.map((item,index)=>(<tr>
        <td>{index+1}</td>
        <td>{item.title}</td>
        <td><img style={{height:'100px',width:'100px'}} src={item.image} alt="" /></td>
        <td>{item.price}</td>
        <td><Button onClick={()=>dispatch(removeFromCart(item.id))} variant="outline-danger rounded"><i class="fa-solid fa-trash text-danger"></i></Button></td>
      </tr>))
        }
    </tbody>
  </table>
</div>
  <div className='col-lg-4 d-flex justify-center align-items-center flex-column'>
    <div className='border shadow p-5'>
      <h2>cart summary</h2>
      <h4>total number of products:7</h4>
      <h4>total price: {total}</h4>
      <Button onClick={handlecart} className='btn btn-success rounded w-100 mt-3'>checkout</Button>
    </div>
  </div>
  </div> :<div style={{height:'100vh'}} className='d-flex flex-column justify-content-center align-items-center'>
<img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="no image"height={'300px'} />
<h4 className='text-danger mt-3'>your wishList is empty</h4>
<button  className='btn btn-success rounded mt-3'> <Link style={{textDecoration:'none',color:'white'}} to={'/'}>back to Home</Link></button>
</div>}

</div>
)
}

export default Cart