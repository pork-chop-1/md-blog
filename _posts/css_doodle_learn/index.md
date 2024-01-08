---
title: <css-doodle /> learn
date: 2023-12-01 00:00:00
tags: css-doodle
---

# `<css-doodle />`
一个用CSS绘制图案的web组件

## 介绍
`<css-doodle />`是基于 [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom)和[Custom Elements v1](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements)。你现在可以在所有主流浏览器上使用它而不需要其他依赖。

这个组件将根据其内部的规则(普通CSS)生成一个div网格。您可以使用CSS轻松地操作这些单元格，以生成图形模式或动画图形。

限制就是CSS本身的限制。
-- The limit is the limit of CSS itself.

## 用法

`CSS-doodle`的语法基于CSS，并提供了几个额外的实用函数和简写属性。

1. Grid

- 网格中的行数和列数由元素上的网格属性定义，范围从1到32。当没有值或给出0时，它的默认值是1x1。
- 只有当网格是一维的时候，行或列被限制为1024
- n x m遵循(col, row)或(x, y)的顺序。以下格式的网格值都是可识别的:

```
grid = "0"
grid = "5"
grid = "20"
grid = "5x7"
grid = "5 x 7"
grid = "5,7"
```

吐槽1: 和grid有关的非常有趣的一个东西，而且很方便的可以做出很多不同的复杂图案。


2. Use

- 从CSS自定义属性(CSS变量)导入规则。
- 如果你想在生产站点中使用css-doodle，强烈建议这样写规则。因为当网络慢或浏览器不支持Web组件时，它不会中断。

3. Seed

- 所有的随机值将根据种子值重新生成到与上次相同的值。如果您想要保存快照，这是非常有用的。
- 如果你不明确指定，默认情况下会生成一个随机种子，你可以在以后使用`JS API`获得生成的值。

吐槽2： 这次是保存已经生成的图形然后再使用吗

---

## Selectors 选择器

1. `:doodle`
`:doodle`是一个特殊的选择器，用于指示组件元素本身。注意样式会被外面的CSS文件覆盖。(试着在涂鸦上悬停)

2. `:container`

  >`:container`是容器元素，包含所有使用`Grid Layout`的单元格。你可能想在里面设置`grid-gap`。
  它继承了:doodle的所有网格属性，这就是为什么它也能工作:

  ```css
  :doodle {
    grid-gap: 1px;
  }
  ```

3. `@nth(n, ...)`

  像这样选择第n个单元格  就像`:nth-child(n)`

  __后面的会覆盖前面的。__

4. `@even`

  类似`:nth-child(even)`但更短

5. `@odd`
  
  类似`:nth-child(odd)`

6 `@at(col, row)`
  直接指定行列

7. `@random([ ratio ])`

  随机选择单元格。该比率接受0到1之间的值。默认为0.5。

8. `@row(n, ...)` `@col(n, ...)`

  选择行列 `odd`和`even`

9. `@match(expression)`
  
  可以使用x(横坐标),y(纵坐标),i(count),X(横向总个数),Y(纵向总个数),I(总个数)


## Properties

1. `@grid`: `@grid: 8x7 / 200px 100px`
2. `@use`: `@use: var(--rule-a)`
3. `@size`: `@size: 10em;  /* width: 10em; height: 10em; */`
4. `@offset`: `@offset: right 25%`
5. `@shape`: `@shape: clover 5` 后面的数字代表片数

## Functions

1. `index()`/`@i` 当前cell的位数
2. `@row()`/`@y` 当前cell的行数
3. `@col()`/`@x` 当前cell的列数
4. `@row-size()`/`@Y` 总行数
5. `@col-size()`/`@X` 总列数
6. `@size()`/`@I` 总个数
7. `@pick()`/`@p`    `@pick(1, .6, .3, .1)` `@pick([a-z])`  随机选取列表中的元素
8. `@pick-n()`/`@pn`   同上，但是是一个一个按顺序选取
9. `@pick-d()`/`@pd`   distinct  同上，打乱顺序一个一个选取
10. `@rand(start [,end])`/`@r`  随机选取，可以带单位，例如`px`,`deg`
11. `@last-pick, @last-rand` / `@lp, @lr` 选取上一个随机的数（上面4条）
12. `@repeat(times, value)`/`@rep` 重复一个值，随机颜色：`#@repeat(6, @pick([0-9a-f]))`
13. `@multiple(times, value)`/`@m` 同repeat;
`@multiple(times, value)`/`@m` 同repeat但是用空格分离value;
`@m(2, ...)`可以简写为`@m2(...)`;
14. `@n`: 目前重复的位数,`@n(-1)`代表前一位,
`@nx`,当前列数
`@ny`, 当前行数
`@N` 总重复位数
 --只能在multiple中使用

15. `@doodle(code)`
使用一个独立的doodle代码来生成base64图片，代替image
