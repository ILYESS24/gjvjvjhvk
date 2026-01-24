import type { Edge, Node, Viewport } from "@xyflow/react";

/**
 * Type definitions for project content stored in the database.
 * This represents the ReactFlow canvas state.
 */
export interface ProjectContent {
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
}

/**
 * Generated media content attached to nodes
 */
export interface GeneratedMedia {
  url: string;
  type: string;
}

/**
 * Common node data structure
 */
export interface BaseNodeData {
  updatedAt?: string;
  generated?: GeneratedMedia;
  description?: string;
}

/**
 * Image node specific data
 */
export interface ImageNodeData extends BaseNodeData {
  prompt?: string;
  modelId?: string;
  instructions?: string;
  size?: string;
}

/**
 * Audio node specific data
 */
export interface AudioNodeData extends BaseNodeData {
  text?: string;
  voice?: string;
  modelId?: string;
  instructions?: string;
}

/**
 * Video node specific data
 */
export interface VideoNodeData extends BaseNodeData {
  prompt?: string;
  modelId?: string;
  images?: Array<{ url: string; type: string }>;
}

/**
 * Code node specific data
 */
export interface CodeNodeData extends BaseNodeData {
  language?: string;
  code?: string;
}

/**
 * Text node specific data
 */
export interface TextNodeData extends BaseNodeData {
  content?: string;
  modelId?: string;
}

/**
 * Type guard to check if content is valid ProjectContent
 */
export function isValidProjectContent(content: unknown): content is ProjectContent {
  if (!content || typeof content !== "object") {
    return false;
  }

  const obj = content as Record<string, unknown>;
  
  // Must have nodes array
  if (!Array.isArray(obj.nodes)) {
    return false;
  }

  // Must have edges array
  if (!Array.isArray(obj.edges)) {
    return false;
  }

  return true;
}

/**
 * Safely parse project content from database
 */
export function parseProjectContent(content: unknown): ProjectContent {
  if (isValidProjectContent(content)) {
    return content;
  }

  // Return empty content if invalid
  return {
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
  };
}
