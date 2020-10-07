### Basic example

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-children="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check="handleCheck"
    ></geo-tree>  
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      checkedCategories: {},
      categories: 
        [  
            {  
                id: 'fruits',  
                label: 'ZFruits',  
                subcategories: [  
                    {  
                        id: 'tropical-fruits',  
                        label: 'Tropical fruits',  
                        subcategories: [  
                            { id: 'pineapple', label: 'Pineapple' },  
                            { id: 'banana', label: 'Banana' },  
                            { id: 'coconut',label: 'Coconut'},  
                            { id: 'avocado', label: 'Avocado' }  
                        ]  
                    },  
                    {  
                        id: 'citrus-fruits',  
                        label: 'Citrus fruits',  
                        subcategories: [  
                            { id: 'orange', label: 'Orange' },  
                            { id: 'lime', label: 'Lime'},  
                            { id: 'grapefruit', label: 'GrapeFruit' },  
                            { id: 'mandarin',label: 'Mandarin'},  
                            { id: 'pomelo', label: 'Pomelo' }  
                        ]  
                    },  
                    {  
                        id: 'sweet-fruits',  
                        label: 'Sweet',  
                        subcategories: [  
                            {id: 'pear',label: 'Pear'},  
                            {id: 'apple',label: 'Apple'},  
                            {id: 'redGrapes',label: 'Red Grapes'}  
                        ]  
                    }  
                ]  
            },  
            {  
                id: 'vegetables',  
                label: 'Vegetables',  
                subcategories: [  
                    {  
                        id: 'vegetables-fruits',  
                        label: 'Fruits',  
                        subcategories: [  
                            { id: 'eggplant',  label: 'Eggplant' },  
                            { id: 'pepper',  label: 'Pepper' }  
                        ]  
                    },  
                    {  
                        id: 'bulbs',  
                        label: 'Bulbs',  
                        subcategories: [  
                            { id: 'onion',  label: 'Onion' },  
                            { id: 'leek', label: 'Leek' },  
                            { 
                                id: 'garlic', label: 'Garlic',
                            }  
                        ]  
                    },
{  
                        id: 'ididid',  
                        label: 'no abregrrgrg',  
                        subcategories: [  
                            { id: 'onrgegreion',  label: 'grerg' },  
                            { id: 'ew', label: 'Leweedek' },  
                            { 
                                id: 'ewew', label: 'vegetable',
                            }  
                        ]  
                    }
                ]  
            }  
        ]
    }
  },
  methods: {
    handleCheck (categoryId, isChecked) {
      this.checkedCategories[categoryId] = isChecked
    }
  }
}
</script>
```

### With action button

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-children="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check="handleCheck"
    >
        <template v-slot:actionButton>
            <font-awesome-icon
              :icon="['far', 'lightbulb']"
              aria-hidden
              fixed-width
            ></font-awesome-icon>
        </template>
    </geo-tree>  
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      checkedCategories: {},
      categories: 
        [  
          {
            id: 'fruits',
            label: 'Fruits',
          },
          {
            id: 'vegetables',
            label: 'Vegetables',
          },      
        ]
    }
  },
  methods: {
    handleCheck (categoryId, isChecked) {
      this.checkedCategories[categoryId] = isChecked
    }
  }
}
</script>
```

### Searchable

