import React, { useState, type SubmitEvent } from "react";
import { AuthHeading, Button, Input, Label, Loading } from "../../components";
import { Link } from "react-router-dom";
import { instance } from "../../hooks";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true);
    evt.preventDefault();
    const data = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    instance().post("/auth/login", data).then(() => {
      toast.success(`Successfully logged in`)
    }).catch(() => toast.error("Something went wrong")).finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-2.5 bg-[#8b1e1e]" />
      <div className="absolute bottom-0 right-0 w-full h-2.5 bg-[#d4a017]" />

      <div className="relative w-full max-w-xl bg-[#c7c0b1] border border-black flex">

        <div className="w-20 bg-black text-[#c7c0b1] flex items-center justify-center relative">
          <span className="-rotate-90 text-[9px] tracking-[0.4em] uppercase font-bold">
            Secure Node 25
          </span>
        </div>

        <div className="flex-1 p-8 relative">

          <div className="absolute top-2 right-8 text-[80px] font-black opacity-[0.04] select-none">
            ACCESS
          </div>

          <AuthHeading lines={['Identify', 'Yourself']} />

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-8">

            <div className="relative">
              <Label content="Email" />
              <Input type="email" placeholder="you@example.com" name={"email"} />
            </div>

            <div className="relative">
              <Label content="Password" />
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" name="password" extraClass="focus:border-[#d4a017]!" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className=" absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold tracking-widest text-[#333] hover:text-[#8b1e1e] transition-colors duration-200 cursor-pointer " >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <Button type="submit">
              {loading ? <Loading /> : "Enter"}
            </Button>

          </form>

          <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[#444] flex justify-between items-center">
            <span>Authority Required</span>
            <Link to="/register" className="hover:text-[#8b1e1e] hover:underline ml-4">
              New Here? Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
