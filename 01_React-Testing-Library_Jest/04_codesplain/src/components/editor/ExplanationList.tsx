import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ExplanationPanel from "./ExplanationPopup";

function ExplanationList({
  editorRef,
  selections,
  onExplanationClose,
}: {
  editorRef: React.MutableRefObject<any>;
  selections: Selection[];
  onExplanationClose: Function;
}) {
  const [widgets, setWidgets] = useState<Selection[]>([]);
  // console.log(widgets);
  console.log(editorRef);

  useEffect(() => {
    const updateWidgets = (widgets: Selection[]) => {
      widgets
        .filter((w) => !selections.find((s: Selection) => s.line === w.line))
        .forEach((w) => {
          editorRef.current.removeContentWidget(w);
        });

      const updatedWidgets = selections.map((explanation: Selection) => {
        const existingWidget = widgets.find((w) => w.line === explanation.line);
        if (existingWidget) {
          return existingWidget;
        }
        const widget = buildWidget(explanation, editorRef);
        editorRef.current.addContentWidget(widget);
        return widget;
      });

      return updatedWidgets.filter((w) => selections.find((s: Selection) => s.line === w.line));
    };
    setWidgets(updateWidgets as any);
  }, [selections, editorRef]);

  const renderedZones = widgets.map((widget) => {
    if (widget.domNode && widget.domNode.nodeType === 1) {
      return createPortal(<ExplanationPanel selection={widget} onClose={onExplanationClose} />, widget.domNode);
    }
    return null;
  });

  return renderedZones;
}

function buildWidget(selection: Selection, _editorRef?: React.MutableRefObject<any>) {
  return {
    ...selection,
    domNode: null,
    getId: function () {
      return `explanation-${selection.line}`;
    },
    getDomNode: function (this: any) {
      if (!this.domNode) {
        this.domNode = document.createElement("div");
        this.domNode.classList.add("z-50");
      }
      return this.domNode;
    },
    getPosition: function () {
      return {
        position: {
          lineNumber: selection.line,
          column: 0,
        },
        preference: [2],
      };
    },
  };
}

export default ExplanationList;
