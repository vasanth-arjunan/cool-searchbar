import { LoaderCircle, Search } from "lucide-react";
import { useEffect } from "react";

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    loading: boolean;
}
export default function SearchBar({ query, setQuery, loading }: SearchBarProps) {


    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement && (
          activeElement.tagName === "INPUT"
        );

      if (!isTyping && e.key.toLowerCase() === "s") {
        const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


    return (
        <div className="form_field_wrapper">
            {loading ? (
                <LoaderCircle width={24} height={24} className="rotate-180" />
            ) : (
                <Search width={24} height={24} />
            )}

            <input id="search-input" value={query} onInput={(e: React.FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)} type="text" className="form_field_input" placeholder="Searching is easier" />
            <div className={`input_action_wrapper ${query !== "" ? 'is_active' : ''}`}>
                <div className="quick_access_group"><span className="keycap">S</span> quick access</div>
                <button className="form_field_clear_btn" onClick={() => setQuery("")}>Clear</button>
            </div>
        </div>
    )
}