import { redirect } from "next/navigation"

const AuthPage = () => {
  redirect("/auth/signin")
}

export default AuthPage