import { Button } from '@/components/ui/button'
import { UserAuthForm } from '@/components/userLoginForm'
import { UserSignUpForm } from '@/components/userSignUpForm'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function LoginPage() {
  const { } = useAuth();
  const navigation = useNavigate();
  const [authForm, setAuthForm] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const toggleForms = () => {
    setAuthForm(!authForm);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigation('/chat');
    }
  })


  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error) {
      setError(decodeURIComponent(error))
      toast.error(decodeURIComponent(error));
    }

    window.history.replaceState({}, '', window.location.pathname)
  }, [])


  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-black"
          >
            <div className="fixed left-4 top-4 mb-10 flex items-center justify-center">
              <img
                src="/logo-dark.png"
                height={75}
                width={75}
                alt="SRM AP"
              />
            </div>
            <div className='flex items-center justify-center flex-col h-screen text-center'>
              <div className="flex items-center">
                <h1 className="mr-3 md:text-5xl text-3xl font-semibold">Paperly-Ai</h1>

              </div>

              <p className="max-w-xl mt-1 text-lg text-slate-100">
                Join millions of students, researchers and professionals to instantly
                answer questions and understand research with AI
              </p>
            </div>


          </div>
        </div>
        <Button
          variant={'ghost'}
          onClick={toggleForms}
          className={
            "absolute right-4 top-4 md:right-8 md:top-8"
          }
        >
          {authForm ? "Signup" : "Login"}
        </Button>
        <div className="flex h-screen items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[500px]">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                height={100}
                width={100}
                alt="Paperly AI"
              />
            </div>
            <div className="flex flex-col space-y-2 text-center">
            </div>
            {authForm ? <UserAuthForm /> : <UserSignUpForm />}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By continuing, you are indicating that you accept our Terms of
              Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
