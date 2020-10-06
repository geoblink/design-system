### Basic

```jsx live
  <geo-tree
    :description-icon="['far', 'lightbulb']"
    :categories="[
       {
         id: 'fruits',
         label: 'Fruits',
         subcategories: [
           {
             id: 'tropical-fruits',
             label: 'Tropical fruits',
             subcategories: [
               {
                 id: 'pineapple',
                 label: 'Pineapple'
               },
               {
                 id: 'banana',
                 label: 'Banana'
               },
               {
                 id: 'coconut',
                 label: 'Coconut'
               },
               {
                 id: 'avocado',
                 label: 'Avocado'
               }
             ]
           },
           {
             id: 'citrus-fruits',
             label: 'Citrus fruits',
             subcategories: [
               {
                 id: 'orange',
                 label: 'Orange'
               },
               {
                 id: 'lime',
                 label: 'Lime'
               },
               {
                 id: 'grapefruit',
                 label: 'GrapeFruit'
               },
               {
                 id: 'mandarin',
                 label: 'Mandarin'
               },
               {
                 id: 'pomelo',
                 label: 'Pomelo'
               }
             ]
           },
           {
             id: 'sweet-fruits',
             label: 'Sweet fruits',
             subcategories: [
               {
                 id: 'pear',
                 label: 'Pear'
               },
               {
                 id: 'apple',
                 label: 'Apple'
               },
               {
                 id: 'redGrapes',
                 label: 'Red Grapes'
               }
             ]
           }
         ]
       },
       {
         id: 'vegetables',
         label: 'Vegetables',
         subcategories: [
           {
             id: 'fruits',
             label: 'Fruits',
             subcategories: [
               {
                 id: 'eggplant',
                 label: 'Eggplant'
               },
               {
                 id: 'pepper',
                 label: 'Pepper'
               }
             ]
           },
           {
             id: 'bulbs',
             label: 'Bulbs',
             subcategories: [
               {
                 id: 'onion',
                 label: 'Onion'
               },
               {
                 id: 'leek',
                 label: 'Leek'
               },
               {
                 id: 'garlic',
                 label: 'Garlic'
               }
             ]
           }
         ]
       }
     ]"
    keyForId="id"
    keyForChildren="subcategories"
  ></geo-tree>
```

### With action button

```jsx live
  <geo-tree
    :categories="[
      {
         id: 'fruits',
         label: 'Fruits',
       },
       {
         id: 'vegetables',
         label: 'Vegetables',
       },
    ]"
    keyForId="id"
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
         id: 'fruits',
         label: 'Fruits',
         subcategories: [
           {
             id: 'tropical-fruits',
             label: 'Tropical fruits',
             subcategories: [
               {
                 id: 'pineapple',
                 label: 'Pineapple'
               },
               {
                 id: 'banana',
                 label: 'Banana'
               },
               {
                 id: 'coconut',
                 label: 'Coconut'
               },
               {
                 id: 'avocado',
                 label: 'Avocado'
               }
             ]
           },
           {
             id: 'citrus-fruits',
             label: 'Citrus fruits',
             subcategories: [
               {
                 id: 'orange',
                 label: 'Orange'
               },
               {
                 id: 'lime',
                 label: 'Lime'
               },
               {
                 id: 'grapefruit',
                 label: 'GrapeFruit'
               },
               {
                 id: 'mandarin',
                 label: 'Mandarin'
               },
               {
                 id: 'pomelo',
                 label: 'Pomelo'
               }
             ]
           },
           {
             id: 'sweet-fruits',
             label: 'Sweet fruits',
             subcategories: [
               {
                 id: 'pear',
                 label: 'Pear'
               },
               {
                 id: 'apple',
                 label: 'Apple'
               },
               {
                 id: 'redGrapes',
                 label: 'Red Grapes'
               }
             ]
           }
         ]
       },
       {
         id: 'vegetables',
         label: 'Vegetables',
         subcategories: [
           {
             id: 'fruits',
             label: 'Fruits',
             subcategories: [
               {
                 id: 'eggplant',
                 label: 'Eggplant'
               },
               {
                 id: 'pepper',
                 label: 'Pepper'
               }
             ]
           },
           {
             id: 'bulbs',
             label: 'Bulbs',
             subcategories: [
               {
                 id: 'onion',
                 label: 'Onion'
               },
               {
                 id: 'leek',
                 label: 'Leek'
               },
               {
                 id: 'garlic',
                 label: 'Garlic'
               }
             ]
           }
         ]
       }
     ]"
    keyForId="id"
    keyForChildren="subcategories"
  ></geo-tree>
```
