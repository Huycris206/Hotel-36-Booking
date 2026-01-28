import { useRef} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function TimeScroller({TIMES,value,onChange}) {
  const scrollRef = useRef(null);
  ;

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scroll area */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth w-[250px]"
      >
        {TIMES.map((time) => (
          <button
            key={time}
            onClick={() => onChange(time)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm transition
              ${
                value === time
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
