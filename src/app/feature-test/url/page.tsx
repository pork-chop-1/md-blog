'use client'

export default function url() {
  fetch('https://interface3.music.163.com/eapi/song/enhance/player/url', {
    method: 'POST',
    body: JSON.stringify({
      ids: JSON.stringify([33894312]),
      br: 999000
    })
  }).then(res => res.json())
  .then(res => console.log(res))

  

  return <></>
}