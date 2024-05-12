import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'antd';

import './CustomTable.css';

const CustomTable = ({
  data,
  columns,
  virtualized,
  rowHeight = 50,
  bufferRows = 2,
  visibleRows = 3,
  tableWidth = '100%',
}) => {
  const tableBodyRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortByColumn = (dataKey) => {
    let direction = 'ascending';

    if (sortConfig && sortConfig.key === dataKey) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }

    const sortedItems = [...data].sort((a, b) => {
      if (direction === 'ascending') return a[dataKey] < b[dataKey] ? -1 : 1;
      if (direction === 'descending') return a[dataKey] > b[dataKey] ? -1 : 1;
      return 0;
    });

    setSortedData(sortedItems);
    setSortConfig({ key: dataKey, direction });
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = tableBodyRef.current.scrollTop;
      const newIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferRows);
      setStartIndex(newIndex);
    };

    if (virtualized && tableBodyRef.current) {
      tableBodyRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableBodyRef.current) {
        tableBodyRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [virtualized, rowHeight, bufferRows]);

  const totalRows = visibleRows + 2 * bufferRows;
  const visibleData = virtualized
    ? sortedData.slice(startIndex, startIndex + totalRows)
    : sortedData;

  const SortIcons = ({ dataKey, sortable }) => {
    if (!sortable) return null;

    const isActiveAsc = sortConfig.key === dataKey && sortConfig.direction === 'ascending';
    const isActiveDesc = sortConfig.key === dataKey && sortConfig.direction === 'descending';

    return (
      <div className='sort-icons'>
        <span className={`sort-icon${isActiveAsc ? '-active' : ''}`}>▲</span>
        <span className={`sort-icon${isActiveDesc ? '-active' : ''}`}>▼</span>
      </div>
    );
  };


  const CustomRenderedCellComponent = ({ defaultValue }) => {
    const [rowBoolean, setRowBoolean] = useState(defaultValue);

    return (
      <div style={{ display: 'flex' }}>
        <Switch onClick={() => setRowBoolean(!rowBoolean)} />
      </div>
    );
  };

  return (
    <div className='custom-table' style={{ width: tableWidth }}>
      <div className='table-header'>
        <div className='table-header-row'>
          {columns.map(({ title, dataKey, sortable }) => (
            <div
              key={dataKey}
              onClick={() => sortable && sortByColumn(dataKey)}
              className={`table-header-row-cell ${sortable ? 'hover' : ''}`}
            >
              <span className='table-header-row-cell-value'>{title}</span>
              <SortIcons dataKey={dataKey} sortable={sortable} />
            </div>
          ))}
        </div>
      </div>
      <div
        ref={tableBodyRef}
        className='table-body'
        style={{
          overflowY: 'auto',
          maxHeight: `${visibleRows * rowHeight * 2}px`,
        }}
      >
        {visibleData.map((item, index) => (
          <div
            key={index}
            className='table-body-row'
            style={{
              height: `${rowHeight}px`,
              backgroundColor: (startIndex + index) % 2 === 0 ? '#333' : 'transparent'
            }}
          >
            {columns.map(({ dataKey, customRender }) => (
              <div key={dataKey} className='table-body-row-cell'>
                {customRender
                  ? <CustomRenderedCellComponent defaultValue={item[dataKey]} />
                  : (
                    <span className='table-body-row-cell-value'>
                      {typeof item[dataKey] === 'boolean'
                        ? (
                          <span style={{ fontStyle: 'italic' }}>
                            {item[dataKey].toString()}
                          </span>
                        )
                        : item[dataKey]}
                    </span>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
