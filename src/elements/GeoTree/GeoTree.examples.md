### Basic example

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
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
                            { id: 'leek', label: 'Leek' },  
                            { 
                                id: 'garlic', label: 'Garlic',
                            }  
                        ]  
                    },
                ]  
            }  
        ]
    }
  },
  methods: {
    handleCheck (categoryId, isChecked) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    }
  }
}
</script>
```
