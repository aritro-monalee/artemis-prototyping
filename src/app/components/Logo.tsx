import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/Logo.svg"
        alt="Artemis"
        width={120}
        height={24}
        className="h-6 ml-1 w-auto"
      />
    </div>
  );
}

export function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/LogoMark.svg"
        alt="Artemis"
        width={24}
        height={24}
        className="h-6 ml-1"
      />
    </div>
  );
}