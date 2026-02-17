import React, { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthHeading, Button, Input, Label, Loading } from "../../components";
import { RegisterFc } from "../../services";

export interface RegisterDataInterface {
  name: string,
  email: string,
  password: string,
  avatar: string
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true);
    evt.preventDefault();
    const data: RegisterDataInterface = {
      name: evt.target.fullname.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    }
    RegisterFc(data, navigate, setLoading)
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-2.5 bg-[#8b1e1e]" />
      <div className="absolute bottom-0 right-0 w-full h-2.5 bg-[#d4a017]" />

      <div className="sector-boot relative w-full max-w-xl bg-[#c7c0b1] border border-black flex">
        <div className="crt-sweep-line" />
        <div className="crt-static" />
        <div className="w-20 bg-black text-[#c7c0b1] flex items-center justify-center relative">
          <span className="-rotate-90 text-[9px] tracking-[0.4em] uppercase font-bold">
            Registration Node 25
          </span>
        </div>

        <div className="flex-1 p-8 relative">

          <div className="absolute top-2 right-8 text-[80px] font-black opacity-[0.04] select-none">
            REGISTER
          </div>
          <div className="crt-heading">
            <AuthHeading lines={['Create', 'Identity']} /></div>

          <form onSubmit={handleSubmit} autoComplete="off" className="crt-content space-y-6">

            <div className="relative">
              <Label content="Full name" />
              <Input type="text" placeholder="YOUR NAME" name="fullname" />
            </div>

            <div className="relative">
              <Label content="Email" />
              <Input type="email" placeholder="you@example.com" name="email" />
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

            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#333]">
              <label className="relative flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="appearance-none w-4 h-4 border-2 border-black hover:border-[#8b1e1e] checked:bg-[#8b1e1e] checked:border-[#8b1e1e] cursor-pointer"
                />
                {checked && (
                  <span className="absolute -left-px w-5 h-5 flex items-center justify-center text-[#c7c0b1] text-[14px] font-bold">
                    ✓
                  </span>
                )}
                <span className="ml-3 select-none hover:text-[#8b1e1e]">Accept Terms</span>
              </label>
            </div>

            <Button type="submit">
              {loading ? <Loading /> : "Create Identity"}
            </Button>

          </form>

          <div className="mt-10 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#555]">
            <span>Sector 25</span>
            <Link to="/login" className="hover:text-[#8b1e1e] hover:underline ml-2" >
              Already have an account? Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
