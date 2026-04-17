import { useState } from "react";
import Modal from "../ui/Modal";
import { CATEGORIES, STATUSES } from "./StatusBadge";
import { useBlocks } from "../../contexts/BlocksContext";

const BlockForm = ({ isOpen, onClose, parentId = null, editBlock = null }) => {
  const { addBlock, updateBlock } = useBlocks();
  const isEditing = !!editBlock;

  const [form, setForm] = useState({
    title: editBlock?.title || "",
    description: editBlock?.description || "",
    cost: editBlock?.cost || "",
    category: editBlock?.category || "General",
    status: editBlock?.status || "idea",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        cost: form.cost !== "" ? parseFloat(form.cost) : null,
        category: form.category,
        status: form.status,
      };

      if (isEditing) {
        await updateBlock(editBlock.id, payload);
      } else {
        await addBlock({ ...payload, parentId });
      }
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Reset form when modal opens
  const handleClose = () => {
    if (!isEditing) {
      setForm({ title: "", description: "", cost: "", category: "General", status: "idea" });
    }
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Block" : parentId ? "Add Sub-block" : "New Vision Block"}
    >
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Aquarium Build, Royal Enfield, Trip to Japan..."
            value={form.title}
            onChange={handleChange("title")}
            autoFocus
            maxLength={100}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input form-textarea"
            placeholder="What's this vision about?"
            value={form.description}
            onChange={handleChange("description")}
            maxLength={500}
          />
        </div>

        {/* Cost + Category Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Est. Cost (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={form.cost}
              onChange={handleChange("cost")}
              min="0"
              step="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input form-select"
              value={form.category}
              onChange={handleChange("category")}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="form-group">
          <label className="form-label">Status</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((p) => ({ ...p, status: s }))}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  border: `1px solid ${form.status === s ? "var(--accent)" : "var(--border)"}`,
                  background: form.status === s ? "var(--accent-dim)" : "var(--bg-active)",
                  color: form.status === s ? "var(--accent-light)" : "var(--text-secondary)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textTransform: "capitalize",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: "0.825rem" }}>{error}</p>
        )}

        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Block"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BlockForm;
