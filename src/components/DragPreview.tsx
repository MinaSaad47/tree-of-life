import { medallionImage, type DropZoneId } from "../data/dropZones";

type DragPreviewProps = {
  id: DropZoneId;
  x: number;
  y: number;
};

export function DragPreview({ id, x, y }: DragPreviewProps) {
  return (
    <div className="drag-preview" style={{ left: x, top: y }} aria-hidden="true">
      <img src={medallionImage(`${id}.webp`)} alt="" />
    </div>
  );
}
