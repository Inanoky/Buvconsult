import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Book, FileIcon, MoreHorizontal, PlusCircle, Settings} from "lucide-react";
import {prisma} from "@/app/utils/db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TableCell, Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from 'next/image'
import {Badge} from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {EmptyState} from "@/app/components/dashboard/EmptyState";

async function getData(userId:string, siteId:string){
    // const data = await prisma.post.findMany ({
    //     where:{
    //         userId: userId,
    //         siteId: siteId,
    //     },
    //     select:{
    //         image: true,
    //         title: true,
    //         createdAt: true,
    //         id: true,
    //         Site: {
    //             select: {
    //                 subdirectory: true
    //             }
    //         }
    //     },
    //     orderBy:{
    //         createdAt: 'desc'
    //     }
    //     }
    // )

    const data = await prisma.site.findUnique({
        where: {
            id: siteId,
            userId: userId,
        },
        select: {
            subdirectory:true,
            posts: {
                select: {
                    image: true,
                    title: true,
                    createdAt: true,
                    id: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    return data
}

export default async function SiteIdRoute({params}:

{params : Promise <{siteId:string}>

}){

    const {siteId} = await params


    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if(!user){
        return redirect("/api/auth/login")
    }

    const data = await getData(user.id, siteId);



    return (
        <>
            <div className="flex w-full justify-end gap-x-4">
                <Button asChild variant="secondary">
                    <Link href={`/blog/${data?.subdirectory}`}>
                     <Book className="size-4 mr-2"/>
                        View Blog </Link>


                </Button>
                 <Button asChild variant="secondary">
                     {/* 05:53*/}
                    <Link href={`/dashboard/sites/${siteId}/settings`}>
                        <Settings className="size-4 mr-2"/>Settings</Link>

                </Button>
                <Button asChild>
                    <Link href={`/dashboard/sites/${siteId}/create`}>
                        <PlusCircle className="size-4 mr-2"/>
                        Create Article</Link>
                </Button>
            </div>

            {data?.posts === undefined || data.posts.length === 0 ? (

              <EmptyState
                  title="You don't have any articles created"
                  description="You currently don't have any articles"
                  buttonText="Create Article"
                  href={`/dashboard/sites/${siteId}/create`}/>

            ) : ( //this is because there is a default state above, but below is what is happening when there is data
                <div> {/* Here we start from 04:43:59 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Article</CardTitle>
                            <CardDescription>Manage you Articles in a simple and intuitive interface</CardDescription>


                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>

                                    </TableRow>

                                </TableHeader>
                                <TableBody>
                                    {data.posts.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Image src={item.image} width={64} height={64}
                                                alt="Article Cover Image"
                                                className="size-16 rounded-md object-cover"/>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Badge variant="outline"
                                                       className="bg-green-500/10 text-green-500"

                                                >Published</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.DateTimeFormat("en-US",{
                                                        dateStyle: "medium",
                                                    }).format(item.createdAt)}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            <MoreHorizontal className="Size-4"/>


                                                        </Button>

                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/sites/${siteId}/${item.id}`}>
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            {/* below from 05:37*/}
                                                            <Link href={`/dashboard/sites/${siteId}/${item.id}/delete`}>Delete</Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>


                                                </DropdownMenu>
                                            </TableCell>

                                        </TableRow>
                                    ))}

                                </TableBody>

                            </Table>
                        </CardContent>

                    </Card>

                </div>
            )}

        </>
    )
}