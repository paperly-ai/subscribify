"use client"

import * as React from "react"

import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { createUser, loginUser } from "@/api/auth"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState({
    username: '',
    email: '',
    password: ''
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    try {
      setErrorMessage(null);
      const result = await createUser(userDetails.username, userDetails.email, userDetails.password);
      if (result) {
        navigate('/chat')
      }
    }
    catch (error: any) {
      toast.error("Error while login");
      setErrorMessage(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              value={userDetails.username}
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@gmail.com"
              value={userDetails.email}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*******"
              value={userDetails.password}
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Signup with Email
          </Button>
        </div>
        <div>
          {errorMessage && <p className="text-sm text-center mt-2 text-red-600">{errorMessage}</p>}
        </div>
      </form>

    </div>
  )
}
