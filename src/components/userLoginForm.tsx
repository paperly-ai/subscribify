"use client"

import * as React from "react"

import { Icons } from "./ui/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast"
import { loginUser } from "@/api/auth"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState({
    email: '',
    password: ''
  })
  const guestCredentials = {
    email: 'guest@gmail.com',
    password: 'guest@paperly-ai'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };


  const getGuestCredentials = () => {
    setUserDetails(guestCredentials);
    toast.success('Guest credentials entered.', {
      position: "bottom-center"
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    try {
      setErrorMessage(null);
      const result = await loginUser(userDetails.email, userDetails.password);
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
            Sign In with Email
          </Button>
        </div>
        <div>
          {errorMessage && <p className="text-sm text-center mt-2 text-red-600">{errorMessage}</p>}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or get
          </span>
        </div>
      </div>
      <Button onClick={getGuestCredentials} variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaUser className="mr-2 h-4 w-4" />
        )}{" "}
        Guest Credentials
      </Button>
    </div>
  )
}
