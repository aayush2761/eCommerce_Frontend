import React , {useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        try {
            getProductDetails();
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    },[])
    
    const getProductDetails= async()=>{
        try {
            let result = await fetch(`https://ecommerce-backend-402f.onrender.com/product/${params.id}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    const updateProduct = async () => {
        try {
            let result = await fetch(`https://ecommerce-backend-402f.onrender.com/product/${params.id}`,{
                method:"Put",
                body: JSON.stringify({name,price,category,company}),
                headers:{
                    'Content-Type' : "application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if(result) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='product'>
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputbox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
          

            <input type="text" placeholder='Enter product price' className='inputbox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
           

            <input type="text" placeholder='Enter product category' className='inputbox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            

            <input type="text" placeholder='Enter product company' className='inputbox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
          


            <button onClick={updateProduct} className='appbutton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;