export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20  text-3xl font-semibold  first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 ">{children}</p>;
}

export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="even:bg-muted m-0 border-t p-0">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
}

export function TypographyList({
    items,
}: {
    items: string[];
}) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}

export function TypographyInlineCode({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <p className="text-muted-foreground text-xl">
      {children}
    </p>
  );
}

export function TypographyLarge({
    children,
}: {
    children: React.ReactNode;
}) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographySmall({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <small className="text-sm leading-none font-medium">{children}</small>
  );
}

export function TypographyMuted({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <p className="text-muted-foreground text-sm">{children}</p>
  );
}
