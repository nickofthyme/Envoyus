import React from 'react';
import { VCenter } from './Center';
import axios from 'axios';

export const ListingItem = ({width, data, ...props}) => {
  return (
    <div style={{
      width,
      height: 360,
      backgroundColor: 'red',
    }}> 
      <div style={{
        width: '100%',
        height: '85%',
        backgroundImage: `url('${data.imageUrls[0]}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }} />
        <div><span>{data.price}</span> <span>{data.title}</span></div>
    </div>
  )
};

export const ListingItemFill = props => (
  <div style={{
    width: '24%',
    height: 360,
  }} /> 
);

export const ListingGrid = ({rows, columns, height, store, ...props}) => {
  const itemWidthPercent = 95 / columns;
  const fillCount = columns - store.length % columns;
  const filler = Array(fillCount).fill(0).map((_, i) => <ListingItemFill width={ itemWidthPercent + '%' } key={-i-1} />);
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
      store.map((data, i) => 
        <ListingItem 
          data={ data } 
          width={ itemWidthPercent + '%' } 
          key={i}/>).concat(filler)
    }
    </div>
  );
}