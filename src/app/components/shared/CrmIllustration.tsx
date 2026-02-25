"use client";

export interface CrmIllustrationProps {
  /** When provided, used for the table header background. Defaults to cream-200. */
  headerBg?: string;
}

export function CrmIllustration({ headerBg }: CrmIllustrationProps = {}) {
  const border = "border-[0.33px] border-black/8";
  const borderStyle = "0.33px solid rgba(0,0,0,0.08)";

  return (
    <div
      className={`w-[600px] h-[400px] bg-white ${border} rounded-[7px] shadow-2xl overflow-hidden flex flex-col`}
    >
      <div
        className={`flex items-center justify-between px-3 py-1.5 bg-black/[0.02] border-b-[0.33px] border-black/8`}
      >
        <div className="flex gap-1">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        </div>
        <div
          className={`w-[280px] h-[18px] bg-black/[0.02] ${border} rounded-[7px] flex items-center justify-center`}
        >
          <span className="text-[8px] text-base-muted-foreground">CRM</span>
        </div>
        <div className="w-[25px]" />
      </div>
      <div className="flex-1 bg-white flex items-center justify-center p-4 overflow-auto">
        <div className="w-[320px] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cream-300" />
              <div className="w-10 h-2 rounded-full bg-cream-400" />
            </div>
            <div className="w-10 h-2 rounded-full bg-cream-300" />
          </div>
          <div
            className="rounded-md overflow-hidden"
            style={{ border: borderStyle }}
          >
            <div
              className={headerBg === undefined ? "flex bg-cream-200" : "flex"}
              style={
                headerBg !== undefined
                  ? { backgroundColor: headerBg }
                  : undefined
              }
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[26px] px-2 flex items-center"
                  style={{
                    borderRight:
                      i < 4 ? borderStyle : "none",
                    borderBottom: borderStyle,
                  }}
                >
                  <div
                    className={`h-2 rounded-full bg-black/8 ${i === 0 ? "w-[62px]" : "w-11"}`}
                  />
                </div>
              ))}
            </div>
            {[...Array(10)].map((_, row) => (
              <div key={row} className="flex">
                {[...Array(5)].map((_, col) => (
                  <div
                    key={col}
                    className="flex-1 h-[26px] px-2 flex items-center"
                    style={{
                      borderRight:
                        col < 4 ? borderStyle : "none",
                      borderBottom:
                        row < 9 ? borderStyle : "none",
                    }}
                  >
                    <div
                      className={`h-2 rounded-full bg-black/8 ${col === 0 ? "w-[62px]" : "w-11"}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
