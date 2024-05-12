import { Switch } from 'antd';
import React, { useState } from 'react';

import CustomTable from './CustomTable';

const JobComponent = ({ defaultValue }) => {
  const [rowBoolean, setRowBoolean] = useState(defaultValue);

  return (
    <div style={{ display: 'flex' }}>
      <Switch onClick={() => setRowBoolean(!rowBoolean)} />
      { }
    </div>
  );
};


const App = () => {
  const [virtualizedData, setVirtualizedData] = useState(false);

  const columns = [
    { title: 'Name', dataKey: 'name', sortable: true },
    { title: 'Age', dataKey: 'age', sortable: true },
    {
      title: 'Job',
      dataKey: 'job',
      sortable: false,
      customRender: false
    }
  ];

  const data = [
    { name: "Stephen Strange", age: 42, job: false },
    { name: "Peter Parker", age: 23, job: true },
    { name: "Wade Wilson", age: 30, job: false },
    { name: "Matt Murdock", age: 34, job: true },
    { name: "Jessica Jones", age: 31, job: false },
    { name: "Luke Cage", age: 36, job: true },
    { name: "Danny Rand", age: 28, job: false },
    { name: "Frank Castle", age: 40, job: true },
    { name: "Reed Richards", age: 46, job: false },
    { name: "Sue Storm", age: 34, job: false },
    { name: "Johnny Storm", age: 27, job: false },
    { name: "Ben Grimm", age: 45, job: true },
    { name: "Scott Lang", age: 35, job: false },
    { name: "Hope van Dyne", age: 33, job: true },
    { name: "Hank Pym", age: 65, job: false },
    { name: "Janet van Dyne", age: 64, job: false },
    { name: "Carol Danvers", age: 36, job: true },
    { name: "Nick Fury", age: 70, job: false },
    { name: "Maria Hill", age: 39, job: false },
    { name: "Pietro Maximoff", age: 32, job: false },
    { name: "Wanda Maximoff", age: 32, job: false },
    { name: "Vision", age: 5, job: true },
    { name: "Sam Wilson", age: 36, job: false },
    { name: "John Doe", age: 28, job: true },
    { name: "Jane Smith", age: 22, job: false },
    { name: "Alice Johnson", age: 30, job: true },
    { name: "Bob Brown", age: 45, job: false },
    { name: "Rachel Green", age: 35, job: false },
    { name: "Monica Geller", age: 40, job: false },
    { name: "Chandler Bing", age: 38, job: false },
    { name: "Ross Geller", age: 36, job: false },
    { name: "Phoebe Buffay", age: 34, job: true },
    { name: "Joey Tribbiani", age: 29, job: false },
    { name: "Barry Allen", age: 28, job: false },
    { name: "Oliver Queen", age: 32, job: false },
    { name: "Kara Danvers", age: 27, job: false },
    { name: "Bruce Wayne", age: 42, job: false },
    { name: "Clark Kent", age: 35, job: true },
    { name: "Diana Prince", age: 30, job: false },
    { name: "James Gordon", age: 50, job: false },
    { name: "Harvey Bullock", age: 48, job: false },
    { name: "Selina Kyle", age: 26, job: false },
    { name: "Pamela Isley", age: 33, job: false },
    { name: "Garfield Logan", age: 21, job: false },
    { name: "Koriand'r", age: 29, job: false },
    { name: "Rachel Roth", age: 23, job: false },
    { name: "Victor Stone", age: 25, job: false },
    { name: "Wally West", age: 28, job: false },
    { name: "Arthur Curry", age: 37, job: false },
    { name: "John Stewart", age: 42, job: false },
    { name: "Billy Batson", age: 15, job: false },
    { name: "Lois Lane", age: 34, job: false },
    { name: "Lex Luthor", age: 47, job: false },
    { name: "Tony Stark", age: 48, job: false },
    { name: "Steve Rogers", age: 35, job: false },
    { name: "Natasha Romanoff", age: 32, job: false },
    { name: "Bruce Banner", age: 49, job: false },
    { name: "Thor Odinson", age: 1000, job: false },
  ];


  return (
    <div style={{ width: '900px', margin: '50px' }}>
      <h1>{virtualizedData ? 'Virtualized table' : 'Normal table'}</h1>
      <button
        style={{ margin: '50px 0' }}
        onClick={() => setVirtualizedData(!virtualizedData)}
      >
        Toggle virtualized data
      </button>
      <CustomTable
        data={data}
        width='900px'
        columns={columns}
      />
    </div>
  );
}

export default App;
