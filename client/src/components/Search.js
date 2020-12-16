import React from 'react';
import Images from '../ImageList';
import { Link } from 'react-router-dom';


function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [Imgs, setImages] = React.useState([]);
  const [isNull, setNull] = React.useState(false);

  
  const handleChange = e => {
   
      setSearchTerm(e.target.value);
      
  };
  React.useEffect(() => {

    async function loadImages(){
    
        fetch('/api/images', {
          accept: 'application/json',
        }).then(res => res.json())
          .then(pic => {
            setImages(pic)
          }).catch(err => console.log(err));      
      
  }
  loadImages();
 
  let list1=[];
      
 

    Imgs.map(re=>{
      re.keywords.map(res=>
        list1.push(res))
    })
  
 
    
    const results = list1.filter(li =>
      li.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
    const uniqueResults = [...new Set(results)]
    
    if(searchTerm=== "")
    {
      setSearchResults([""])
    }
    else{
      setSearchResults(uniqueResults);
    }
        
   
    
   
  
    
  }, [searchTerm]);

  
 return (
  <div >
      <input
        type="text"
        placeholder="Search Backgrounds"
        value={searchTerm}
        className="searchInput"
        onChange={handleChange}
        style={{ textDecoration: 'none' }}      

      />
      <div className="search1">
   
    
      
        {searchResults.map(item => (
          <div>
          <Link to={`/search/${item}`} style={{ textDecoration: 'none' }}>  
            
            <p className="searchResult">{item}</p>
          </Link>
          
          </div>  
          
        ))}
        
      
        </div>
        

        

      
    </div>
  );
}

export default Search;