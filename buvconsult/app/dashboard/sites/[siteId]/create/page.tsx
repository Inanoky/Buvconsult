import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

export default function ArticleCreationRoute({params,}:{params: {siteId:string}}){

    return(

        <>
        <div className="flex items-center">
            <Button size ="icon" variant="outline" className="mr-3" asChild>
                <Link href={`/dashboard/sites/${params.siteId}`}>

                    <ArrowLeft className="size-4"/>

                </Link>
            </Button>
            <h1 className="text-xl font-semibold">Create Article</h1>

        </div>

        </>

    )
}
