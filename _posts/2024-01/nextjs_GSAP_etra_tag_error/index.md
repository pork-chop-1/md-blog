---
title: mongoose 连接 mongodb 操作
date: 2024-01-18 10:02:00
tags: next.js
---

<https://user-images.githubusercontent.com/79374797/108623285-771b3c00-743e-11eb-9fa5-63c64f61be32.png>

<https://github.com/vercel/next.js/discussions/22388>
<https://gsap.com/community/forums/topic/35440-warning-extra-attributes-from-the-server-style/>

<https://github.com/greensock/react>
<https://www.npmjs.com/package/@gsap/react>

## old:

``` tsx
useEffect(() => {
    const ctx = gsap.context(() => {
      // https://gsap.com/community/forums/topic/35440-warning-extra-attributes-from-the-server-style/
      // put register in useEffect

      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
          trigger: '#header',
          onUpdate: (self) => {
            const percent = Math.round(self.progress * 100)
            setPercentage(percent === 0 ? '· · ·' : percent)
            setCircleDash(Math.round(self.progress * 151) + 'px 151px')
          },
        })
      }
    }, component)

    // React 18 strict mode calls twice
    return () => ctx.revert()
  }, [])
```


