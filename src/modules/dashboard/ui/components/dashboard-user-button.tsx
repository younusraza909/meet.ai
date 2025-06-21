import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDown, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (!data || isPending) return null;

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg border border-border/10 p-3 w-full
       flex items-center justify-between bg-white/5
        hover:bg-white/10 overflow-hidden gap-1"
      >
        {data.user?.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar className="size-9 mr-3" seed={data.user.name} variant="initials" />
        )}

        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm width-full truncate">{data.user.name}</p>
          <p className="text-xs width-full truncate">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center justify-between">
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
