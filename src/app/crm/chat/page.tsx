import type { Metadata } from "next";
import { CrmShell } from "@/components/crm/crm-shell";
import { Chat } from "@/components/crm/chat";

export const metadata: Metadata = {
  title: { absolute: "Chat — Employee CRM" },
  description: "Employee team chat — coordinate with the team in real time.",
  robots: { index: false, follow: false },
};

export default function CrmChatPage() {
  return (
    <CrmShell active="chat">
      <Chat />
    </CrmShell>
  );
}
