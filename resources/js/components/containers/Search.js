import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const SearchForm = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '18ch',
        '&:focus': {
          width: '24ch',
        },
      },
    },
}));

function Search(props) {

    const { data, setData, setFilter } = props.data

    const handleTextChange = (event) => {
        let searchKey = event.target.value
        if (!searchKey || searchKey==="") {
            setData({original: data.original, forFilter: data.original })
            setFilter(false)
            return
        }
        setFilter(true)

        let filteredData = data.original.filter(data => {
            let isMatch = false

            console.log(data)
            for (const key in data) {
                if(isMatch) break
                isMatch = data[key] ? data[key].toString().toLowerCase().includes(searchKey.toString().toLowerCase()) : false
            }

            return isMatch
        })

        setData({original: data.original, forFilter: filteredData })
    }

    return (
        <SearchForm  sx={props.sx}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleTextChange}
            />
        </SearchForm>
    )
}

export default Search
