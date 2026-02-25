"use client";

import { TagsSettings } from "./TagsSettings";
import { ChecklistSettings } from "./ChecklistSettings";

export function ProjectsSettingsForm() {
  return (
    <div className="flex flex-col gap-8 max-w-[1024px] pb-16">
      <TagsSettings />
      <hr className="border-[#e8e2da]" />
      <ChecklistSettings />
    </div>
  );
}
