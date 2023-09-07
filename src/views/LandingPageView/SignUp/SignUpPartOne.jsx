import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { logo } from '../../../assets';
import { countries } from '../../../constants/countries';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signOne } from '../../../assets';

const SignUpPartOne = ({ stageOneFormData }) => {


  const userSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is mandatory.')
      .min(1, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    lastName: Yup.string().required('Last name is mandatory.')
      .min(1, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    country: Yup.string().required('Country is mandatory.').oneOf(countries.map(country => country.code), 'Invalid country selected.'),
  })

  const formOptions = { resolver: yupResolver(userSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { isValid, errors } = formState;

  const onSubmit = (data) => {
    if (isValid) {
      JSON.stringify(data, null, 4)
      console.log('Form data submitted:', data);
      stageOneFormData(data.firstName, data.lastName, data.country)
    }
  }


  return (

    <section className="bg-gray-50 dark:bg-gray-900 md:flex">
      <div className="flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0 md:w-[50%] md:border-r-2">
        <NavLink to='/'><img src={logo} alt='eventSync' className='w-[124px] h-[50px] mb-[20px]' /></NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Start of the reg process
            </h1>
            { }
            <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Party Monster"
                  {...register('firstName')} />
                <div className="invalid-feedback">{errors.firstName?.message}</div>
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your lastname
                </label>
                <input
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  placeholder="e.g Level100"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('lastName')}
                />
                <div className="invalid-feedback">{errors.lastName?.message}</div>
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <select
                  {...register('country')}
                  name="country"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code} >
                      {country.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.country?.message}</div>
              </div>
              <div className="flex justify-between">
                {/* we can change the button with a back icon or something */}
                <NavLink to='/'>
                  <button
                    type='submit'
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Back
                  </button>
                </NavLink>
                <button
                  type='submit'
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Continue
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
          src={signOne}
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
    </section>
  );
};

export default SignUpPartOne;
