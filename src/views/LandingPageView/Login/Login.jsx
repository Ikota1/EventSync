import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/auth.service';
import { getUserRole } from '../../../services/user.services';
import { logo } from '../../../assets/'
import { USER_ROLES } from '../../../constants/userRoles';
import toast from 'react-hot-toast'

const Login = () => {
  const { setAuthState } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const credential  = await loginUser(form.email, form.password);


      const userRole = await getUserRole(credential.user.uid);
  
      
      //TODO need to add better alert message
      if (userRole === USER_ROLES.Blocked) {
        toast.error('Your account is blocked. Contact support for assistance.');
        return; // Prevent login
      }

      toast.success('Login Successful')

      setAuthState({
        user: credential.user,
      });
      navigate('/application/dashboard');
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to log in. Please try again.');
    }

  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink to='/'>
          <img src={logo} alt='eventSync' className='w-[124px] h-[50px] mb-[20px]' />
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
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
                  value={form.email}
                  onChange={updateForm('email')} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={form.password}
                  onChange={updateForm('password')} />
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
                <button onClick={onLogin}
                  type='submit'
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Login
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have account? <NavLink to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
              </p>
            </form>
          </div>
        </div>
       
      </div>
    </section>
  )
}

export default Login