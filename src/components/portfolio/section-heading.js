export function SectionHeading({ eyebrow, title, id, aside }) {
  return (
    <div className={`section-heading ${aside ? "section-heading-split" : ""}`} data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {aside ? <p className="section-aside">{aside}</p> : null}
    </div>
  );
}
