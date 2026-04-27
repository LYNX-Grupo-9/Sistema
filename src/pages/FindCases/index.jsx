import { useState } from "react";
import Cases from "./cases";
import Chats from "./chats";

export default function FindCases() {

    const [tab, setTab] = useState(0);

    const tabActiveStyle = {
        padding: "10px 20px",
        cursor: "pointer",
        borderBottom: "2px solid #007bff",
    }
    const tabStyle = {
        padding: "10px 20px",
        cursor: "pointer",
        borderBottom: "2px solid #f1f1f1",
    }
    
    return (
        <div className="flex flex-col h-[99vh] w-full">
            <div className=" flex h-[5vh] w-full justify-center items-center gap-20">
                <div onClick={() => setTab(0)} style={tab === 0 ? tabActiveStyle : tabStyle}>
                    <h1>Casos</h1>
                </div>
                <div onClick={() => setTab(1)} style={tab === 1 ? tabActiveStyle : tabStyle}>
                    <h1>Chats</h1>
                </div>
            </div>
            <div>
                {tab === 0 ? <Cases /> : <Chats />}
            </div>
        </div>
    );
}