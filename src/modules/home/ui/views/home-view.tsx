"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
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
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <p className="text-destructive">Failed to load session</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Handle no session (will redirect via useEffect)
  if (!session) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Redirecting...</p>
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
    <div className="flex flex-col p-4 gap-y-4 max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
        <p className="text-muted-foreground">
          Logged in as <span className="font-medium">{session.user.name}</span>
        </p>
        {session.user.email && (
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        )}
      </div>
      
      <Button 
        onClick={handleSignOut}
        disabled={isSigningOut}
        variant="destructive"
        className="w-full"
      >
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  );
}