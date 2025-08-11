"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { DashboardNavbar } from "@/modules/dashboard/ui/dashboard-navbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function HomeView() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session, isPending, error } = authClient.useSession();

  // Handle redirect when no session - use useEffect to avoid setState during render
  useEffect(() => {
    if (!isPending && !error && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, error, router]);

  // Handle loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 gap-4">
        <div className="text-center max-w-md">
          <p className="text-destructive text-lg font-medium mb-2">Failed to load session</p>
          <p className="text-muted-foreground text-sm mb-4">
            Please check your connection and try again
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Handle no session (will redirect via useEffect)
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-center">
          <div className="animate-pulse rounded-full h-8 w-8 bg-muted mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
      // You might want to show a toast notification here
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome
          </h1>
          <div className="space-y-1">
            <p className="text-muted-foreground">
              Logged in as{" "}
              <span className="font-medium text-foreground">
                {session.user.name}
              </span>
            </p>
            {session.user.email && (
              <p className="text-sm text-muted-foreground break-all">
                {session.user.email}
              </p>
            )}
          </div>
        </div>

        {/* User Info Card */}
        <div className="rounded-lg border bg-card p-4 sm:p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg sm:text-xl font-semibold text-primary">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base font-medium truncate">
                {session.user.name}
              </h2>
              {session.user.email && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            variant="destructive"
            className="w-full h-10 sm:h-11"
          >
            {isSigningOut ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing out...</span>
              </div>
            ) : (
              "Sign Out"
            )}
          </Button>
          
          {/* Additional actions can go here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button variant="outline" className="w-full" size="sm">
              Settings
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Profile
            </Button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Session active • Last login today
          </p>
        </div>
      </div>
    </div>
  );
}