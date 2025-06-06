
//05:38
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {SubmitButton} from "@/app/components/dashboard/SubmitButtons";
import {DeletePost} from "@/app/actions";

export default function DeleteForm({params}:
{params: {siteId:string, articleId:string}
}){



    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="min-w-xl">
                <CardHeader>
                    <CardTitle>Are you absolutely sure?</CardTitle>
                    <CardDescription>This action cannot be undone. This will delete
                        this article and remove all data from our sever</CardDescription>

                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
                        </Button>
                    <form action={DeletePost}>

                        <input type="hidden" name="articleId" value={params.articleId}/>
                        <input type="hidden" name="siteId" value={params.siteId}/>
                        <SubmitButton variant="destructive" text="Delete Article"/>
                    </form>


                </CardFooter>

            </Card>

        </div>

    )


}