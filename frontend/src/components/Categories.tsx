// import { gql, useQuery } from '@apollo/client';
// import React from 'react';

// const Categories = ({setCategory , category}:{setCategory:void , category:string | undefined}) => {
//   const GET_CATEGORIES = gql`
//     query GetCategories {
//       getAllCategories {
//         title
//       }
//     }
//   `;
//   const { data, loading, error } = useQuery(GET_CATEGORIES);
//   // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   //   setCategory(e.target.value);
//   // };
//   return (
//     <>
//       {data && (
//         <select value={category} // Use the selected value from the state
//         onChange={handleCategoryChange} // Call the handler function when the select input changes
//         className="select select-bordered w-1/2 max-w-xs">
//           <option disabled selected>
//             Select a category
//           </option>
//           {data.getAllCategories.map((category : {title : string}) => (
//             <option key={category.title}>{category.title}</option>
//           ))}
//         </select>
//       )}
//     </>
//   );
// };

// export default Categories;
