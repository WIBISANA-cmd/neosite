import React from "react";

export type ListEditorProps<T> = {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (next: Partial<T> | T) => void, idx: number) => JSX.Element;
  addItem: () => T;
};

export function ListEditor<T>({ title, items, onChange, renderItem, addItem }: ListEditorProps<T>) {
  const handleUpdate = (idx: number, next: Partial<T> | T) => {
    const cloned: any[] = structuredClone(items);
    const current = cloned[idx];
    cloned[idx] =
      typeof current === "object" && current !== null && typeof next === "object"
        ? { ...current, ...next }
        : next;
    onChange(cloned as T[]);
  };

  return (
    <div className="glass-card p-4 rounded-2xl space-y-4 border border-white/5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-white">{title}</h4>
        <button className="btn-secondary px-3 py-1 text-sm" onClick={() => onChange([...items, addItem()])}>
          Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="border border-white/10 rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Item {idx + 1}</span>
              <button className="btn-danger" onClick={() => onChange(items.filter((_, i) => i !== idx))}>
                Remove
              </button>
            </div>
            {renderItem(item, (next) => handleUpdate(idx, next), idx)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  rows = 3,
}: {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
}) => (
  <label className="space-y-1 block">
    <span className="label-text text-gray-400">{label}</span>
    {textarea ? (
      <textarea className="input-field min-h-[120px]" value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input className="input-field" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    )}
  </label>
);

export const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    {children}
  </div>
);
