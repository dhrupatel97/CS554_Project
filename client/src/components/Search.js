import React from 'react';
import Images from '../ImageList';
import { Link } from 'react-router-dom';
import  { useState,useEffect, useCallback } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [Imgs, setImages] = useState([]);
  const [isNull, setNull] = useState(false);
  const [cate, setCate] = useState('all')
  
  const handleChangeSearchIp = e => {   
      setSearchTerm(e.target.value);   
  };
 
  const onChangeCate = (e) => {
    setCate(e.target.value)
}

  useEffect(() => {
    async function loadImages(){ 
        fetch('/api/images', {
          accept: 'application/json',
        }).then(res => res.json())
          .then(pic => {
            setImages(pic)
            let list1=[]; 
            pic.map(re=>{
              re.keywords.map(res=>
              list1.push(res))
            })  
            const results = list1.filter(li =>
                li.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const uniqueResults = [...new Set(results)]   
            if(searchTerm=== ""){
              setSearchResults([""])
            }else{
              setSearchResults(uniqueResults);
            } 
            }).catch(err => console.log(err));          
      }
    loadImages();  
  }, [searchTerm]); 
  console.log(searchResults.length);
 return (
  <div class='search'>
    <div class='search-wrap'>
    <label for="search-box">Search: </label>
      <div>
      <input
        type="text"
        placeholder="Search Backgrounds"
        value={searchTerm}
        class="search-box-style"
        id = "search-box"
        onChange={handleChangeSearchIp}
      />
      </div>
      <div>
                <select  className="catSearch" name="category" id="category"  value={cate} onChange={onChangeCate}>
                    <option value="all">All</option>
                    <option value="Office">Office</option>
                    <option value="Home">Home</option>
                    <option value="Outdoor">Outdoor</option>
                </select>   
                </div>
                </div>
      {searchResults.length > 1 ?           
      <div className="search1">
        {searchResults.map(item => (
          <div>
          <Link to={`/search/${cate}/${item}`} style={{ textDecoration: 'none' }} >  
            <p className="result">{item}</p>
          </Link>
          </div>  
        ))}
        </div> : null }
        </div>
  );
}

export default Search;