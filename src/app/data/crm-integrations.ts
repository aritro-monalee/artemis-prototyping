export type CRMProvider = "salesforce" | "pipedrive";

export interface CRMFieldDef {
  key: string;
  label: string;
  defaultMapping: string | null; // Artemis field key, or null for "Skip"
}

export interface CRMStageDef {
  id: string;
  label: string;
  defaultMapping: string | null; // Artemis stage id
}

export type SyncMode = "import" | "sync";

export interface CRMConnection {
  key: string;
  provider: CRMProvider;
  label: string;
  teamName: string;
  active: boolean;
  lastSynced: string;
  fieldCount: number;
  mode: SyncMode;
  fieldMappings: Record<string, string>;
  stageMappings: Record<string, string>;
  webhookUrl?: string;
  syncEvents?: string[];
}

export const ARTEMIS_FIELD_OPTIONS = [
  { label: "Skip", value: "__skip__" },
  { label: "Full Name", value: "fullName" },
  { label: "Email", value: "email" },
  { label: "Address", value: "address" },
  { label: "System Size", value: "systemSize" },
  { label: "Panels", value: "panels" },
  { label: "Batteries", value: "batteries" },
  { label: "Installer", value: "installer" },
  { label: "Team", value: "team" },
  { label: "Representative", value: "representative" },
  { label: "Lead Source", value: "leadSource" },
  { label: "Status", value: "status" },
  { label: "Utility Company", value: "utilityCompany" },
  { label: "Payment Option", value: "paymentOption" },
  { label: "Owner Name", value: "ownerName" },
  { label: "Assignee", value: "assignee" },
  { label: "Department", value: "department" },
  { label: "Application ID", value: "applicationId" },
];

export const CRM_PROVIDERS: Record<
  CRMProvider,
  { name: string; description: string; brandColor: string }
> = {
  salesforce: {
    name: "Salesforce",
    description: "Import Opportunities from your Salesforce org",
    brandColor: "#00A1E0",
  },
  pipedrive: {
    name: "Pipedrive",
    description: "Import Deals from your Pipedrive pipeline",
    brandColor: "#08A742",
  },
};

export const CRM_FIELDS: Record<CRMProvider, CRMFieldDef[]> = {
  salesforce: [
    { key: "Name", label: "Name", defaultMapping: "fullName" },
    { key: "Email__c", label: "Email", defaultMapping: "email" },
    { key: "Address__c", label: "Address", defaultMapping: "address" },
    { key: "StageName", label: "Stage Name", defaultMapping: "__skip__" },
    { key: "System_Size__c", label: "System Size", defaultMapping: "systemSize" },
    { key: "Panel_Count__c", label: "Panel Count", defaultMapping: "panels" },
    { key: "Battery_Count__c", label: "Battery Count", defaultMapping: "batteries" },
    { key: "Installer__c", label: "Installer", defaultMapping: "installer" },
    { key: "Team__c", label: "Team", defaultMapping: "team" },
    { key: "Rep__c", label: "Representative", defaultMapping: "representative" },
    { key: "LeadSource", label: "Lead Source", defaultMapping: "leadSource" },
    { key: "Utility__c", label: "Utility Company", defaultMapping: "utilityCompany" },
    { key: "Payment__c", label: "Payment Option", defaultMapping: "paymentOption" },
  ],
  pipedrive: [
    { key: "title", label: "Deal Title", defaultMapping: "fullName" },
    { key: "person_email", label: "Person Email", defaultMapping: "email" },
    { key: "address", label: "Address", defaultMapping: "address" },
    { key: "stage_id", label: "Stage", defaultMapping: "__skip__" },
    { key: "system_size", label: "System Size", defaultMapping: "systemSize" },
    { key: "panels", label: "Panels", defaultMapping: "panels" },
    { key: "batteries", label: "Batteries", defaultMapping: "batteries" },
    { key: "installer", label: "Installer", defaultMapping: "installer" },
    { key: "team", label: "Team", defaultMapping: "team" },
    { key: "owner_name", label: "Deal Owner", defaultMapping: "representative" },
    { key: "source", label: "Source", defaultMapping: "leadSource" },
    { key: "utility", label: "Utility", defaultMapping: "utilityCompany" },
    { key: "payment_option", label: "Payment Option", defaultMapping: "paymentOption" },
  ],
};

export const CRM_STAGES: Record<CRMProvider, CRMStageDef[]> = {
  salesforce: [
    { id: "sf-prospecting", label: "Prospecting", defaultMapping: "proposal-created" },
    { id: "sf-qualification", label: "Qualification", defaultMapping: "credit-submitted" },
    { id: "sf-proposal", label: "Proposal", defaultMapping: "credit-approved" },
    { id: "sf-contract-sent", label: "Contract Sent", defaultMapping: "contract-sent" },
    { id: "sf-contract-signed", label: "Contract Signed", defaultMapping: "contract-signed" },
    { id: "sf-installation", label: "Installation", defaultMapping: "install" },
    { id: "sf-pto", label: "PTO", defaultMapping: "PTO" },
  ],
  pipedrive: [
    { id: "pd-lead-in", label: "Lead In", defaultMapping: "proposal-created" },
    { id: "pd-qualified", label: "Qualified", defaultMapping: "credit-submitted" },
    { id: "pd-proposal", label: "Proposal Made", defaultMapping: "credit-approved" },
    { id: "pd-contract", label: "Contract", defaultMapping: "contract-sent" },
    { id: "pd-won", label: "Won", defaultMapping: "contract-signed" },
    { id: "pd-install", label: "Install Scheduled", defaultMapping: "install" },
    { id: "pd-complete", label: "Complete", defaultMapping: "project-complete" },
  ],
};

export const INITIAL_CRM_CONNECTIONS: CRMConnection[] = [
  {
    key: "1",
    provider: "salesforce",
    label: "Salesforce",
    teamName: "Aritro's Salesforce Team",
    active: true,
    lastSynced: "2 hours ago",
    fieldCount: 11,
    mode: "sync",
    fieldMappings: Object.fromEntries(
      CRM_FIELDS.salesforce.map((f) => [f.key, f.defaultMapping ?? "__skip__"])
    ),
    stageMappings: Object.fromEntries(
      CRM_STAGES.salesforce
        .filter((s) => s.defaultMapping)
        .map((s) => [s.id, s.defaultMapping!])
    ),
    webhookUrl: "https://webhook.site/32e54b93-e1d5-c1be-4931-010c2503fe73",
    syncEvents: ["project-created", "project-updated"],
  },
];
