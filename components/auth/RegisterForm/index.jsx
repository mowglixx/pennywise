"use client"

import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import BCrypt from 'bcrypt';


export default function RegisterForm() {
  const [submittedUsername, setSubmittedUsername] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = ({username, password, email}) => {
    fetch('/api/auth/register', {
      method: 'put',
      body: JSON.stringify({
        username, email, password
      })
    }).then((res) => res.json()).then(json =>{
      if(json?.status === 'ok'){
        setSubmittedUsername(json.username)
      }
    })
  };

//   console.log(watch("password")); // watch input value by passing the name of it
// {submittedUsername?.length && redirect(`/login?username=${submittedUsername}`)}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      {submittedUsername?.length > 0 && redirect(`/login?username=${submittedUsername}`)}

      <input type="text" placeholder="Username" {...register("username", {required: true})} />
      {errors.username && <span>This field is required</span>}
      
      <input type="email" placeholder="Email" {...register("email", {required: true})} />
      {errors.email && <span>This field is required</span>}
      
      <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 8 })} />
      {watch("password")?.length < 8 && <span>Password needs to be longer</span>}
      {JSON.stringify(errors.password)}
      
      <input type="password" placeholder="Confirm Password" {...register("password_confirm", { required: true })} />
      {watch("password") !== watch("password_confirm") && <span>Passwords do not match</span>}
      {errors.password_confirm && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}