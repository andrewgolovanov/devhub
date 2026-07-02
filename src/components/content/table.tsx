import type { ReactNode } from "react";

export type TablePresentation = "scroll" | "prose";

function TableHead({
  className,
  headers,
}: {
  className?: string;
  headers: ReactNode[];
}): ReactNode {
  return (
    <thead>
      <tr>
        {headers.map((header, headerIndex) => (
          <th className={className} key={headerIndex} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({
  className,
  rows,
}: {
  className?: string;
  rows: ReactNode[][];
}): ReactNode {
  return (
    <tbody>
      {rows.map((row, rowIndex) => {
        const cellClassName =
          rowIndex === rows.length - 1 && className
            ? `${className} border-b-0`
            : className;

        return (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td className={cellClassName} key={cellIndex}>
                {cell}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export function Table({
  headers,
  presentation,
  rows,
  tableContext,
}: {
  headers: ReactNode[];
  presentation: TablePresentation;
  rows: ReactNode[][];
  tableContext?: "details";
}): ReactNode {
  if (presentation === "prose") {
    return (
      <table>
        <TableHead headers={headers} />
        <TableBody rows={rows} />
      </table>
    );
  }

  return (
    <figure className="markdown-table-wrapper not-prose -mx-5 my-8 md:mx-0">
      <div className="w-full max-w-full overflow-x-auto [&_table]:!my-0">
        {tableContext === "details" ? (
          <table className="mx-5 table w-auto max-w-none min-w-full border-separate border-spacing-0 text-sm md:mx-0 md:w-full">
            <TableHead
              className="border-prose-border min-w-36 border-b pb-3 text-left align-top text-sm leading-snug font-medium tracking-tight text-white"
              headers={headers}
            />
            <TableBody
              className="border-prose-border text-grey-90 min-w-36 border-b pt-3 pr-10 pb-3 text-left align-top text-sm leading-snug tracking-tight last:pr-0 [&_code:first-child]:ml-0"
              rows={rows}
            />
          </table>
        ) : (
          <table className="mx-5 table w-[46rem] min-w-[46rem] border-separate border-spacing-0 text-sm md:mx-0 md:w-full md:min-w-0">
            <TableHead
              className="border-prose-border min-w-36 border-b pb-3 text-left align-top text-sm leading-snug font-medium tracking-tight text-white"
              headers={headers}
            />
            <TableBody
              className="border-prose-border text-grey-90 min-w-36 border-b pt-3 pr-10 pb-3 text-left align-top text-sm leading-snug tracking-tight last:pr-0 [&_code:first-child]:ml-0"
              rows={rows}
            />
          </table>
        )}
      </div>
    </figure>
  );
}
