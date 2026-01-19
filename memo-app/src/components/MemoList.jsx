function MemoList({ memos, selectedMemo, onMemoSelect, onNewMemo }) {
  return (
    <div className="memo-list">
      <div className="memo-list-header">
        <h2>메모 ({memos.length})</h2>
        <button className="new-memo-btn" onClick={onNewMemo}>+ 새 메모</button>
      </div>

      <div className="memo-items">
        {memos.length === 0 ? (
          <p className="no-data">메모가 없습니다.</p>
        ) : (
          memos.map(memo => (
            <div
              key={memo.id}
              className={`memo-item ${selectedMemo?.id === memo.id ? 'active' : ''}`}
              onClick={() => onMemoSelect(memo)}
            >
              <div className="memo-item-title">
                {memo.title || '제목 없음'}
              </div>
              <div className="memo-item-preview">
                {memo.content || '내용 없음'}
              </div>
              <div className="memo-item-date">
                {new Date(memo.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemoList;