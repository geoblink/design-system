### Basic

```jsx live
  <geo-tree
    :description-icon="['far', 'lightbulb']"
    :categories="[
       {
         id: '1',
         label: 'Category 1',
         description: 'Category description',
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

### With action button

```jsx live
  <geo-tree
    :categories="[
       {
         id: '1',
         label: 'Category 1',
       },
       {
         id: '2',
         label: 'Category 2',
       },
    ]"
    keyForId="id"
    keyForChildren="children"
  >
  <template v-slot:actionButton>
    <font-awesome-icon
      :icon="['far', 'lightbulb']"
      aria-hidden
      fixed-width
    ></font-awesome-icon>
  </template>
</geo-tree>
```


### Searchable

```jsx live
  <geo-tree 
    no-results-found-label="No results found"
    searchable
    :categories="[
       {
         id: '1',
         label: 'Category 1',
         description: 'Category description',
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
