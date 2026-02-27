import { useState, useRef, useEffect, useCallback } from "react";

export type TagType = string;

export type TagData = { type: TagType; reason?: string };

export type TagStep = null | "picking" | "reasoning";

interface UseTagFlowParams {
  projectId: string;
  tags: TagData[];
  onAddTag?: (projectId: string, tag: TagData) => void;
  onEditTag?: (projectId: string, tagIndex: number, tag: TagData) => void;
  onDeleteTag?: (projectId: string, tagIndex: number) => void;
  setTags?: (updater: (prev: TagData[]) => TagData[]) => void;
}

export function useTagFlow(params: UseTagFlowParams) {
  const { projectId, tags, onAddTag, onEditTag, onDeleteTag, setTags } = params;

  const [tagStep, setTagStep] = useState<TagStep>(null);
  const [pendingTagType, setPendingTagType] = useState<TagType | null>(null);
  const [tagReason, setTagReason] = useState("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [tagMenuIndex, setTagMenuIndex] = useState<number | null>(null);
  const reasonInputRef = useRef<HTMLInputElement>(null);
  const editingTagIndexRef = useRef(editingTagIndex);
  editingTagIndexRef.current = editingTagIndex;

  const tagPopoverOpen = tagStep !== null || tagMenuIndex !== null;

  useEffect(() => {
    if (tagStep === "reasoning" && reasonInputRef.current) {
      reasonInputRef.current.focus();
    }
  }, [tagStep]);

  const dismissTagFlow = useCallback(() => {
    setTagStep(null);
    setPendingTagType(null);
    setTagReason("");
    setEditingTagIndex(null);
    setTagMenuIndex(null);
  }, []);

  const handlePickTag = useCallback((type: TagType) => {
    setPendingTagType(type);
    setTagStep("reasoning");
    if (editingTagIndexRef.current === null) setTagReason("");
  }, []);

  const handleSubmitTag = useCallback(() => {
    if (!pendingTagType) return;
    const tagData: TagData = {
      type: pendingTagType,
      reason: tagReason.trim() || undefined,
    };
    if (editingTagIndex !== null) {
      if (setTags) {
        setTags((prev) => prev.map((t, i) => (i === editingTagIndex ? tagData : t)));
      } else if (onEditTag) {
        onEditTag(projectId, editingTagIndex, tagData);
      }
    } else {
      if (setTags) {
        setTags((prev) => [...prev, tagData]);
      } else if (onAddTag) {
        onAddTag(projectId, tagData);
      }
    }
    dismissTagFlow();
  }, [
    pendingTagType,
    tagReason,
    editingTagIndex,
    projectId,
    setTags,
    onAddTag,
    onEditTag,
    dismissTagFlow,
  ]);

  const handleEditTag = useCallback((index: number) => {
    const tag = tags[index];
    setTagMenuIndex(null);
    setEditingTagIndex(index);
    setPendingTagType(tag.type as TagType);
    setTagReason(tag.reason || "");
    setTagStep("picking");
  }, [tags]);

  const handleDeleteTag = useCallback(
    (index: number) => {
      if (setTags) {
        setTags((prev) => prev.filter((_, i) => i !== index));
      } else if (onDeleteTag) {
        onDeleteTag(projectId, index);
      }
      setTagMenuIndex(null);
    },
    [projectId, setTags, onDeleteTag]
  );

  const resetTagFlow = useCallback(() => {
    setTagStep(null);
    setPendingTagType(null);
    setTagReason("");
    setEditingTagIndex(null);
  }, []);

  const openTagPicker = useCallback(() => {
    setTagMenuIndex(null);
    setEditingTagIndex(null);
    setTagStep("picking");
  }, []);

  return {
    tagStep,
    pendingTagType,
    tagReason,
    setTagReason,
    editingTagIndex,
    tagMenuIndex,
    setTagMenuIndex,
    reasonInputRef,
    tagPopoverOpen,
    dismissTagFlow,
    handlePickTag,
    handleSubmitTag,
    handleEditTag,
    handleDeleteTag,
    resetTagFlow,
    openTagPicker,
  };
}
