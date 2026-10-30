interface EpicProps {
  epicId: number;
  epicTitle: string;
  epicDescription: string;
}

export default function Epic({
  epicId,
  epicTitle,
  epicDescription,
}: EpicProps) {
  return (
    <div className="epic">
      <p className="title-epic">{epicTitle}</p>
      <p className="description-epic">{epicDescription}</p>
    </div>
  );
}
