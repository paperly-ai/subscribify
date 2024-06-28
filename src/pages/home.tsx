import { Button } from '@/components/ui/button'
import { CiLogin } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

      <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 md:text-5xl text-3xl font-semibold">Paperly-Ai</h1>
            </div>

            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers and professionals to instantly
              answer questions and understand research with AI
            </p>

            <div className="w-full mt-4">
              <Link to="/sign-in">
                <Button>
                  Login to get Started!
                  <CiLogin className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
