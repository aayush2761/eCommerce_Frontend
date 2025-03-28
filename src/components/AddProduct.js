import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);

    const addProduct = async () => {

        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }

        try {
            const userData = localStorage.getItem('user');
            if (!userData) {
                console.error('No user data found');
                return;
            }
            const userId = JSON.parse(userData)._id;
            
            let result = await fetch("https://ecommerce-ayu1.onrender.com/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            result = await result.json();
            console.warn(result);
        } catch (error) {
            console.error('Error adding product:', error);
        }

    }

    return (
        <div className='product'>
           <h1 style={{ textAlign: "center", marginTop: "50px" }}>Add Product</h1>

            <input type="text" placeholder='Enter product name' className='inputbox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputbox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter product category' className='inputbox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>} 

            <input type="text" placeholder='Enter product company' className='inputbox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appbutton'>Add Product</button>
        </div>
    )
}

export default AddProduct;
