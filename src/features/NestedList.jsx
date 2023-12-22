import React from 'react';

const NestedList = ({ data }) => {
  const renderList = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {`${item.id} - ${item.name}`}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderList(data)}</div>;
};

export default NestedList;
