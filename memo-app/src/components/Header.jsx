function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>📝 메모장</h1>
      </div>
      <div className="header-search">
        <input 
          type="text" 
          placeholder="메모 검색..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;