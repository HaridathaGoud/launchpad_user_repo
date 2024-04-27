
const handleSearchbyCategory = (e: any) => {
    inputRef.current.value = "";
    let data = e.target.value;
    setCatagoryes(data);
    getExploreNftsDetails(1, 8, data, null);
  };
  {/* <Form className="explore-search mb-4"  >
          <div className="p-relative">
            <Form className="d-flex nav-search hide-mobile ">
             
              <Form.Control
                  placeholder="Search"
                  className="header-search pe-5"
                  aria-label="Search"
                  onKeyDown={(e) => handleSearch(e)}
                  onChange={(e)=>handleChange(e)}
                />
                <i className="icon md search-angle icon-space " onClick={()=>handleSearchIcon(search)}></i>
            </Form>
          </div>
        </Form> */}
  const handleSearchIcon = (iconData: any) => {
    let data = iconData;
    if (data == "" || data == null || data.includes(".")) {
    } else {
      getExploreNftsDetails(1, 8, "all", search);
    }
  };
  const handleChange = (e: any) => {
    let data = e.target.value.trim();
    setSearch(data);
    if (data == "") {
      e.preventDefault();
      getExploreNftsDetails(1, 8, "all", null);
    } else {
      if (!data) {
        getExploreNftsDetails(1, 8, "all", search);
        e.preventDefault();
      }
    }
  };
  const handleSearch = async (e: any) => {
    let data = e.target.value.trim();
    setSearch(data);
    if (e.key === "Enter") {
      if (data == "" || data.includes(".")) {
        e.preventDefault();
      } else {
        getExploreNftsDetails(1, 8, "all", search);
        e.preventDefault();
      }
    } else if (e.key === "Backspace" && data == "") {
      getExploreNftsDetails(1, 8, "all", null);
      e.preventDefault();
    }
  };
  const getCategories = async () => {
    let response = await getMarketplace(`User/CategoriesLU`);
    if (response) {
      setCategoryData(response.data);
    }
  };
  const category = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryData, setCategoryData] = useState();
  const [catagoryes, setCatagoryes] = useState("all");