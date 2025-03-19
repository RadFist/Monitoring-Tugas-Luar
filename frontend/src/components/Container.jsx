export default function Container({ children }) {
  return (
    <div>
      <h1>ini header</h1>
      {children}
      <footer>
        <p> ini footer</p>
      </footer>
    </div>
  );
}
