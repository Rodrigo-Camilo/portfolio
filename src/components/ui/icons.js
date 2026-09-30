function Icon({ children, size = 20, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return <Icon {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>;
}

export function GithubIcon(props) {
  return (
    <Icon {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.5a13.4 13.4 0 0 0-6 0C6.1-.4 4.9 0 4.9 0A5.4 5.4 0 0 0 4.7 3a5.8 5.8 0 0 0-1.5 4.1c0 5.8 3.5 7 6.8 7.4a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 19c-3 .9-3-1.5-4.2-2" />
    </Icon>
  );
}

export function LinkedinIcon(props) {
  return (
    <Icon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 11v5" /><path d="M8 8h.01" /><path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0-4 0" />
    </Icon>
  );
}

export function MailIcon(props) {
  return <Icon {...props}><rect width="18" height="14" x="3" y="5" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
}

export function MapPinIcon(props) {
  return <Icon {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
}

export function MenuIcon(props) {
  return <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
}

export function CloseIcon(props) {
  return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
}
