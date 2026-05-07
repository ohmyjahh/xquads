'use client';

import { useState, useCallback } from 'react';

const LEAD_STORAGE_KEY = 'xquads_lead_captured';

function hasCapturedLead(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(LEAD_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function useCopyWithLead(defaultSource: string) {
  const [copied, setCopied] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [activeSource, setActiveSource] = useState(defaultSource);

  const copy = useCallback(
    async (text: string, sourceOverride?: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      if (!hasCapturedLead()) {
        setActiveSource(sourceOverride ?? defaultSource);
        setShowLeadForm(true);
      }
    },
    [defaultSource]
  );

  const closeLeadForm = useCallback(() => {
    setShowLeadForm(false);
  }, []);

  return {
    copied,
    showLeadForm,
    leadSource: activeSource,
    copy,
    closeLeadForm,
  };
}

export function markLeadCaptured() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LEAD_STORAGE_KEY, '1');
  } catch {
    // ignore
  }
}
