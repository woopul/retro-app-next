import React, { useEffect, useRef, useState } from 'react';

type ContentEditableProps = {
  html: string;
  onChange: (newHtml: string) => void;
};

export const ContentEditable: React.FC<ContentEditableProps> = ({ html, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      contentRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    // Workaround on content editable element's carret jump to the beggining of word when control by state
    onChange(contentRef.current?.innerHTML || '');
    setIsEditing(false);
  };

  return (
    <h3
      className="text-xl font-bold"
      ref={contentRef}
      contentEditable={isEditing}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={() => setIsEditing(true)}
    ></h3>
  );
};
