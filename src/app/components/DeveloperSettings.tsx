"use client";

import { useState } from "react";
import { GripVertical, MoreVertical, ChevronRight } from "lucide-react";
import {
  MLTable,
  MLButton,
  MLSwitch,
  MLSelect,
  MLAccordion,
  MLAccordionItem,
  MLAccordionTrigger,
  MLAccordionContent,
} from "@/app/lib/monalee-ui";
import {
  MLDropdownMenu,
  MLDropdownMenuTrigger,
  MLDropdownMenuContent,
  MLDropdownMenuItem,
} from "@/app/lib/monalee-ui/components/MLDropdownMenu";
import { AnimatePresence } from "framer-motion";
import { AddWebhookModal } from "./AddWebhookModal";
import { IntegrationsSettings } from "./IntegrationsSettings";

interface PostsaleStage {
  key: string;
  order: number;
  stage: string;
}

interface Webhook {
  key: string;
  callbackUrl: string;
  apiMethod: string;
  eventTypes: string;
  active: boolean;
}

const INITIAL_STAGES: PostsaleStage[] = [
  { key: "1", order: 1, stage: "test" },
  { key: "2", order: 2, stage: "test 2" },
];

const INITIAL_WEBHOOKS: Webhook[] = [
  {
    key: "1",
    callbackUrl: "https://webhook.site/32e54b93-e1d5-c1be-4931-010c2503fe73",
    apiMethod: "POST",
    eventTypes: "project-created, project-updated",
    active: true,
  },
  {
    key: "2",
    callbackUrl: "https://webhook.site/18044d3c-ca9c-4b56-826c-c4fdab7f27c8",
    apiMethod: "POST",
    eventTypes:
      "project created, project updated, contract signed, contract change order sent, credit application submitted, pre sale status updated, application decision, post sale status updated, user created, user updated, user deleted, energy audit updated",
    active: true,
  },
  {
    key: "3",
    callbackUrl:
      "https://prod0.altdd-ce-sandtss-rrc51-tpo0k-tree.dev/webhooks/solarredis-events",
    apiMethod: "POST",
    eventTypes: "energy-audit-updated, project-created",
    active: true,
  },
  {
    key: "4",
    callbackUrl: "https://webhook.site/scsa0706-ae1a-4d58-80a1-e43a5b6bc89c",
    apiMethod: "POST",
    eventTypes: "project created",
    active: true,
  },
  {
    key: "5",
    callbackUrl: "https://webhook.site/e9cee9706-ae1e-5e50-90a1-e43b60bc89b",
    apiMethod: "POST",
    eventTypes: "project-created",
    active: true,
  },
];

const EVENT_TYPE_OPTIONS = [
  { label: "Project Created", value: "project-created" },
  { label: "Project Updated", value: "project-updated" },
  { label: "Contract Signed", value: "contract-signed" },
  { label: "Contract Change Order Sent", value: "contract-change-order-sent" },
  { label: "Credit Application Submitted", value: "credit-application-submitted" },
  { label: "Pre Sale Status Updated", value: "pre-sale-status-updated" },
  { label: "Application Decision", value: "application-decision" },
  { label: "Post Sale Status Updated", value: "post-sale-status-updated" },
  { label: "User Created", value: "user-created" },
  { label: "User Updated", value: "user-updated" },
  { label: "User Deleted", value: "user-deleted" },
  { label: "Energy Audit Updated", value: "energy-audit-updated" },
];

const PAYLOAD_EXAMPLES: Record<string, object> = {
  "project-created": {
    event: "project-created",
    timestamp: "2026-02-20T10:30:00Z",
    data: {
      id: "proj_abc123",
      name: "Smith Residence Solar",
      status: "new",
      address: {
        street: "123 Main St",
        city: "Austin",
        state: "TX",
        zip: "78701",
      },
      system_size_kw: 8.4,
      created_at: "2026-02-20T10:30:00Z",
    },
  },
};

function KebabMenu({ onDelete }: { onDelete: () => void }) {
  return (
    <MLDropdownMenu>
      <MLDropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-cream-200/50 transition-colors">
          <MoreVertical className="w-4 h-4 text-base-muted-foreground" />
        </button>
      </MLDropdownMenuTrigger>
      <MLDropdownMenuContent align="end">
        <MLDropdownMenuItem>Edit</MLDropdownMenuItem>
        <MLDropdownMenuItem className="text-red-600" onClick={onDelete}>
          Delete
        </MLDropdownMenuItem>
      </MLDropdownMenuContent>
    </MLDropdownMenu>
  );
}

