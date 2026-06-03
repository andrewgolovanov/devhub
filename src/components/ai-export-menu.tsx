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
  align?: "center" | "end" | "start";
  disabled?: boolean;
  disabledTooltip?: string;
  contentClassName?: string;
  itemClassName?: string;
  label?: string;
  separatorClassName?: string;
  triggerClassName?: string;
};

export function AIExportMenu({
  appearance = "default",
  align,
  disabled = false,
  disabledTooltip = "select a template to copy",
  contentClassName,
  itemClassName,
  label,
  separatorClassName,
  triggerClassName,
  ...input
}: AIExportMenuProps) {
  const { mcpUrl, markdownUrl, buildAIMarkdown, ensureFetched } =
    useAgentMarkdown(input);
  const isArticle = appearance === "article";
  const triggerLabel = label ?? (isArticle ? "Copy Article" : "Copy as");
  const articleIconClassName = isArticle ? "size-3.5 text-grey-70" : undefined;
  const triggerIcon = <ChevronDownIcon aria-hidden="true" />;
  const dropdownAlign = align ?? (isArticle ? "start" : "end");

  const handleCopyMarkdown = useCallback(async () => {
    try {
      await ensureFetched();
      await navigator.clipboard.writeText(buildAIMarkdown());
      toast.success("Markdown copied");
    } catch {
      toast.error("Failed to copy markdown");
    }
  }, [ensureFetched, buildAIMarkdown]);

  const handleViewRawMarkdown = useCallback(() => {
    window.open(markdownUrl, "_blank", "noopener,noreferrer");
  }, [markdownUrl]);

  const handleCopyMCP = useCallback(async () => {
    const mcpConfig = JSON.stringify(
      {
        mcpServers: {
          "databricks-devhub": { url: mcpUrl },
        },
      },
      null,
      2,
    );

    try {
      await navigator.clipboard.writeText(mcpConfig);
      toast.success("MCP config copied");
    } catch {
      toast.error("Failed to copy MCP config");
    }
  }, [mcpUrl]);

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-7.5 gap-2.5 rounded-none border border-grey-30 bg-transparent py-0 pl-3 pr-2.5 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase shadow-none transition-colors hover:!border-grey-70 hover:!bg-transparent hover:!text-grey-70 focus:!bg-transparent focus:!text-grey-70 focus-visible:!border-grey-70 focus-visible:ring-db-cyan focus-visible:ring-offset-black data-[state=open]:!border-grey-70 data-[state=open]:!bg-transparent data-[state=open]:!text-grey-70 data-[state=open]:hover:!bg-transparent [&_svg]:size-3.5 [&_svg]:text-current",
                  triggerClassName,
                )}
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
          size="sm"
          className={cn(
            "h-7.5 gap-2.5 rounded-none border border-grey-30 bg-transparent py-0 pl-3 pr-2.5 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase shadow-none transition-colors hover:border-grey-70 hover:bg-transparent hover:text-grey-70 focus:bg-transparent focus:text-grey-70 focus-visible:border-grey-70 focus-visible:ring-db-cyan focus-visible:ring-offset-black data-[state=open]:border-grey-70 data-[state=open]:bg-transparent data-[state=open]:text-grey-70 data-[state=open]:hover:bg-transparent [&_svg]:size-3.5 [&_svg]:text-current",
            triggerClassName,
          )}
          aria-label={triggerLabel}
        >
          {triggerLabel}
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dropdownAlign}
        sideOffset={8}
        className={cn(
          "rounded-none border border-grey-30 bg-black p-0 text-white shadow-none",
          contentClassName,
        )}
      >
        <DropdownMenuGroup className="flex h-20 flex-col gap-5 border-b border-grey-30 px-4 py-4">
          <DropdownMenuItem
            className={cn(
              "h-3.5 min-h-0 cursor-pointer gap-2.5 rounded-none bg-transparent p-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase outline-none transition-colors hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[highlighted]:!bg-transparent data-[highlighted]:!text-white [&_svg]:size-3.5 [&_svg]:text-current",
              itemClassName,
            )}
            onSelect={handleCopyMarkdown}
          >
            <ClipboardCopyIcon
              className={articleIconClassName}
              aria-hidden="true"
            />
            Copy Markdown
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              "h-3.5 min-h-0 cursor-pointer gap-2.5 rounded-none bg-transparent p-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase outline-none transition-colors hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[highlighted]:!bg-transparent data-[highlighted]:!text-white [&_svg]:size-3.5 [&_svg]:text-current",
              itemClassName,
            )}
            onSelect={handleViewRawMarkdown}
          >
            <CodeIcon className={articleIconClassName} aria-hidden="true" />
            View Raw Markdown
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          className={cn(
            "wqeqweqw h-3.5 min-h-0 cursor-pointer gap-2.5 rounded-none bg-transparent p-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase outline-none transition-colors hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[highlighted]:!bg-transparent data-[highlighted]:!text-white [&_svg]:size-3.5 [&_svg]:text-current mx-4 my-[0.9375rem]",
            itemClassName,
          )}
          onSelect={handleCopyMCP}
        >
          <ServerIcon className={articleIconClassName} aria-hidden="true" />
          Connect to MCP Server
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
