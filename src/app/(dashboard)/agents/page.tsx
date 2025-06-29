import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import AgentListHeader from "@/modules/agents/ui/components/agent-list-header";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Agent" description="This may take a few seconds" />}>
          <AgentsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
