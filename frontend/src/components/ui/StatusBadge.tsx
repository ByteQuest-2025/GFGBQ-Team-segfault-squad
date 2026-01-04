interface StatusBadgeProps {
  status: 'success' | 'warning' | 'critical' | 'active';
  children: React.ReactNode;
  pulse?: boolean;
}

export function StatusBadge({ status, children, pulse = false }: StatusBadgeProps) {
  const colors = {
    success: 'bg-[#00CC88]/20 text-[#00CC88] border-[#00CC88]/40',
    warning: 'bg-[#FFC043]/20 text-[#FFC043] border-[#FFC043]/40',
    critical: 'bg-[#FF4D4D]/20 text-[#FF4D4D] border-[#FF4D4D]/40',
    active: 'bg-[#00F3FF]/20 text-[#00F3FF] border-[#00F3FF]/40',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${colors[status]} ${pulse ? 'animate-pulse-subtle' : ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-[#00CC88]' : status === 'warning' ? 'bg-[#FFC043]' : status === 'critical' ? 'bg-[#FF4D4D]' : 'bg-[#00F3FF]'}`} />
      {children}
    </span>
  );
}
