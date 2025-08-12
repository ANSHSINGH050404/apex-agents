"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take some time"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Somethings went wrong"
    />
  );
};
