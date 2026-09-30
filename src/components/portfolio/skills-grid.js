export function SkillsGrid({ groups }) {
  return (
    <div className="skills-grid">
      {groups.map((group, index) => (
        <article
          className="skill-group"
          key={group.title}
          data-reveal
          style={{ "--delay": `${(index % 2) * 90}ms` }}
        >
          <div className="skill-group-heading">
            <span>{group.number}</span>
            <div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </div>
          </div>
          <div className="skill-list">
            {group.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
      ))}
    </div>
  );
}
