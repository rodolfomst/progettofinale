
import { useState } from "react";
import { useNavigate } from "react-router";


export default function SearchGame() {
  const navigate = useNavigate();
  const [ search, setSearch ] = useState("");
  const [ ariaInvalid, setAriaInvalid ] = useState(null);
  
  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === 'string' && search.trim().length !== 0) {
      navigate
    } else {
      setAriaInvalid(true)
    }
  };

  
}