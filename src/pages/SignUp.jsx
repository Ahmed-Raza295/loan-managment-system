import React, { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Button from '../components/Button';
import { supabase } from '../utils/supabseClient';
const SignUP = () => {

const [Email , setEmail] = useState("")
const [Password , setPassword] = useState("")
const [Message  , setMessage] = useState("")


const SignUpHandler = async(e)=>{
  e.preventDefault()
  try {
    const { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
    })

    if(error) throw error
    if(data){
      console.log(data)
      alert("Sign up succesfully and cofirm your email")
      setEmail("") 
      setPassword("") 
    }

  } catch (error) {
    
    setMessage(error.message);
    alert(Message)
  }
  

 




}








  return (
    <StyledWrapper>
      <div className="cover bg-slate-200 h-screen w-full flex items-center justify-center flex-col">
        <div className="titl-section ">
          <h1 className='text-4xl font-bold'>Create a new account</h1>
          <p className='text-center text-xl my-5'>Or <Link to={"/login"}><span className='text-blue-500'>signin to your existing account</span></Link></p>
        </div>
      <form className="form" onSubmit={SignUpHandler}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input required placeholder type="text" className="input" />
            <span>Firstname</span>
          </label>
          <label>
            <input required placeholder type="text" className="input" />
            <span>Lastname</span>
          </label>
        </div>  
        <label>
          <input required placeholder type="email" className="input" onChange={((e)=> setEmail(e.target.value))} />
          <span>Email</span>
        </label> 
        <label>
          <input required placeholder type="password" className="input" onChange={((e)=> setPassword(e.target.value))}/>
          <span>Password</span>
        </label>
        <label>
          <input required placeholder type="password" className="input" />
          <span>Confirm password</span>
        </label>
      
        <button className='submit'>Submit</button>
      </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 450px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    font-size: 1.2rem
  }

  .title {
    font-size: 28px;
    color: blue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 18px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default SignUP;
