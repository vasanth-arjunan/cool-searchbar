import { Settings } from "lucide-react";
import { useMemo, useState } from "react";
import ResultsList from "./resultsList";
import Counter from "./counter";

interface Tab {
    label: string;
    value: string;
    icon: React.ReactNode | null;
}

interface TabsProps {
    query: string;
    data: any[];
    tabs: Tab[];
    loading: boolean;
}

export default function Tabs({ tabs, data, query, loading }: TabsProps) {
    const [activeTabs, setActiveTabs] = useState<Tab[]>([tabs[0], tabs[1], tabs[2]]);
    const [activeFilter, setActiveFilter] = useState<Tab>(tabs[0]);

    const filteredData = useMemo(() => data.filter((item) => {
        const matchesQuery = item.name?.toLowerCase().includes(query.toLowerCase());
        const matchesTab = activeFilter.value === "all" || item.type === activeFilter.value;
        return matchesQuery && matchesTab;
    }), [data, activeFilter, query])


    const handleTabChange = (e: any, currentTab: Tab) => {
        if (e.target.checked) {
            setActiveTabs([...activeTabs, currentTab]);
        } else {
            if (activeFilter === currentTab) {
                setActiveFilter(tabs[0])
            }
            setActiveTabs(activeTabs.filter((t) => t !== currentTab));
        }
    }

    return (
        <div className="tabs">
            <div className="tab_header flex justify-content-between">
                <div className="flex">
                    {activeTabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`tab_trigger flex align-items-center justify-content-center gap-1 ${activeFilter === tab ? 'tab_active' : ''}`}
                            onClick={() => {
                                setActiveFilter(tab);
                            }}
                        >
                            {tab.icon}
                            <div>{tab.label}</div>
                            <span className="result_count"><Counter value={tab.value === "all" ? data.length : data.filter((item) => item.type === tab.value).length} duration={300} /></span>
                        </button>
                    ))}
                </div>
                <button popoverTarget="myPopover" popoverTargetAction="toggle" className="tab_trigger flex align-items-center justify-content-center"><Settings /></button>
            </div>
            <div className="tab_content">
                <ResultsList results={filteredData} query={query} loading={loading} />

            </div>
            <div id="myPopover" popover="auto">
                <ul>
                    {tabs.filter((tab) => tab.value !== "all").map((tab) => (
                        <label key={tab.value} htmlFor={tab.value} className="flex align-items-center justify-content-between gap-2">
                            <div className="flex gap-1 align-items-center">
                                {tab.icon}
                                <div>{tab.label}</div>
                            </div>
                            <div className="flex align-items-center"><input checked={activeTabs.includes(tab)} onChange={(e) => handleTabChange(e, tab)} type="checkbox" id={tab.value} value={tab.value} /></div>
                        </label>
                    ))}
                </ul>
            </div>
        </div>
    );
}
