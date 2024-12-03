import React from 'react';
import '../Component/Category.css'; // Correct the path here

export default function Category({finalcategory,SetcatName}) {

  let resCategory = finalcategory.map((value , index)=>{
    return(
      <li   onClick={()=>SetcatName(value)} key = {index} className='liDesign'>
           {value}
          </li>
    )
  })
  
  return (
    <div className='bg-gray-200'>
      <h3 className='productDesign'>
        Product Category
      </h3>
      
        <ul className='mt-[20px]'>
           {resCategory}
        </ul>
     
    </div>
  );
}
