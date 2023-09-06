### Basic example (item and folder events)

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check-item="handleCheckItem"
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
                        id: 'invented-fruits',  
                        label: 'Invented fruits',  
                        subcategories: [
                          {
                            id: 'not-oranges',
                            label: 'Not oranges',
                            subcategories: []
                          }
                        ]  
                    },
                    {  
                        id: 'epic-fruits',  
                        label: 'Epic fruits',  
                        subcategories: [
                          {
                            id: 'legendary-fruits',
                            label: 'Legendary fruits',
                            subcategories: []
                          },
                          {
                            id: 'awesome-fruits',
                            label: 'Awesome fruits',
                            subcategories: [
                              { id: 'sweet-melon', label: 'Sweet melon' }
                            ]
                          }
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    },
    handleCheckFolder (categoryId, isChecked, isDelegated) {
      // Use this event if you want to manually handle folders
    }
  }
}
</script>
```

### With action button

```vue live
<template>
    <geo-tree
        keyForId="id"
        keyForSubcategory="subcategories"
        keyForLabel="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check-item="handleCheckItem"
    >
        <template
          slot="actionButton"
          slot-scope="{ item }"
        >
            <font-awesome-icon
              :icon="['far', 'lightbulb']"
              aria-hidden
              fixed-width
              @click.stop="clickOnItem(item)"
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
          },
        ]
    }
  },
  methods: {
    handleCheckItem (categoryId, isChecked) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    },

    clickOnItem (item) {
      console.log(item)
    }
  }
}
</script>
```

### Using custom icons

```vue live
<template>
    <geo-tree
        keyForId="id"
        keyForSubcategory="subcategories"
        keyForLabel="label"
        :categories="categories"
        :checked-items="checkedCategories"
        :collapsed-icon="['fal', 'chevron-down']"
        :expanded-icon="['fal', 'chevron-up']"
        @check-item="handleCheckItem"
    />
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
          },      
        ]
    }
  },
  methods: {
    handleCheckItem (categoryId, isChecked, isDelegated) {
        this.$set(this.checkedCategories, categoryId, isChecked)
    }
  }
}
</script>
```

### With info tooltip icon

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        :description-icon="['far', 'lightbulb']"
        @check-item="handleCheckItem"
    >
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
            description: 'Description used to this category'
          },
          {
            id: 'vegetables',
            label: 'Vegetables',
          },      
        ]
    }
  },
  methods: {
    handleCheckItem (categoryId, isChecked, isDelegated) {
        this.$set(this.checkedCategories, categoryId, isChecked)
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
        no-results-found-label="Any category match"
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        @check-item="handleCheckItem"
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
        this.$set(this.checkedCategories, categoryId, isChecked)
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
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        :dynamic-expanded-categories="dynamicExpandedCategories"
        @check-item="handleCheckItem"
    ></geo-tree>
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      dynamicExpandedCategories: {
        fruits: true,
        'tropical-fruits': true
      },
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
        this.$set(this.checkedCategories, categoryId, isChecked)
    }
  }
}
</script>
```

### With drag support

```vue live
<template>
<div>
    <geo-tree
      key-for-id="id"
      key-for-subcategory="subcategories"
      key-for-label="label"
      :categories="categories"
      :checked-items="checkedCategories"
      :draggable-group="{ name: 'test-group', put: false, pull: 'clone' }"
      @check-item="handleCheckItem"
      @start-drag="logDrag($event)"
      @end-drag="logDrag($event)"
      @change-drag="logDrag($event)"
    ></geo-tree>
    <geo-tree
      key-for-id="id"
      key-for-subcategory="subcategories"
      key-for-label="label"
      :categories="categories"
      :checked-items="checkedCategories"
      :draggable-group="{ name: 'test-group', put: true, pull: false }"
      @check-item="handleCheckItem"
      @start-drag="logDrag($event)"
      @end-drag="logDrag($event)"
      @change-drag="logDrag($event)"
    ></geo-tree>
</div>
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
                        id: 'invented-fruits',  
                        label: 'Invented fruits',  
                        subcategories: [
                          {
                            id: 'not-oranges',
                            label: 'Not oranges',
                            subcategories: []
                          }
                        ]  
                    },
                    {  
                        id: 'epic-fruits',  
                        label: 'Epic fruits',  
                        subcategories: [
                          {
                            id: 'legendary-fruits',
                            label: 'Legendary fruits',
                            subcategories: []
                          },
                          {
                            id: 'awesome-fruits',
                            label: 'Awesome fruits',
                            subcategories: [
                              { id: 'sweet-melon', label: 'Sweet melon' }
                            ]
                          }
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    },
    logDrag (event) {
      console.log(event)
    }
  }
}
</script>
```

