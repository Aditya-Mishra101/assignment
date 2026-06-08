
export default function LoadingState() {
  return (
    <div id="loading-state" className="state-box" aria-live="polite">
      <div className="spinner"></div>
      <p>Searching books...</p>
    </div>
  );
}