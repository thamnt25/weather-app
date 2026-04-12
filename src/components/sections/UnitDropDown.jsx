import iconCheckMark from "../../assets/images/icon-checkmark.svg";

const sections = [
  {
    title: "Temperature",
    options: [
      { label: "Celsius (\u00B0C)", selected: true },
      { label: "Fahrenheit (\u00B0F)", selected: false },
    ],
  },
  {
    title: "Wind Speed",
    options: [
      { label: "km/h", selected: true },
      { label: "mph", selected: false },
    ],
  },
  {
    title: "Precipitation",
    options: [
      { label: "Millimeters (mm)", selected: true },
      { label: "Inches (in)", selected: false },
    ],
  },
];

const UnitDropDown = () => {
  return (
    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[15.5rem] rounded-2xl border border-neutral-600/70 bg-neutral-800 p-3 text-neutral-0 shadow-[0_20px_45px_rgba(3,1,45,0.55)]">
      <button
        type="button"
        className="mb-3 w-full rounded-xl bg-neutral-700 px-4 py-3 text-left text-[1.05rem] font-medium tracking-[0.01em] text-neutral-0 transition-colors hover:bg-neutral-600"
      >
        Switch to Imperial
      </button>

      {sections.map((section, index) => (
        <div
          key={section.title}
          className={index === 0 ? "" : "border-t border-neutral-600/60 pt-3"}
        >
          <p className="mb-2 text-sm font-medium tracking-[0.01em] text-neutral-300">
            {section.title}
          </p>

          <div className="space-y-1 pb-3">
            {section.options.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[1.05rem] font-medium tracking-[0.01em] transition-colors ${
                  option.selected
                    ? "bg-neutral-700 text-neutral-0"
                    : "text-neutral-0 hover:bg-neutral-700/75"
                }`}
              >
                <span>{option.label}</span>
                {option.selected ? (
                  <img src={iconCheckMark} alt="" className="h-4 w-4" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitDropDown;
