import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";
import { BlocksProvider } from "./contexts/BlocksContext";
import Sidebar from "./components/layout/Sidebar";
import BottomNav from "./components/layout/BottomNav";
import BlockForm from "./components/blocks/BlockForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlockView from "./pages/BlockView";
import Motivation from "./pages/Motivation";
import Loader from "./components/ui/Loader";
import PWAPrompt from "./components/ui/PWAPrompt";

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22, ease: "easeOut" },
};

const AuthedApp = () => {
  const location = useLocation();
  const [mobileAddOpen, setMobileAddOpen] = useState(false);

  return (
    <BlocksProvider>
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} {...PAGE_TRANSITION} style={{ flex: 1 }}>
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/block/:blockId" element={<BlockView />} />
                <Route path="/motivation" element={<Motivation />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav onAddClick={() => setMobileAddOpen(true)} />
        <BlockForm
          isOpen={mobileAddOpen}
          onClose={() => setMobileAddOpen(false)}
          parentId={null}
        />
        <PWAPrompt />
      </div>
    </BlocksProvider>
  );
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Login />;

  return <AuthedApp />;
};

export default App;
