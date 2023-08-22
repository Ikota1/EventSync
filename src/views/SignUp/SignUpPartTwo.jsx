import { NavLink } from "react-router-dom";
import { logo } from "../../assets";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const SignUpPartTwo = ({ stageTwoFormData, handleBackBtnClick }) => {
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mandatory')
            .min(8, 'Password must be at 8 char long'),
        confirmPwd: Yup.string()
            .required('Password is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
         email: Yup.string().email('Must be a valid email').max(30).required('Email is required')
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { isValid, errors } = formState

    const  onSubmit = (data) => {
        if(isValid) {
          JSON.stringify(data, null, 4)
          console.log('Form data submitted:', data);
          stageTwoFormData(data.email, data.password)
         }
      } 

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <NavLink to='/'><img src={logo} alt='eventSync' className='w-[124px] h-[50px] mb-[20px]' /></NavLink>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    {...register('email')}

                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 ${`form-control ${errors.password ? 'is-invalid' : ''}`} sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    {...register('password')}

                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Verify Password
                                </label>
                                <input
                                    type="password"
                                    name="verifypwd"
                                    placeholder="••••••••"
                                    {...register('confirmPwd')}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 ${`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}

                                />
                                <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>

                            </div>

                            <div className='flex'>
                              
                                    <button onClick={handleBackBtnClick}
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Back
                                    </button>
                                  
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create Account
                                </button>


                            </div>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already got account? <NavLink to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUpPartTwo