export type Result = {
    id: number;
    type: "people" | "file" | "chat" | "list";
    name: string;
    status?: string;
    avatar?: string;
    activityDot?: "red" | "yellow" | "green";
    category?: string;
    subtitle?: string;
    fileKind?: "image" | "video" | "folder" | "document";
    extra?: string;
    participants?: number;
    items?: number;
};