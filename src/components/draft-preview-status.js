function DraftPreviewStatus({ status, includeDrafts }) {
  const statusMessage = {
    connecting: 'Connecting to DatoCMS...',
    connected: '🔴 Connected to DatoCMS, receiving live updates!',
    closed: 'Connection closed',
  };

  function endPreview() {
    if (includeDrafts) {
      fetch('/api/end-preview').then(res => {
        console.log(res.text());
        window.location.reload();
      });
    }
  }

  if (!includeDrafts) {
    return null;
  }

  return (
    <div className="fixed right-[20px] top-[20px] z-[99999] flex">
      <button
        className="mr-[10px] rounded-[99px] bg-[#ff4500] px-[10px] py-[5px] text-white transition-opacity hover:bg-[#f87443]"
        onClick={endPreview}
      >
        ⏻
      </button>

      <div className="rounded-[99px] bg-[#ff4500] px-[10px] py-[5px] text-white opacity-100 transition-opacity hover:opacity-0">
        <p>{ statusMessage[status] }</p>
      </div>
    </div>
  );
};

export default DraftPreviewStatus;
