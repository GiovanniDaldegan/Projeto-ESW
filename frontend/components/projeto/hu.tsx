interface HUProps {
  huId: number;
  huName: string;
  huDescr: string;
  huTag: string;
  huPoints: number;
  huReach: number;
  huImpact: number;
  huConfidence: number;
  huEffort: number;
}

export default function HU({
  huId,
  huName,
  huDescr,
  huTag,
  huPoints,
  huReach,
  huImpact,
  huConfidence,
  huEffort,
}: HUProps) {
  return (
    <div className="hu">
      <p className="name-hu">{huName}</p>
      <p className="description-hu">{huDescr}</p>
      <span className="tag-hu">{huTag}</span>
      <span className="points-hu">{huPoints}</span>
      <span className="rice-hu">
        {(huReach * huImpact * huConfidence) / huEffort}
      </span>
    </div>
  );
}
