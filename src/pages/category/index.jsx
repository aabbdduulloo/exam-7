import * as React from "react";
import { Category } from "@modal";
import { Button } from "@mui/material";
import { CategoryTable } from "@ui";
import { useEffect, useState } from "react";
import { category } from "@service";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getData = async () => {
    try {
      const response = await category.get();
      if (response.status === 200 && response?.data?.categories) {
        setData(response.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Category open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <CategoryTable data={currentItems} />
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default Index;

// import * as React from "react";
// import { Category } from "@modal";
// import { Button } from "@mui/material";
// import { CategoryTable } from "@ui";
// import { useEffect, useState } from "react";
// import { category } from "@service";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const Index = () => {
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search query

//   const getData = async () => {
//     try {
//       const response = await category.get();
//       if (response.status === 200 && response?.data?.categories) {
//         setData(response.data.categories);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // Filter the data based on the search query, with added check for item.name
//   const filteredData = data.filter(
//     item =>
//       item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

// const handleInputChange = e => {
//   setSearchQuery(e.target.value);
// };

//   return (
//     <>
//       <Category open={open} handleClose={() => setOpen(false)} />
//       <div className="flex flex-col gap-3">
//         <div className="flex justify-end">
// <input
//   type="text"
//   placeholder="Search..." // Add a placeholder for better UX
//   value={searchQuery}
//   onChange={handleInputChange}
// />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpen(true)}
//           >
//             Add
//           </Button>
//         </div>
//         <CategoryTable data={currentItems} />
//         <Stack spacing={2} alignItems="center">
//           <Pagination
//             count={Math.ceil(filteredData.length / itemsPerPage)} // Use filtered data length for pagination
//             page={currentPage}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Stack>
//       </div>
//     </>
//   );
// };

// export default Index;
