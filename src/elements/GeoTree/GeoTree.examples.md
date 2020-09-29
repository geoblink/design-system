### Basic

```jsx live

  <geo-tree 
    :categories="[
       {
         id: '1',
         label: 'Category 1',
         children: [
           {
             id: '1.1',
             label: 'Category 1.1',
             children: [
               {
                 id: '1.1.1',
                 label: 'Category 1.1.1',
                 children: []
               }
             ]
           },
         ]
       },
       {
         id: '2',
         label: 'Category 2',
       },
       {
         id: '3',
         label: 'Category 3',
         children: [
            {
              id: '3.1',
              label: 'Category 3.1',
              children: []
            },
            {
              id: '3.2',
              label: 'Category 3.2',
              children: [
                {
                  id: '3.2.1',
                  label: 'Category 3.2.1',
                }
              ]
            }
         ]
       }
    ]"
    keyForId="id"
    keyForChildren="children"
  ></geo-tree>
```
