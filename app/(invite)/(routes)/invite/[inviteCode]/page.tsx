import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async ({ params } : InviteCodePageProps) => {
    const profile = await currentProfile();

    const { inviteCode } = await params;

    if(!profile) {
        return redirect("/login");
    }

    if(!inviteCode) {
        return redirect("/");
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(existingServer) {
        return redirect(`/server/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`);
    }
    


    return null;
}

export default InviteCodePage