import Image from "next/image";
import Link from "next/link";

export default function Header() {

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/amber-moe-Logo.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          sql.amber-moe.io
        </h1>
      </Link>
      <a
        href="https://github.com/oceanbase/oceanbase"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="OceanBase Icon"
          src="/writingIcon.png"
          className="w-24 h-auto sm:w-48"
          width={120}
          height={60}
        />
      </a>
    </header>
  );
}
