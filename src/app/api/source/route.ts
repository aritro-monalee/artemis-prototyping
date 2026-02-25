import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

const SRC_ROOT = path.join(process.cwd(), "src");

async function findComponentFile(
  dir: string,
  componentName: string
): Promise<string | null> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      const found = await findComponentFile(fullPath, componentName);
      if (found) return found;
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const contents = await readFile(fullPath, "utf-8");
      const patterns = [
        new RegExp(`\\bfunction\\s+${componentName}\\b`),
        new RegExp(`\\bconst\\s+${componentName}\\s*=`),
        new RegExp(`export\\s+(default\\s+)?function\\s+${componentName}\\b`),
      ];
      if (patterns.some((p) => p.test(contents))) {
        return fullPath;
      }
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  if (!name || !/^[A-Z][A-Za-z0-9_]*$/.test(name)) {
    return NextResponse.json(
      { error: "Invalid component name" },
      { status: 400 }
    );
  }

  try {
    const filePath = await findComponentFile(SRC_ROOT, name);
    if (!filePath) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    const source = await readFile(filePath, "utf-8");
    const relativePath = path.relative(process.cwd(), filePath);

    return NextResponse.json({ filePath: relativePath, source });
  } catch {
    return NextResponse.json(
      { error: "Failed to read source" },
      { status: 500 }
    );
  }
}