### Single select mode (take into account the logic remains on how to handle checked-items prop)

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        is-single-select-mode
        @check-item="handleCheckItem"
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
                        id: 'invented-fruits',  
                        label: 'Invented fruits',  
                        subcategories: [
                          {
                            id: 'not-oranges',
                            label: 'Not oranges',
                            subcategories: []
                          }
                        ]  
                    },
                    {  
                        id: 'epic-fruits',  
                        label: 'Epic fruits',  
                        subcategories: [
                          {
                            id: 'legendary-fruits',
                            label: 'Legendary fruits',
                            subcategories: []
                          },
                          {
                            id: 'awesome-fruits',
                            label: 'Awesome fruits',
                            subcategories: [
                              { id: 'sweet-melon', label: 'Sweet melon' }
                            ]
                          }
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
      this.checkedCategories = {
        [categoryId]: isChecked
      }
    }
  }
}
</script>
```
### With max number of items checked

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :categories="categories"
        :checked-items="checkedCategories"
        :max-checked-items="4"
        @check-item="handleCheckItem"
    ></geo-tree>  
</template>
  
<script>  
export default {
  name: 'GeoTreeDemo',
  data () {
    return {
      checkedCategories: {
        pineapple: true
      },
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
                        id: 'invented-fruits',  
                        label: 'Invented fruits',  
                        subcategories: [
                          {
                            id: 'not-oranges',
                            label: 'Not oranges',
                            subcategories: []
                          }
                        ]  
                    },
                    {  
                        id: 'epic-fruits',  
                        label: 'Epic fruits',  
                        subcategories: [
                          {
                            id: 'legendary-fruits',
                            label: 'Legendary fruits',
                            subcategories: []
                          },
                          {
                            id: 'awesome-fruits',
                            label: 'Awesome fruits',
                            subcategories: [
                              { id: 'sweet-melon', label: 'Sweet melon' }
                            ]
                          }
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    },
    handleCheckFolder (categoryId, isChecked, isDelegated) {
      // Use this event if you want to manually handle folders
    }
  }
}
</script>
```
### With load more button

```vue live
<template>
    <geo-tree
        key-for-id="id"
        key-for-subcategory="subcategories"
        key-for-label="label"
        :has-load-more-button="true"
        :page-size="4"
        more-results-text-content="Load more"
        :categories="categories"
        :checked-items="checkedCategories"
        @check-item="handleCheckItem"
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
                id: 'invented-fruits',  
                label: 'Invented fruits',  
                subcategories: [
                  {
                    id: 'not-oranges',
                    label: 'Not oranges',
                    subcategories: []
                  }
                ]  
            },
            {  
                id: 'epic-fruits',  
                label: 'Epic fruits',  
                subcategories: [
                  {
                    id: 'legendary-fruits',
                    label: 'Legendary fruits',
                    subcategories: []
                  },
                  {
                    id: 'awesome-fruits',
                    label: 'Awesome fruits',
                    subcategories: [
                      { id: 'sweet-melon', label: 'Sweet melon' }
                    ]
                  }
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
    handleCheckItem (categoryId, isChecked, isDelegated) {
      this.$set(this.checkedCategories, categoryId, isChecked)
    },
    handleCheckFolder (categoryId, isChecked, isDelegated) {
      // Use this event if you want to manually handle folders
    }
  }
}
</script>
```