'use client';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

const defaultPresets = [
  '#000000', '#FFFFFF', '#ef4444', '#f97316', '#f59e0b', '#22c55e',
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#64748b',
];

export default function ColorPicker({
  label,
  value,
  onChange,
  presetColors = defaultPresets,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer rounded-lg border border-slate-600 bg-transparent p-0.5"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          className="w-24 rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="#000000"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`
              h-6 w-6 rounded-md border-2 transition-transform hover:scale-110
              ${value === color ? 'border-indigo-400 scale-110' : 'border-slate-600'}
            `}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
