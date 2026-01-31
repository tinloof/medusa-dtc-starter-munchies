import { useEffect, useState } from "react";

export function DraftModeToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);

  useEffect(() => {
    // Only show toast when in draft mode but NOT in presentation tool (iframe)
    const isInIframe = window.self !== window.top;
    if (!isInIframe) {
      setIsVisible(true);
    }
  }, []);

  const handleDisable = async () => {
    setIsDisabling(true);
    try {
      await fetch("/api/draft-mode/disable", { method: "POST" });
      window.location.reload();
    } catch {
      setIsDisabling(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-9999 flex items-center gap-4 rounded-lg bg-neutral-900 px-4 py-3 font-sans text-sm text-white shadow-lg">
      <div>
        <div className="font-medium">Draft Mode Enabled</div>
        <div className="mt-0.5 text-neutral-400 text-xs">
          Viewing draft content
        </div>
      </div>
      <button
        className="rounded bg-white px-3 py-2 font-medium text-neutral-900 text-xs hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isDisabling}
        onClick={handleDisable}
        type="button"
      >
        {isDisabling ? "Disabling..." : "Disable"}
      </button>
    </div>
  );
}
