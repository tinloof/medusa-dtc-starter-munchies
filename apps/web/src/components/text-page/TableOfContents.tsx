interface Props {
  body: any[] | null | undefined;
}

interface Heading {
  _key: string;
  style: string;
  text: string;
}

// Extract headings from portable text body
function getHeadings(body: any[] | null | undefined): Heading[] {
  if (!body) return [];

  return body
    .filter(
      (block) =>
        block._type === "block" && (block.style === "h2" || block.style === "h3")
    )
    .map((block) => ({
      _key: block._key || "",
      style: block.style || "",
      text: (block.children as { text: string }[])
        ?.map((child) => child.text)
        .join("") || "",
    }));
}

export default function TableOfContents({ body }: Props) {
  const headings = getHeadings(body);

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop TOC */}
      <div className="sticky top-[calc(var(--header-height)+2.5rem)] hidden w-full flex-col lg:flex">
        {headings.map((item) =>
          item.style === "h2" ? (
            <a href={`#${item._key}`} key={item._key}>
              <div className="border-accent-40 border-l-[1.5px] py-[10px] pl-[9px] font-medium font-sans leading-[150%] text-body-sm transition-all duration-300 first:pt-2 last:pb-2 hover:border-accent">
                {item.text}
              </div>
            </a>
          ) : null
        )}
      </div>

      {/* Mobile TOC Select */}
      <div className="lg:hidden">
        <TocSelect headings={headings} />
      </div>
    </>
  );
}

function TocSelect({
  headings,
}: {
  headings: { _key: string; style: string; text: string }[];
}) {
  const h2Headings = headings.filter((h) => h.style === "h2");

  if (h2Headings.length === 0) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <select
      className="w-full rounded-lg border-[1.5px] border-accent bg-background px-s py-xs font-medium font-sans text-body-base outline-none"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        Jump to section...
      </option>
      {h2Headings.map((heading) => (
        <option key={heading._key} value={heading._key}>
          {heading.text}
        </option>
      ))}
    </select>
  );
}
