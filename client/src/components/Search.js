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
 return (
  <div class='search-me'>
      <input
        type="text"
        placeholder="Search Backgrounds"
        value={searchTerm}
        class="search"
        onChange={handleChangeSearchIp}
      />
      
                <select  className="catSearch" name="category" id="category"  value={cate} onChange={onChangeCate}>
                    <option value="all">All</option>
                    <option value="Office">Office</option>
                    <option value="Home">Home</option>
                    <option value="Outdoor">Outdoor</option>
                </select>
                
                
      <div className="search1">
        {searchResults.map(item => (
          <div>
          <Link to={`/search/${cate}/${item}`} style={{ textDecoration: 'none' }} >  
            <p className="result">{item}</p>
          </Link>
          </div>  
        ))}
        </div>
        </div>
  );
}

export default Search;