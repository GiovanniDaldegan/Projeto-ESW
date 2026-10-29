interface EpicProps {
  epicTitle: string;
  epicDescr: string;
}

export default function Epic({ epicTitle, epicDescr }: EpicProps) {
  return (
    <div className="Epic">
      <p className="TitleEpic">{epicTitle}</p>
      <p className="DescrEpic">{epicDescr}</p>
    </div>
  );
}
