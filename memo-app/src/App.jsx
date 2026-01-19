import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MemoList from './components/MemoList';
import MemoEditor from './components/MemoEditor';
import './App.css';

function App() {
  // 1. 초기 데이터: localStorage에서 불러오기
  const [memos, setMemos] = useState(() => {
    const saved = localStorage.getItem('memos');
    return saved ? JSON.parse(saved) : [
      {
        id: Date.now(),
        title: '메모장에 오신 것을 환영합니다!',
        content: '이것은 첫 번째 메모입니다.\n\n새 메모를 만들어보세요!',
        category: '개인',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  });

  const [selectedMemo, setSelectedMemo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 2. 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  // 3. 새 메모 추가
  const handleNewMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: '',
      content: '',
      category: '개인',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMemos([newMemo, ...memos]);
    setSelectedMemo(newMemo);
  };

  // 4. 메모 수정(저장)
  const handleSaveMemo = (updatedMemo) => {
    const newMemos = memos.map(memo =>
      memo.id === updatedMemo.id ? updatedMemo : memo
    );
    setMemos(newMemos);
    setSelectedMemo(updatedMemo);
  };

  // 5. 메모 삭제
  const handleDeleteMemo = (memoId) => {
    const newMemos = memos.filter(memo => memo.id !== memoId);
    setMemos(newMemos);
    setSelectedMemo(null);
  };

  // 6. 검색 및 카테고리 필터링 된 목록
  const filteredMemos = memos.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          memo.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || memo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="main-container">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onCategorySelect={setSelectedCategory} 
        />

        <MemoList
          memos={filteredMemos}
          selectedMemo={selectedMemo}
          onMemoSelect={setSelectedMemo}
          onNewMemo={handleNewMemo}
        />

        <MemoEditor
          memo={selectedMemo}
          onSave={handleSaveMemo}
          onDelete={handleDeleteMemo}
        />
      </div>
    </div>
  );
}

export default App;