export function DeveloperSettings() {
  const [stages, setStages] = useState<PostsaleStage[]>(INITIAL_STAGES);
  const [webhooks, setWebhooks] = useState<Webhook[]>(INITIAL_WEBHOOKS);
  const [selectedEventType, setSelectedEventType] = useState<string>("project-created");
  const [showAddWebhook, setShowAddWebhook] = useState(false);

  const handleStageReorder = (newData: PostsaleStage[]) => {
    setStages(
      newData.map((item, i) => ({ ...item, order: i + 1 })) as PostsaleStage[]
    );
  };

  const toggleWebhookActive = (key: string) => {
    setWebhooks((prev) =>
      prev.map((w) => (w.key === key ? { ...w, active: !w.active } : w))
    );
  };

  const stageColumns = [
    {
      key: "order",
      title: "Order",
      dataIndex: "order",
      className: "w-[80px]",
    },
    {
      key: "stage",
      title: "Stage",
      dataIndex: "stage",
    },
    {
      key: "actions",
      title: "",
      dataIndex: "actions",
      className: "w-[40px]",
      render: (_: unknown, record: PostsaleStage) => (
        <KebabMenu
          onDelete={() =>
            setStages((prev) => prev.filter((s) => s.key !== record.key))
          }
        />
      ),
    },
  ];

  const webhookColumns = [
    {
      key: "callbackUrl",
      title: "Callback URL",
      dataIndex: "callbackUrl",
      render: (value: string) => (
        <span className="block truncate">{value}</span>
      ),
    },
    {
      key: "apiMethod",
      title: "API Method",
      dataIndex: "apiMethod",
      render: (value: string) => (
        <span className="whitespace-nowrap">{value}</span>
      ),
    },
    {
      key: "eventTypes",
      title: "Event Types",
      dataIndex: "eventTypes",
      render: (value: string) => (
        <span className="whitespace-normal">{value}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "active",
      render: (_: unknown, record: Webhook) => (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <MLSwitch
            checked={record.active}
            onChange={() => toggleWebhookActive(record.key)}
          />
          <span className="text-sm">
            {record.active ? "Active" : "Inactive"}
          </span>
          <KebabMenu
            onDelete={() =>
              setWebhooks((prev) => prev.filter((w) => w.key !== record.key))
            }
          />
        </div>
      ),
    },
  ];

  const payloadExample =
    PAYLOAD_EXAMPLES[selectedEventType] ?? PAYLOAD_EXAMPLES["project-created"];

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] mx-auto w-full">
      {/* CRM Integrations */}
      <IntegrationsSettings />

      {/* Postsale Stages */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-base-foreground">
            Postsale Stages
          </h2>
          <MLButton variant="outline" size="sm">
            Add Stage
          </MLButton>
        </div>
        <div className="[&_th]:!px-4 [&_th]:!py-3 [&_td]:!px-4 [&_td]:!py-3">
          <MLTable
            size="md"
            columns={stageColumns}
            dataSource={stages}
            draggable
            onReorder={(newData) =>
              handleStageReorder(newData as unknown as PostsaleStage[])
            }
            dragHandle={<GripVertical className="w-4 h-4 text-base-muted-foreground" />}
          />
        </div>
      </section>

      {/* Webhooks */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-base-foreground">Webhooks</h2>
          <MLButton variant="outline" size="sm" onClick={() => setShowAddWebhook(true)}>
            Add Webhook
          </MLButton>
        </div>
        <div className="[&_table]:table-fixed [&_th]:!px-4 [&_th]:!py-3 [&_td]:!px-4 [&_td]:!py-3 [&_th:first-child]:w-[20%] [&_th:nth-child(2)]:w-[7%] [&_th:nth-child(3)]:w-[58%] [&_th:last-child]:w-[15%] [&_td:nth-child(3)_.truncate]:!whitespace-normal [&_td:nth-child(3)_.truncate]:!overflow-visible [&_th:last-child_.flex]:justify-end">
          <MLTable
            size="md"
            columns={webhookColumns}
            dataSource={webhooks}
          />
        </div>
      </section>

      {/* Payload Examples */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-base-foreground">
            Payload Examples
          </h2>
          <p className="text-sm text-base-muted-foreground">
            These are payload models for every event that can trigger a webhook.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <MLSelect
            label="Event Type"
            fullwidth
            options={EVENT_TYPE_OPTIONS}
            value={
              EVENT_TYPE_OPTIONS.find((o) => o.value === selectedEventType) ??
              null
            }
            onChange={(selected) => {
              if (selected) setSelectedEventType(selected.value);
            }}
          />

          <MLAccordion type="single" collapsible>
            <MLAccordionItem
              value="payload"
              className="!border rounded-md border-base-border bg-base-background"
            >
              <MLAccordionTrigger
                hideChevron
                className="px-4 py-3 text-sm font-medium text-base-foreground hover:no-underline [&>[data-slot=icon-container]]:hidden"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-base-muted-foreground shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-90" />
                  <span>Payload Example</span>
                </div>
              </MLAccordionTrigger>
              <MLAccordionContent className="px-4">
                <pre className="text-xs text-base-muted-foreground bg-cream-100 rounded-lg p-4 overflow-x-auto">
                  {JSON.stringify(payloadExample, null, 2)}
                </pre>
              </MLAccordionContent>
            </MLAccordionItem>
          </MLAccordion>
        </div>
      </section>

      <AnimatePresence>
        {showAddWebhook && (
          <AddWebhookModal
            onClose={() => setShowAddWebhook(false)}
            onAdd={(url) => {
              setWebhooks((prev) => [
                ...prev,
                {
                  key: String(Date.now()),
                  callbackUrl: url,
                  apiMethod: "POST",
                  eventTypes: "project-created",
                  active: true,
                },
              ]);
              setShowAddWebhook(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
