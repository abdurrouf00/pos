import { useState } from "react";

export default function StatsCard({
  title,
  titleColor = "black",
  bgColor = "white",
  metrics = [],
  icon = null,
  onClick = null,
  isLoading = false,
  footer = null,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`overflow-hidden shadow rounded-md ${bgColor} transition-all duration-200 ${
        isHovered ? "shadow-md" : ""
      } ${onClick ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-center pb-3">
          <div
            className={`text-[16px] font-[600]`}
            style={{ color: titleColor }}
          >
            {title}
          </div>
          {icon && <div>{icon}</div>}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse h-8 w-full bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {metrics.map((metric, index) => (
              <div key={index} className="pr-1">
                <div className="text-[12px] font-[400] text-[#6D788C]">
                  {metric.label}
                </div>
                <div
                  style={{ color: metric.valueColor }}
                  className="text-[24px] font-[600]"
                >
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {footer && (
          <div className="mt-3 pt-2 border-t border-gray-100">{footer}</div>
        )}
      </div>
    </div>
  );
}
