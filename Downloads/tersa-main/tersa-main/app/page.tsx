import { ReactFlowProvider } from "@xyflow/react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Canvas } from "@/components/canvas";
import { Controls } from "@/components/controls";
import { Toolbar } from "@/components/toolbar";
import { currentUser } from "@/lib/auth";
import { GatewayProvider } from "@/providers/gateway";
import { ProjectProvider } from "@/providers/project";
import { SubscriptionProvider } from "@/providers/subscription";

export const metadata: Metadata = {
  title: "Aurion Canvas | AI Visual Playground",
  description:
    "Build AI workflows visually. Drag, drop, connect and run nodes powered by industry-leading AI models.",
};

// Demo project for unauthenticated users
const demoProject = {
  id: "demo-project",
  name: "Demo Project",
  userId: "demo-user",
  transcriptionModel: "openai-whisper",
  visionModel: "gpt-4o",
  createdAt: new Date(),
  updatedAt: new Date(),
  content: null,
  image: null,
  members: null,
  welcomeProject: true,
};

const Index = async () => {
  const user = await currentUser();

  // If user is logged in, redirect to their projects
  if (user) {
    redirect("/projects");
  }

  // Show demo canvas for non-authenticated users
  return (
    <SubscriptionProvider isSubscribed={false} plan={undefined}>
      <GatewayProvider>
        <ReactFlowProvider>
          <div className="flex h-screen w-screen items-stretch overflow-hidden">
            <div className="relative flex-1">
              <ProjectProvider data={demoProject}>
                <Canvas>
                  <Controls />
                  <Toolbar />
                </Canvas>
              </ProjectProvider>
              {/* Demo mode banner */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur">
                  Mode Démo - <a href="/auth/sign-up" className="underline hover:no-underline">Créez un compte</a> pour sauvegarder vos projets
                </div>
              </div>
            </div>
          </div>
        </ReactFlowProvider>
      </GatewayProvider>
    </SubscriptionProvider>
  );
};

export default Index;
