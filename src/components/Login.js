import React , {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate=useNavigate();

    //  localStorage.getItem('user') checks if the user is logged in.
    //  If auth exists, the user is redirected to / (home).
        useEffect(()=>{
            const auth=localStorage.getItem('user');
            if(auth){
                navigate('/')
            }
        })

    const handlelogin=async()=>{
        console.warn(email,password);
        let result =await fetch('https://ecommerce-ayu1.onrender.comlogin' , {
            method:'post',
            body:JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user" , JSON.stringify(result));
            
            
            navigate("/");

        }else{
            alert("please enter correct details");
        }
    }

    return(
        <div className='login'>
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>Login</h1>
            <input type='text' className ="inputbox" placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value ={email}/>
            <input type='password' className ="inputbox"  placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}  value={password}/>
            <button onClick={handlelogin} className="appbutton" type ="button">Login</button>
        </div>
    )
}

export default Login