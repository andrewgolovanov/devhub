import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        className="h-11 rounded-none border-grey-80 bg-transparent pl-11 text-base tracking-tight shadow-none placeholder:text-grey-60 md:text-base"
        type="search"
        placeholder="Search template"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
