
export default function ErrorState({ message }) {
  return (
    <div id="error-state" className="state-box" role="alert">
      <p id="error-message">{message}</p>
    </div>
  );
}