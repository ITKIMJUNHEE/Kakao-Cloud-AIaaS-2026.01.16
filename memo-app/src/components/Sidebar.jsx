function Sidebar({ selectedCategory, onCategorySelect }) {
  const categories = ['전체', '개인', '업무', '학습', '기타'];

  return (
    <aside className="sidebar">
      <h2>카테고리</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li 
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;