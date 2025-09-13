import { ExternalLink, File, Folder, Image, Link, List, MessageCircleMore, User, Video } from "lucide-react";
import { JSX, useState } from "react";
import highlightMatch from "../utility/hightlight";
import Tooltip from "./tooltip";
import { Result } from "../types/result";

interface ResultsCellProps {
    result: Result;
    query: string;
    index: number;
}

export default function ResultsCell({ result, query, index }: ResultsCellProps) {
    const [copyText, setCopyText] = useState<string>("Copy Link")

    const renderCell = () => {
        if (!result) return null;
        const type = result.type;
        const fileKind = result.fileKind || result.type;
        const description = type === "people" ? result.status : type === "file" ? `${result.category}${" • "}${result.subtitle}` : result.subtitle;

        const icons: Record<string, JSX.Element> = {
            file: <File />,
            people: <User />,
            chat: <MessageCircleMore />,
            list: <List />,
            image: <Image />,
            video: <Video />,
            folder: <Folder />
        };

        const handleCopy = async (result: Result) => {
            try {
                await navigator.clipboard.writeText(`https://www.example.com/${result.type}/${encodeURI(result.name)}`);
                setCopyText("✓ Link Copied!")
                setTimeout(() => {
                    setCopyText("Copy Link")
                }, 1000);

            }
            catch (error) {
                setCopyText("✕ Copy Failed")
                setTimeout(() => {
                    setCopyText("Copy Link")
                }, 1000);
            }
        }

        return (
            <div className="flex align-items-center gap-2 justify-content-between">
                <div className="flex align-items-center gap-1">
                    <div className="result_icon">
                        {type === "people" ? (
                            <div>
                                <img src={`/images/users/${result.avatar}`} alt={result.name} className="user_avatar" />
                                <span className={`status_dot ${result.activityDot}`}></span>
                            </div>
                        ) : icons[fileKind]
                        }
                    </div>
                    <div>
                        <div className="result_name">
                            <span>{highlightMatch(result.name, query)}</span>{" "}
                            {result.fileKind === "folder" && (
                                <span className="result_count">{result.extra}</span>
                            )}
                        </div>
                        <div className="result_description">{description}</div>
                    </div>
                </div>
                <div className="result_actions flex align-items-stretch">
                    <div className="copy_group flex justify-content-center">
                        <Tooltip key={index} text={copyText}>
                            <button className="action_btn flex align-items-center" onClick={() => handleCopy(result)}><Link /></button>
                        </Tooltip>
                    </div>
                    <button className="action_btn flex align-items-center" onClick={() => window.open(`https://www.example.com/${result.type}/${encodeURI(result.name)}`)}><ExternalLink /><div>New Tab</div></button>
                </div>
            </div>
        );
    };
    return (<li className="results_main_cell" style={{ animationDelay: `${index * 100}ms` }}>
        {renderCell()}
    </li>)
}