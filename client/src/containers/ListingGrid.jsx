import React from 'react';
import { VCenter } from './Center';

export const ListingItem = ({width, ...props}) => {
  return (
    <div style={{
      width,
      height: 360,
      backgroundColor: 'red',
    }}> 
      <div style={{
        width: '100%',
        height: '85%',
        backgroundColor: 'lightgreen',
      }} />
        <div><span>$50</span> <span>Listing Title</span></div>
    </div>
  )
};

export const ListingItemFill = props => (
  <div style={{
    width: '24%',
    height: 360,
  }} /> 
);

export const ListingGrid = ({rows, columns, height, listData, ...props}) => {
  const itemWidthPercent = 95 / columns;
  const fillCount = columns - listData.length % columns;
  const filler = Array(fillCount).fill(0).map(ListingItemFill);
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'blue',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}>
    {
      listData.map((data, i) => 
        <ListingItem 
          data={ data } 
          width={ itemWidthPercent + '%' } 
          key={i}/>).concat(filler)
    }
    </div>
  );
}