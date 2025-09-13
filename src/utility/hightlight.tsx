export default function highlightMatch(word: string, query: string) {
  if (!query) return <>{word ?? ""}</>;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = word.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="highlight">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}
