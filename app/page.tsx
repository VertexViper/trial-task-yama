import { redirect } from "next/navigation"

const LandingPage = () => {
  redirect("/auth")
}

export default LandingPage