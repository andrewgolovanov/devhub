import { useCallback } from "react";
import { toast } from "sonner";
import {
  ClipboardCopyIcon,
  CodeIcon,
  ServerIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useAgentMarkdown,
  type AgentMarkdownInput,
} from "@/lib/use-agent-markdown";
import { cn } from "@/lib/utils";

type AIExportMenuProps = AgentMarkdownInput & {
  appearance?: "default" | "article";
  disabled?: boolean;
  disabledTooltip?: string;
};

const articleMenuItemClassName =
  "h-3.5 min-h-0 cursor-pointer gap-2.5 rounded-none bg-transparent p-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase outline-none transition-colors hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[highlighted]:!bg-transparent data-[highlighted]:!text-white [&_svg]:size-3.5 [&_svg]:text-current";

export function AIExportMenu({
  appearance = "default",
  disabled = false,
  disabledTooltip = "select a template to copy",
  ...input
}: AIExportMenuProps) {
  const { buildAIMarkdown, ensureFetched } = useAgentMarkdown(input);
  const isArticle = appearance === "article";
  const triggerLabel = isArticle ? "Copy Article" : "Copy as";
  const triggerClassName = isArticle
    ? "h-[1.875rem] gap-2.5 rounded-none border border-grey-30 bg-transparent py-0 pl-3 pr-2.5 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase shadow-none transition-colors hover:!border-grey-70 hover:!bg-transparent hover:!text-grey-70 focus:!bg-transparent focus:!text-grey-70 focus-visible:!border-grey-70 focus-visible:ring-db-cyan focus-visible:ring-offset-black data-[state=open]:!border-grey-70 data-[state=open]:!bg-transparent data-[state=open]:!text-grey-70 data-[state=open]:hover:!bg-transparent [&_svg]:size-3.5 [&_svg]:text-current"
    : undefined;
  const articleIconClassName = isArticle ? "size-3.5 text-grey-70" : undefined;
  const triggerIcon = <ChevronDownIcon aria-hidden="true" />;

  const handleCopyMarkdown = useCallback(async () => {
    try {
      await ensureFetched();
      await navigator.clipboard.writeText(buildAIMarkdown());
      toast.success("Markdown copied");
    } catch {
      toast.error("Failed to copy markdown");
    }
  }, [ensureFetched, buildAIMarkdown]);

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Button
                variant="outline"
                size="sm"
                className={triggerClassName}
                aria-label={triggerLabel}
                disabled
              >
                {triggerLabel}
                {triggerIcon}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>{disabledTooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={triggerClassName}
          aria-label={triggerLabel}
        >
          {triggerLabel}
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isArticle ? "start" : "end"}
        sideOffset={isArticle ? 8 : 4}
        className={cn(
          isArticle
            ? "w-[15.5625rem] min-w-[15.5625rem] rounded-none border border-grey-30 bg-black p-0 text-white shadow-none"
            : "w-56",
        )}
      >
        <DropdownMenuGroup
          className={
            isArticle
              ? "flex h-20 flex-col gap-5 border-b border-grey-30 px-4 py-4"
              : undefined
          }
        >
          <DropdownMenuItem
            className={isArticle ? articleMenuItemClassName : undefined}
            onSelect={handleCopyMarkdown}
          >
            <ClipboardCopyIcon
              className={articleIconClassName}
              aria-hidden="true"
            />
            Copy Markdown
          </DropdownMenuItem>
          <DropdownMenuItem
            className={isArticle ? articleMenuItemClassName : undefined}
            disabled
          >
            <CodeIcon className={articleIconClassName} aria-hidden="true" />
            View Raw Markdown
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={isArticle ? "hidden" : undefined} />
        <DropdownMenuItem
          className={cn(
            isArticle ? articleMenuItemClassName : undefined,
            isArticle ? "mx-4 my-[0.9375rem]" : undefined,
          )}
          disabled
        >
          <ServerIcon className={articleIconClassName} aria-hidden="true" />
          Connect to MCP Server
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
