import { useState } from 'react';
import { useFormik, Field, Form as FormikForm, Formik, FieldInputProps } from 'formik';
import rgtIcon from "../assets/images/RGT TRANSPARENT 1.png"
import rgtPattern from "../assets/images/RGT PATTERN 1.png"
import google from "../assets/images/Google.png"
import envato from "../assets/images/envato-labs-image-edit (5) 2.png"
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import { Mail, Lock } from "lucide-react";

interface FormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
})

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)


  const initialFormValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values: FormValues) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <div className="w-full min-h-screen overflow-hidden flex rounded-3xl ">
      {/* Left Side: Login Form */}
      <div className=" bg-white flex flex-col justify-center items-center px-8 flex-grow">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={rgtIcon} alt="Logo" />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">get into your account to begin.</p>
          </div>

          <Formik
            initialValues={initialFormValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <FormikForm className="space-y-4">
                <div className="space-y-3 flex flex-col">
                  <label htmlFor="email" className="text-sm font-bold">Email address</label>
                  <Field name="email">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className={`w-full py-[10px] px-4 ${touched.email && errors.email ? 'border-red-500' : ''}`}
                        />
                        {touched.email && errors.email && (
                          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="space-y-3 flex flex-col">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-bold">Password</label>
                    <a href="#" className="text-sm text-pink-500 hover:text-pink-600">Forgot Password?</a>
                  </div>
                  <Field name="password">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={isPasswordVisible ? "text":"password"}
                            placeholder="••••••"
                            {...field}
                            className={`w-full py-[10px] px-4 ${touched.password && errors.password ? 'border-red-500' : ''}`}
                          />
                          {isPasswordVisible ?
                            <Eye
                              onClick={() => setPasswordVisible(currentVal => !currentVal)}
                              className="text-gray-600 absolute left-102 top-[50%] -translate-y-1/2 input-icon"
                            />:
                            <EyeOff
                              onClick={() => setPasswordVisible(currentVal => !currentVal)}
                              className="text-gray-600 absolute left-102 top-[50%] -translate-y-1/2 input-icon"
                            />
                          }
                        </div>
                        {touched.password && errors.password && (
                          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <Button
                  type="submit"
                  className="w-full py-[10px] px-4 bg-rgtpink hover:bg-pink-500 text-white rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </FormikForm>
            )}
          </Formik>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-3 px-[10px] flex items-center justify-center gap-2 border rounded-md hover:bg-gray-50"
          >
            Continue with Google
            <img src={google} alt="Google" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Right Side: Pattern and Image */}
      <div className="w-[675px] bg-purpleaccent2 text-center px-20 pb-20  flex flex-col justify-center">
        <div className="relative flex justify-end mr-8">
          <img className='absolute w-[123px] h-[128px] top-[-75px]' src={rgtPattern} alt="Pattern" />
          <div className='w-[81px] h-[71px] rounded-[8px] bg-rgtpurple'></div>
        </div>

        <div className="relative mt-2 mx-auto">
          <div className="bg-rgtpurpleaccent2 w-[294px] h-[342px] rounded-t-[426px]"></div>
          <div className="w-[800px] absolute top-[-150px] left-[380px] -translate-x-1/2">
            <img
              src={envato}
              className="  "
              alt="Envato"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
