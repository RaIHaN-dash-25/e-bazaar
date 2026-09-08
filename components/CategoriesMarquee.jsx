import { categories } from "@/assets/assets";

// A manually-scrollable rail of category "stalls" — replaces the
// auto-scrolling marquee with something the shopper drives themselves.
const CategoriesMarquee = () => {

    const palette = ["bg-moss-100 text-moss-700", "bg-ochre-100 text-ochre-600", "bg-clay-100 text-clay-600"];

    return (
        <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-4 sm:gap-6 w-max px-1 py-1">
                {categories.map((category, index) => (
                    <button
                        key={category}
                        className="flex flex-col items-center gap-2 shrink-0 group"
                    >
                        <span className={`size-16 sm:size-20 rounded-full flex items-center justify-center font-display text-lg sm:text-xl ${palette[index % palette.length]} group-hover:scale-105 group-active:scale-95 transition`}>
                            {category.slice(0, 1)}
                        </span>
                        <span className="text-xs text-ink-600">{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoriesMarquee;
