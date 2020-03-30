## Simple primary value

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      value: "27th of 73",
      isPrimary: true
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :unit="unit"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      value: "365",
      isPrimary: true,
      unit: "€"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :description="description"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      value: "27th of 35",
      isPrimary: true,
      description: "compared to the rest of the stores"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :description="description"
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
      </geo-negative-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      descriptionTooltipIcon: null,
      value: "27th of 35",
      isPrimary: true,
      description: "compared to the rest of the stores",
      descriptionTooltip: "Tooltip text"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :description="description"
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
      </geo-negative-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      warningTooltipIcon: null,
      value: "27th of 35",
      isPrimary: true,
      description: "compared to the rest of the stores",
      warningTooltip: "Tooltip text"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      value: "27th of 73",
      isPrimary: false
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :unit="unit"
        :description="description"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      value: "587",
      isPrimary: false,
      unit: "€",
      description:"Facturados por la tienda"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :description="description"
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
      </geo-negative-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      descriptionTooltipIcon: null,
      value: "27th of 35",
      isPrimary: false,
      description: "compared to the rest of the stores"
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
      <geo-negative-KPI
        :value="value"
        :is-primary="isPrimary"
        :description="description"
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
      </geo-negative-KPI>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoNegativeKPIDemo',
  data () {
    return {
      warningTooltipIcon: null,
      value: "27th of 35",
      isPrimary: false,
      description: "compared to the rest of the stores"
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