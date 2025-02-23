import RgtIcon from "../assets/images/RGT TRANSPARENT 1.png"
import RgtWoman from "../assets/images/envato-labs-image-edit (5) 2.png"
import RgtIconSmall from "../assets/images/RGT PATTERN 1.png"

const Login = () => {
  return (
    <div className="w-full min-h-screen flex">
        <div className="w-1/2 flex flex-col text-center items-center h-screen">
          <div className="w-[453px]  items-center justify-center  h-screen">

            <div className="flex flex-col items-center justify-center gap-9">
              <img src= {RgtIcon}></img>
           <div className=" flex flex-col gap-3">
           <h2 className="text-xl font-semibold ">Welcome Back</h2>
           <h5 className="text-sm">get into your account to begin</h5>
           </div>
            </div>
      <form className="space-y-4 gap">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="text"
            name="Email address"
            placeholder="Email address"
            className="border rounded-md w-full p-2"
          />
        </div>
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*****"
            className="border rounded-md w-full p-2"
          />
        </div>
       
        <button
          type="submit"
          className="w-full bg-rgtpink text-white rounded-md py-2 hover:bg-rgtpink"
        >
          Sign in
        </button>

        <h2 >OR </h2>
        <button
          type="submit"
          className="w-full text-black rounded-md py-2 hover:bg-white "
        >
         Continue with Google
        </button>
      </form>
      </div>

        </div>
        <div className="w-1/2 bg-purpleaccent2 text-center items-center h-screen">
            This is the images section
         <div className="items-justify-center">
          <img src= {RgtIconSmall} ></img>
          <img src ={RgtWoman}></img>
         </div>
        </div>
    </div>
  )
}

export default Login
