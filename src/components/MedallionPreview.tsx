import { medallionImage } from "../data/dropZones";

type MedallionPreviewProps = {
  label: string;
  image: string;
};

export function MedallionPreview({ image, label }: MedallionPreviewProps) {
  return (
    <div className="medallion-preview" role="dialog" aria-label={`${label} مكبرة`}>
      <div className="medallion-preview__card">
        <img src={medallionImage(image)} alt={label} />
        <span>{label}</span>
      </div>
    </div>
  );
}
