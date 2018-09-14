`GeoMarquee` is a component used to display long strings in a carousel style
which is animated only when user is hovering the text.

You can choose the duration of the animation and its speed will be adjusted
depending on the length of the text.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Long content</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee>
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">Long content and slow custom duration</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee :duration="6">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">Long content and fast custom duration</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee :duration="1">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
  <h3 class="element-demo__header">Short content</h3>
  <div class="element-demo__block" style="width: 120px;">
    <geo-marquee>
      <template slot-scope="{}">Some text</template>
    </geo-marquee>
  </div>
</div>
```