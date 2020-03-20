## Simple primary value

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "27th of 73",
        isPrimary: true
      }
    }
  }
}
</script>
```

## Primary value with unit

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "365",
        isPrimary: true,
        unit: "€"
      }
    }
  }
}
</script>
```

## Primary value with description

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "27th of 35",
        isPrimary: true,
        description: "compared to the rest of the stores"
      }
    }
  }
}
</script>
```

## Primary value with color

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "27th of 35",
        isPrimary: true,
        colorHighlight: "red"
      }
    }
  }
}
</script>
```

## Primary value with description tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      >
        <template v-slot:descriptionTooltip>
          <font-awesome-icon
            data-tooltip-id="descriptionTooltipIcon"
            :icon="['fas', 'info-circle']"
          />
          <geo-tooltip :forced-trigger-target="descriptionTooltipIcon">
            Tooltip text
          </geo-tooltip>
        </template>
      </geo-bad-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      descriptionTooltipIcon: null,
      kpiData: {
        value: "27th of 35",
        isPrimary: true,
        description: "compared to the rest of the stores",
        descriptionTooltip: "Tooltip text"
      }
    }
  },
  mounted () {
    this.descriptionTooltipIcon = document.querySelector('[data-tooltip-id="descriptionTooltipIcon"]')
  }
}
</script>
```

## Primary value with warning tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      >
        <template v-slot:warningTooltip>
          <font-awesome-icon
            data-tooltip-id="warningTooltipIcon"
            class="warning-icon"
            :icon="['fas', 'exclamation-triangle']"
          />
          <geo-tooltip :forced-trigger-target="warningTooltipIcon">
            Warning tooltip text
          </geo-tooltip>
        </template>
      </geo-bad-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      warningTooltipIcon: null,
      kpiData: {
        value: "27th of 35",
        isPrimary: true,
        description: "compared to the rest of the stores",
        warningTooltip: "Tooltip text"
      }
    }
  },
  mounted () {
    this.warningTooltipIcon = document.querySelector('[data-tooltip-id="warningTooltipIcon"]')
  }
}
</script>

<style>
.warning-icon{
  margin-top: 8px;
  margin-right: 5px;
}
</style>
```

## Simple secondary value

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "27th of 73",
        isPrimary: false
      }
    }
  }
}
</script>
```

## Secondary value with unit and description

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "587",
        isPrimary: false,
        unit: "€",
        description:"Facturados por la tienda",
      }
    }
  }
}
</script>
```

## Secondary value with color

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      kpiData: {
        value: "27th of 73",
        isPrimary: false,
        unit: "",
        description:"Es mayor que la media de tiendas",
        colorHighlight:"yellow"
      }
    }
  }
}
</script>
```

## Secondary value with description tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      >
        <template v-slot:descriptionTooltip>
          <font-awesome-icon
            data-tooltip-id="descriptionTooltipIcon2"
            :icon="['fas', 'info-circle']"
          />
          <geo-tooltip :forced-trigger-target="descriptionTooltipIcon">
            Tooltip text
          </geo-tooltip>
        </template>
      </geo-bad-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      descriptionTooltipIcon: null,
      kpiData: {
        value: "27th of 35",
        isPrimary: false,
        description: "compared to the rest of the stores"
      }
    }
  },
  mounted () {
    this.descriptionTooltipIcon = document.querySelector('[data-tooltip-id="descriptionTooltipIcon2"]')
  }
}
</script>
```

## Secondary value with warning tooltip

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-bad-KPI
        :data="kpiData"
      >
        <template v-slot:warningTooltip>
          <font-awesome-icon
            class="warning-icon"
            data-tooltip-id="warningTooltipIcon2"
            :icon="['fas', 'exclamation-triangle']"
          />
          <geo-tooltip :forced-trigger-target="warningTooltipIcon">
            Warning tooltip text
          </geo-tooltip>
        </template>
      </geo-bad-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoKPIDemo',
  data () {
    return {
      warningTooltipIcon: null,
      kpiData: {
        value: "27th of 35",
        isPrimary: false,
        description: "compared to the rest of the stores"
      }
    }
  },
  mounted () {
    this.warningTooltipIcon = document.querySelector('[data-tooltip-id="warningTooltipIcon2"]')
  }
}
</script>

<style>
.warning-icon{
  margin-right: 5px;
}
</style>
```