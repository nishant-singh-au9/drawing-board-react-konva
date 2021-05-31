import "./styles.css";
import { useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

export default function App() {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawAreaHeight, setDrawAreaHeight] = useState(0);
  const [drawAreaWidth, setDrawAreaWidth] = useState(0);

  useEffect(() => {
    let drawing_area = document.getElementById("drawing__area");
    setDrawAreaHeight(drawing_area.clientHeight);
    setDrawAreaWidth(drawing_area.clientWidth);
  }, []);

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const start = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [start.x, start.y] }]);
    console.log(lines);
  };
  const handleMouseMove = (e) => {
    if (isDrawing) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  return (
    <>
      <div className="container">
        <div className="toolbar">
          Tool:{tool}
          <button className="tool" onClick={() => setTool("pen")}>
            <img src="/icons/pen.svg" alt="pen" />
          </button>
          <button className="tool" onClick={() => setTool("eraser")}>
            <img src="/icons/eraser.svg" alt="pen" />
          </button>
          <button className="tool" onClick={() => setLines([])}>
            <img src="/icons/delete.svg" alt="pen" />
          </button>
        </div>
        <div className="drawing__area" id="drawing__area">
          <Stage
            height={drawAreaHeight}
            width={drawAreaWidth}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke="red"
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
}
