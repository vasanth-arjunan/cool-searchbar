import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar";
import Tabs from "./components/tabs";
import "./App.css"
import { List, MessageCircleMore, Paperclip, User } from "lucide-react";

async function fetchData(query: string): Promise<any[]> {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      const allData = [
        {
          id: 1,
          type: "people",
          name: "Caroline Dribsson",
          status: "Unactivated",
          avatar: "user_1.png",
          activityDot: "red",
        },
        {
          id: 2,
          type: "people",
          name: "Adam Cadribean",
          status: "Active 1w ago",
          avatar: "user_4.png",
          activityDot: "yellow",
        },
        {
          id: 2,
          type: "people",
          name: "Dribble Champion",
          status: "Active 1w ago",
          avatar: "user_2.png",
          activityDot: "yellow",
        },
        {
          id: 3,
          type: "file",
          name: "final_dribbble_presentation.jpg",
          category: "in Presentations",
          subtitle: "Edited 1w ago",
          fileKind: "image",
        },
        {
          id: 4,
          type: "people",
          name: "Margareth Cendribbssen",
          status: "Active 1w ago",
          avatar: "user_3.png",
          activityDot: "yellow",
        },
        {
          id: 5,
          type: "file",
          name: "dribbble_animation.avi",
          category: "in Videos",
          subtitle: "Added 1y ago",
          fileKind: "video",
        },
        {
          id: 6,
          type: "file",
          name: "Dribbble Folder",
          category: "in Projects",
          subtitle: "Edited 2m ago",
          extra: "12 Files",
          fileKind: "folder",
        },
        {
          id: 7,
          type: "chat",
          name: "Design Team Chat",
          subtitle: "Latest: Can you review this?",
          participants: 5,
        },
        {
          id: 8,
          type: "chat",
          name: "Client Feedback Thread",
          subtitle: "Latest: Please update logo",
          participants: 3,
        },
        {
          id: 9,
          type: "list",
          name: "To-Do: Website Redesign",
          items: 8,
          subtitle: "3 completed, 5 remaining",
        },
        {
          id: 10,
          type: "list",
          name: "Bug Tracker",
          items: 15,
          subtitle: "7 open, 8 fixed",
        },
      ];
      const filtered = allData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 1000);
  });
}



interface Tab {
  label: string;
  value: string;
  icon: React.ReactNode | null;
}

const tabs: Tab[] = [
  { label: "All", value: "all", icon: null },
  { label: "Files", value: "file", icon: <Paperclip /> },
  { label: "People", value: "people", icon: <User /> },
  { label: "Chats", value: "chat", icon: <MessageCircleMore /> },
  { label: "List", value: "list", icon: <List /> },
];

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const handler = setTimeout(() => {
        fetchData(query)
          .then((res) => {
            setData(res);
          })
          .catch((error) => {
            console.log(`Error Fetching Data: ${error}`);
          })
          .finally(() => setLoading(false));
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [query]);

  return (
    <div className="search_wrapper">
      <div className="search-app">
        <SearchBar query={query} setQuery={setQuery} loading={loading} />
        {query !== "" && (
          <Tabs tabs={tabs} data={data} query={query} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default App;
