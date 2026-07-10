"use client";

import type { FileNode } from "../types/repository";

interface Props {
  nodes: FileNode[];
  onSelect: (path: string) => void;
}

function Tree({
  nodes,
  onSelect,
}: Props) {
  return (
    <>
      {nodes.map((node) => (
        <div
          key={node.path}
          className="ml-4 mt-2"
        >
          {node.type === "directory" ? (
            <>
              <p className="font-semibold">
                📁 {node.name}
              </p>

              {node.children && (
                <Tree
                  nodes={node.children}
                  onSelect={onSelect}
                />
              )}
            </>
          ) : (
            <button
              className="hover:text-blue-600"
              onClick={() =>
                onSelect(node.path)
              }
            >
              📄 {node.name}
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default Tree;