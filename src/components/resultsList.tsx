import { Result } from "../types/result";
import ResultsCell from "./resultsCell";

interface ResultsListProps {
    results: Result[];
    query: string;
    loading: boolean
}

export default function ResultsList({ results, query, loading }: ResultsListProps) {
    const count = ["1", "2", "3", "4", "5"];
    return (
        <ul>
            {!loading && results.length === 0 ? (
                <li className="no_result_group flex flex-column align-items-center gap-2"><div>Nothing here… <span className="highlight" style={{ color: "var(--black)", fontWeight: "500" }}>{query}</span> must be on vacation.</div></li>
            ) : loading ? count.map((count, index) => (
                <li key={count+index} style={{ pointerEvents: "none", animationDelay: `${index * 100}ms` }} className="results_main_cell" >
                    <div className="flex align-items-center gap-1 skeleton_wrapper">
                        <div className="result_icon skeleton"></div>
                        <div>
                            <div className="result_name skeleton"></div>
                            <div className="result_description skeleton"></div>
                        </div>
                    </div>
                </li>
            )) : results.map((result, index) => (<ResultsCell index={index} key={result.type + index} query={query} result={result} />))}
        </ul>
    )
}