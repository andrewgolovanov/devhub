import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 2.5L2.5 13.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 2.5L13.5 13.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TemplateSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative bg-db-oat-medium">
      <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-grey-70" />
      <Input
        className="h-10 rounded-none border-grey-80 bg-transparent pr-11 pl-11 text-base tracking-tight shadow-none placeholder:text-grey-60 md:text-base active:border-db-lava focus-visible:ring-0 focus-visible:border-db-lava [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden dark:border-grey-80 dark:bg-transparent lg:h-11"
        type="search"
        placeholder="Search templates..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value.length > 0 ? (
        <button
          className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center text-grey-70 transition-colors hover:text-black focus-visible:ring-0 focus-visible:text-black focus-visible:outline-none"
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <CloseIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
