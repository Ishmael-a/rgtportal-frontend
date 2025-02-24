import RgtIcon from "../assets/images/RGT TRANSPARENT 1.png"
import RgtWoman from "../assets/images/envato-labs-image-edit (5) 2.png"
import RgtIconSmall from "../assets/images/RGT PATTERN 1.png"
import GoogleIcon from "../assets/logos/Google.svg"

const Login = () => {
  return (
    <div className="w-full min-h-screen flex rounded-xl">
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
        <div className="text-left ">
       
          <div className="flex  w-full justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <p className="text-xs ">Forgot Password?</p>
          </div>
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
          className=" flex w-full text-black rounded-md py-2 hover:bg-white  gap-7 text-center justify-center"
        >
         Continue with Google <img src={GoogleIcon}></img>
        </button>
      </form>
      </div>

        </div>
        <div className="w-[675px] bg-purpleaccent2 text-center px-20 pb-20  flex flex-col justify-center">
        <div className="relative flex justify-end mr-8">
          <img className='absolute w-[123px] h-[128px] top-[-75px]' src={RgtIconSmall} alt="Pattern" />
          <div className='w-[81px] h-[71px] rounded-[8px] bg-rgtpurple'></div>
        </div>

        <div className="relative mt-2 mx-auto">
          <div className="bg-rgtpurpleaccent2 w-[294px] h-[342px] rounded-t-[426px]"></div>
          <div className="w-[800px] absolute top-[-150px] left-[380px] -translate-x-1/2">
            <img
              src={RgtWoman}
              className="  "
              alt="Envato"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
