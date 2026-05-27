import clsx from "clsx";

interface TagProps {
  label: string;
  variant?: "teal" | "navy" | "slate" | "red" | "green" | "orange";
  size?: "sm" | "xs";
}

const VARIANT_CLASSES = {
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  navy: "bg-blue-50 text-blue-800 border-blue-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  red: "bg-red-50 text-red-700 border-red-200",
  green: "bg-green-50 text-green-700 border-green-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
};

export function Tag({ label, variant = "slate", size = "sm" }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center border rounded-full font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-2 py-0 text-[10px]",
        VARIANT_CLASSES[variant]
      )}
    >
      {label}
    </span>
  );
}
