import React from 'react';
import './Searchbar.css';

const Search = ({ setSearch, data, setRecords }) => {
  return (
    <div className="SearchBar">
      <input
        className="SearchS"
        type="text"
        placeholder="Фамилия"
        onChange={(e) => {
          setSearch({ ...Search, last: e.target.value });
          setRecords(data.filter(f => f.last.toLowerCase().includes(e.target.value.toLowerCase())));
        }}
      />
      <input
        className="SearchN"
        type="text"
        placeholder="Имя"
        onChange={(e) => {
          setSearch({ ...Search, name: e.target.value });
          setRecords(data.filter(f => f.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }}
      />
      <input
        className="SearchN"
        type="number"
        placeholder="Год выпуска"
        onChange={(e) => {
          setSearch({ ...Search, issuey: e.target.value });
          setRecords(data.filter(f => f.issuey.toLowerCase().includes(e.target.value.toLowerCase())));
        }}
      />
    </div>
  );
};

export default Search;
