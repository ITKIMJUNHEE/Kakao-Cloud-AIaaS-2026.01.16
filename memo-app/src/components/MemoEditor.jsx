import { useState, useEffect } from 'react';

function MemoEditor({ memo, onSave, onDelete }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('개인');

  useEffect(() => {
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
      setCategory(memo.category || '개인');
    }
  }, [memo]);

  const handleSave = () => {
    if (!memo) return;
    onSave({
      ...memo,
      title: title.trim(),
      content: content.trim(),
      category: category,
      updatedAt: new Date().toISOString()
    });
    alert('저장되었습니다!');
  };

  if (!memo) {
    return (
      <div className="memo-editor">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>메모를 선택하거나 새 메모를 만드세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memo-editor">
      <div className="editor-header">
        <input
          type="text"
          className="editor-title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="개인">개인</option>
          <option value="업무">업무</option>
          <option value="학습">학습</option>
          <option value="기타">기타</option>
        </select>
        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>저장</button>
          <button className="delete-btn" onClick={() => onDelete(memo.id)}>삭제</button>
        </div>
      </div>
      <div className="editor-content">
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MemoEditor;