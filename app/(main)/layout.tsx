import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayoutPage = async({
    children
}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="h-full w-[72px] z-30 flex-col fixed inser-y-0 md:!flex hidden">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
     );
}
 
export default MainLayoutPage;