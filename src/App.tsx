import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DragPreview } from "./components/DragPreview";
import { FloatingResetButton } from "./components/FloatingResetButton";
import { MedallionSidebar } from "./components/MedallionSidebar";
import { StartPage } from "./components/StartPage";
import { TreeCanvas } from "./components/TreeCanvas";
import { dropZones, type DropZoneId, type TreeStage } from "./data/dropZones";

type VisualStage = TreeStage | "fall_transition" | "resurrection_transition";

type DragState = {
  id: DropZoneId;
  startX: number;
  startY: number;
  x: number;
  y: number;
  active: boolean;
};

const transitionStage = (stage: VisualStage): TreeStage => {
  if (stage === "fall_transition") return "creation_alive";
  if (stage === "resurrection_transition") return "dead_waiting";
  return stage;
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [visualStage, setVisualStage] = useState<VisualStage>("creation_alive");
  const [placed, setPlaced] = useState<Partial<Record<DropZoneId, DropZoneId>>>({});
  const [selectedId, setSelectedId] = useState<DropZoneId | null>(null);
  const [wrongZoneId, setWrongZoneId] = useState<DropZoneId | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const timersRef = useRef<number[]>([]);
  const dragStateRef = useRef<DragState | null>(null);

  const currentStage = transitionStage(visualStage);
  const isTransitioning = visualStage === "fall_transition" || visualStage === "resurrection_transition";
  const placedIds = useMemo(() => new Set(Object.values(placed).filter(Boolean) as DropZoneId[]), [placed]);

  const updateDragState = useCallback((next: DragState | null) => {
    dragStateRef.current = next;
    setDragState(next);
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const markWrong = (zoneId: DropZoneId) => {
    setWrongZoneId(zoneId);
    const timer = window.setTimeout(() => setWrongZoneId(null), 620);
    timersRef.current.push(timer);
  };

  const triggerFall = () => {
    setVisualStage("fall_transition");
    const timer = window.setTimeout(() => setVisualStage("dead_waiting"), 3000);
    timersRef.current.push(timer);
  };

  const triggerResurrection = () => {
    setVisualStage("resurrection_transition");
    const timer = window.setTimeout(() => setVisualStage("redeemed_alive"), 5500);
    timersRef.current.push(timer);
  };

  const placeMedallion = useCallback(
    (draggedId: DropZoneId, zoneId: DropZoneId) => {
      if (isTransitioning) return;

      const zone = dropZones.find((item) => item.id === zoneId);
      if (!zone || zone.unlockStage !== currentStage || placed[zoneId]) {
        markWrong(zoneId);
        return;
      }

      if (draggedId !== zoneId || placedIds.has(draggedId)) {
        markWrong(zoneId);
        return;
      }

      setPlaced((existing) => ({ ...existing, [zoneId]: draggedId }));
      setSelectedId(null);

      if (zoneId === "fall") triggerFall();
      if (zoneId === "resurrection") triggerResurrection();
    },
    [currentStage, isTransitioning, placed, placedIds],
  );

  const reset = () => {
    clearTimers();
    setVisualStage("creation_alive");
    setPlaced({});
    setSelectedId(null);
    setWrongZoneId(null);
    updateDragState(null);
  };

  const beginMedallionPointer = useCallback(
    (id: DropZoneId, event: React.PointerEvent<HTMLButtonElement>) => {
      if (isTransitioning || placedIds.has(id)) return;

      event.preventDefault();
      setSelectedId(null);
      updateDragState({
        id,
        startX: event.clientX,
        startY: event.clientY,
        x: event.clientX,
        y: event.clientY,
        active: false,
      });
    },
    [isTransitioning, placedIds, updateDragState],
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const current = dragStateRef.current;
      if (!current) return;

      const distance = Math.hypot(event.clientX - current.startX, event.clientY - current.startY);
      updateDragState({
        ...current,
        x: event.clientX,
        y: event.clientY,
        active: current.active || distance > 6,
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      const current = dragStateRef.current;
      if (!current) return;

      updateDragState(null);

      if (!current.active) {
        setSelectedId(current.id);
        return;
      }

      const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      const zoneId = target?.closest<HTMLElement>("[data-drop-zone-id]")?.dataset.dropZoneId as DropZoneId | undefined;
      if (zoneId) placeMedallion(current.id, zoneId);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [placeMedallion, updateDragState]);

  if (!hasStarted) {
    return <StartPage onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className={`app app--${visualStage}`} dir="rtl" lang="ar-EG">
      <MedallionSidebar
        currentStage={currentStage}
        placedIds={placedIds}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onPointerStart={beginMedallionPointer}
      />
      <TreeCanvas
        visualStage={visualStage}
        currentStage={currentStage}
        placed={placed}
        wrongZoneId={wrongZoneId}
        selectedId={selectedId}
        onPlace={placeMedallion}
      />
      <FloatingResetButton disabled={isTransitioning} onReset={reset} />
      {dragState?.active && <DragPreview id={dragState.id} x={dragState.x} y={dragState.y} />}
    </div>
  );
}

export default App;
