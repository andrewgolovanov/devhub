const STATUS = {
  default: "All systems operational",
  warning: "Some Systems Are Warning",
  error: "Some Systems Are Error",
};

// TODO: add status themes
function SystemStatus() {
  // TODO: get system status from API
  const status = STATUS.default;

  return (
    <div className="flex items-center gap-x-2">
      <span
        className="flex size-1.5 shrink-0 rounded-full bg-[#34D59A]"
        aria-hidden
      />
      <p className="text-sm leading-none font-medium tracking-tight text-white">
        {status}
      </p>
    </div>
  );
}

export default SystemStatus;
