import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import SearchIcon from "@mui/icons-material/Search"
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import useNavigationUi from "../../hooks/navigationUiHook"
import { FloatingButton } from "../FloatingButton"
import { SvgIcon, useMediaQuery } from "@mui/material"

function NavigationUi() {

    const { 
        isSearching,
        isRouting,
        tracking,
        saveBtn,
        search,
        setSearch,
        handleSearch,
        toDirections,
        setToDirections,
        handleGetDirections,
        handleKeyPress1,
        handleKeyPress2,
        handleSearchReset,
        handleGetDirectionsReset 
    }  = useNavigationUi()

    const isMobile = useMediaQuery('(max-width: 1027px)');

  return (
    <>
        {!isMobile && !tracking && !saveBtn &&
        <div className="flex bg-white absolute top-[3.6rem] left-72 h-12 z-[999] rounded-full border-[#0000009b] border-2">
            <input onKeyDown={handleKeyPress1} className="text-[15px] outline-none pl-3 rounded-full placeholder:text-[15px] placeholder:text-black" placeholder={isSearching ? "from" : "Enter a place to search"} name={"search"} label={"Search"} type={"text"} value={search} 
                onChange={(e) => setSearch(e.target.value)} />
            <button className="pr-3 rounded-full" onClick={handleSearch}>
                <SvgIcon component={SearchIcon} />
            </button>
        </div>
        }

        {isSearching && !isRouting &&
            <div className="leaflet-top leaflet-right">
            <FloatingButton color={"primary"} onClick={handleSearchReset}>
                <CloseOutlinedIcon />
            </FloatingButton>
            </div>
        }

        {isSearching && !isMobile && 
            <div className="absolute top-[3.6rem] z-[999] bg-white border-[#0000009b] border-[2px] rounded-full left-[35rem]">
                <input onKeyDown={handleKeyPress2} className="text-[14px] py-3 w-52 pl-2 rounded-full placeholder:text-black outline-none" placeholder="To" type="text" value={toDirections} 
                    onChange={(e) => setToDirections(e.target.value)} />
                <button className="pr-3" onClick={handleGetDirections}>
                    <SvgIcon component={AirlineStopsIcon} />
                </button>
            </div>
        }

        {isRouting &&
        <div className="leaflet-right leaflet-top">
            <FloatingButton color={"secondary"} className="px-3 py-4 rounded-full" onClick={handleGetDirectionsReset}>
                <CloseOutlinedIcon />
            </FloatingButton>
        </div>
        }
    </>
  )
}

export default NavigationUi
