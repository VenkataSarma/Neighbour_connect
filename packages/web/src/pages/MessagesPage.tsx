export const MessagesPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Conversations List */}
      <div className="lg:col-span-1 bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--text)]">Messages</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 border-b border-[var(--border)] hover:bg-[var(--accent-light)] cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-medium flex-shrink-0">
                  U{i}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="font-medium text-[var(--text)]">User {i}</div>
                    <div className="text-xs text-[var(--text-secondary)]">2m ago</div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] truncate">
                    Hey, are you still up for the morning run?
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex flex-col">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-medium">
            U1
          </div>
          <div>
            <div className="font-medium text-[var(--text)]">User 1</div>
            <div className="text-xs text-[var(--text-secondary)]">Active now</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-start">
            <div className="max-w-[70%] bg-[var(--bg)] rounded-lg p-3">
              <p className="text-[var(--text)]">Hey! Looking forward to the morning run tomorrow!</p>
              <span className="text-xs text-[var(--text-secondary)]">10:30 AM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[70%] bg-[var(--accent)] text-white rounded-lg p-3">
              <p>Yes! Meet at the park entrance at 6 AM?</p>
              <span className="text-xs opacity-80">10:32 AM</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[70%] bg-[var(--bg)] rounded-lg p-3">
              <p className="text-[var(--text)]">Perfect! See you there!</p>
              <span className="text-xs text-[var(--text-secondary)]">10:33 AM</span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
