### Long content

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="width: 120px; background: #efefef;">
    <geo-marquee>
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
</div>
```

### Long content and slow animation

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="width: 120px; background: #efefef;">
    <geo-marquee :duration="6">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
</div>
```

### Long content and fast animation

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="width: 120px; background: #efefef;">
    <geo-marquee :duration="1">
      <template slot-scope="{}">Some text for the marquee</template>
    </geo-marquee>
  </div>
</div>
```

### Short content

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="width: 120px; background: #efefef;">
    <geo-marquee>
      <template slot-scope="{}">Some text</template>
    </geo-marquee>
  </div>
</div>
```
