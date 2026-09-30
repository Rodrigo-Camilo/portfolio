export function ExperienceTimeline({ items }) {
  return (
    <div className="timeline" data-reveal>
      {items.map((item, index) => (
        <article className="timeline-item" key={item.company}>
          <div className="timeline-marker">
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="timeline-content">
            <div className="timeline-heading">
              <div>
                <p>{item.company}</p>
                <h3>{item.role}</h3>
              </div>
              <time>{item.period}</time>
            </div>
            <p className="timeline-description">{item.description}</p>
            <div className="timeline-tags">
              {item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
