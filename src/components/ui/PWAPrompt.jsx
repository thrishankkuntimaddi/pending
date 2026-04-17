import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PWAPrompt — shows a subtle banner when a new service worker is waiting.
 * The user can tap "Update" to reload and activate the new version.
 */
const PWAPrompt = () => {
  const [show, setShow] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        // If there's already a waiting SW when we load, show immediately
        if (reg.waiting) {
          setRegistration(reg);
          setShow(true);
        }

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setRegistration(reg);
              setShow(true);
            }
          });
        });
      });

      // Reload when the new SW takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pwa-prompt"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="pwa-prompt-inner">
            <span className="pwa-prompt-icon">⚡</span>
            <div className="pwa-prompt-text">
              <strong>New version available</strong>
              <span>Tap Update to get the latest Pending.</span>
            </div>
            <div className="pwa-prompt-actions">
              <button className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "6px 14px" }} onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-ghost" style={{ fontSize: "0.8rem", padding: "6px 10px" }} onClick={() => setShow(false)}>
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAPrompt;
