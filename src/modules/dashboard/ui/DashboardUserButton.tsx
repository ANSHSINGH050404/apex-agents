import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
 
  // Show nothing while loading or if no user data
  if (isPending || !data?.user) {
    return null;
  }
  
  const onLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
          onError: (error) => {
            console.error("Logout failed:", error);
            // Optionally show a toast notification
          }
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show a toast notification
    }
  };
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-2xl border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        {data.user.image ? (
          <Avatar className="size-9 mr-3">
            <AvatarImage src={data.user.image} alt={`${data.user.name}'s avatar`} />
            <AvatarFallback>
              {data.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name || "User"}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {data.user.name}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium">{data.user.name}</span>
            <span className="text-sm text-muted-foreground">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CreditCardIcon className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};