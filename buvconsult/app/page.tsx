import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
    RegisterLink,
    LoginLink,
    LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {Hero} from "@/app/components/frontend/Hero";
import {Logos} from "@/app/components/frontend/Logos";
import {Features} from "@/app/components/frontend/Features";
import {PricingTable} from "@/app/components/shared/Pricing";
import {redirect} from "next/navigation";


export default async function Home() {

    const{getUser} = getKindeServerSession()
    const session = await getUser()

    if(session?.id){

        return redirect("/dashboard")
    }


  return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">

          <Hero/>
          <Logos/>
          <Features/>
          <PricingTable/>





      </div>

  )
}
