import * as Yup from 'yup';
import { NavLink } from "react-router-dom";
import { logo } from "../../../assets";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signTwo } from '../../../assets';

const SignUpPartTwo = ({ stageTwoFormData, handleBackBtnClick }) => {
    const getCharacterValidationError = (str) => {
        return `Your password must have at least 1 ${str} character!`;
    };

    var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email('Must be a valid email!')
            .max(25)
            .required('Email is required!')
            .matches(/^(?!.*@[^,]*,)/),
        // TODO must also have a function to query the DB to check if username is already used and display the msg to the user
        username: Yup.string()
            .required('Username is required!')
            .matches(/^[a-zA-Z0-9]+$/, 'Special characters are not allowed!')
            .matches(/^(?!\s).*$/, 'No spaces allowed!')
            .min(3)
            .max(30),
        phone: Yup.string()
            .required("required")
            .matches(phoneRegEx, 'Phone number is not valid')
            .min(10, "Phone number is too short!")
            .max(10, "Phone number is too long!"),
        password: Yup.string()
            .required('Password is mandatory!')
            .min(8, 'Password must be at 8 char long!')
            .max(30, 'Password must be maximum 30 char long!')
            .matches(/[0-9]/, getCharacterValidationError("digit"))
            .matches(/[a-z]/, getCharacterValidationError("lowercase"))
            .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
            .matches(/[!@#$%^&*()-+]+/, getCharacterValidationError('special character')),
        confirmPwd: Yup.string()
            .required('Password is mandatory!')
            .oneOf([Yup.ref('password')], 'Passwords does not match!'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { isValid, errors } = formState

    const onSubmit = (data) => {
        if (isValid) {
            JSON.stringify(data, null, 4);
            console.log('Form data submitted:', data);
            stageTwoFormData(data.email, data.username, data.password, data.phone);
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 md:flex">
            <div className="flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0 md:w-[50%] md:border-r-2">
                <NavLink to='/'><img src={logo} alt='eventSync' className='w-[124px] h-[50px] mb-[20px]' /></NavLink>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your E-mail
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    {...register('email')} />
                                <div className="invalid-feedback text-red-700">{errors.email?.message}</div>
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="huh"
                                    {...register('username')} />
                                <div className="invalid-feedback text-red-700">{errors.username?.message}</div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="number"
                                    {...register('phone')} />
                                <div className="invalid-feedback text-red-700">{errors.phone?.message}</div>
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
                                    {...register('password')} />
                                <div className="invalid-feedback text-red-700">{errors.password?.message}</div>
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
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 ${`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                <div className="invalid-feedback text-red-700">{errors.confirmPwd?.message}</div>
                            </div>
                            <div className='flex'>
                                <button onClick={handleBackBtnClick}
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
            <div className=' flex-col items-center justify-center py-8 md:h-screen lg:py-0 md:w-[50%] hidden md:flex opacity-30'>
                {/* <Lottie animationData={animationData} /> */}
                <video
                    className=' w-full h-full object-cover object-center'
                    src={signTwo}
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>
            </div>
        </section>
    );
}

export default SignUpPartTwo;