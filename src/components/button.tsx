import clsx from "clsx";

export default function Button({
  text,
  type = "terracota",
  className,
}: {
  text: string;
  type?: "terracota" | "green";
  className?: string;
}) {
  let bgColor = "";
  let textColor = "";

  if (type === "terracota") {
    bgColor = "bg-terracota-dark";
    textColor = "text-black";
  }

  if (type === "green") {
    bgColor = "bg-green-dark";
    textColor = "text-white";
  }

  return (
    <button
      className={clsx("py-1 px-4 rounded-full", bgColor, textColor, className)}
    >
      {text}
    </button>
  );
}
