import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetRouting,resetSearching, setIsRouting, setIsSearching, updateMapCenter, setDestinationCoordinates } from "../../store/slices/mapSlice"
import useAppselectors from "../../store/selectors";
import config from "../../config";

function useNavigationUi() {

    const { isSearching, isRouting, tracking,saveBtn } = useAppselectors();
    
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")
    const [toDirections, setToDirections] = useState("")

    const handleSearch = async () => {
        if (search === "") {
            return;
        }
        const response = await axios.get(config.mapUrl, {
            params: {
                q:search,
                api_key: config.mapKey
            }
        })

        if (response.data.length === 0) {
            return;
        }
        
        dispatch(setIsSearching())
        dispatch(updateMapCenter({lat: response.data[0].lat, lng: response.data[0].lon}))        
   }

   const handleGetDirections = async () => {
       if (toDirections === "") {
           return;
       }
       const response = await axios.get(config.mapUrl, {
           params: {
               q:toDirections,
               api_key: config.mapKey
           }
       })

       if (response.data.length === 0) {
           return;
       }

       dispatch(setDestinationCoordinates({gLat: response.data[0].lat, gLng: response.data[0].lon}))
       dispatch(setIsRouting())       
   }

   const handleKeyPress1 = (e) => {
       if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();      
        }
   }

   const handleKeyPress2 = (e) => {
       if (e.key === "Enter") {
            e.preventDefault();
            handleGetDirections();
        }
   }

   const handleSearchReset = () => {
        dispatch(resetSearching())
        setSearch("")    
   }

   const handleGetDirectionsReset = () => {
        dispatch(resetRouting())
        setToDirections("")
   }

  return {
    isSearching,
    isRouting,
    tracking,
    saveBtn,
    search,
    setSearch,
    toDirections,
    setToDirections,
    handleSearch,
    handleGetDirections,
    handleKeyPress1,
    handleKeyPress2,
    handleSearchReset,
    handleGetDirectionsReset
  }
}

export default useNavigationUi
