```jsx
<div class="element-demo">
  <h3 class="element-demo__header">With scroll</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee>
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">With scroll and slow custom duration</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee marquee-duration="6">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">With scroll and fast custom duration</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee marquee-duration="1">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">Without scroll</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee>
      <template slot-scope="{}">Some text</template>
    </geo-marquee>
  </div>
</div>
```