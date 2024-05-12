import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomTable from './CustomTable'; // Adjust the import path as necessary

describe('CustomTable virtualization', () => {
  const columns = [{ title: "Name", dataKey: "name", sortable: true }];
  const data = Array.from({ length: 100 }, (_, i) => ({ name: `Item ${i + 1}` }));

  it('renders only visible and buffer rows when virtualized', () => {
    const { container } = render(
      <CustomTable
        data={data}
        columns={columns}
        rowHeight={50}
        bufferRows={3}
        visibleRows={5}
        virtualized={true}
      />
    );

    // Check the number of rendered rows
    const rows = container.querySelectorAll('.table-body-row');
    expect(rows.length).toBe(5 + 3 * 2); // visibleRows + bufferRows * 2
  });

  it('renders all rows when not virtualized', () => {
    const { container } = render(
      <CustomTable
        data={data}
        columns={columns}
        virtualized={false}
      />
    );

    // Check the number of rendered rows
    const rows = container.querySelectorAll('.table-body-row');
    expect(rows.length).toBe(data.length);
  });
});
