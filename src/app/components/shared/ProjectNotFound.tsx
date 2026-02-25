import Link from "next/link";

export function ProjectNotFound({ backHref = "/" }: { backHref?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-bg)]">
      <div className="text-center">
        <p className="text-lg font-medium text-[var(--color-text)]">Project not found</p>
        <Link
          href={backHref}
          className="mt-3 text-sm text-[#7267bf] hover:underline block"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
