"use client"

import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async ({username, password}) => {
    const res = fetch({
      
      pathname: '/'
    })
    console.log(data)
  };

//   console.log(watch("password")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <input type="text" placeholder="Username" {...register("username", {required: true})} />
      {errors.username && <span>This field is required</span>}
      
      <input type="password" placeholder="Password" {...register("password", { required: true })} />
      {watch("password")?.length < 8 && <span>Password needs to be longer</span>}
      {JSON.stringify(errors.password)}
      
      <input type="submit" />
    </form>
  );
}