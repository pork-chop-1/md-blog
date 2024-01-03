const { StrictMode, useEffect, useRef, useState } = React;
const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById("root"));

function App() {
  const list = [
    {
      title: "level 1",
      subList: [
        {
          title: "level 1-1",
          subList: [{ title: "level 1-1-1", subList: [] }]
        },
        { title: "level 1-2", subList: [] },
        { title: "level 1-3", subList: [] }
      ]
    }
  ];

  return (
    <div className="relative max-w-sm">
      {list.map((v) => (
        <Item title={v.title} subList={v.subList} />
      ))}
    </div>
  );
}

function Item({ title, subList }) {
  if (subList == null || subList.length === 0) {
    return (
      <div>
        <button className={`bg-blue-200 w-full h-8`}>{title}</button>
      </div>
    );
  } else {
    const component = useRef(),
      subMenuRef = useRef()
     
    useEffect(() => {
      const ctx = gsap.context(() => {
        if (!isExpand) {
          gsap.to(subMenuRef.current, { height: 0, duration: 0.2 })
        } else {
          // auto 卡顿
          var tl = gsap.timeline()
          tl.set(subMenuRef.current, { height: 0 })
            .to(subMenuRef.current, { height: subMenuRef.current?.scrollHeight, duration: 0.2 })
            .set(subMenuRef.current, { height: 'auto' })
        }
      }, component);

      return ctx.revert();
    }, [isExpand]);

    const [isExpand, setIsExpand] = useState(true)
    const clickHandler = () => {
      setIsExpand(!isExpand)
    }
    return (
      <div ref={component}>
        <button className={`bg-blue-200 w-full h-8`} onClick={clickHandler}>{title}</button>
        {/* ${isExpand ? '' : 'h-0'} */}
        <ul className={`pl-8 overflow-hidden `} ref={subMenuRef}>
          <li>
            <div>
              {subList.map((v) => (
                <Item title={v.title} subList={v.subList}></Item>
              ))}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
