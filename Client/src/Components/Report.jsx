import { useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon as ChatIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Report = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    try {
      const response = await fetch("/makereport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_report: username,
          message: message,
        }),
      });

      if (response.ok) {
        console.log("Report sent successfully");
        // Reset form fields
        setUsername("");
        setMessage("");
        // Close chat
        toggleChat();
      } else {
        console.error("Failed to send report");
      }
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatOpen ? (
        // Tampilan ketika chat terbuka
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">New Report Message</h2>
            <XMarkIcon className="h-5 w-5 text-gray-500 cursor-pointer" onClick={toggleChat} />
          </div>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" className="w-full border-black rounded-md p-2" placeholder="ex: ali@gmail.com" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full border-black rounded-md p-2 resize-none" rows={4} placeholder="Tulis pesan..." value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white" onClick={toggleChat}>
              Close
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={sendMessage}>
              Send Message
            </button>
          </div>
        </div>
      ) : (
        // Tampilan ketika chat tertutup
        <button className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg" onClick={toggleChat}>
          <ChatIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Report;