```vue live
<template>
    <geo-tree
        searchable
        key-for-id="id"
        key-for-children="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check="handleCheck"
    ></geo-tree>  
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      checkedCategories: {},
      categories: 
        [  
            {  
                id: 'fruits',  
                label: 'Fruits',  
                subcategories: [  
                    {  
                        id: 'tropical-fruits',  
                        label: 'Tropical fruits',  
                        subcategories: [  
                            { id: 'pineapple', label: 'Pineapple' },  
                            { id: 'banana', label: 'Banana' },  
                            { id: 'coconut',label: 'Coconut'},  
                            { id: 'avocado', label: 'Avocado' }  
                        ]  
                    },  
                    {  
                        id: 'citrus-fruits',  
                        label: 'Citrus fruits',  
                        subcategories: [  
                            { id: 'orange', label: 'Orange' },  
                            { id: 'lime', label: 'Lime'},  
                            { id: 'grapefruit', label: 'GrapeFruit' },  
                            { id: 'mandarin',label: 'Mandarin'},  
                            { id: 'pomelo', label: 'Pomelo' }  
                        ]  
                    },  
                    {  
                        id: 'sweet-fruits',  
                        label: 'Sweet',  
                        subcategories: [  
                            {id: 'pear',label: 'Pear'},  
                            {id: 'apple',label: 'Apple'},  
                            {id: 'redGrapes',label: 'Red Grapes'}  
                        ]  
                    }  
                ]  
            },  
            {  
                id: 'vegetables',  
                label: 'Vegetables',  
                subcategories: [  
                    {  
                        id: 'vegetables-fruits',  
                        label: 'Fruits',  
                        subcategories: [  
                            { id: 'eggplant',  label: 'Eggplant' },  
                            { id: 'pepper',  label: 'Pepper' }  
                        ]  
                    },  
                    {  
                        id: 'bulbs',  
                        label: 'Bulbs',  
                        subcategories: [  
                            { id: 'onion',  label: 'Onion' },  
                            {  id: 'leek', label: 'Leek' },  
                            { id: 'garlic', label: 'Garlic'}  
                        ]  
                    }  
                ]  
            }  
        ]
    }
  },
  methods: {
    handleCheck (categoryId, isChecked) {
      this.checkedCategories[categoryId] = isChecked
    }
  }
}
</script>
```

### With initially expanded categories

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-children="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check="handleCheck"
    ></geo-tree>  
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      checkedCategories: {},
      categories: 
        [  
            {  
                id: 'fruits',  
                label: 'Fruits',
                isExpanded: true,
                subcategories: [  
                    {  
                        id: 'tropical-fruits',  
                        label: 'Tropical fruits',  
                        subcategories: [  
                            { id: 'pineapple', label: 'Pineapple' },  
                            { id: 'banana', label: 'Banana' },  
                            { id: 'coconut',label: 'Coconut'},  
                            { id: 'avocado', label: 'Avocado' }  
                        ]  
                    },  
                    {  
                        id: 'citrus-fruits',  
                        label: 'Citrus fruits',  
                        subcategories: [  
                            { id: 'orange', label: 'Orange' },  
                            { id: 'lime', label: 'Lime'},  
                            { id: 'grapefruit', label: 'GrapeFruit' },  
                            { id: 'mandarin',label: 'Mandarin'},  
                            { id: 'pomelo', label: 'Pomelo' }  
                        ]  
                    },  
                    {  
                        id: 'sweet-fruits',  
                        label: 'Sweet',  
                        subcategories: [  
                            {id: 'pear',label: 'Pear'},  
                            {id: 'apple',label: 'Apple'},  
                            {id: 'redGrapes',label: 'Red Grapes'}  
                        ]  
                    }  
                ]  
            },  
            {  
                id: 'vegetables',  
                label: 'Vegetables',  
                subcategories: [  
                    {  
                        id: 'vegetables-fruits',  
                        label: 'Fruits',  
                        subcategories: [  
                            { id: 'eggplant',  label: 'Eggplant' },  
                            { id: 'pepper',  label: 'Pepper' }  
                        ]  
                    },  
                    {  
                        id: 'bulbs',  
                        label: 'Bulbs',  
                        subcategories: [  
                            { id: 'onion',  label: 'Onion' },  
                            {  id: 'leek', label: 'Leek' },  
                            { id: 'garlic', label: 'Garlic'}  
                        ]  
                    }  
                ]  
            }  
        ]
    }
  },
  methods: {
    handleCheck (categoryId, isChecked) {
      this.checkedCategories[categoryId] = isChecked
    }
  }
}
</script>
```
